/**
 * Seed data for the mental wellness chatbot SQLite database
 * Run with: node data/seedData.js
 */

const bcrypt = require('bcrypt');
const path = require('path');
const fs = require('fs');
require('dotenv').config();

// Create data directory if it doesn't exist
const dataDir = path.join(__dirname);
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true });
}

// Import models
const { 
  sequelize, 
  User, 
  WellnessContent, 
  Quote, 
  Exercise, 
  Technique, 
  Resource, 
  ContentTag,
  initializeDatabase 
} = require('../models');

// Seed quotes
const quotes = [
  {
    text: "You are not alone in your struggles.",
    author: "Anonymous",
    tags: ["general", "depression", "loneliness"],
  },
  {
    text: "Small steps still move you forward.",
    author: "Anonymous",
    tags: ["motivation", "anxiety", "depression"],
  },
  {
    text: "Your mental health is a priority, not a luxury.",
    author: "Anonymous",
    tags: ["general", "self_care"],
  },
  {
    text: "Be gentle with yourself, you're doing the best you can.",
    author: "Anonymous",
    tags: ["self_esteem", "self_care", "general"],
  },
  {
    text: "You don't have to be positive all the time. It's perfectly okay to feel sad, angry, annoyed, frustrated, scared, or anxious.",
    author: "Lori Deschene",
    tags: ["general", "emotions", "anxiety", "depression"],
  },
];

