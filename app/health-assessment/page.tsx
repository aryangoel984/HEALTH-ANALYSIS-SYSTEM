// "use client"

// import type React from "react"
// import { useState } from "react"
// import { useRouter } from "next/navigation"
// import { Button } from "@/components/ui/button"
// import { Input } from "@/components/ui/input"
// import { Label } from "@/components/ui/label"
// import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
// import { Slider } from "@/components/ui/slider"
// import { Checkbox } from "@/components/ui/checkbox"
// import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
// import { Progress } from "@/components/ui/progress"
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
// import { Textarea } from "@/components/ui/textarea"
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

// export default function HealthAssessment() {
//   const router = useRouter()
//   const [step, setStep] = useState(1)
//   const [loading, setLoading] = useState(false)
//   const [formData, setFormData] = useState({
//     // General Health Information
//     age: "",
//     gender: "",
//     height: "",
//     weight: "",
//     bloodGroup: "",
//     medicalConditions: [] as string[],

//     // Lifestyle & Habits
//     sleepHours: 7,
//     exerciseFrequency: "",
//     diet: "",
//     waterIntake: "",
//     smokingStatus: "",
//     alcoholConsumption: "",

//     // Stress & Mental Health
//     stressLevel: 5,
//     screenTime: "",

//     // Family Medical History
//     familyHistory: [] as string[],
//     geneticDisorders: "",

//     // Recent Symptoms & Concerns
//     recentSymptoms: [] as string[],
//     weightChanges: "",

//     // Women-Specific Health
//     menstrualCycleRegularity: "",
//     pregnancyStatus: "",

//     // Additional fields
//     allergies: [] as string[],
//     medications: "",
//     additionalNotes: "",
//   })

//   const totalSteps = 6
//   const progress = (step / totalSteps) * 100

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
//     const { name, value } = e.target
//     setFormData((prev) => ({ ...prev, [name]: value }))
//   }

//   const handleRadioChange = (name: string, value: string) => {
//     setFormData((prev) => ({ ...prev, [name]: value }))
//   }

//   const handleSliderChange = (name: string, value: number[]) => {
//     setFormData((prev) => ({ ...prev, [name]: value[0] }))
//   }

//   const handleCheckboxChange = (field: string, item: string, checked: boolean) => {
//     setFormData((prev) => {
//       const currentItems = prev[field as keyof typeof prev] as string[]
//       if (checked) {
//         return { ...prev, [field]: [...currentItems, item] }
//       } else {
//         return { ...prev, [field]: currentItems.filter((c) => c !== item) }
//       }
//     })
//   }

//   const nextStep = () => {
//     setStep((prev) => Math.min(prev + 1, totalSteps))
//   }

//   const prevStep = () => {
//     setStep((prev) => Math.max(prev - 1, 1))
//   }

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault()
//     setLoading(true)

//     // Mock API call - in a real app, this would be an actual API request
//     setTimeout(() => {
//       // Store health data in localStorage for demo purposes
//       localStorage.setItem("healthData", JSON.stringify(formData))

//       setLoading(false)
//       router.push("/dashboard")
//     }, 1500)
//   }

//   return (
//     <div className="container max-w-3xl py-10">
//       <Card>
//         <CardHeader>
//           <CardTitle className="text-2xl">Comprehensive Health Assessment</CardTitle>
//           <CardDescription>Help us understand your health better to provide personalized insights</CardDescription>
//           <Progress value={progress} className="h-2 mt-4" />
//         </CardHeader>
//         <form onSubmit={handleSubmit}>
//           <CardContent>
//             {step === 1 && (
//               <div className="space-y-6">
//                 <h3 className="text-lg font-semibold">1. General Health Information</h3>
//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                   <div className="space-y-2">
//                     <Label htmlFor="age">
//                       Age <span className="text-primary">*</span>
//                     </Label>
//                     <Input
//                       id="age"
//                       name="age"
//                       type="number"
//                       placeholder="Enter your age"
//                       value={formData.age}
//                       onChange={handleChange}
//                       required
//                     />
//                   </div>

//                   <div className="space-y-2">
//                     <Label htmlFor="gender">
//                       Gender <span className="text-primary">*</span>
//                     </Label>
//                     <Select
//                       value={formData.gender}
//                       onValueChange={(value) => handleRadioChange("gender", value)}
//                       required
//                     >
//                       <SelectTrigger id="gender">
//                         <SelectValue placeholder="Select your gender" />
//                       </SelectTrigger>
//                       <SelectContent>
//                         <SelectItem value="male">Male</SelectItem>
//                         <SelectItem value="female">Female</SelectItem>
//                         <SelectItem value="other">Other</SelectItem>
//                         <SelectItem value="prefer-not-to-say">Prefer not to say</SelectItem>
//                       </SelectContent>
//                     </Select>
//                   </div>

//                   <div className="space-y-2">
//                     <Label htmlFor="height">
//                       Height (cm) <span className="text-primary">*</span>
//                     </Label>
//                     <Input
//                       id="height"
//                       name="height"
//                       type="number"
//                       placeholder="Enter your height in cm"
//                       value={formData.height}
//                       onChange={handleChange}
//                       required
//                     />
//                   </div>

//                   <div className="space-y-2">
//                     <Label htmlFor="weight">
//                       Weight (kg) <span className="text-primary">*</span>
//                     </Label>
//                     <Input
//                       id="weight"
//                       name="weight"
//                       type="number"
//                       placeholder="Enter your weight in kg"
//                       value={formData.weight}
//                       onChange={handleChange}
//                       required
//                     />
//                   </div>

//                   <div className="space-y-2">
//                     <Label htmlFor="bloodGroup">Blood Group</Label>
//                     <Select
//                       value={formData.bloodGroup}
//                       onValueChange={(value) => handleRadioChange("bloodGroup", value)}
//                     >
//                       <SelectTrigger id="bloodGroup">
//                         <SelectValue placeholder="Select your blood group" />
//                       </SelectTrigger>
//                       <SelectContent>
//                         <SelectItem value="A+">A+</SelectItem>
//                         <SelectItem value="A-">A-</SelectItem>
//                         <SelectItem value="B+">B+</SelectItem>
//                         <SelectItem value="B-">B-</SelectItem>
//                         <SelectItem value="AB+">AB+</SelectItem>
//                         <SelectItem value="AB-">AB-</SelectItem>
//                         <SelectItem value="O+">O+</SelectItem>
//                         <SelectItem value="O-">O-</SelectItem>
//                         <SelectItem value="unknown">Don't know</SelectItem>
//                       </SelectContent>
//                     </Select>
//                   </div>
//                 </div>

