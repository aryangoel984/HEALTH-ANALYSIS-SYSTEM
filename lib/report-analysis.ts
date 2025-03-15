// This is a mock implementation for demo purposes
// In a real application, this would connect to an AI service using the API key
// The API key would be stored as an environment variable

// export async function analyzeReport(reportName: string) {
//     // Simulate API call delay
//     await new Promise((resolve) => setTimeout(resolve, 2000))
  
//     // Mock response based on report name
//     if (reportName.toLowerCase().includes("blood") || reportName.toLowerCase().includes("cbc")) {
//       return mockBloodTestAnalysis()
//     } else if (reportName.toLowerCase().includes("lipid") || reportName.toLowerCase().includes("cholesterol")) {
//       return mockLipidProfileAnalysis()
//     } else if (reportName.toLowerCase().includes("thyroid")) {
//       return mockThyroidTestAnalysis()
//     } else {
//       return mockGeneralReportAnalysis()
//     }
//   }
  
//   function mockBloodTestAnalysis() {
//     return {
//       summary:
//         "Your Complete Blood Count (CBC) results show several values outside the normal range. Your hemoglobin is slightly below normal, suggesting mild anemia. White blood cell count is elevated, which may indicate an infection or inflammation. Platelet count is within normal range.",
  
//       keyFindings: [
//         "Hemoglobin level is below normal range, indicating possible iron deficiency anemia",
//         "Elevated white blood cell count suggests your body may be fighting an infection",
//         "Red blood cell morphology shows slight microcytosis (smaller than normal red cells)",
//         "Other parameters are within normal limits",
//       ],
  
//       abnormalParameters: [
//         {
//           name: "Hemoglobin",
//           value: "11.2 g/dL",
//           range: "12.0-16.0 g/dL",
//           status: "Low",
//         },
//         {
//           name: "White Blood Cells",
//           value: "12.3 x10^9/L",
//           range: "4.0-11.0 x10^9/L",
//           status: "High",
//         },
//         {
//           name: "Mean Corpuscular Volume",
//           value: "78 fL",
//           range: "80-100 fL",
//           status: "Low",
//         },
//       ],
  
//       normalParameters: [
//         {
//           name: "Red Blood Cells",
//           value: "4.6 x10^12/L",
//           range: "4.0-5.5 x10^12/L",
//         },
//         {
//           name: "Platelets",
//           value: "250 x10^9/L",
//           range: "150-450 x10^9/L",
//         },
//         {
//           name: "Hematocrit",
//           value: "38%",
//           range: "36-46%",
//         },
//       ],
  
//       recommendations: [
//         "Consider dietary changes to increase iron intake (lean red meat, beans, spinach)",
//         "Follow up with your healthcare provider to identify the cause of your elevated white blood cell count",
//         "A ferritin test may be helpful to confirm iron deficiency",
//         "Repeat CBC in 4-6 weeks to monitor progress",
//         "Stay well-hydrated and maintain a balanced diet",
//       ],
  
//       potentialRisks: [
//         {
//           condition: "Iron Deficiency Anemia",
//           description:
//             "Your results suggest mild anemia, which can cause fatigue, weakness, and reduced exercise capacity if left untreated.",
//         },
//       ],
  
//       lifestyleModifications: [
//         "Include iron-rich foods in your diet (lean red meat, beans, lentils, fortified cereals)",
//         "Consume vitamin C with iron-rich foods to enhance absorption",
//         "Avoid tea, coffee, or calcium supplements with meals as they can inhibit iron absorption",
//         "Ensure adequate rest while your body recovers",
//         "Stay hydrated with at least 8 glasses of water daily",
//       ],
//     }
//   }
  
//   function mockLipidProfileAnalysis() {
//     return {
//       summary:
//         "Your lipid profile shows elevated total cholesterol and LDL (bad) cholesterol levels. HDL (good) cholesterol is within normal range, but on the lower end. Triglycerides are moderately elevated. This pattern indicates an increased risk for cardiovascular disease that should be addressed through lifestyle modifications and possibly medication.",
  
//       keyFindings: [
//         "Total cholesterol is significantly above the desirable range",
//         "LDL cholesterol (bad cholesterol) is elevated, increasing risk for plaque buildup in arteries",
//         "HDL cholesterol (good cholesterol) is at the lower end of normal range",
//         "Triglycerides are moderately elevated, suggesting potential metabolic issues",
//       ],
  
