export interface HealthData {
    height: string
    weight: string
    exerciseFrequency: string
    medicalConditions: string[]
    sleepHours: number
    stressLevel: number
    diet: string
    waterIntake: string
    allergies: string[]
    chronicConditions: string[]
    familyHistory: string[]
    smokingStatus: string
    alcoholConsumption: string
  }
  
  export interface HealthInsights {
    bmi: {
      score: number
      category: string
      percentile: number
    }
    sleep: {
      hours: number
      quality: string
      score: number
      percentile: number
    }
    stress: {
      level: number
      category: string
      percentile: number
    }
    recommendations: {
      general: string[]
      nutrition: string[]
      fitness: string[]
      mental: string[]
    }
    categories: string[]
  }
  
  export interface Doctor {
    id: string
    name: string
    specialty: string
    image: string
    rating: number
    reviewCount: number
    availability: string
    location: string
    isAvailableNow: boolean
    bio: string
    experience: number
    license?: string
    contact?: string
  }
  
  export interface Message {
    id: string
    content: string
    role: "user" | "assistant"
    timestamp: Date
  }
  
  export interface Product {
    id: string
    name: string
    category: string
    shortDescription: string
    fullDescription: string
    price: number
    image: string
    rating: number
    reviewCount: number
    ingredients: string[]
    benefits: string[]
  }
  
  