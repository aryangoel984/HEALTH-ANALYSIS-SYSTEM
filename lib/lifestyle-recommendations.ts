import type { HealthData } from "./types"

export function generateLifestylePlan(
  healthData: HealthData,
  reportAnalysis: any = null,
  consultationPrescription: any = null,
) {
  // In a real implementation, this would use AI to generate personalized recommendations
  // based on all available health data

  // For demo purposes, we'll create a mock lifestyle plan
  const plan = {
    overview:
      "This personalized lifestyle plan is designed based on your health assessment, medical data, and specific health goals. Following these recommendations can help improve your overall health and address specific areas of concern identified in your assessment.",

    scores: {
      current: calculateCurrentHealthScore(healthData),
      target: calculateTargetHealthScore(healthData),
    },

    duration: 12, // weeks

    focusAreas: determineFocusAreas(healthData, reportAnalysis, consultationPrescription),

    nutrition: {
      guidelines: generateNutritionGuidelines(healthData, reportAnalysis, consultationPrescription),
      include: generateFoodsToInclude(healthData, reportAnalysis, consultationPrescription),
      limit: generateFoodsToLimit(healthData, reportAnalysis, consultationPrescription),
      mealPlan: generateSampleMealPlan(healthData),
    },

    exercise: {
      weeklyGoals: generateExerciseGoals(healthData),
      activities: generateRecommendedActivities(healthData),
      weeklySchedule: generateExerciseSchedule(healthData),
    },

    sleep: {
      goals: generateSleepGoals(healthData),
      recommendations: generateSleepRecommendations(healthData),
      bedtimeRoutine: generateBedtimeRoutine(),
    },

    stress: {
      dailyPractices: generateStressPractices(healthData),
      techniques: generateStressTechniques(),
      triggers: identifyStressTriggers(healthData),
    },

    weeklyGoals: generateWeeklyGoals(healthData),

    resources: [
      {
        title: "Healthy Eating Guide",
        url: "#",
      },
      {
        title: "Beginner's Exercise Program",
        url: "#",
      },
      {
        title: "Sleep Improvement Techniques",
        url: "#",
      },
      {
        title: "Stress Management Strategies",
        url: "#",
      },
      {
        title: "Meditation for Beginners",
        url: "#",
      },
    ],
  }

  return plan
}

// Helper functions

function calculateCurrentHealthScore(healthData: HealthData): number {
  // Simple algorithm to calculate a health score out of 100
  let score = 70 // Base score

  // Adjust based on BMI
  const height = Number.parseFloat(healthData.height) / 100 // convert cm to m
  const weight = Number.parseFloat(healthData.weight)
  const bmi = weight / (height * height)

  if (bmi >= 18.5 && bmi < 25) {
    score += 5 // Healthy BMI
  } else if (bmi < 18.5 || (bmi >= 25 && bmi < 30)) {
    score -= 3 // Slightly unhealthy BMI
  } else {
    score -= 8 // Very unhealthy BMI
  }

  // Adjust based on exercise
  if (healthData.exerciseFrequency === "daily") {
    score += 10
  } else if (healthData.exerciseFrequency === "regularly") {
    score += 7
  } else if (healthData.exerciseFrequency === "sometimes") {
    score += 3
  } else if (healthData.exerciseFrequency === "rarely") {
    score -= 3
  } else {
    score -= 7
  }

  // Adjust based on sleep
  if (healthData.sleepHours >= 7 && healthData.sleepHours <= 9) {
    score += 5
  } else if (healthData.sleepHours >= 6 && healthData.sleepHours < 7) {
    score -= 2
  } else {
    score -= 5
  }

  // Adjust based on stress
  if (healthData.stressLevel <= 3) {
    score += 5
  } else if (healthData.stressLevel <= 6) {
    score += 0
  } else {
    score -= 5
  }

  // Adjust based on medical conditions
  score -= healthData.medicalConditions.length * 3

  // Adjust based on smoking
  if (healthData.smokingStatus === "never") {
    score += 5
  } else if (healthData.smokingStatus === "former") {
    score += 2
  } else {
    score -= 10
  }

  // Adjust based on alcohol
  if (healthData.alcoholConsumption === "never") {
    score += 5
  } else if (healthData.alcoholConsumption === "rarely") {
    score += 2
  } else if (healthData.alcoholConsumption === "occasionally") {
    score -= 2
  } else {
    score -= 5
  }

  // Ensure score is within 0-100 range
  return Math.max(0, Math.min(100, Math.round(score)))
}