//                 <div className="space-y-2">
//                   <Label>Do you have any of these medical conditions?</Label>
//                   <div className="grid grid-cols-2 gap-2 mt-2">
//                     {[
//                       "Diabetes",
//                       "Hypertension",
//                       "Heart Disease",
//                       "Asthma",
//                       "Thyroid Issues",
//                       "Digestive Issues",
//                       "Arthritis",
//                       "Cancer",
//                       "Kidney Disease",
//                       "Liver Disease",
//                     ].map((condition) => (
//                       <div key={condition} className="flex items-center space-x-2">
//                         <Checkbox
//                           id={condition.toLowerCase().replace(/\s+/g, "-")}
//                           checked={formData.medicalConditions.includes(condition)}
//                           onCheckedChange={(checked) =>
//                             handleCheckboxChange("medicalConditions", condition, checked as boolean)
//                           }
//                         />
//                         <Label htmlFor={condition.toLowerCase().replace(/\s+/g, "-")}>{condition}</Label>
//                       </div>
//                     ))}
//                   </div>
//                 </div>
//               </div>
//             )}

//             {step === 2 && (
//               <div className="space-y-6">
//                 <h3 className="text-lg font-semibold">2. Lifestyle & Habits</h3>

//                 <div className="space-y-2">
//                   <Label>
//                     Sleep Hours (per night) <span className="text-primary">*</span>
//                   </Label>
//                   <div className="flex items-center gap-4">
//                     <Slider
//                       value={[formData.sleepHours]}
//                       min={1}
//                       max={12}
//                       step={1}
//                       onValueChange={(value) => handleSliderChange("sleepHours", value)}
//                       className="flex-1"
//                     />
//                     <span className="w-8 text-center">{formData.sleepHours}h</span>
//                   </div>
//                 </div>

//                 <div className="space-y-2">
//                   <Label>
//                     How often do you exercise? <span className="text-primary">*</span>
//                   </Label>
//                   <RadioGroup
//                     value={formData.exerciseFrequency}
//                     onValueChange={(value) => handleRadioChange("exerciseFrequency", value)}
//                     required
//                   >
//                     <div className="flex items-center space-x-2">
//                       <RadioGroupItem value="never" id="never" />
//                       <Label htmlFor="never">Never</Label>
//                     </div>
//                     <div className="flex items-center space-x-2">
//                       <RadioGroupItem value="rarely" id="rarely" />
//                       <Label htmlFor="rarely">Rarely (1-2 times a month)</Label>
//                     </div>
//                     <div className="flex items-center space-x-2">
//                       <RadioGroupItem value="sometimes" id="sometimes" />
//                       <Label htmlFor="sometimes">Sometimes (1-2 times a week)</Label>
//                     </div>
//                     <div className="flex items-center space-x-2">
//                       <RadioGroupItem value="regularly" id="regularly" />
//                       <Label htmlFor="regularly">Regularly (3-5 times a week)</Label>
//                     </div>
//                     <div className="flex items-center space-x-2">
//                       <RadioGroupItem value="daily" id="daily" />
//                       <Label htmlFor="daily">Daily</Label>
//                     </div>
//                   </RadioGroup>
//                 </div>

//                 <div className="space-y-2">
//                   <Label>
//                     What type of diet do you follow? <span className="text-primary">*</span>
//                   </Label>
//                   <RadioGroup
//                     value={formData.diet}
//                     onValueChange={(value) => handleRadioChange("diet", value)}
//                     required
//                   >
//                     <div className="flex items-center space-x-2">
//                       <RadioGroupItem value="vegetarian" id="vegetarian" />
//                       <Label htmlFor="vegetarian">Vegetarian</Label>
//                     </div>
//                     <div className="flex items-center space-x-2">
//                       <RadioGroupItem value="vegan" id="vegan" />
//                       <Label htmlFor="vegan">Vegan</Label>
//                     </div>
//                     <div className="flex items-center space-x-2">
//                       <RadioGroupItem value="non-vegetarian" id="non-vegetarian" />
//                       <Label htmlFor="non-vegetarian">Non-vegetarian</Label>
//                     </div>
//                     <div className="flex items-center space-x-2">
//                       <RadioGroupItem value="pescatarian" id="pescatarian" />
//                       <Label htmlFor="pescatarian">Pescatarian</Label>
//                     </div>
//                     <div className="flex items-center space-x-2">
//                       <RadioGroupItem value="other" id="other-diet" />
//                       <Label htmlFor="other-diet">Other</Label>
//                     </div>
//                   </RadioGroup>
//                 </div>

//                 <div className="space-y-2">
//                   <Label>
//                     How much water do you drink daily? <span className="text-primary">*</span>
//                   </Label>
//                   <RadioGroup
//                     value={formData.waterIntake}
//                     onValueChange={(value) => handleRadioChange("waterIntake", value)}
//                     required
//                   >
//                     <div className="flex items-center space-x-2">
//                       <RadioGroupItem value="less-than-1L" id="less-than-1L" />
//                       <Label htmlFor="less-than-1L">Less than 1 liter</Label>
//                     </div>
//                     <div className="flex items-center space-x-2">
//                       <RadioGroupItem value="1-2L" id="1-2L" />
//                       <Label htmlFor="1-2L">1-2 liters</Label>
//                     </div>
//                     <div className="flex items-center space-x-2">
//                       <RadioGroupItem value="2-3L" id="2-3L" />
//                       <Label htmlFor="2-3L">2-3 liters</Label>
//                     </div>
//                     <div className="flex items-center space-x-2">
//                       <RadioGroupItem value="more-than-3L" id="more-than-3L" />
//                       <Label htmlFor="more-than-3L">More than 3 liters</Label>
//                     </div>
//                   </RadioGroup>
//                 </div>

