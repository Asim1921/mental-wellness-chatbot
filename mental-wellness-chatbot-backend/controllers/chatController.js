const ChatLog = require('../models/ChatLog');
const { WellnessContent, Quote, Exercise, Technique, Resource } = require('../models/WellnessContent');
const { analyzeMessage, detectCrisis } = require('../utils/nlpHelper');

/**
 * @desc    Process a chat message and generate a response
 * @route   POST /api/chat
 * @access  Private
 */
const processMessage = async (req, res) => {
  try {
    const { message, sessionId } = req.body;
    const userId = req.user._id;

    if (!message) {
      res.status(400);
      throw new Error('Please provide a message');
    }

    // Check for crisis keywords first
    const isCrisis = detectCrisis(message);
    
    // Analyze message to detect emotions and topics
    const analysis = await analyzeMessage(message);
    
    // Get or create the chat session
    let chatSession = await ChatLog.findOne({
      user: userId,
      sessionId,
    });

    if (!chatSession) {
      chatSession = await ChatLog.create({
        user: userId,
        sessionId,
        messages: [],
        analysisResults: {
          detectedThemes: [],
          emotionalState: 'undefined',
        },
      });
    }
    
    // Add user message to chat log
    chatSession.messages.push({
      sender: 'user',
      content: message,
      detectedEmotions: analysis.emotions,
      flaggedAsCrisis: isCrisis,
    });

    // Update analysis results
    chatSession.analysisResults = {
      detectedThemes: [...new Set([...chatSession.analysisResults.detectedThemes, ...analysis.topics])],
      emotionalState: analysis.primaryEmotion || chatSession.analysisResults.emotionalState,
    };

    // Generate response based on analysis
    let botResponse;
    
    if (isCrisis) {
      // Handle crisis situation with emergency resources
      const crisisResources = await Resource.find({ 
        isEmergency: true,
        active: true
      }).limit(3);
      
      botResponse = {
        sender: 'bot',
        content: "I'm concerned about what you're sharing. If you're having thoughts of harming yourself, please reach out to a crisis helpline immediately. Would you like me to provide some resources that might help?",
        contentReference: {
          contentType: 'resource',
          contentId: crisisResources.length > 0 ? crisisResources[0]._id : null,
        },
        flaggedAsCrisis: true,
      };
      
      // Add resources data to response
      botResponse.resources = crisisResources.map(resource => ({
        _id: resource._id,
        title: resource.title,
        description: resource.description,
        url: resource.url,
        resourceType: resource.resourceType,
      }));
    } else {
      // Normal response generation
      const { contentType, content } = await generateResponse(analysis, req.user.preferences);
      
      botResponse = {
        sender: 'bot',
        content: content.responseText,
        contentReference: {
          contentType,
          contentId: content._id,
        },
        detectedEmotions: [],
      };
      
      // Add additional content details based on type
      switch (contentType) {
        case 'exercise':
          botResponse.exerciseDetails = {
            title: content.title,
            steps: content.steps,
            duration: content.duration,
            difficulty: content.difficulty,
            resources: content.resources,
          };
          break;
        case 'technique':
          botResponse.techniqueDetails = {
            title: content.title,
            instructions: content.instructions,
            benefits: content.benefits,
          };
          break;
        case 'quote':
          botResponse.quoteDetails = {
            author: content.author,
            source: content.source,
          };
          break;
      }
    }
    
    // Add bot response to chat log
    chatSession.messages.push(botResponse);
    
    // Save updated chat session
    await chatSession.save();
    
    // Send response to client
    res.status(200).json({
      success: true,
      message: botResponse,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/**
 * Generate appropriate response based on message analysis
 * @param {Object} analysis - Analysis results from NLP
 * @param {Object} userPreferences - User preferences 
 * @returns {Object} Response content
 */
const generateResponse = async (analysis, userPreferences) => {
  // Determine which content type to use based on analysis and user preferences
  const availableTypes = [];
  
  if (userPreferences?.contentPreferences?.quotes) availableTypes.push('quote');
  if (userPreferences?.contentPreferences?.exercises) availableTypes.push('exercise');
  if (userPreferences?.contentPreferences?.techniques) availableTypes.push('technique');
  
  // Default to all types if no preferences set
  const contentTypes = availableTypes.length > 0 ? availableTypes : ['quote', 'exercise', 'technique'];
  
  // Select random content type, slightly favor techniques and exercises over quotes for more actionable content
  let contentType;
  const rand = Math.random();
  if (rand < 0.3) {
    contentType = 'quote';
  } else if (rand < 0.6) {
    contentType = 'exercise';
  } else {
    contentType = 'technique';
  }
  
  // If user preferences don't include the selected type, choose another
  if (!contentTypes.includes(contentType)) {
    contentType = contentTypes[Math.floor(Math.random() * contentTypes.length)];
  }
  
  // Select primary topic from analysis
  const primaryTopic = analysis.topics.length > 0 
    ? analysis.topics[0] 
    : 'general';
  
  // Get content matching topic
  let content;
  let query = {
    contentType,
    active: true,
    tags: { $in: [primaryTopic, 'general'] },
  };
  
  switch (contentType) {
    case 'quote':
      content = await Quote.find(query).sort({ updatedAt: -1 }).limit(5);
      break;
    case 'exercise':
      content = await Exercise.find(query).sort({ updatedAt: -1 }).limit(5);
      break;
    case 'technique':
      content = await Technique.find(query).sort({ updatedAt: -1 }).limit(5);
      break;
    default:
      // Fallback to quotes
      contentType = 'quote';
      content = await Quote.find({ 
        contentType: 'quote',
        active: true,
        tags: { $in: ['general'] },
      }).limit(5);
  }
  
  // If no matching content found, get general content
  if (!content || content.length === 0) {
    query.tags = { $in: ['general'] };
    
    switch (contentType) {
      case 'quote':
        content = await Quote.find(query).limit(5);
        break;
      case 'exercise':
        content = await Exercise.find(query).limit(5);
        break;
      case 'technique':
        content = await Technique.find(query).limit(5);
        break;
    }
  }
  
  // Select a random item from results
  const selectedContent = content[Math.floor(Math.random() * content.length)];
  
  // Format response text based on content type
  if (selectedContent) {
    switch (contentType) {
      case 'quote':
        selectedContent.responseText = `"${selectedContent.text}" ${selectedContent.author ? '- ' + selectedContent.author : ''}`;
        break;
      case 'exercise':
        selectedContent.responseText = `Here's a mindfulness exercise that might help: "${selectedContent.title}"\n\n${selectedContent.description}\n\nWould you like me to guide you through this exercise step by step?`;
        break;
      case 'technique':
        selectedContent.responseText = `I'd like to suggest a technique called "${selectedContent.title}"\n\n${selectedContent.description}\n\nWould you like to learn more about how to practice this?`;
        break;
    }
  } else {
    // Fallback if no content found at all
    contentType = 'general';
    selectedContent = {
      _id: null,
      responseText: 'I hear you. Sometimes it helps to take a deep breath and focus on the present moment. How are you feeling right now?'
    };
  }
  
  return { contentType, content: selectedContent };
};

/**
 * @desc    Get chat history for a user
 * @route   GET /api/chat/history
 * @access  Private
 */
const getChatHistory = async (req, res) => {
  try {
    const userId = req.user._id;
    const { limit = 10, page = 1 } = req.query;
    
    // Get unique session IDs for the user, sorted by most recent
    const chatSessions = await ChatLog.find({ user: userId })
      .sort({ updatedAt: -1 })
      .select('sessionId updatedAt')
      .limit(limit * 1)
      .skip((page - 1) * limit);
    
    // Get count of total sessions
    const count = await ChatLog.countDocuments({ user: userId });
    
    res.status(200).json({
      success: true,
      count,
      totalPages: Math.ceil(count / limit),
      currentPage: page,
      sessions: chatSessions,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/**
 * @desc    Get a specific chat session
 * @route   GET /api/chat/:sessionId
 * @access  Private
 */
const getChatSession = async (req, res) => {
  try {
    const userId = req.user._id;
    const { sessionId } = req.params;
    
    const chatSession = await ChatLog.findOne({
      user: userId,
      sessionId,
    });
    
    if (!chatSession) {
      res.status(404);
      throw new Error('Chat session not found');
    }
    
    res.status(200).json({
      success: true,
      session: chatSession,
    });
  } catch (error) {
    res.status(error.status || 500).json({
      success: false,
      message: error.message,
    });
  }
};

/**
 * @desc    Add feedback to a chat session
 * @route   POST /api/chat/:sessionId/feedback
 * @access  Private
 */
const addChatFeedback = async (req, res) => {
  try {
    const userId = req.user._id;
    const { sessionId } = req.params;
    const { helpful, comments } = req.body;
    
    const chatSession = await ChatLog.findOne({
      user: userId,
      sessionId,
    });
    
    if (!chatSession) {
      res.status(404);
      throw new Error('Chat session not found');
    }
    
    chatSession.feedback = {
      helpful,
      comments: comments || '',
      timestamp: new Date(),
    };
    
    await chatSession.save();
    
    res.status(200).json({
      success: true,
      message: 'Feedback added successfully',
    });
  } catch (error) {
    res.status(error.status || 500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  processMessage,
  getChatHistory,
  getChatSession,
  addChatFeedback,
};