function calculateTargetHealthScore(healthData: HealthData): number {
  // Calculate a target score that's 10-20 points higher than current (max 100)
  const currentScore = calculateCurrentHealthScore(healthData)
  const improvement = Math.min(20, 100 - currentScore)
  return Math.min(100, currentScore + improvement)
}

function determineFocusAreas(healthData: HealthData, reportAnalysis: any, consultationPrescription: any): string[] {
  const focusAreas = []

  // Determine focus areas based on health data
  const height = Number.parseFloat(healthData.height) / 100
  const weight = Number.parseFloat(healthData.weight)
  const bmi = weight / (height * height)

  if (bmi < 18.5 || bmi >= 25) {
    focusAreas.push("Weight Management")
  }

  if (healthData.exerciseFrequency === "never" || healthData.exerciseFrequency === "rarely") {
    focusAreas.push("Physical Activity")
  }

  if (healthData.sleepHours < 7 || healthData.sleepHours > 9) {
    focusAreas.push("Sleep Quality")
  }

  if (healthData.stressLevel > 6) {
    focusAreas.push("Stress Management")
  }

  if (healthData.waterIntake === "less-than-1L" || healthData.waterIntake === "1-2L") {
    focusAreas.push("Hydration")
  }

  if (healthData.medicalConditions.length > 0) {
    focusAreas.push("Chronic Condition Management")
  }

  if (healthData.smokingStatus === "regular" || healthData.smokingStatus === "occasional") {
    focusAreas.push("Smoking Cessation")
  }

  if (healthData.alcoholConsumption === "daily" || healthData.alcoholConsumption === "weekly") {
    focusAreas.push("Alcohol Moderation")
  }

  // If we have fewer than 3 focus areas, add general health areas
  if (focusAreas.length < 3) {
    if (!focusAreas.includes("Nutrition")) focusAreas.push("Nutrition")
    if (!focusAreas.includes("Preventive Health") && focusAreas.length < 3) focusAreas.push("Preventive Health")
  }

  // Limit to top 5 focus areas
  return focusAreas.slice(0, 5)
}

function generateNutritionGuidelines(
  healthData: HealthData,
  reportAnalysis: any,
  consultationPrescription: any,
): string[] {
  const guidelines = [
    "Aim for a balanced diet with a variety of fruits, vegetables, whole grains, lean proteins, and healthy fats",
    "Eat at least 5 servings of fruits and vegetables daily",
    "Choose whole grains over refined grains when possible",
    "Stay hydrated by drinking water throughout the day",
    "Practice mindful eating by paying attention to hunger and fullness cues",
  ]

  // Add specific guidelines based on health data
  if (healthData.medicalConditions.includes("Diabetes")) {
    guidelines.push("Monitor carbohydrate intake and focus on foods with a low glycemic index")
    guidelines.push("Distribute carbohydrates evenly throughout the day")
  }

  if (healthData.medicalConditions.includes("Hypertension")) {
    guidelines.push("Limit sodium intake to less than 2,300mg per day")
    guidelines.push("Follow the DASH diet approach (Dietary Approaches to Stop Hypertension)")
  }

  return guidelines
}

function generateFoodsToInclude(healthData: HealthData, reportAnalysis: any, consultationPrescription: any): string[] {
  const foods = [
    "Leafy green vegetables",
    "Colorful fruits and berries",
    "Whole grains (brown rice, quinoa, oats)",
    "Lean proteins (chicken, fish, legumes)",
    "Healthy fats (olive oil, avocados, nuts)",
    "Low-fat dairy or dairy alternatives",
    "Herbs and spices (instead of salt)",
    "Green tea",
  ]

  // Add specific foods based on health data
  if (healthData.medicalConditions.includes("Heart Disease")) {
    foods.push("Fatty fish (salmon, mackerel)")
    foods.push("Walnuts and flaxseeds")
  }

  return foods
}

function generateFoodsToLimit(healthData: HealthData, reportAnalysis: any, consultationPrescription: any): string[] {
  const foods = [
    "Processed foods high in sodium",
    "Sugary beverages and desserts",
    "Refined carbohydrates (white bread, pastries)",
    "Fried foods",
    "Processed meats (bacon, sausage)",
    "Excessive alcohol",
    "Foods with trans fats",
    "High-sodium condiments",
  ]

  return foods
}

