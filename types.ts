export interface HealthData {
    height: string
    weight: string
    exerciseFrequency: string
    medicalConditions: string[]
    sleepHours: number
    stressLevel: number
    diet: string
    waterIntake: string
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
  
  export interface Doctor {
    id: string
    name: string
    specialty: string
    image: string
    rating: number
    reviewCount: number
    availability: string
    location: string
    inClinic: boolean
    clinicAddress?: string
    clinicHours?: string
    bio: string
    experience: number
  }
  
  export interface Message {
    id: string
    content: string
    role: "user" | "assistant"
    timestamp: Date
  }
  
  