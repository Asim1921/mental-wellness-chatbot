/**
 * Natural Language Processing utilities for analyzing chat messages
 */

// Emotion keywords mapping
const emotionKeywords = {
    anxiety: [
      'anxious', 'nervous', 'worry', 'panic', 'fear', 'stressed out', 'anxiety',
      'tense', 'uneasy', 'apprehensive', 'dread', 'scared', 'frightened'
    ],
    sadness: [
      'sad', 'down', 'unhappy', 'depressed', 'lonely', 'hopeless', 'blue',
      'grief', 'sorrow', 'miserable', 'heartbroken', 'gloomy', 'disappointed'
    ],
    anger: [
      'angry', 'mad', 'frustrated', 'irritated', 'annoyed', 'furious', 'rage',
      'outraged', 'bitter', 'resentful', 'hostile', 'enraged', 'upset'
    ],
    stress: [
      'stress', 'overwhelmed', 'pressure', 'burnout', 'exhausted', 'tired',
      'overloaded', 'burdened', 'drained', 'strained', 'busy', 'hectic'
    ],
    motivation: [
      'unmotivated', 'stuck', 'procrastinating', 'lazy', 'can\'t focus', 'discipline',
      'inspiration', 'discouraged', 'uninspired', 'bored', 'apathetic', 'indifferent'
    ],
    sleep: [
      'insomnia', 'can\'t sleep', 'tired', 'sleepless', 'fatigue', 'exhausted',
      'restless', 'nightmares', 'sleep problems', 'waking up', 'drowsy'
    ],
    confidence: [
      'inadequate', 'failure', 'worthless', 'incompetent', 'useless', 'not good enough',
      'self-doubt', 'insecure', 'impostor', 'unworthy', 'inferior', 'undeserving'
    ],
    happiness: [
      'happy', 'joy', 'excited', 'pleased', 'grateful', 'content', 'satisfied',
      'delighted', 'optimistic', 'cheerful', 'thrilled', 'elated', 'blissful'
    ],
    calm: [
      'calm', 'peaceful', 'relaxed', 'tranquil', 'serene', 'at ease', 'composed',
      'chill', 'mellow', 'quiet', 'comfortable', 'centered', 'balanced'
    ]
  };
  
  // Topic keywords mapping
  const topicKeywords = {
    anxiety: [
      'anxiety', 'panic attack', 'worry', 'nervous', 'overthinking', 'fear'
    ],
    depression: [
      'depression', 'sad', 'hopeless', 'suicidal', 'depressed', 'emptiness', 'numb'
    ],
    stress: [
      'stress', 'workload', 'pressure', 'deadline', 'overwhelmed', 'busy'
    ],
    mindfulness: [
      'mindfulness', 'present', 'awareness', 'meditation', 'attention', 'consciousness'
    ],
    gratitude: [
      'gratitude', 'thankful', 'appreciation', 'grateful', 'blessing', 'appreciate'
    ],
    self_care: [
      'self-care', 'self care', 'take care of myself', 'pamper', 'deserve', 'boundaries'
    ],
    motivation: [
      'motivation', 'goals', 'inspired', 'purpose', 'drive', 'ambition', 'passion'
    ],
    relationships: [
      'relationship', 'partner', 'marriage', 'friend', 'colleague', 'family', 'conflict', 'breakup'
    ],
    work_life_balance: [
      'work-life', 'work/life', 'burnout', 'overwork', 'career', 'job', 'quit', 'work too much'
    ],
    sleep: [
      'sleep', 'insomnia', 'tired', 'rest', 'bed', 'wake up', 'sleepless'
    ],
    loneliness: [
      'lonely', 'alone', 'isolated', 'disconnected', 'no friends', 'by myself', 'companionship'
    ],
    self_esteem: [
      'self-esteem', 'confidence', 'self-worth', 'value', 'inadequate', 'not good enough', 'imposter'
    ],
    focus: [
      'focus', 'concentration', 'distracted', 'attention', 'procrastination', 'adhd', 'productive'
    ]
  };
  
  // Crisis keywords
  const crisisKeywords = [
    'suicide', 'kill myself', 'end my life', 'die', 'don\'t want to live', 
    'hurt myself', 'self-harm', 'cutting', 'no reason to live', 'better off dead',
    'want to die', 'harming myself', 'ending it all'
  ];
  
  /**
   * Analyze a message for emotions, topics, and other insights
   * @param {string} message - The message to analyze
   * @returns {Object} Analysis results
   */
  const analyzeMessage = async (message) => {
    const lowerMessage = message.toLowerCase();
    const emotions = [];
    const topics = [];
    
    // Detect emotions
    for (const [emotion, keywords] of Object.entries(emotionKeywords)) {
      for (const keyword of keywords) {
        if (lowerMessage.includes(keyword)) {
          emotions.push(emotion);
          break; // Once we've found one keyword for this emotion, move to next emotion
        }
      }
    }
    
    // Detect topics
    for (const [topic, keywords] of Object.entries(topicKeywords)) {
      for (const keyword of keywords) {
        if (lowerMessage.includes(keyword)) {
          topics.push(topic);
          break; // Once we've found one keyword for this topic, move to next topic
        }
      }
    }
    
    // Determine primary emotion (first detected or undefined)
    const primaryEmotion = emotions.length > 0 ? emotions[0] : 'undefined';
    
    // Ensure 'general' is always a fallback topic
    if (topics.length === 0) {
      topics.push('general');
    }
    
    // In a real implementation, this would likely use a third-party NLP API
    // such as Google Cloud Natural Language API, IBM Watson, or a dedicated
    // sentiment analysis service like VADER
    
    return {
      emotions: [...new Set(emotions)], // Remove duplicates
      topics: [...new Set(topics)], // Remove duplicates
      primaryEmotion,
      messageLength: message.length,
      wordCount: message.split(/\s+/).length,
    };
  };
  
  /**
   * Detect potential crisis language in a message
   * @param {string} message - The message to check
   * @returns {boolean} Whether crisis language was detected
   */
  const detectCrisis = (message) => {
    const lowerMessage = message.toLowerCase();
    
    return crisisKeywords.some(keyword => lowerMessage.includes(keyword));
  };
  
  module.exports = {
    analyzeMessage,
    detectCrisis,
  };