function generateSampleMealPlan(healthData: HealthData): Record<string, string[]> {
  return {
    Breakfast: [
      "Overnight oats with berries and nuts",
      "Whole grain toast with avocado and eggs",
      "Greek yogurt with fruit and granola",
      "Vegetable omelet with whole grain toast",
    ],
    Lunch: [
      "Quinoa bowl with roasted vegetables and chickpeas",
      "Grilled chicken salad with olive oil dressing",
      "Lentil soup with whole grain bread",
      "Tuna salad sandwich on whole grain bread with side salad",
    ],
    Dinner: [
      "Baked salmon with roasted vegetables and brown rice",
      "Stir-fry with tofu and vegetables over brown rice",
      "Grilled chicken with sweet potato and steamed broccoli",
      "Bean and vegetable chili with side salad",
    ],
    Snacks: [
      "Apple with almond butter",
      "Carrot sticks with hummus",
      "Greek yogurt with berries",
      "Handful of mixed nuts",
      "Whole fruit with a small piece of cheese",
    ],
  }
}

function generateExerciseGoals(healthData: HealthData): { minutes: number; days: number; steps: number } {
  // Base goals
  let minutes = 150
  let days = 5
  let steps = 10000

  // Adjust based on current exercise frequency
  if (healthData.exerciseFrequency === "never") {
    minutes = 90
    days = 3
    steps = 7000
  } else if (healthData.exerciseFrequency === "rarely") {
    minutes = 120
    days = 4
    steps = 8000
  } else if (healthData.exerciseFrequency === "daily") {
    minutes = 210
    days = 6
    steps = 12000
  }

  return { minutes, days, steps }
}

function generateRecommendedActivities(healthData: HealthData): any[] {
  // Base activities
  const activities = [
    {
      name: "Walking",
      description: "Low-impact activity suitable for all fitness levels",
      frequency: "5-7 days per week",
      duration: "30 minutes per session",
    },
    {
      name: "Strength Training",
      description: "Builds muscle and increases metabolism",
      frequency: "2-3 days per week",
      duration: "20-30 minutes per session",
    },
    {
      name: "Flexibility Exercises",
      description: "Improves range of motion and reduces injury risk",
      frequency: "Daily",
      duration: "10-15 minutes per session",
    },
    {
      name: "Balance Training",
      description: "Improves stability and prevents falls",
      frequency: "2-3 days per week",
      duration: "10-15 minutes per session",
    },
  ]

  // Add specific activities based on health data
  if (healthData.medicalConditions.includes("Joint Pain") || healthData.medicalConditions.includes("Arthritis")) {
    activities.push({
      name: "Swimming",
      description: "Low-impact exercise that's gentle on joints",
      frequency: "2-3 days per week",
      duration: "30 minutes per session",
    })
  }

  return activities
}

function generateExerciseSchedule(healthData: HealthData): Record<string, string[]> {
  return {
    Monday: ["30-minute walk", "10-minute stretching"],
    Tuesday: ["20-minute strength training", "10-minute balance exercises"],
    Wednesday: ["30-minute walk", "10-minute stretching"],
    Thursday: ["20-minute strength training", "10-minute flexibility exercises"],
    Friday: ["30-minute walk", "10-minute stretching"],
    Saturday: ["45-minute longer activity (hiking, cycling, swimming)", "15-minute stretching"],
    Sunday: ["Rest day or gentle yoga", "10-minute stretching"],
  }
}

function generateSleepGoals(healthData: HealthData): { duration: number; bedtime: string; wakeTime: string } {
  // Base goals
  let duration = 8
  const bedtime = "10:30 PM"
  const wakeTime = "6:30 AM"

  // Adjust based on current sleep hours
  if (healthData.sleepHours < 7) {
    duration = Math.min(healthData.sleepHours + 1, 8)
  } else if (healthData.sleepHours > 9) {
    duration = 8
  } else {
    duration = healthData.sleepHours
  }

  return { duration, bedtime, wakeTime }
}

function generateSleepRecommendations(healthData: HealthData): string[] {
  return [
    "Maintain a consistent sleep schedule, even on weekends",
    "Create a relaxing bedtime routine to signal your body it's time to sleep",
    "Keep your bedroom dark, quiet, and cool (65-68°F or 18-20°C)",
    "Avoid screens (phones, tablets, computers) for at least 1 hour before bed",
    "Limit caffeine after noon and avoid alcohol close to bedtime",
    "Exercise regularly, but not within 2-3 hours of bedtime",
    "If you can't fall asleep after 20 minutes, get up and do something relaxing until you feel sleepy",
  ]
}