// Seed exercises - EXPANDED SECTION
const exercises = [
  // Basic Mindfulness Exercises - Beginner Level
  {
    title: "5-4-3-2-1 Grounding Technique",
    description: "A sensory awareness exercise to help ground yourself in the present moment, especially during anxiety or overwhelming thoughts.",
    steps: [
      "Find a comfortable position and take a few deep breaths.",
      "Acknowledge 5 things you can SEE around you.",
      "Acknowledge 4 things you can TOUCH or FEEL.",
      "Acknowledge 3 things you can HEAR.",
      "Acknowledge 2 things you can SMELL.",
      "Acknowledge 1 thing you can TASTE.",
      "Take a final deep breath and notice how you feel."
    ],
    duration: 5,
    difficulty: "beginner",
    tags: ["anxiety", "panic", "stress", "mindfulness", "grounding"],
  },
  {
    title: "Box Breathing",
    description: "A simple breathing exercise to help calm your nervous system and reduce stress. Used by Navy SEALs to stay calm in high-pressure situations.",
    steps: [
      "Sit in a comfortable position with your back straight.",
      "Slowly exhale all the air from your lungs.",
      "Breathe in slowly through your nose for 4 counts.",
      "Hold your breath for 4 counts.",
      "Exhale slowly through your mouth for 4 counts.",
      "Hold your breath for 4 counts.",
      "Repeat for at least 5 cycles or until you feel calmer."
    ],
    duration: 3,
    difficulty: "beginner",
    tags: ["anxiety", "stress", "sleep", "breathing", "beginner"],
  },
  {
    title: "Body Scan Meditation",
    description: "A practice to build awareness of your body and release tension you might not even realize you're holding.",
    steps: [
      "Lie down in a comfortable position or sit in a chair with your feet on the ground.",
      "Close your eyes and focus on your breath for a few moments.",
      "Begin to notice sensations in your toes and feet.",
      "Slowly move your attention upward through your body: legs, hips, abdomen, chest, back, shoulders, arms, hands, neck, and head.",
      "For each area, notice any sensations: heaviness, lightness, temperature, tension, or relaxation.",
      "If you notice areas of tension, breathe into them and imagine the tension releasing as you exhale.",
      "After scanning your entire body, spend a moment being aware of your body as a whole.",
      "Slowly open your eyes when you're ready."
    ],
    duration: 10,
    difficulty: "beginner",
    tags: ["mindfulness", "relaxation", "body", "tension", "beginner"],
  },
  {
    title: "Mindful Breathing",
    description: "A foundational mindfulness practice that helps anchor you to the present moment through your breath.",
    steps: [
      "Sit comfortably with your back straight but not rigid.",
      "Close your eyes or maintain a soft gaze.",
      "Bring your attention to your breath - notice where you feel it most prominently (nose, chest, or abdomen).",
      "Simply observe your natural breathing without trying to change it.",
      "When your mind wanders (and it will), gently bring your attention back to your breath without judgment.",
      "Continue for 5-10 minutes, gradually building up the duration over time."
    ],
    duration: 5,
    difficulty: "beginner",
    tags: ["mindfulness", "breathing", "focus", "beginner", "meditation"],
  },
  
  // Intermediate Exercises
  {
    title: "Loving-Kindness Meditation",
    description: "A meditation practice that helps develop feelings of goodwill, kindness, and warmth towards yourself and others.",
    steps: [
      "Sit comfortably with eyes closed and take a few deep breaths.",
      "Start by directing loving-kindness towards yourself, silently repeating phrases like: 'May I be happy. May I be healthy. May I be safe. May I live with ease.'",
      "Next, visualize someone you care about and direct the same wishes to them.",
      "Expand to visualize a neutral person (someone you neither like nor dislike).",
      "Expand further to someone difficult in your life.",
      "Finally, extend these wishes to all beings everywhere.",
      "Throughout the practice, notice any feelings of warmth, resistance, or anything else that arises."
    ],
    duration: 15,
    difficulty: "intermediate",
    tags: ["compassion", "meditation", "relationships", "intermediate", "emotional_wellbeing"],
  },
  {
    title: "Mindful Walking",
    description: "A moving meditation that brings awareness to the physical experience of walking.",
    steps: [
      "Choose a quiet place where you can walk for about 10-15 steps in a straight line.",
      "Stand still and become aware of your body.",
      "Begin walking at a slower pace than normal, paying attention to the sensations in your feet and legs.",
      "Notice the lifting, moving, and placing of each foot.",
      "When you reach the end of your path, pause, breathe, turn around mindfully, and continue.",
      "If your mind wanders, gently bring your attention back to the physical sensations of walking.",
      "Practice for 10-15 minutes."
    ],
    duration: 10,
    difficulty: "intermediate",
    tags: ["mindfulness", "movement", "outdoors", "intermediate", "walking"],
  },
  {
    title: "RAIN Technique for Difficult Emotions",
    description: "A structured mindfulness approach for working with challenging emotions and experiences.",
    steps: [
      "R - Recognize: Acknowledge what is happening. Name the emotion you're experiencing.",
      "A - Allow: Let the experience be there, without trying to change, fix, or avoid it.",
      "I - Investigate: With curiosity and care, explore the bodily sensations, thoughts, and feelings that come with this emotion.",
      "N - Nurture: Offer yourself compassion. Place a hand on your heart and speak to yourself kindly.",
      "After completing these steps, notice how you feel and how your relationship to the emotion may have shifted."
    ],
    duration: 10,
    difficulty: "intermediate",
    tags: ["emotions", "mindfulness", "self_compassion", "intermediate", "emotional_regulation"],
  },
  
  // Advanced Exercises
  {
    title: "Open Awareness Meditation",
    description: "A more advanced practice that cultivates a spacious awareness of all arising experiences without focusing on any particular object.",
    steps: [
      "Sit in a comfortable meditation posture with your back straight.",
      "Begin with a few minutes of focusing on your breath to stabilize your attention.",
      "Gradually expand your awareness to include sounds in the environment.",
      "Further expand to include bodily sensations.",
      "Finally, open your awareness to include thoughts and emotions as they arise and pass.",
      "Rather than focusing on any particular object, maintain a spacious awareness of the entire field of experience.",
      "When you notice yourself getting caught up in a particular thought or sensation, gently recognize this and return to open awareness.",
      "Continue for 20-30 minutes."
    ],
    duration: 20,
    difficulty: "advanced",
    tags: ["meditation", "awareness", "advanced", "mindfulness", "presence"],
  },
  {
    title: "Self-Inquiry Meditation",
    description: "A profound contemplative practice that investigates the nature of the self through direct questioning.",
    steps: [
      "Sit quietly in a meditative posture with eyes closed.",
      "Begin with the question 'Who am I?' or 'What am I?'",
      "Don't seek a verbal answer, but rather turn attention toward the source of the 'I' thought.",
      "Notice the silence or space from which thoughts emerge.",
      "When thoughts arise, gently ask 'To whom do these thoughts appear?'",
      "Return to the question 'Who am I?' and rest in the silence that follows.",
      "Continue for 20-30 minutes, maintaining an alert yet relaxed attention."
    ],
    duration: 25,
    difficulty: "advanced",
    tags: ["meditation", "self_knowledge", "advanced", "awareness", "philosophy"],
  },
  {
    title: "Tonglen (Giving and Taking) Practice",
    description: "An advanced Tibetan Buddhist practice that transforms suffering through compassion by reversing our usual pattern of avoiding pain and seeking pleasure.",
    steps: [
      "Sit comfortably and spend a few moments settling your mind with mindful breathing.",
      "Visualize someone who is suffering (including yourself if appropriate).",
      "As you inhale, imagine taking in their suffering as a dark cloud.",
      "As you exhale, imagine sending them relief, healing, or whatever they need as light.",
      "Continue this rhythm of breathing in suffering and breathing out relief.",
      "Gradually expand your practice to include more beings, and eventually all beings who suffer.",
      "End with a few moments of resting in open awareness."
    ],
    duration: 20,
    difficulty: "advanced",
    tags: ["compassion", "buddhism", "advanced", "suffering", "transformation"],
  }
];