//                 <div className="space-y-2">
//                   <Label>Do you smoke?</Label>
//                   <RadioGroup
//                     value={formData.smokingStatus}
//                     onValueChange={(value) => handleRadioChange("smokingStatus", value)}
//                   >
//                     <div className="flex items-center space-x-2">
//                       <RadioGroupItem value="never" id="smoke-never" />
//                       <Label htmlFor="smoke-never">Never smoked</Label>
//                     </div>
//                     <div className="flex items-center space-x-2">
//                       <RadioGroupItem value="former" id="smoke-former" />
//                       <Label htmlFor="smoke-former">Former smoker</Label>
//                     </div>
//                     <div className="flex items-center space-x-2">
//                       <RadioGroupItem value="occasional" id="smoke-occasional" />
//                       <Label htmlFor="smoke-occasional">Occasional smoker</Label>
//                     </div>
//                     <div className="flex items-center space-x-2">
//                       <RadioGroupItem value="regular" id="smoke-regular" />
//                       <Label htmlFor="smoke-regular">Regular smoker</Label>
//                     </div>
//                   </RadioGroup>
//                 </div>

//                 <div className="space-y-2">
//                   <Label>How often do you consume alcohol?</Label>
//                   <RadioGroup
//                     value={formData.alcoholConsumption}
//                     onValueChange={(value) => handleRadioChange("alcoholConsumption", value)}
//                   >
//                     <div className="flex items-center space-x-2">
//                       <RadioGroupItem value="never" id="alcohol-never" />
//                       <Label htmlFor="alcohol-never">Never</Label>
//                     </div>
//                     <div className="flex items-center space-x-2">
//                       <RadioGroupItem value="rarely" id="alcohol-rarely" />
//                       <Label htmlFor="alcohol-rarely">Rarely (few times a year)</Label>
//                     </div>
//                     <div className="flex items-center space-x-2">
//                       <RadioGroupItem value="occasionally" id="alcohol-occasionally" />
//                       <Label htmlFor="alcohol-occasionally">Occasionally (1-2 times a month)</Label>
//                     </div>
//                     <div className="flex items-center space-x-2">
//                       <RadioGroupItem value="weekly" id="alcohol-weekly" />
//                       <Label htmlFor="alcohol-weekly">Weekly</Label>
//                     </div>
//                     <div className="flex items-center space-x-2">
//                       <RadioGroupItem value="daily" id="alcohol-daily" />
//                       <Label htmlFor="alcohol-daily">Daily</Label>
//                     </div>
//                   </RadioGroup>
//                 </div>
//               </div>
//             )}

//             {step === 3 && (
//               <div className="space-y-6">
//                 <h3 className="text-lg font-semibold">3. Stress & Mental Health</h3>

//                 <div className="space-y-2">
//                   <Label>
//                     Stress Level (1-10) <span className="text-primary">*</span>
//                   </Label>
//                   <div className="flex items-center gap-4">
//                     <Slider
//                       value={[formData.stressLevel]}
//                       min={1}
//                       max={10}
//                       step={1}
//                       onValueChange={(value) => handleSliderChange("stressLevel", value)}
//                       className="flex-1"
//                     />
//                     <span className="w-8 text-center">{formData.stressLevel}</span>
//                   </div>
//                   <div className="flex justify-between text-xs text-muted-foreground mt-1">
//                     <span>Low</span>
//                     <span>Medium</span>
//                     <span>High</span>
//                   </div>
//                 </div>

//                 <div className="space-y-2">
//                   <Label>Screen Time (Hours per day)</Label>
//                   <Select value={formData.screenTime} onValueChange={(value) => handleRadioChange("screenTime", value)}>
//                     <SelectTrigger id="screenTime">
//                       <SelectValue placeholder="Select your average screen time" />
//                     </SelectTrigger>
//                     <SelectContent>
//                       <SelectItem value="less-than-2">Less than 2 hours</SelectItem>
//                       <SelectItem value="2-4">2-4 hours</SelectItem>
//                       <SelectItem value="4-6">4-6 hours</SelectItem>
//                       <SelectItem value="6-8">6-8 hours</SelectItem>
//                       <SelectItem value="more-than-8">More than 8 hours</SelectItem>
//                     </SelectContent>
//                   </Select>
//                 </div>

//                 <div className="space-y-2">
//                   <Label>Do you experience any of these mental health concerns?</Label>
//                   <div className="grid grid-cols-2 gap-2 mt-2">
//                     {[
//                       "Anxiety",
//                       "Depression",
//                       "Insomnia",
//                       "Mood Swings",
//                       "Difficulty Concentrating",
//                       "Excessive Worry",
//                     ].map((condition) => (
//                       <div key={condition} className="flex items-center space-x-2">
//                         <Checkbox
//                           id={`mental-${condition.toLowerCase().replace(/\s+/g, "-")}`}
//                           checked={formData.recentSymptoms.includes(condition)}
//                           onCheckedChange={(checked) =>
//                             handleCheckboxChange("recentSymptoms", condition, checked as boolean)
//                           }
//                         />
//                         <Label htmlFor={`mental-${condition.toLowerCase().replace(/\s+/g, "-")}`}>{condition}</Label>
//                       </div>
//                     ))}
//                   </div>
//                 </div>
//               </div>
//             )}

//             {step === 4 && (
//               <div className="space-y-6">
//                 <h3 className="text-lg font-semibold">4. Family Medical History</h3>

//                 <div className="space-y-2">
//                   <Label>Does anyone in your immediate family have any of these conditions?</Label>
//                   <div className="grid grid-cols-2 gap-2 mt-2">
//                     {[
//                       "Heart Disease",
//                       "Diabetes",
//                       "Hypertension",
//                       "Cancer",
//                       "Stroke",
//                       "Alzheimer's",
//                       "Mental Health Disorders",
//                       "Autoimmune Diseases",
//                     ].map((condition) => (
//                       <div key={condition} className="flex items-center space-x-2">
//                         <Checkbox
//                           id={`family-${condition.toLowerCase().replace(/\s+/g, "-")}`}
//                           checked={formData.familyHistory.includes(condition)}
//                           onCheckedChange={(checked) =>
//                             handleCheckboxChange("familyHistory", condition, checked as boolean)
//                           }
//                         />
//                         <Label htmlFor={`family-${condition.toLowerCase().replace(/\s+/g, "-")}`}>{condition}</Label>
//                       </div>
//                     ))}
//                   </div>
//                 </div>

//                 <div className="space-y-2">
//                   <Label htmlFor="geneticDisorders">Any known genetic disorders in your family?</Label>
//                   <Textarea
//                     id="geneticDisorders"
//                     name="geneticDisorders"
//                     placeholder="Please specify if any"
//                     value={formData.geneticDisorders}
//                     onChange={handleChange}
//                   />
//                 </div>
//               </div>
//             )}