function generateBedtimeRoutine(): any[] {
  return [
    { time: "9:00 PM", activity: "Turn off electronic devices or use blue light filters" },
    { time: "9:15 PM", activity: "Take a warm shower or bath" },
    { time: "9:45 PM", activity: "Practice relaxation techniques (deep breathing, meditation)" },
    { time: "10:00 PM", activity: "Read a physical book (not on a screen)" },
    { time: "10:30 PM", activity: "Lights out" },
  ]
}

function generateStressPractices(healthData: HealthData): string[] {
  const practices = [
    "Practice deep breathing for 5 minutes, 3 times daily",
    "Take short breaks throughout the day to reset and refocus",
    "Spend time in nature when possible",
    "Limit news and social media consumption",
    "Practice gratitude by noting 3 things you're grateful for each day",
    "Maintain social connections with friends and family",
  ]

  if (healthData.stressLevel > 7) {
    practices.push("Consider speaking with a mental health professional for additional support")
  }

  return practices
}

function generateStressTechniques(): any[] {
  return [
    {
      name: "Deep Breathing",
      description: "Breathe in slowly for 4 counts, hold for 2, exhale for 6 counts",
      duration: "5 minutes, 3 times daily",
    },
    {
      name: "Progressive Muscle Relaxation",
      description: "Tense and then release each muscle group in your body",
      duration: "10-15 minutes daily",
    },
    {
      name: "Mindfulness Meditation",
      description: "Focus on the present moment without judgment",
      duration: "10-20 minutes daily",
    },
    {
      name: "Guided Imagery",
      description: "Visualize peaceful scenes or successful outcomes",
      duration: "10 minutes daily",
    },
  ]
}

function identifyStressTriggers(healthData: HealthData): string[] {
  return [
    "Work deadlines and pressure",
    "Financial concerns",
    "Family responsibilities",
    "Lack of sleep or poor sleep quality",
    "Excessive caffeine or alcohol",
    "Digital overload and constant connectivity",
  ]
}

function generateWeeklyGoals(healthData: HealthData): any[] {
  return [
    {
      name: "Physical Activity",
      progress: 35,
    },
    {
      name: "Nutrition",
      progress: 60,
    },
    {
      name: "Sleep Quality",
      progress: 45,
    },
    {
      name: "Stress Management",
      progress: 25,
    },
    {
      name: "Water Intake",
      progress: 70,
    },
  ]
}

// import axios from "axios";
// import type { HealthData } from "./types";

// // Base URL for Groq API
// const groqApiUrl = "https://api.groq.com/openai/v1/chat/completions";
// const groqApiKey = "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";

// // Function to create a detailed prompt from health data
// function createPromptFromHealthData(
//   healthData: HealthData,
//   reportAnalysis: any = null,
//   consultationPrescription: any = null
// ): string {
//   const height = Number.parseFloat(healthData.height) / 100; // Convert cm to m
//   const weight = Number.parseFloat(healthData.weight);
//   const bmi = weight / (height * height);

//   return `
//     Create a personalized lifestyle plan for a person with the following health data:
    
//     Basic Information:
//     - Height: ${healthData.height} cm
//     - Weight: ${healthData.weight} kg
//     - BMI: ${bmi.toFixed(1)}
    
//     Health Habits:
//     - Exercise Frequency: ${healthData.exerciseFrequency}
//     - Sleep Hours: ${healthData.sleepHours} hours per night
//     - Stress Level (1-10): ${healthData.stressLevel}
//     - Water Intake: ${healthData.waterIntake}
//     - Diet Type: ${healthData.diet || "Not specified"}
//     - Medical Conditions: ${healthData.medicalConditions.join(", ") || "None reported"}
    
