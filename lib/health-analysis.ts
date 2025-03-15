import type { HealthData, HealthInsights } from "./types"

export function generateHealthInsights(healthData: HealthData): HealthInsights {
  // Calculate BMI
  const height = Number.parseFloat(healthData.height) / 100 // convert cm to m
  const weight = Number.parseFloat(healthData.weight)
  const bmi = weight / (height * height)

  let bmiCategory = ""
  let bmiPercentile = 0

  if (bmi < 18.5) {
    bmiCategory = "Underweight"
    bmiPercentile = (bmi / 18.5) * 100
  } else if (bmi >= 18.5 && bmi < 25) {
    bmiCategory = "Healthy Weight"
    bmiPercentile = ((bmi - 18.5) / (25 - 18.5)) * 100 + 25
  } else if (bmi >= 25 && bmi < 30) {
    bmiCategory = "Overweight"
    bmiPercentile = ((bmi - 25) / (30 - 25)) * 100 + 50
  } else {
    bmiCategory = "Obese"
    bmiPercentile = Math.min(((bmi - 30) / 10) * 100 + 75, 100)
  }

  // Sleep analysis
  const sleepHours = healthData.sleepHours
  let sleepQuality = ""
  let sleepScore = 0
  let sleepPercentile = 0

  if (sleepHours < 5) {
    sleepQuality = "Poor"
    sleepScore = 3
    sleepPercentile = (sleepHours / 5) * 30
  } else if (sleepHours >= 5 && sleepHours < 7) {
    sleepQuality = "Fair"
    sleepScore = 6
    sleepPercentile = ((sleepHours - 5) / 2) * 30 + 30
  } else if (sleepHours >= 7 && sleepHours <= 9) {
    sleepQuality = "Good"
    sleepScore = 9
    sleepPercentile = ((sleepHours - 7) / 2) * 30 + 60
  } else {
    sleepQuality = "Excessive"
    sleepScore = 7
    sleepPercentile = 100 - ((sleepHours - 9) / 3) * 30
  }

  // Stress analysis
  const stressLevel = healthData.stressLevel
  let stressCategory = ""
  let stressPercentile = 0

  if (stressLevel <= 3) {
    stressCategory = "Low"
    stressPercentile = (stressLevel / 3) * 30
  } else if (stressLevel > 3 && stressLevel <= 6) {
    stressCategory = "Moderate"
    stressPercentile = ((stressLevel - 3) / 3) * 30 + 30
  } else {
    stressCategory = "High"
    stressPercentile = ((stressLevel - 6) / 4) * 40 + 60
  }

  // Generate recommendations based on health data
  const generalRecommendations = []
  const nutritionRecommendations = []
  const fitnessRecommendations = []
  const mentalHealthRecommendations = []
  const categories = []

  // BMI recommendations
  if (bmi < 18.5) {
    generalRecommendations.push(
      "Your BMI is below the healthy range. Consider consulting with a healthcare provider about healthy weight gain strategies.",
    )
    nutritionRecommendations.push(
      "Focus on nutrient-dense foods with healthy fats and proteins to support healthy weight gain.",
    )
    categories.push("weight-gain")
  } else if (bmi >= 25 && bmi < 30) {
    generalRecommendations.push(
      "Your BMI indicates you may be overweight. Consider adopting a balanced diet and regular exercise routine.",
    )
    nutritionRecommendations.push(
      "Focus on portion control and increasing your intake of vegetables, fruits, and whole grains.",
    )
    categories.push("weight-management")
  } else if (bmi >= 30) {
    generalRecommendations.push(
      "Your BMI indicates obesity, which increases risk for several health conditions. Consider consulting with a healthcare provider.",
    )
    nutritionRecommendations.push(
      "Focus on a balanced diet with calorie control, increased vegetables and fruits, and reduced processed foods.",
    )
    fitnessRecommendations.push(
      "Start with low-impact exercises like walking or swimming and gradually increase intensity as your fitness improves.",
    )
    categories.push("weight-management")
  }

  // Sleep recommendations
  if (sleepHours < 7) {
    generalRecommendations.push(
      `You're getting ${sleepHours} hours of sleep, which is below the recommended 7-9 hours for adults.`,
    )
    mentalHealthRecommendations.push(
      "Establish a regular sleep schedule and create a relaxing bedtime routine to improve sleep quality.",
    )
    categories.push("sleep-improvement")
  } else if (sleepHours > 9) {
    generalRecommendations.push(
      `You're sleeping ${sleepHours} hours, which is more than the recommended amount. Excessive sleep can sometimes indicate other health issues.`,
    )
  }

  // Stress recommendations
  if (stressLevel > 6) {
    generalRecommendations.push(
      `Your stress level is high (${stressLevel}/10). High stress can impact both physical and mental health.`,
    )
    mentalHealthRecommendations.push(
      "Consider incorporating stress-reduction techniques like meditation, deep breathing, or mindfulness practices into your daily routine.",
    )
    categories.push("stress-management")
  }

  // Exercise recommendations
  if (healthData.exerciseFrequency === "never" || healthData.exerciseFrequency === "rarely") {
    generalRecommendations.push("You're not getting enough physical activity, which is important for overall health.")
    fitnessRecommendations.push(
      "Start with short walks or light activities and gradually build up to at least 150 minutes of moderate exercise per week.",
    )
    categories.push("physical-activity")
  }

  // Medical conditions recommendations
  if (healthData.medicalConditions.includes("Diabetes")) {
    generalRecommendations.push(
      "Managing diabetes requires careful attention to diet, exercise, and medication if prescribed.",
    )
    nutritionRecommendations.push(
      "Monitor carbohydrate intake and focus on foods with a low glycemic index to help manage blood sugar levels.",
    )
    categories.push("diabetes-management")
  }

  if (healthData.medicalConditions.includes("Hypertension")) {
    generalRecommendations.push(
      "Managing hypertension (high blood pressure) is important to reduce risk of heart disease and stroke.",
    )
    nutritionRecommendations.push(
      "Reduce sodium intake and follow a heart-healthy diet rich in fruits, vegetables, and whole grains.",
    )
    categories.push("heart-health")
  }

  // Water intake recommendations
  if (healthData.waterIntake === "less-than-1L") {
    generalRecommendations.push("You're not drinking enough water. Proper hydration is essential for overall health.")
    nutritionRecommendations.push(
      "Aim to drink at least 2 liters (8 cups) of water daily, more if you're physically active or in hot weather.",
    )
    categories.push("hydration")
  }

  // Diet recommendations
  if (healthData.diet) {
    nutritionRecommendations.push(
      `Based on your ${healthData.diet} diet, ensure you're getting all essential nutrients. Consider consulting with a nutritionist for personalized advice.`,
    )
  }

  // Smoking recommendations
  if (healthData.smokingStatus === "regular" || healthData.smokingStatus === "occasional") {
    generalRecommendations.push(
      "Smoking significantly increases risk for many serious health conditions. Consider quitting for substantial health benefits.",
    )
    categories.push("smoking-cessation")
  }

  // Alcohol recommendations
  if (healthData.alcoholConsumption === "daily" || healthData.alcoholConsumption === "weekly") {
    generalRecommendations.push(
      "Regular alcohol consumption can impact health. Consider limiting intake to moderate levels or less.",
    )
    nutritionRecommendations.push(
      "Limit alcohol consumption to no more than 1 drink per day for women or 2 drinks per day for men.",
    )
    categories.push("alcohol-moderation")
  }

  // Ensure we have at least some recommendations in each category
  if (nutritionRecommendations.length === 0) {
    nutritionRecommendations.push(
      "Focus on a balanced diet with plenty of fruits, vegetables, whole grains, and lean proteins.",
    )
  }

  if (fitnessRecommendations.length === 0) {
    fitnessRecommendations.push(
      "Aim for at least 150 minutes of moderate-intensity exercise per week, along with muscle-strengthening activities twice weekly.",
    )
  }

  if (mentalHealthRecommendations.length === 0) {
    mentalHealthRecommendations.push(
      "Take time for activities you enjoy and that help you relax. Consider practices like meditation or journaling.",
    )
  }

  return {
    bmi: {
      score: bmi,
      category: bmiCategory,
      percentile: bmiPercentile,
    },
    sleep: {
      hours: sleepHours,
      quality: sleepQuality,
      score: sleepScore,
      percentile: sleepPercentile,
    },
    stress: {
      level: stressLevel,
      category: stressCategory,
      percentile: stressPercentile,
    },
    recommendations: {
      general: generalRecommendations,
      nutrition: nutritionRecommendations,
      fitness: fitnessRecommendations,
      mental: mentalHealthRecommendations,
    },
    categories,
  }
}