//             {step === 5 && (
//               <div className="space-y-6">
//                 <h3 className="text-lg font-semibold">5. Recent Symptoms & Concerns</h3>

//                 <div className="space-y-2">
//                   <Label>Have you experienced any of these symptoms in the past month?</Label>
//                   <div className="grid grid-cols-2 gap-2 mt-2">
//                     {[
//                       "Fatigue",
//                       "Headaches",
//                       "Dizziness",
//                       "Chest Pain",
//                       "Shortness of Breath",
//                       "Joint Pain",
//                       "Digestive Issues",
//                       "Skin Problems",
//                       "Vision Changes",
//                       "Persistent Cough",
//                     ].map((symptom) => (
//                       <div key={symptom} className="flex items-center space-x-2">
//                         <Checkbox
//                           id={`symptom-${symptom.toLowerCase().replace(/\s+/g, "-")}`}
//                           checked={formData.recentSymptoms.includes(symptom)}
//                           onCheckedChange={(checked) =>
//                             handleCheckboxChange("recentSymptoms", symptom, checked as boolean)
//                           }
//                         />
//                         <Label htmlFor={`symptom-${symptom.toLowerCase().replace(/\s+/g, "-")}`}>{symptom}</Label>
//                       </div>
//                     ))}
//                   </div>
//                 </div>

//                 <div className="space-y-2">
//                   <Label>Have you experienced any significant weight changes in the past 3 months?</Label>
//                   <RadioGroup
//                     value={formData.weightChanges}
//                     onValueChange={(value) => handleRadioChange("weightChanges", value)}
//                   >
//                     <div className="flex items-center space-x-2">
//                       <RadioGroupItem value="no-change" id="no-change" />
//                       <Label htmlFor="no-change">No significant change</Label>
//                     </div>
//                     <div className="flex items-center space-x-2">
//                       <RadioGroupItem value="weight-gain" id="weight-gain" />
//                       <Label htmlFor="weight-gain">Weight gain (more than 5kg)</Label>
//                     </div>
//                     <div className="flex items-center space-x-2">
//                       <RadioGroupItem value="weight-loss" id="weight-loss" />
//                       <Label htmlFor="weight-loss">Weight loss (more than 5kg)</Label>
//                     </div>
//                     <div className="flex items-center space-x-2">
//                       <RadioGroupItem value="fluctuating" id="fluctuating" />
//                       <Label htmlFor="fluctuating">Fluctuating weight</Label>
//                     </div>
//                   </RadioGroup>
//                 </div>

//                 <div className="space-y-2">
//                   <Label htmlFor="allergies">Do you have any allergies?</Label>
//                   <div className="grid grid-cols-2 gap-2 mt-2">
//                     {["Food", "Medication", "Seasonal", "Pets", "Latex", "Insect Stings"].map((allergy) => (
//                       <div key={allergy} className="flex items-center space-x-2">
//                         <Checkbox
//                           id={`allergy-${allergy.toLowerCase().replace(/\s+/g, "-")}`}
//                           checked={formData.allergies.includes(allergy)}
//                           onCheckedChange={(checked) => handleCheckboxChange("allergies", allergy, checked as boolean)}
//                         />
//                         <Label htmlFor={`allergy-${allergy.toLowerCase().replace(/\s+/g, "-")}`}>{allergy}</Label>
//                       </div>
//                     ))}
//                   </div>
//                 </div>

//                 <div className="space-y-2">
//                   <Label htmlFor="medications">Current Medications (if any)</Label>
//                   <Textarea
//                     id="medications"
//                     name="medications"
//                     placeholder="List any medications you're currently taking"
//                     value={formData.medications}
//                     onChange={handleChange}
//                   />
//                 </div>
//               </div>
//             )}

//             {step === 6 && (
//               <div className="space-y-6">
//                 <Tabs defaultValue={formData.gender === "female" ? "women" : "additional"}>
//                   <TabsList className="mb-4">
//                     {formData.gender === "female" && <TabsTrigger value="women">Women's Health</TabsTrigger>}
//                     <TabsTrigger value="additional">Additional Information</TabsTrigger>
//                   </TabsList>

//                   {formData.gender === "female" && (
//                     <TabsContent value="women" className="space-y-6">
//                       <h3 className="text-lg font-semibold">6. Women-Specific Health</h3>

//                       <div className="space-y-2">
//                         <Label>Menstrual Cycle Regularity</Label>
//                         <RadioGroup
//                           value={formData.menstrualCycleRegularity}
//                           onValueChange={(value) => handleRadioChange("menstrualCycleRegularity", value)}
//                         >
//                           <div className="flex items-center space-x-2">
//                             <RadioGroupItem value="regular" id="regular-cycle" />
//                             <Label htmlFor="regular-cycle">Regular (predictable timing)</Label>
//                           </div>
//                           <div className="flex items-center space-x-2">
//                             <RadioGroupItem value="irregular" id="irregular-cycle" />
//                             <Label htmlFor="irregular-cycle">Irregular (unpredictable timing)</Label>
//                           </div>
//                           <div className="flex items-center space-x-2">
//                             <RadioGroupItem value="absent" id="absent-cycle" />
//                             <Label htmlFor="absent-cycle">Absent (no periods)</Label>
//                           </div>
//                           <div className="flex items-center space-x-2">
//                             <RadioGroupItem value="menopause" id="menopause" />
//                             <Label htmlFor="menopause">In menopause/post-menopausal</Label>
//                           </div>
//                           <div className="flex items-center space-x-2">
//                             <RadioGroupItem value="not-applicable" id="not-applicable-cycle" />
//                             <Label htmlFor="not-applicable-cycle">Not applicable</Label>
//                           </div>
//                         </RadioGroup>
//                       </div>

//                       <div className="space-y-2">
//                         <Label>Pregnancy/Breastfeeding Status</Label>
//                         <RadioGroup
//                           value={formData.pregnancyStatus}
//                           onValueChange={(value) => handleRadioChange("pregnancyStatus", value)}
//                         >
//                           <div className="flex items-center space-x-2">
//                             <RadioGroupItem value="not-pregnant" id="not-pregnant" />
//                             <Label htmlFor="not-pregnant">Not pregnant or breastfeeding</Label>
//                           </div>
//                           <div className="flex items-center space-x-2">
//                             <RadioGroupItem value="pregnant" id="pregnant" />
//                             <Label htmlFor="pregnant">Currently pregnant</Label>
//                           </div>
//                           <div className="flex items-center space-x-2">
//                             <RadioGroupItem value="breastfeeding" id="breastfeeding" />
//                             <Label htmlFor="breastfeeding">Currently breastfeeding</Label>
//                           </div>
//                           <div className="flex items-center space-x-2">
//                             <RadioGroupItem value="planning" id="planning" />
//                             <Label htmlFor="planning">Planning pregnancy</Label>
//                           </div>
//                         </RadioGroup>
//                       </div>
//                     </TabsContent>
//                   )}