//     Generate a comprehensive lifestyle plan with the following structure:
//     {
//       "overview": "Brief personalized overview",
//       "scores": {
//         "current": number between 0-100,
//         "target": number between 0-100
//       },
//       "duration": number of weeks recommended,
//       "focusAreas": ["Area 1", "Area 2", ...],
//       "nutrition": {
//         "guidelines": ["Guideline 1", "Guideline 2", ...],
//         "include": ["Food 1", "Food 2", ...],
//         "limit": ["Food 1", "Food 2", ...],
//         "mealPlan": {
//           "Breakfast": ["Option 1", "Option 2", ...],
//           "Lunch": ["Option 1", "Option 2", ...],
//           "Dinner": ["Option 1", "Option 2", ...],
//           "Snacks": ["Option 1", "Option 2", ...]
//         }
//       },
//       "exercise": {
//         "weeklyGoals": {
//           "minutes": number,
//           "days": number,
//           "steps": number
//         },
//         "activities": [
//           {
//             "name": "Activity name",
//             "description": "Description",
//             "frequency": "Frequency",
//             "duration": "Duration"
//           },
//           ...
//         ],
//         "weeklySchedule": {
//           "Monday": ["Activity 1", "Activity 2", ...],
//           "Tuesday": ["Activity 1", "Activity 2", ...],
//           "Wednesday": ["Activity 1", "Activity 2", ...],
//           "Thursday": ["Activity 1", "Activity 2", ...],
//           "Friday": ["Activity 1", "Activity 2", ...],
//           "Saturday": ["Activity 1", "Activity 2", ...],
//           "Sunday": ["Activity 1", "Activity 2", ...]
//         }
//       },
//       "sleep": {
//         "goals": {
//           "duration": number,
//           "bedtime": "time",
//           "wakeTime": "time"
//         },
//         "recommendations": ["Recommendation 1", "Recommendation 2", ...],
//         "bedtimeRoutine": [
//           {
//             "time": "time",
//             "activity": "activity description"
//           },
//           ...
//         ]
//       },
//       "stress": {
//         "dailyPractices": ["Practice 1", "Practice 2", ...],
//         "techniques": [
//           {
//             "name": "Technique name",
//             "description": "Description",
//             "duration": "Duration"
//           },
//           ...
//         ],
//         "triggers": ["Trigger 1", "Trigger 2", ...]
//       },
//       "weeklyGoals": [
//         {
//           "name": "Goal name",
//           "progress": number between 0-100
//         },
//         ...
//       ],
//       "resources": [
//         {
//           "title": "Resource title",
//           "url": "url"
//         },
//         ...
//       ]
//     }
    
//     Make sure the plan is personalized based on their specific health data. For example:
//     - If they have a high stress level, include more stress management techniques
//     - If they rarely exercise, start with gentle activities and gradually increase
//     - If they have medical conditions, provide appropriate recommendations
//     - If they follow a specific diet (vegetarian, vegan, etc.), tailor the nutrition plan accordingly
//     - If they have low water intake, emphasize hydration
//   `;
// }

// // Function to generate a lifestyle plan using Groq API
// export async function generateLifestylePlan(
//   healthData: HealthData,
//   reportAnalysis: any = null,
//   consultationPrescription: any = null
// ) {
//   try {
//     const prompt = createPromptFromHealthData(healthData, reportAnalysis, consultationPrescription);

//     // Make a POST request to Groq API
//     const response = await axios.post(
//       groqApiUrl,
//       {
//         model: "mixtral-8x7b-32768", // Replace with the appropriate model name for Groq
//         prompt: prompt,
//       },
//       {
//         headers: {
//           Authorization: `Bearer ${groqApiKey}`,
//           "Content-Type": "application/json",
//         },
//       }
//     );

//     // Extract and parse the response text
//     const plan = JSON.parse(response.data.text);

//     return plan;
//   } catch (error) {
//     console.error("Error generating lifestyle plan:", error);

//     // Fallback to mock implementation if AI generation fails
//     return createMockLifestylePlan(healthData, reportAnalysis, consultationPrescription);
//   }
// }

// // Mock fallback function in case of API failure
// function createMockLifestylePlan(
//   healthData: HealthData,
//   reportAnalysis: any = null,
//   consultationPrescription: any = null
// ) {
//   const plan = {
//     overview:
//       "This personalized lifestyle plan is designed based on your health assessment, medical data, and specific health goals. Following these recommendations can help improve your overall health and address specific areas of concern identified in your assessment.",
//     scores: {
//       current: calculateCurrentHealthScore(healthData),
//       target: calculateTargetHealthScore(healthData),
//     },
//     duration: 12, // weeks
//     focusAreas: determineFocusAreas(healthData, reportAnalysis, consultationPrescription),
//     nutrition: {
//       guidelines: generateNutritionGuidelines(healthData, reportAnalysis, consultationPrescription),
//       include: generateFoodsToInclude(healthData, reportAnalysis, consultationPrescription),
//       limit: generateFoodsToLimit(healthData, reportAnalysis, consultationPrescription),
//       mealPlan: generateSampleMealPlan(healthData),
//     },
//     exercise: {
//       weeklyGoals: generateExerciseGoals(healthData),
//       activities: generateRecommendedActivities(healthData),
//       weeklySchedule: generateExerciseSchedule(healthData),
//     },
//     sleep: {
//       goals: generateSleepGoals(healthData),
//       recommendations: generateSleepRecommendations(healthData),
//       bedtimeRoutine: generateBedtimeRoutine(),
//     },
//     stress: {
//       dailyPractices: generateStressPractices(healthData),
//       techniques: generateStressTechniques(),
//       triggers: identifyStressTriggers(healthData),
//     },
//     weeklyGoals: generateWeeklyGoals(healthData),
//     resources: [
//       {
//         title: "Healthy Eating Guide",
//         url: "#",
//       },
//       {
//         title: "Beginner's Exercise Program",
//         url: "#",
//       },
//       {
//         title: "Sleep Improvement Techniques",
//         url: "#",
//       },
//       {
//         title: "Stress Management Strategies",
//         url: "#",
//       },
//       {
//         title: "Meditation for Beginners",
//         url: "#",
//       },
//     ],
//   };