//       abnormalParameters: [
//         {
//           name: "Total Cholesterol",
//           value: "245 mg/dL",
//           range: "<200 mg/dL",
//           status: "High",
//         },
//         {
//           name: "LDL Cholesterol",
//           value: "162 mg/dL",
//           range: "<100 mg/dL",
//           status: "High",
//         },
//         {
//           name: "Triglycerides",
//           value: "180 mg/dL",
//           range: "<150 mg/dL",
//           status: "High",
//         },
//       ],
  
//       normalParameters: [
//         {
//           name: "HDL Cholesterol",
//           value: "42 mg/dL",
//           range: ">40 mg/dL",
//         },
//         {
//           name: "Total Cholesterol/HDL Ratio",
//           value: "5.8",
//           range: "<5.0",
//         },
//       ],
  
//       recommendations: [
//         "Adopt a heart-healthy diet low in saturated fats and trans fats",
//         "Increase physical activity to at least 150 minutes of moderate exercise per week",
//         "Consider consultation with a healthcare provider about cholesterol-lowering medications",
//         "Monitor blood pressure regularly",
//         "Repeat lipid profile in 3 months to assess improvement",
//       ],
  
//       potentialRisks: [
//         {
//           condition: "Cardiovascular Disease",
//           description:
//             "Elevated LDL cholesterol increases risk for atherosclerosis (hardening of arteries) and cardiovascular events like heart attack and stroke.",
//         },
//         {
//           condition: "Metabolic Syndrome",
//           description:
//             "The combination of elevated triglycerides and lower HDL suggests possible metabolic syndrome, which increases risk for diabetes and heart disease.",
//         },
//       ],
  
//       lifestyleModifications: [
//         "Reduce intake of saturated fats (fatty meats, full-fat dairy) and eliminate trans fats",
//         "Increase consumption of omega-3 fatty acids (fatty fish, walnuts, flaxseeds)",
//         "Add soluble fiber to your diet (oats, beans, fruits)",
//         "Limit alcohol consumption",
//         "Maintain a healthy weight through diet and regular exercise",
//         "Quit smoking if applicable",
//       ],
//     }
//   }
  
//   function mockThyroidTestAnalysis() {
//     return {
//       summary:
//         "Your thyroid function test results indicate subclinical hypothyroidism. Your TSH (Thyroid Stimulating Hormone) is elevated, while T4 (Thyroxine) is within normal range but on the lower end. This pattern suggests your thyroid is starting to underperform, but hasn't yet resulted in overt hypothyroidism.",
  
//       keyFindings: [
//         "Elevated TSH level indicates the pituitary gland is working harder to stimulate your thyroid",
//         "Free T4 is within normal range but on the lower end",
//         "This pattern is consistent with subclinical hypothyroidism",
//         "Anti-thyroid antibodies are present, suggesting autoimmune thyroiditis (Hashimoto's disease)",
//       ],
  
//       abnormalParameters: [
//         {
//           name: "TSH",
//           value: "6.8 mIU/L",
//           range: "0.4-4.0 mIU/L",
//           status: "High",
//         },
//         {
//           name: "Anti-TPO Antibodies",
//           value: "120 IU/mL",
//           range: "<35 IU/mL",
//           status: "High",
//         },
//       ],
  
//       normalParameters: [
//         {
//           name: "Free T4",
//           value: "0.9 ng/dL",
//           range: "0.8-1.8 ng/dL",
//         },
//         {
//           name: "Free T3",
//           value: "3.1 pg/mL",
//           range: "2.3-4.2 pg/mL",
//         },
//       ],
  
//       recommendations: [
//         "Follow up with an endocrinologist to discuss these results",
//         "Consider thyroid hormone replacement therapy if symptoms are present",
//         "Monitor thyroid function every 6 months",
//         "Check vitamin D and B12 levels, as deficiencies are common with thyroid disorders",
//         "Evaluate for other autoimmune conditions if symptoms warrant",
//       ],
  
//       potentialRisks: [
//         {
//           condition: "Overt Hypothyroidism",
//           description:
//             "Subclinical hypothyroidism can progress to overt hypothyroidism, especially with positive antibodies.",
//         },
//         {
//           condition: "Cardiovascular Risk",
//           description: "Untreated hypothyroidism may increase cholesterol levels and risk for heart disease.",
//         },
//       ],
  