//                   <TabsContent value="additional" className="space-y-6">
//                     <h3 className="text-lg font-semibold">Additional Information</h3>

//                     <div className="space-y-2">
//                       <Label htmlFor="additionalNotes">Anything else you'd like us to know about your health?</Label>
//                       <Textarea
//                         id="additionalNotes"
//                         name="additionalNotes"
//                         placeholder="Share any additional information that might be relevant to your health assessment"
//                         value={formData.additionalNotes}
//                         onChange={handleChange}
//                         className="min-h-[100px]"
//                       />
//                     </div>
//                   </TabsContent>
//                 </Tabs>

//                 <div className="bg-muted/50 p-4 rounded-lg">
//                   <h4 className="font-medium mb-2">Almost Done!</h4>
//                   <p className="text-sm text-muted-foreground">
//                     Thank you for completing your health assessment. This information will help us provide personalized
//                     health insights and recommendations tailored specifically to your needs.
//                   </p>
//                 </div>
//               </div>
//             )}
//           </CardContent>

//           <CardFooter className="flex justify-between">
//             {step > 1 ? (
//               <Button type="button" variant="outline" onClick={prevStep}>
//                 Previous
//               </Button>
//             ) : (
//               <div></div>
//             )}

//             {step < totalSteps ? (
//               <Button type="button" onClick={nextStep}>
//                 Next
//               </Button>
//             ) : (
//               <Button type="submit" disabled={loading}>
//                 {loading ? "Submitting..." : "Submit"}
//               </Button>
//             )}
//           </CardFooter>
//         </form>
//       </Card>
//     </div>
//   )
// }

"use client"