//   return plan;
// }

// // Helper functions for mock plan generation
// function calculateCurrentHealthScore(healthData: HealthData): number {
//   let score = 70; // Base score

//   const height = Number.parseFloat(healthData.height) / 100; // Convert cm to m
//   const weight = Number.parseFloat(healthData.weight);
//   const bmi = weight / (height * height);

//   if (bmi >= 18.5 && bmi < 25) {
//     score += 5; // Healthy BMI
//   } else if (bmi < 18.5 || (bmi >= 25 && bmi < 30)) {
//     score -= 3; // Slightly unhealthy BMI
//   } else {
//     score -= 8; // Very unhealthy BMI
//   }

//   if (healthData.exerciseFrequency === "daily") {
//     score += 10;
//   } else if (healthData.exerciseFrequency === "regularly") {
//     score += 7;
//   } else if (healthData.exerciseFrequency === "sometimes") {
//     score += 3;
//   } else if (healthData.exerciseFrequency === "rarely") {
//     score -= 3;
//   } else {
//     score -= 7;
//   }

//   if (healthData.sleepHours >= 7 && healthData.sleepHours <= 9) {
//     score += 5;
//   } else if (healthData.sleepHours >= 6 && healthData.sleepHours < 7) {
//     score -= 2;
//   } else {
//     score -= 5;
//   }

//   if (healthData.stressLevel <= 3) {
//     score += 5;
//   } else if (healthData.stressLevel <= 6) {
//     score += 0;
//   } else {
//     score -= 5;
//   }

//   score -= healthData.medicalConditions.length * 3;

//   return Math.max(0, Math.min(100, Math.round(score)));
// }

// function calculateTargetHealthScore(healthData: HealthData): number {
//   const currentScore = calculateCurrentHealthScore(healthData);
//   const improvement = Math.min(20, 100 - currentScore);
//   return Math.min(100, currentScore + improvement);
// }

// function determineFocusAreas(
//   healthData: HealthData,
//   reportAnalysis: any,
//   consultationPrescription: any
// ): string[] {
//   const focusAreas = [];

//   const height = Number.parseFloat(healthData.height) / 100;
//   const weight = Number.parseFloat(healthData.weight);
//   const bmi = weight / (height * height);

//   if (bmi < 18.5 || bmi >= 25) {
//     focusAreas.push("Weight Management");
//   }

//   if (healthData.exerciseFrequency === "never" || healthData.exerciseFrequency === "rarely") {
//     focusAreas.push("Physical Activity");
//   }

//   if (healthData.sleepHours < 7 || healthData.sleepHours > 9) {
//     focusAreas.push("Sleep Quality");
//   }

//   if (healthData.stressLevel > 6) {
//     focusAreas.push("Stress Management");
//   }

//   if (healthData.waterIntake === "less-than-1L" || healthData.waterIntake === "1-2L") {
//     focusAreas.push("Hydration");
//   }

//   if (healthData.medicalConditions.length > 0) {
//     focusAreas.push("Chronic Condition Management");
//   }

//   if (focusAreas.length < 3) {
//     if (!focusAreas.includes("Nutrition")) focusAreas.push("Nutrition");
//     if (!focusAreas.includes("Preventive Health") && focusAreas.length < 3) focusAreas.push("Preventive Health");
//   }

//   return focusAreas.slice(0, 5);
// }