// Seed techniques
const techniques = [
  {
    title: "Self-Compassion Break",
    description: "A technique to cultivate self-compassion during difficult moments.",
    instructions: "When you notice you're under stress or experiencing difficult emotions, pause and follow these steps: 1) Acknowledge that this is a moment of suffering with the phrase 'This is a moment of suffering' or 'This is hard.' 2) Remind yourself that suffering is a part of being human with a phrase like 'I am not alone in this feeling.' 3) Offer yourself kindness with a phrase like 'May I be kind to myself in this moment' or a physical gesture of comfort like putting your hand on your heart.",
    benefits: [
      "Reduces self-criticism",
      "Increases emotional resilience",
      "Promotes self-acceptance",
      "Reduces stress hormones"
    ],
    contraindications: [],
    tags: ["self_care", "self_esteem", "depression", "anxiety", "general"],
  },
  {
    title: "RAIN Technique for Difficult Emotions",
    description: "A mindfulness approach for working with challenging emotions.",
    instructions: "When confronted with a strong emotion, practice RAIN: R - Recognize what's happening. Simply notice and name the emotion you're feeling. A - Allow the experience to be there, just as it is. I - Investigate with interest and care how the emotion feels in your body. N - Nurture yourself with self-compassion, recognizing that this emotion is just a temporary state, not your identity.",
    benefits: [
      "Increases emotional awareness",
      "Reduces emotional reactivity",
      "Builds capacity to handle difficult feelings",
      "Cultivates self-understanding"
    ],
    contraindications: [],
    tags: ["mindfulness", "emotions", "anxiety", "depression", "general"],
  },
];

// Seed resources
const resources = [
  {
    title: "National Suicide Prevention Lifeline",
    description: "24/7, free and confidential support for people in distress, prevention and crisis resources.",
    url: "https://suicidepreventionlifeline.org",
    resourceType: "hotline",
    isEmergency: true,
    tags: ["crisis", "suicide", "emergency", "depression"],
  },
  {
    title: "Crisis Text Line",
    description: "Text HOME to 741741 to connect with a Crisis Counselor. Free 24/7 support.",
    url: "https://www.crisistextline.org",
    resourceType: "hotline",
    isEmergency: true,
    tags: ["crisis", "emergency", "anxiety", "depression", "general"],
  },
];

// Admin user for content creation
const admin = {
  name: "Admin User",
  email: "admin@example.com",
  password: "password123",
  isAdmin: true,
};

// Import all data
const importData = async () => {
  try {
    // Sync database - CAUTION: force:true will drop all tables
    await sequelize.sync({ force: true });
    console.log('Database synchronized...');

    // Create admin user
    const hashedPassword = await bcrypt.hash(admin.password, 10);
    const createdAdmin = await User.create({
      ...admin,
      password: hashedPassword,
    });
    
    console.log('Admin user created...');

    // Function to create content with its specific type and tags
    const createContentWithTags = async (content, type, specificData) => {
      // Create base content
      const newContent = await WellnessContent.create({
        contentType: type,
        createdBy: createdAdmin.id,
        active: true,
      });
      
      // Create specific type content
      const specificContent = await specificData.model.create({
        ...specificData.data,
        contentId: newContent.id,
      });
      
      // Add tags
      for (const tag of content.tags) {
        await ContentTag.create({
          contentId: newContent.id,
          tag,
        });
      }
      
      return { baseContent: newContent, specificContent };
    };
    
    // Create quotes
    for (const quote of quotes) {
      await createContentWithTags(quote, 'quote', {
        model: Quote,
        data: {
          text: quote.text,
          author: quote.author,
        },
      });
    }
    
    // Create exercises
    for (const exercise of exercises) {
      await createContentWithTags(exercise, 'exercise', {
        model: Exercise,
        data: {
          title: exercise.title,
          description: exercise.description,
          steps: exercise.steps,
          duration: exercise.duration,
          difficulty: exercise.difficulty,
        },
      });
    }
    
    // Create techniques
    for (const technique of techniques) {
      await createContentWithTags(technique, 'technique', {
        model: Technique,
        data: {
          title: technique.title,
          description: technique.description,
          instructions: technique.instructions,
          benefits: technique.benefits,
          contraindications: technique.contraindications || [],
        },
      });
    }
    
    // Create resources
    for (const resource of resources) {
      await createContentWithTags(resource, 'resource', {
        model: Resource,
        data: {
          title: resource.title,
          description: resource.description,
          url: resource.url,
          resourceType: resource.resourceType,
          isEmergency: resource.isEmergency,
        },
      });
    }

    console.log('Data imported successfully!');
    process.exit(0);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    console.error(error.stack);
    process.exit(1);
  }
};

// Delete all data
const destroyData = async () => {
  try {
    await sequelize.sync({ force: true });
    console.log('Data destroyed!');
    process.exit(0);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

// Run script with args
if (process.argv[2] === '-d') {
  destroyData();
} else {
  importData();
}