//       lifestyleModifications: [
//         "Ensure adequate iodine intake through diet (iodized salt, seafood)",
//         "Consider selenium-rich foods (Brazil nuts, seafood) which support thyroid function",
//         "Maintain regular exercise to help with metabolism and energy levels",
//         "Practice stress management techniques, as stress can impact thyroid function",
//         "Get adequate sleep to support overall hormonal balance",
//       ],
//     }
//   }
  
//   function mockGeneralReportAnalysis() {
//     return {
//       summary:
//         "Your general health report shows most values within normal ranges, with a few minor deviations. Overall, your results indicate good general health with some areas for improvement.",
  
//       keyFindings: [
//         "Most parameters are within normal ranges",
//         "Vitamin D level is slightly below optimal range",
//         "Fasting glucose is at the higher end of normal range",
//         "Kidney and liver function tests are normal",
//       ],
  
//       abnormalParameters: [
//         {
//           name: "Vitamin D",
//           value: "24 ng/mL",
//           range: "30-80 ng/mL",
//           status: "Low",
//         },
//         {
//           name: "Fasting Glucose",
//           value: "99 mg/dL",
//           range: "70-99 mg/dL",
//           status: "High",
//         },
//       ],
  
//       normalParameters: [
//         {
//           name: "ALT (Liver Enzyme)",
//           value: "22 U/L",
//           range: "7-56 U/L",
//         },
//         {
//           name: "Creatinine",
//           value: "0.9 mg/dL",
//           range: "0.6-1.2 mg/dL",
//         },
//         {
//           name: "Sodium",
//           value: "140 mEq/L",
//           range: "135-145 mEq/L",
//         },
//       ],
  
//       recommendations: [
//         "Consider vitamin D supplementation after consulting with your healthcare provider",
//         "Monitor your blood glucose levels and consider reducing refined carbohydrate intake",
//         "Maintain regular check-ups to monitor your health status",
//         "Continue with a balanced diet and regular exercise",
//         "Stay well-hydrated throughout the day",
//       ],
  
//       potentialRisks: [
//         {
//           condition: "Vitamin D Deficiency",
//           description: "Low vitamin D levels can affect bone health, immune function, and mood regulation.",
//         },
//         {
//           condition: "Prediabetes",
//           description:
//             "Your fasting glucose is at the upper limit of normal, which may indicate prediabetes risk if it increases.",
//         },
//       ],
  
//       lifestyleModifications: [
//         "Increase sun exposure (15-30 minutes daily) to boost vitamin D levels naturally",
//         "Consider vitamin D-rich foods (fatty fish, egg yolks, fortified foods)",
//         "Reduce intake of refined carbohydrates and sugary foods",
//         "Incorporate more fiber-rich foods in your diet",
//         "Maintain regular physical activity of at least 150 minutes per week",
//       ],
//     }
//   }

interface MedicalReportResponse {
  reportType: string;
  keyFindings: string[];
  abnormalParameters: string[];
  recommendations: string[];
  potentialRisks: string[];
  lifestyleModifications: string[];
}

export async function analyzeReport(reportName: string) {
  const API_URL = "https://api.groq.com/openai/v1/chat/completions";
  const API_KEY = "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"; // Ensure this is set in your .env file

  if (!API_KEY) {
    throw new Error("API key is missing. Set GROQ_API_KEY in your environment variables.");
  }

  const prompt = `Analyze the following medical report: ${reportName}. Provide a summary, key findings, abnormal parameters, normal parameters, recommendations, potential risks, and lifestyle modifications.`;

  try {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "llama3-8b-8192", // Replace with the correct model if needed
        messages: [{ role: "system", content: "You are a medical AI expert." }, { role: "user", content: prompt }],
        temperature: 0.7,
      }),
    });

    const data = await response.json();
    if (!response.ok) {
      throw new Error(`Error: ${data.error?.message || "Failed to fetch report analysis"}`);
    }

    return data.choices[0].message.content;
  } catch (error) {
    console.error("Error fetching report analysis:", error);
    return { error: "Failed to analyze the report. Please try again." };
  }
}