// function generateNutritionGuidelines(
//   healthData: HealthData,
//   reportAnalysis: any,
//   consultationPrescription: any
// ): string[] {
//   const guidelines = [
//     "Aim for a balanced diet with a variety of fruits, vegetables, whole grains, lean proteins, and healthy fats",
//     "Eat at least 5 servings of fruits and vegetables daily",
//     "Choose whole grains over refined grains when possible",
//     "Stay hydrated by drinking water throughout the day",
//     "Practice mindful eating by paying attention to hunger and fullness cues",
//   ];

//   if (healthData.medicalConditions.includes("Diabetes")) {
//     guidelines.push("Monitor carbohydrate intake and focus on foods with a low glycemic index");
//     guidelines.push("Distribute carbohydrates evenly throughout the day");
//   }

//   if (healthData.medicalConditions.includes("Hypertension")) {
//     guidelines.push("Limit sodium intake to less than 2,300mg per day");
//     guidelines.push("Follow the DASH diet approach (Dietary Approaches to Stop Hypertension)");
//   }

//   return guidelines;
// }

// function generateFoodsToInclude(
//   healthData: HealthData,
//   reportAnalysis: any,
//   consultationPrescription: any
// ): string[] {
//   const foods = [
//     "Leafy green vegetables",
//     "Colorful fruits and berries",
//     "Whole grains (brown rice, quinoa, oats)",
//     "Lean proteins (chicken, fish, legumes)",
//     "Healthy fats (olive oil, avocados, nuts)",
//     "Low-fat dairy or dairy alternatives",
//     "Herbs and spices (instead of salt)",
//     "Green tea",
//   ];

//   if (healthData.medicalConditions.includes("Heart Disease")) {
//     foods.push("Fatty fish (salmon, mackerel)");
//     foods.push("Walnuts and flaxseeds");
//   }

//   return foods;
// }

// function generateFoodsToLimit(
//   healthData: HealthData,
//   reportAnalysis: any,
//   consultationPrescription: any
// ): string[] {
//   const foods = [
//     "Processed foods high in sodium",
//     "Sugary beverages and desserts",
//     "Refined carbohydrates (white bread, pastries)",
//     "Fried foods",
//     "Processed meats (bacon, sausage)",
//     "Excessive alcohol",
//     "Foods with trans fats",
//     "High-sodium condiments",
//   ];

//   return foods;
// }

// function generateSampleMealPlan(healthData: HealthData): Record<string, string[]> {
//   return {
//     Breakfast: [
//       "Overnight oats with berries and nuts",
//       "Whole grain toast with avocado and eggs",
//       "Greek yogurt with fruit and granola",
//       "Vegetable omelet with whole grain toast",
//     ],
//     Lunch: [
//       "Quinoa bowl with roasted vegetables and chickpeas",
//       "Grilled chicken salad with olive oil dressing",
//       "Lentil soup with whole grain bread",
//       "Tuna salad sandwich on whole grain bread with side salad",
//     ],
//     Dinner: [
//       "Baked salmon with roasted vegetables and brown rice",
//       "Stir-fry with tofu and vegetables over brown rice",
//       "Grilled chicken with sweet potato and steamed broccoli",
//       "Bean and vegetable chili with side salad",
//     ],
//     Snacks: [
//       "Apple with almond butter",
//       "Carrot sticks with hummus",
//       "Greek yogurt with berries",
//       "Handful of mixed nuts",
//       "Whole fruit with a small piece of cheese",
//     ],
//   };
// }

// function generateExerciseGoals(healthData: HealthData): { minutes: number; days: number; steps: number } {
//   let minutes = 150;
//   let days = 5;
//   let steps = 10000;

//   if (healthData.exerciseFrequency === "never") {
//     minutes = 90;
//     days = 3;
//     steps = 7000;
//   } else if (healthData.exerciseFrequency === "rarely") {
//     minutes = 120;
//     days = 4;
//     steps = 8000;
//   } else if (healthData.exerciseFrequency === "daily") {
//     minutes = 210;
//     days = 6;
//     steps = 12000;
//   }

//   return { minutes, days, steps };
// }

