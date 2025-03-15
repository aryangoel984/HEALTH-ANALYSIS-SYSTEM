// This is a mock implementation for demo purposes
// In a real application, this would connect to an AI service using the API key

export async function generatePrescription(messages: any[], specialty: string) {
    // Simulate API call delay
    await new Promise((resolve) => setTimeout(resolve, 2000))
  
    // In a real implementation, we would:
    // 1. Convert the conversation to text
    // 2. Send it to an AI service with the doctor's specialty as context
    // 3. Process the response to generate a structured prescription
  
    // For demo purposes, return a mock prescription based on specialty
    if (specialty.toLowerCase().includes("cardio")) {
      return mockCardiologyPrescription()
    } else if (specialty.toLowerCase().includes("gastro")) {
      return mockGastroenterologyPrescription()
    } else if (specialty.toLowerCase().includes("derma")) {
      return mockDermatologyPrescription()
    } else {
      return mockGeneralPrescription()
    }
  }
  
  function mockCardiologyPrescription() {
    return {
      summary:
        "Based on our consultation, you're experiencing occasional chest discomfort, shortness of breath during moderate activity, and mild ankle swelling. Your family history of heart disease and current lifestyle factors contribute to your cardiovascular risk profile. I'm recommending medication, lifestyle modifications, and follow-up testing to better manage your heart health.",
  
      diagnosis: {
        primary: "Essential Hypertension (I10)",
        secondary: "Hyperlipidemia (E78.5)",
        notes:
          "Patient presents with elevated blood pressure readings over the past 3 months and family history of cardiovascular disease. Lipid profile from previous tests shows elevated LDL cholesterol.",
      },
  
      symptoms: [
        "Occasional chest discomfort, non-radiating",
        "Shortness of breath during moderate physical activity",
        "Mild ankle swelling in the evenings",
        "Fatigue after normal daily activities",
      ],
  
      observations: [
        "Blood pressure measured during consultation: 148/92 mmHg",
        "Heart rate: 78 bpm, regular rhythm",
        "Mild edema noted in both ankles",
        "Heart sounds: Normal S1, S2; no murmurs detected",
      ],
  
      medications: [
        {
          name: "Lisinopril",
          dosage: "10mg",
          frequency: "Once daily",
          duration: "3 months, then review",
        },
        {
          name: "Atorvastatin",
          dosage: "20mg",
          frequency: "Once daily at bedtime",
          duration: "3 months, then review",
        },
        {
          name: "Aspirin (low-dose)",
          dosage: "81mg",
          frequency: "Once daily with food",
          duration: "Ongoing",
        },
      ],
  
      medicationInstructions:
        "Take medications as prescribed. Lisinopril may cause a dry cough; contact me if this becomes bothersome. Take Atorvastatin at bedtime for optimal effect. Take Aspirin with food to minimize stomach irritation.",
  
      followUp: {
        nextAppointment: "3 months from today",
        tests: [
          "Comprehensive metabolic panel",
          "Lipid profile (fasting)",
          "Electrocardiogram (ECG)",
          "Echocardiogram to assess heart function",
        ],
      },
  
      lifestyle: [
        "Adopt the DASH diet (Dietary Approaches to Stop Hypertension) - rich in fruits, vegetables, whole grains, and low-fat dairy",
        "Limit sodium intake to less than 2,300mg per day (about 1 teaspoon of salt)",
        "Engage in moderate aerobic exercise for 30 minutes, 5 days per week (walking, swimming, or cycling)",
        "Maintain a healthy weight; aim to reduce current weight by 5-10% over the next 6 months",
        "Limit alcohol consumption to no more than 1 drink per day",
        "Practice stress reduction techniques such as deep breathing or meditation for 10-15 minutes daily",
      ],
  
      doctor: {
        name: "Dr. Meena Patel",
        specialty: "Cardiology",
        license: "MA54321",
        contact: "cardio@example.com",
      },
    }
  }
  
  function mockGastroenterologyPrescription() {
    return {
      summary:
        "Based on our consultation, you're experiencing recurring abdominal discomfort, bloating after meals, and occasional acid reflux. Your symptoms are consistent with Irritable Bowel Syndrome (IBS) with some features of Gastroesophageal Reflux Disease (GERD). I'm recommending a combination of medications, dietary changes, and lifestyle modifications to help manage your symptoms.",
  
      diagnosis: {
        primary: "Irritable Bowel Syndrome (K58.9)",
        secondary: "Gastroesophageal Reflux Disease (K21.9)",
        notes:
          "Patient presents with chronic abdominal discomfort, altered bowel habits, and postprandial bloating consistent with IBS. Also reports symptoms of acid reflux, particularly after large meals or when lying down.",
      },
  
      symptoms: [
        "Recurring lower abdominal pain and discomfort",
        "Bloating after meals, particularly with certain foods",
        "Alternating constipation and diarrhea",
        "Heartburn and acid reflux, worse when lying down or after large meals",
      ],
  
      observations: [
        "Abdomen: Soft, mild tenderness in lower quadrants without rebound",
        "No hepatosplenomegaly detected",
        "Normal bowel sounds",
        "No signs of dehydration or malnutrition",
      ],
  
      medications: [
        {
          name: "Omeprazole",
          dosage: "20mg",
          frequency: "Once daily, 30 minutes before breakfast",
          duration: "4 weeks, then as needed",
        },
        {
          name: "Dicyclomine",
          dosage: "10mg",
          frequency: "Twice daily before meals",
          duration: "2 weeks, then as needed for IBS flares",
        },
        {
          name: "Psyllium Husk Fiber Supplement",
          dosage: "1 tablespoon",
          frequency: "Once daily mixed with 8oz water",
          duration: "Ongoing",
        },
      ],
  
      medicationInstructions:
        "Take Omeprazole on an empty stomach 30 minutes before breakfast. Dicyclomine may cause dry mouth and blurred vision; avoid driving until you know how it affects you. Always mix the fiber supplement with plenty of water and drink immediately.",
  
      followUp: {
        nextAppointment: "6 weeks from today",
        tests: [
          "Comprehensive metabolic panel",
          "Complete blood count",
          "Stool analysis for occult blood and parasites",
          "Consider upper endoscopy if symptoms persist despite treatment",
        ],
      },
  
      lifestyle: [
        "Follow a low-FODMAP diet for 4-6 weeks, then gradually reintroduce foods to identify triggers",
        "Eat smaller, more frequent meals rather than large meals",
        "Avoid eating within 3 hours of bedtime to reduce reflux symptoms",
        "Elevate the head of your bed 6-8 inches to reduce nighttime reflux",
        "Practice stress reduction techniques such as deep breathing, yoga, or meditation",
        "Maintain a food diary to identify specific trigger foods",
        "Stay well-hydrated with at least 8 glasses of water daily",
      ],
  
      doctor: {
        name: "Dr. Sunita Verma",
        specialty: "Gastroenterology",
        license: "CO86420",
        contact: "gut@example.com",
      },
    }
  }
  
  function mockDermatologyPrescription() {
    return {
      summary:
        "Based on our consultation, you're experiencing persistent facial redness, small bumps, and occasional flare-ups triggered by certain foods, stress, and weather changes. These symptoms are consistent with Rosacea. I'm recommending topical treatments, oral medication, skincare modifications, and lifestyle changes to help manage your condition.",
  
      diagnosis: {
        primary: "Rosacea (L71.9)",
        secondary: "Seborrheic Dermatitis (L21.9)",
        notes:
          "Patient presents with erythematotelangiectatic and papulopustular rosacea affecting the central face, with some features of seborrheic dermatitis in the nasolabial folds.",
      },
  
      symptoms: [
        "Persistent redness across cheeks and nose",
        "Small red bumps and occasional pustules",
        "Facial flushing with triggers (spicy food, alcohol, temperature changes)",
        "Mild burning and stinging sensation",
        "Dryness and flaking around the nasolabial folds",
      ],
  
      observations: [
        "Diffuse erythema across central face with visible telangiectasias",
        "Several inflammatory papules on cheeks and chin",
        "Mild seborrheic dermatitis in nasolabial folds",
        "No ocular involvement noted",
        "No evidence of demodex folliculitis",
      ],
  
      medications: [
        {
          name: "Metronidazole Cream 0.75%",
          dosage: "Pea-sized amount",
          frequency: "Twice daily to affected areas",
          duration: "12 weeks",
        },
        {
          name: "Doxycycline",
          dosage: "40mg",
          frequency: "Once daily with food",
          duration: "8 weeks",
        },
        {
          name: "Ketoconazole Cream 2%",
          dosage: "Thin layer",
          frequency: "Twice weekly to nasolabial folds",
          duration: "4 weeks",
        },
      ],
  
      medicationInstructions:
        "Apply Metronidazole cream to clean, dry skin. Take Doxycycline with a full glass of water and food to prevent stomach upset. Avoid lying down for 30 minutes after taking it. Use Ketoconazole cream sparingly on areas with flaking or scaling.",
  
      followUp: {
        nextAppointment: "8 weeks from today",
        tests: [
          "No specific tests required at this time",
          "Consider skin biopsy if diagnosis becomes uncertain or treatment response is poor",
        ],
      },
  
      lifestyle: [
        "Use gentle, fragrance-free cleansers and moisturizers suitable for sensitive skin",
        "Apply broad-spectrum SPF 30+ sunscreen daily, even on cloudy days",
        "Avoid known triggers: spicy foods, alcohol (especially red wine), extreme temperatures",
        "Consider using a green-tinted primer or foundation to neutralize redness",
        "Avoid hot showers, saunas, and steam rooms which can trigger flares",
        "Practice stress management techniques as stress can exacerbate symptoms",
        "Use a humidifier in dry environments to maintain skin hydration",
      ],
  
      doctor: {
        name: "Dr. Lakshmi Reddy",
        specialty: "Dermatology",
        license: "TX13579",
        contact: "skin@example.com",
      },
    }
  }
  
  function mockGeneralPrescription() {
    return {
      summary:
        "Based on our consultation, you're experiencing fatigue, occasional headaches, and difficulty sleeping. These symptoms appear to be related to stress and possible mild depression. I'm recommending lifestyle modifications, stress management techniques, and follow-up to monitor your progress.",
  
      diagnosis: {
        primary: "Adjustment Disorder with Mixed Anxiety and Depressed Mood (F43.23)",
        secondary: "Insomnia due to stress (G47.01)",
        notes:
          "Patient presents with symptoms of fatigue, mood changes, and sleep disturbances that appear to be related to recent life stressors including work pressure and family responsibilities.",
      },
  
      symptoms: [
        "Persistent fatigue not relieved by rest",
        "Tension headaches, typically in the afternoon",
        "Difficulty falling asleep and staying asleep",
        "Reduced interest in usual activities",
        "Increased irritability and difficulty concentrating",
      ],
  
      observations: [
        "Patient appears tired with mild psychomotor slowing",
        "Affect is somewhat flat but appropriate",
        "No evidence of suicidal ideation or psychosis",
        "Vital signs within normal limits",
        "Physical examination unremarkable",
      ],
  
      medications: [
        {
          name: "Melatonin",
          dosage: "3mg",
          frequency: "Once daily, 1 hour before bedtime",
          duration: "4 weeks, then reassess",
        },
        {
          name: "Magnesium Glycinate",
          dosage: "300mg",
          frequency: "Once daily with dinner",
          duration: "Ongoing",
        },
      ],
  
      medicationInstructions:
        "Melatonin may cause drowsiness; take only before bedtime. Magnesium may cause loose stools in some people; if this occurs, reduce the dose temporarily.",
  
      followUp: {
        nextAppointment: "4 weeks from today",
        tests: [
          "Complete blood count",
          "Comprehensive metabolic panel",
          "Thyroid function tests",
          "Vitamin D level",
          "Consider referral to mental health specialist if symptoms persist or worsen",
        ],
      },
  
      lifestyle: [
        "Establish a regular sleep schedule, going to bed and waking up at the same time each day",
        "Practice sleep hygiene: dark room, comfortable temperature, no screens 1 hour before bed",
        "Engage in moderate physical activity for 30 minutes daily, preferably outdoors",
        "Practice mindfulness meditation or deep breathing for 10-15 minutes daily",
        "Limit caffeine intake, especially after noon",
        "Consider using a journal to track stressors and mood patterns",
        "Maintain social connections and seek support from friends and family",
      ],
  
      doctor: {
        name: "Dr. Anil Sharma",
        specialty: "General Medicine",
        license: "NY12345",
        contact: "doctor@example.com",
      },
    }
  }
  
  