import type React from "react"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Slider } from "@/components/ui/slider"
import { Checkbox } from "@/components/ui/checkbox"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function HealthAssessment() {
  const router = useRouter()
  const [step, setStep] = useState(1)
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    // General Health Information
    age: "",
    gender: "",
    height: "",
    weight: "",
    bloodGroup: "",
    medicalConditions: [] as string[],

    // Lifestyle & Habits
    sleepHours: 7,
    exerciseFrequency: "",
    diet: "",
    waterIntake: "",
    smokingStatus: "",
    alcoholConsumption: "",

    // Stress & Mental Health
    stressLevel: 5,
    screenTime: "",

    // Family Medical History
    familyHistory: [] as string[],
    geneticDisorders: "",

    // Recent Symptoms & Concerns
    recentSymptoms: [] as string[],
    weightChanges: "",

    // Women-Specific Health
    menstrualCycleRegularity: "",
    pregnancyStatus: "",

    // Additional fields
    allergies: [] as string[],
    medications: "",
    additionalNotes: "",
  })

  const totalSteps = 6
  const progress = (step / totalSteps) * 100

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleRadioChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSliderChange = (name: string, value: number[]) => {
    setFormData((prev) => ({ ...prev, [name]: value[0] }))
  }

  const handleCheckboxChange = (field: string, item: string, checked: boolean) => {
    setFormData((prev) => {
      const currentItems = prev[field as keyof typeof prev] as string[]
      if (checked) {
        return { ...prev, [field]: [...currentItems, item] }
      } else {
        return { ...prev, [field]: currentItems.filter((c) => c !== item) }
      }
    })
  }

  const nextStep = () => {
    setStep((prev) => Math.min(prev + 1, totalSteps))
  }

  const prevStep = () => {
    setStep((prev) => Math.max(prev - 1, 1))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    // Mock API call - in a real app, this would be an actual API request
    setTimeout(() => {
      // Store health data in localStorage for demo purposes
      localStorage.setItem("healthData", JSON.stringify(formData))

      setLoading(false)
      router.push("/dashboard")
    }, 1500)
  }

  return (
    <div className="container max-w-3xl py-10">
      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-gray-900">Comprehensive Health Assessment</CardTitle>
          <CardDescription className="text-gray-600">
            Help us understand your health better to provide personalized insights
          </CardDescription>
          <Progress value={progress} className="h-2 mt-4 bg-gray-200" />
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-8">
            {step === 1 && (
              <div className="space-y-6">
                <h3 className="text-lg font-semibold text-gray-800">1. General Health Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="age" className="text-gray-700">
                      Age <span className="text-primary">*</span>
                    </Label>
                    <Input
                      id="age"
                      name="age"
                      type="number"
                      placeholder="Enter your age"
                      value={formData.age}
                      onChange={handleChange}
                      className="border-gray-300 focus:border-primary focus:ring-primary"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="gender" className="text-gray-700">
                      Gender <span className="text-primary">*</span>
                    </Label>
                    <Select
                      value={formData.gender}
                      onValueChange={(value) => handleRadioChange("gender", value)}
                      required
                    >
                      <SelectTrigger id="gender" className="border-gray-300 focus:border-primary focus:ring-primary">
                        <SelectValue placeholder="Select your gender" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="male">Male</SelectItem>
                        <SelectItem value="female">Female</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                        <SelectItem value="prefer-not-to-say">Prefer not to say</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="height" className="text-gray-700">
                      Height (cm) <span className="text-primary">*</span>
                    </Label>
                    <Input
                      id="height"
                      name="height"
                      type="number"
                      placeholder="Enter your height in cm"
                      value={formData.height}
                      onChange={handleChange}
                      className="border-gray-300 focus:border-primary focus:ring-primary"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="weight" className="text-gray-700">
                      Weight (kg) <span className="text-primary">*</span>
                    </Label>
                    <Input
                      id="weight"
                      name="weight"
                      type="number"
                      placeholder="Enter your weight in kg"
                      value={formData.weight}
                      onChange={handleChange}
                      className="border-gray-300 focus:border-primary focus:ring-primary"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="bloodGroup" className="text-gray-700">
                      Blood Group
                    </Label>
                    <Select
                      value={formData.bloodGroup}
                      onValueChange={(value) => handleRadioChange("bloodGroup", value)}
                    >
                      <SelectTrigger id="bloodGroup" className="border-gray-300 focus:border-primary focus:ring-primary">
                        <SelectValue placeholder="Select your blood group" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="A+">A+</SelectItem>
                        <SelectItem value="A-">A-</SelectItem>
                        <SelectItem value="B+">B+</SelectItem>
                        <SelectItem value="B-">B-</SelectItem>
                        <SelectItem value="AB+">AB+</SelectItem>
                        <SelectItem value="AB-">AB-</SelectItem>
                        <SelectItem value="O+">O+</SelectItem>
                        <SelectItem value="O-">O-</SelectItem>
                        <SelectItem value="unknown">Don't know</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label className="text-gray-700">Do you have any of these medical conditions?</Label>
                  <div className="grid grid-cols-2 gap-4 mt-2">
                    {[
                      "Diabetes",
                      "Hypertension",
                      "Heart Disease",
                      "Asthma",
                      "Thyroid Issues",
                      "Digestive Issues",
                      "Arthritis",
                      "Cancer",
                      "Kidney Disease",
                      "Liver Disease",
                    ].map((condition) => (
                      <div key={condition} className="flex items-center space-x-2">
                        <Checkbox
                          id={condition.toLowerCase().replace(/\s+/g, "-")}
                          checked={formData.medicalConditions.includes(condition)}
                          onCheckedChange={(checked) =>
                            handleCheckboxChange("medicalConditions", condition, checked as boolean)
                          }
                          className="border-gray-300 focus:ring-primary"
                        />
                        <Label htmlFor={condition.toLowerCase().replace(/\s+/g, "-")} className="text-gray-700">
                          {condition}
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
            {step === 2 && (
  <div className="space-y-6">
    <h3 className="text-lg font-semibold text-gray-800">2. Lifestyle & Habits</h3>

    <div className="space-y-2">
      <Label className="text-gray-700">
        Sleep Hours (per night) <span className="text-primary">*</span>
      </Label>
      <div className="flex items-center gap-4">
        <Slider
          value={[formData.sleepHours]}
          min={1}
          max={12}
          step={1}
          onValueChange={(value) => handleSliderChange("sleepHours", value)}
          className="flex-1"
        />
        <span className="w-8 text-center text-gray-700">{formData.sleepHours}h</span>
      </div>
    </div>

    <div className="space-y-2">
      <Label className="text-gray-700">
        How often do you exercise? <span className="text-primary">*</span>
      </Label>
      <RadioGroup
        value={formData.exerciseFrequency}
        onValueChange={(value) => handleRadioChange("exerciseFrequency", value)}
        required
      >
        <div className="flex flex-col space-y-2">
          {[
            { value: "never", label: "Never" },
            { value: "rarely", label: "Rarely (1-2 times a month)" },
            { value: "sometimes", label: "Sometimes (1-2 times a week)" },
            { value: "regularly", label: "Regularly (3-5 times a week)" },
            { value: "daily", label: "Daily" },
          ].map((option) => (
            <div key={option.value} className="flex items-center space-x-2">
              <RadioGroupItem
                value={option.value}
                id={option.value}
                className="border-gray-300 focus:ring-primary"
              />
              <Label htmlFor={option.value} className="text-gray-700">
                {option.label}
              </Label>
            </div>
          ))}
        </div>
      </RadioGroup>
    </div>

    <div className="space-y-2">
      <Label className="text-gray-700">
        What type of diet do you follow? <span className="text-primary">*</span>
      </Label>
      <RadioGroup
        value={formData.diet}
        onValueChange={(value) => handleRadioChange("diet", value)}
        required
      >
        <div className="flex flex-col space-y-2">
          {[
            { value: "vegetarian", label: "Vegetarian" },
            { value: "vegan", label: "Vegan" },
            { value: "non-vegetarian", label: "Non-vegetarian" },
            { value: "pescatarian", label: "Pescatarian" },
            { value: "other", label: "Other" },
          ].map((option) => (
            <div key={option.value} className="flex items-center space-x-2">
              <RadioGroupItem
                value={option.value}
                id={option.value}
                className="border-gray-300 focus:ring-primary"
              />
              <Label htmlFor={option.value} className="text-gray-700">
                {option.label}
              </Label>
            </div>
          ))}
        </div>
      </RadioGroup>
    </div>

    <div className="space-y-2">
      <Label className="text-gray-700">
        How much water do you drink daily? <span className="text-primary">*</span>
      </Label>
      <RadioGroup
        value={formData.waterIntake}
        onValueChange={(value) => handleRadioChange("waterIntake", value)}
        required
      >
        <div className="flex flex-col space-y-2">
          {[
            { value: "less-than-1L", label: "Less than 1 liter" },
            { value: "1-2L", label: "1-2 liters" },
            { value: "2-3L", label: "2-3 liters" },
            { value: "more-than-3L", label: "More than 3 liters" },
          ].map((option) => (
            <div key={option.value} className="flex items-center space-x-2">
              <RadioGroupItem
                value={option.value}
                id={option.value}
                className="border-gray-300 focus:ring-primary"
              />
              <Label htmlFor={option.value} className="text-gray-700">
                {option.label}
              </Label>
            </div>
          ))}
        </div>
      </RadioGroup>
    </div>

    <div className="space-y-2">
      <Label className="text-gray-700">Do you smoke?</Label>
      <RadioGroup
        value={formData.smokingStatus}
        onValueChange={(value) => handleRadioChange("smokingStatus", value)}
      >
        <div className="flex flex-col space-y-2">
          {[
            { value: "never", label: "Never smoked" },
            { value: "former", label: "Former smoker" },
            { value: "occasional", label: "Occasional smoker" },
            { value: "regular", label: "Regular smoker" },
          ].map((option) => (
            <div key={option.value} className="flex items-center space-x-2">
              <RadioGroupItem
                value={option.value}
                id={option.value}
                className="border-gray-300 focus:ring-primary"
              />
              <Label htmlFor={option.value} className="text-gray-700">
                {option.label}
              </Label>
            </div>
          ))}
        </div>
      </RadioGroup>
    </div>

    <div className="space-y-2">
      <Label className="text-gray-700">How often do you consume alcohol?</Label>
      <RadioGroup
        value={formData.alcoholConsumption}
        onValueChange={(value) => handleRadioChange("alcoholConsumption", value)}
      >
        <div className="flex flex-col space-y-2">
          {[
            { value: "never", label: "Never" },
            { value: "rarely", label: "Rarely (few times a year)" },
            { value: "occasionally", label: "Occasionally (1-2 times a month)" },
            { value: "weekly", label: "Weekly" },
            { value: "daily", label: "Daily" },
          ].map((option) => (
            <div key={option.value} className="flex items-center space-x-2">
              <RadioGroupItem
                value={option.value}
                id={option.value}
                className="border-gray-300 focus:ring-primary"
              />
              <Label htmlFor={option.value} className="text-gray-700">
                {option.label}
              </Label>
            </div>
          ))}
        </div>
      </RadioGroup>
    </div>
  </div>
)}
{step === 3 && (
  <div className="space-y-6">
    <h3 className="text-lg font-semibold text-gray-800">3. Stress & Mental Health</h3>

    <div className="space-y-2">
      <Label className="text-gray-700">
        Stress Level (1-10) <span className="text-primary">*</span>
      </Label>
      <div className="flex items-center gap-4">
        <Slider
          value={[formData.stressLevel]}
          min={1}
          max={10}
          step={1}
          onValueChange={(value) => handleSliderChange("stressLevel", value)}
          className="flex-1"
        />
        <span className="w-8 text-center text-gray-700">{formData.stressLevel}</span>
      </div>
      <div className="flex justify-between text-xs text-gray-500 mt-1">
        <span>Low</span>
        <span>Medium</span>
        <span>High</span>
      </div>
    </div>

    <div className="space-y-2">
      <Label className="text-gray-700">Screen Time (Hours per day)</Label>
      <Select
        value={formData.screenTime}
        onValueChange={(value) => handleRadioChange("screenTime", value)}
      >
        <SelectTrigger className="border-gray-300 focus:border-primary focus:ring-primary">
          <SelectValue placeholder="Select your average screen time" />
        </SelectTrigger>
        <SelectContent>
          {[
            "Less than 2 hours",
            "2-4 hours",
            "4-6 hours",
            "6-8 hours",
            "More than 8 hours",
          ].map((option) => (
            <SelectItem key={option} value={option.toLowerCase().replace(/\s+/g, "-")}>
              {option}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>

    <div className="space-y-2">
      <Label className="text-gray-700">Do you experience any of these mental health concerns?</Label>
      <div className="grid grid-cols-2 gap-4 mt-2">
        {[
          "Anxiety",
          "Depression",
          "Insomnia",
          "Mood Swings",
          "Difficulty Concentrating",
          "Excessive Worry",
        ].map((condition) => (
          <div key={condition} className="flex items-center space-x-2">
            <Checkbox
              id={`mental-${condition.toLowerCase().replace(/\s+/g, "-")}`}
              checked={formData.recentSymptoms.includes(condition)}
              onCheckedChange={(checked) =>
                handleCheckboxChange("recentSymptoms", condition, checked as boolean)
              }
              className="border-gray-300 focus:ring-primary"
            />
            <Label htmlFor={`mental-${condition.toLowerCase().replace(/\s+/g, "-")}`} className="text-gray-700">
              {condition}
            </Label>
          </div>
        ))}
      </div>
    </div>
  </div>
)}
{step === 4 && (
  <div className="space-y-6">
    <h3 className="text-lg font-semibold text-gray-800">4. Family Medical History</h3>

    <div className="space-y-2">
      <Label className="text-gray-700">
        Does anyone in your immediate family have any of these conditions?
      </Label>
      <div className="grid grid-cols-2 gap-4 mt-2">
        {[
          "Heart Disease",
          "Diabetes",
          "Hypertension",
          "Cancer",
          "Stroke",
          "Alzheimer's",
          "Mental Health Disorders",
          "Autoimmune Diseases",
        ].map((condition) => (
          <div key={condition} className="flex items-center space-x-2">
            <Checkbox
              id={`family-${condition.toLowerCase().replace(/\s+/g, "-")}`}
              checked={formData.familyHistory.includes(condition)}
              onCheckedChange={(checked) =>
                handleCheckboxChange("familyHistory", condition, checked as boolean)
              }
              className="border-gray-300 focus:ring-primary"
            />
            <Label htmlFor={`family-${condition.toLowerCase().replace(/\s+/g, "-")}`} className="text-gray-700">
              {condition}
            </Label>
          </div>
        ))}
      </div>
    </div>

    <div className="space-y-2">
      <Label htmlFor="geneticDisorders" className="text-gray-700">
        Any known genetic disorders in your family?
      </Label>
      <Textarea
        id="geneticDisorders"
        name="geneticDisorders"
        placeholder="Please specify if any"
        value={formData.geneticDisorders}
        onChange={handleChange}
        className="border-gray-300 focus:border-primary focus:ring-primary"
      />
    </div>
  </div>
)}
{step === 5 && (
  <div className="space-y-6">
    <h3 className="text-lg font-semibold text-gray-800">5. Recent Symptoms & Concerns</h3>

    <div className="space-y-2">
      <Label className="text-gray-700">
        Have you experienced any of these symptoms in the past month?
      </Label>
      <div className="grid grid-cols-2 gap-4 mt-2">
        {[
          "Fatigue",
          "Headaches",
          "Dizziness",
          "Chest Pain",
          "Shortness of Breath",
          "Joint Pain",
          "Digestive Issues",
          "Skin Problems",
          "Vision Changes",
          "Persistent Cough",
        ].map((symptom) => (
          <div key={symptom} className="flex items-center space-x-2">
            <Checkbox
              id={`symptom-${symptom.toLowerCase().replace(/\s+/g, "-")}`}
              checked={formData.recentSymptoms.includes(symptom)}
              onCheckedChange={(checked) =>
                handleCheckboxChange("recentSymptoms", symptom, checked as boolean)
              }
              className="border-gray-300 focus:ring-primary"
            />
            <Label htmlFor={`symptom-${symptom.toLowerCase().replace(/\s+/g, "-")}`} className="text-gray-700">
              {symptom}
            </Label>
          </div>
        ))}
      </div>
    </div>

    <div className="space-y-2">
      <Label className="text-gray-700">
        Have you experienced any significant weight changes in the past 3 months?
      </Label>
      <RadioGroup
        value={formData.weightChanges}
        onValueChange={(value) => handleRadioChange("weightChanges", value)}
      >
        <div className="flex flex-col space-y-2">
          {[
            { value: "no-change", label: "No significant change" },
            { value: "weight-gain", label: "Weight gain (more than 5kg)" },
            { value: "weight-loss", label: "Weight loss (more than 5kg)" },
            { value: "fluctuating", label: "Fluctuating weight" },
          ].map((option) => (
            <div key={option.value} className="flex items-center space-x-2">
              <RadioGroupItem
                value={option.value}
                id={option.value}
                className="border-gray-300 focus:ring-primary"
              />
              <Label htmlFor={option.value} className="text-gray-700">
                {option.label}
              </Label>
            </div>
          ))}
        </div>
      </RadioGroup>
    </div>

    <div className="space-y-2">
      <Label className="text-gray-700">Do you have any allergies?</Label>
      <div className="grid grid-cols-2 gap-4 mt-2">
        {["Food", "Medication", "Seasonal", "Pets", "Latex", "Insect Stings"].map((allergy) => (
          <div key={allergy} className="flex items-center space-x-2">
            <Checkbox
              id={`allergy-${allergy.toLowerCase().replace(/\s+/g, "-")}`}
              checked={formData.allergies.includes(allergy)}
              onCheckedChange={(checked) =>
                handleCheckboxChange("allergies", allergy, checked as boolean)
              }
              className="border-gray-300 focus:ring-primary"
            />
            <Label htmlFor={`allergy-${allergy.toLowerCase().replace(/\s+/g, "-")}`} className="text-gray-700">
              {allergy}
            </Label>
          </div>
        ))}
      </div>
    </div>

    <div className="space-y-2">
      <Label htmlFor="medications" className="text-gray-700">
        Current Medications (if any)
      </Label>
      <Textarea
        id="medications"
        name="medications"
        placeholder="List any medications you're currently taking"
        value={formData.medications}
        onChange={handleChange}
        className="border-gray-300 focus:border-primary focus:ring-primary"
      />
    </div>
  </div>
)}
{step === 6 && (
  <div className="space-y-6">
    <Tabs defaultValue={formData.gender === "female" ? "women" : "additional"}>
      <TabsList className="mb-4 bg-gray-100">
        {formData.gender === "female" && (
          <TabsTrigger value="women" className="data-[state=active]:bg-primary data-[state=active]:text-white">
            Women's Health
          </TabsTrigger>
        )}
        <TabsTrigger value="additional" className="data-[state=active]:bg-primary data-[state=active]:text-white">
          Additional Information
        </TabsTrigger>
      </TabsList>

      {formData.gender === "female" && (
        <TabsContent value="women" className="space-y-6">
          <h3 className="text-lg font-semibold text-gray-800">6. Women-Specific Health</h3>

          <div className="space-y-2">
            <Label className="text-gray-700">Menstrual Cycle Regularity</Label>
            <RadioGroup
              value={formData.menstrualCycleRegularity}
              onValueChange={(value) => handleRadioChange("menstrualCycleRegularity", value)}
            >
              <div className="flex flex-col space-y-2">
                {[
                  { value: "regular", label: "Regular (predictable timing)" },
                  { value: "irregular", label: "Irregular (unpredictable timing)" },
                  { value: "absent", label: "Absent (no periods)" },
                  { value: "menopause", label: "In menopause/post-menopausal" },
                  { value: "not-applicable", label: "Not applicable" },
                ].map((option) => (
                  <div key={option.value} className="flex items-center space-x-2">
                    <RadioGroupItem
                      value={option.value}
                      id={option.value}
                      className="border-gray-300 focus:ring-primary"
                    />
                    <Label htmlFor={option.value} className="text-gray-700">
                      {option.label}
                    </Label>
                  </div>
                ))}
              </div>
            </RadioGroup>
          </div>

          <div className="space-y-2">
            <Label className="text-gray-700">Pregnancy/Breastfeeding Status</Label>
            <RadioGroup
              value={formData.pregnancyStatus}
              onValueChange={(value) => handleRadioChange("pregnancyStatus", value)}
            >
              <div className="flex flex-col space-y-2">
                {[
                  { value: "not-pregnant", label: "Not pregnant or breastfeeding" },
                  { value: "pregnant", label: "Currently pregnant" },
                  { value: "breastfeeding", label: "Currently breastfeeding" },
                  { value: "planning", label: "Planning pregnancy" },
                ].map((option) => (
                  <div key={option.value} className="flex items-center space-x-2">
                    <RadioGroupItem
                      value={option.value}
                      id={option.value}
                      className="border-gray-300 focus:ring-primary"
                    />
                    <Label htmlFor={option.value} className="text-gray-700">
                      {option.label}
                    </Label>
                  </div>
                ))}
              </div>
            </RadioGroup>
          </div>
        </TabsContent>
      )}

      <TabsContent value="additional" className="space-y-6">
        <h3 className="text-lg font-semibold text-gray-800">Additional Information</h3>

        <div className="space-y-2">
          <Label htmlFor="additionalNotes" className="text-gray-700">
            Anything else you'd like us to know about your health?
          </Label>
          <Textarea
            id="additionalNotes"
            name="additionalNotes"
            placeholder="Share any additional information that might be relevant to your health assessment"
            value={formData.additionalNotes}
            onChange={handleChange}
            className="border-gray-300 focus:border-primary focus:ring-primary min-h-[100px]"
          />
        </div>
      </TabsContent>
    </Tabs>

    <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
      <h4 className="font-medium text-gray-800 mb-2">Almost Done!</h4>
      <p className="text-sm text-gray-600">
        Thank you for completing your health assessment. This information will help us provide personalized
        health insights and recommendations tailored specifically to your needs.
      </p>
    </div>
  </div>
)}
            {/* Repeat similar enhancements for other steps */}
          </CardContent>

          <CardFooter className="flex justify-between border-t pt-6">
            {step > 1 ? (
              <Button type="button" variant="outline" onClick={prevStep} className="hover:bg-gray-100">
                Previous
              </Button>
            ) : (
              <div></div>
            )}

            {step < totalSteps ? (
              <Button type="button" onClick={nextStep} className="bg-primary hover:bg-primary-dark">
                Next
              </Button>
            ) : (
              <Button type="submit" disabled={loading} className="bg-primary hover:bg-primary-dark">
                {loading ? "Submitting..." : "Submit"}
              </Button>
            )}
          </CardFooter>
        </form>
      </Card>
    </div>
  )
}