// function generateRecommendedActivities(healthData: HealthData): any[] {
//   const activities = [
//     {
//       name: "Walking",
//       description: "Low-impact activity suitable for all fitness levels",
//       frequency: "5-7 days per week",
//       duration: "30 minutes per session",
//     },
//     {
//       name: "Strength Training",
//       description: "Builds muscle and increases metabolism",
//       frequency: "2-3 days per week",
//       duration: "20-30 minutes per session",
//     },
//     {
//       name: "Flexibility Exercises",
//       description: "Improves range of motion and reduces injury risk",
//       frequency: "Daily",
//       duration: "10-15 minutes per session",
//     },
//     {
//       name: "Balance Training",
//       description: "Improves stability and prevents falls",
//       frequency: "2-3 days per week",
//       duration: "10-15 minutes per session",
//     },
//   ];

//   if (healthData.medicalConditions.includes("Joint Pain") || healthData.medicalConditions.includes("Arthritis")) {
//     activities.push({
//       name: "Swimming",
//       description: "Low-impact exercise for joint health",
//       frequency: "3-4 days per week",
//       duration: "20-30 minutes per session",
//     });
//   }

//   return activities;
// }

// function generateExerciseSchedule(healthData: HealthData): Record<string, string[]> {
//   return {
//     Monday: ["Walking", "Flexibility Exercises"],
//     Tuesday: ["Strength Training"],
//     Wednesday: ["Walking", "Balance Training"],
//     Thursday: ["Strength Training"],
//     Friday: ["Walking", "Flexibility Exercises"],
//     Saturday: ["Outdoor Activities (e.g., hiking, cycling)"],
//     Sunday: ["Rest or Light Stretching"],
//   };
// }

// function generateSleepGoals(healthData: HealthData): { duration: number; bedtime: string; wakeTime: string } {
//   return {
//     duration: 8,
//     bedtime: "10:00 PM",
//     wakeTime: "6:30 AM",
//   };
// }

// function generateSleepRecommendations(healthData: HealthData): string[] {
//   return [
//     "Maintain a consistent sleep schedule",
//     "Create a relaxing bedtime routine (e.g., reading, meditation)",
//     "Avoid screens before bedtime",
//     "Ensure the bedroom is dark, quiet, and cool",
//   ];
// }

// function generateBedtimeRoutine(): any[] {
//   return [
//     { time: "9:00 PM", activity: "Turn off electronic devices or use blue light filters" },
//     { time: "9:15 PM", activity: "Take a warm shower or bath" },
//     { time: "9:45 PM", activity: "Practice relaxation techniques (deep breathing, meditation)" },
//     { time: "10:00 PM", activity: "Read a physical book (not on a screen)" },
//     { time: "10:30 PM", activity: "Lights out" },
//   ]
// }

// function generateStressPractices(healthData: HealthData): string[] {
//   const practices = [
//     "Practice deep breathing for 5 minutes, 3 times daily",
//     "Take short breaks throughout the day to reset and refocus",
//     "Spend time in nature when possible",
//     "Limit news and social media consumption",
//     "Practice gratitude by noting 3 things you're grateful for each day",
//     "Maintain social connections with friends and family",
//   ]

//   if (healthData.stressLevel > 7) {
//     practices.push("Consider speaking with a mental health professional for additional support")
//   }

//   return practices
// }

// function generateStressTechniques(): any[] {
//   return [
//     {
//       name: "Deep Breathing",
//       description: "Breathe in slowly for 4 counts, hold for 2, exhale for 6 counts",
//       duration: "5 minutes, 3 times daily",
//     },
//     {
//       name: "Progressive Muscle Relaxation",
//       description: "Tense and then release each muscle group in your body",
//       duration: "10-15 minutes daily",
//     },
//     {
//       name: "Mindfulness Meditation",
//       description: "Focus on the present moment without judgment",
//       duration: "10-20 minutes daily",
//     },
//     {
//       name: "Guided Imagery",
//       description: "Visualize peaceful scenes or successful outcomes",
//       duration: "10 minutes daily",
//     },
//   ]
// }

// function identifyStressTriggers(healthData: HealthData): string[] {
//   return [
//     "Work deadlines and pressure",
//     "Financial concerns",
//     "Family responsibilities",
//     "Lack of sleep or poor sleep quality",
//     "Excessive caffeine or alcohol",
//     "Digital overload and constant connectivity",
//   ]
// }

// function generateWeeklyGoals(healthData: HealthData): any[] {
//   return [
//     {
//       name: "Physical Activity",
//       progress: 35,
//     },
//     {
//       name: "Nutrition",
//       progress: 60,
//     },
//     {
//       name: "Sleep Quality",
//       progress: 45,
//     },
//     {
//       name: "Stress Management",
//       progress: 25,
//     },
//     {
//       name: "Water Intake",
//       progress: 70,
//     },
//   ]
// }

