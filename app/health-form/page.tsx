"use client"

import React from "react"

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

export default function HealthForm() {
  const router = useRouter()
  const [step, setStep] = useState(1)
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    height: "",
    weight: "",
    exerciseFrequency: "",
    medicalConditions: [] as string[],
    sleepHours: 7,
    stressLevel: 5,
    diet: "",
    waterIntake: "",
  })

  const totalSteps = 3
  const progress = (step / totalSteps) * 100

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleRadioChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSliderChange = (name: string, value: number[]) => {
    setFormData((prev) => ({ ...prev, [name]: value[0] }))
  }

  const handleCheckboxChange = (condition: string, checked: boolean) => {
    setFormData((prev) => {
      if (checked) {
        return { ...prev, medicalConditions: [...prev.medicalConditions, condition] }
      } else {
        return { ...prev, medicalConditions: prev.medicalConditions.filter((c) => c !== condition) }
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
    <div className="container max-w-xl py-10">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Health Information</CardTitle>
          <CardDescription>Help us understand your health better to provide personalized insights</CardDescription>
          <Progress value={progress} className="h-2 mt-4" />
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent>
            {step === 1 && (
              <div className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="height">Height (cm)</Label>
                  <Input
                    id="height"
                    name="height"
                    type="number"
                    placeholder="Enter your height in cm"
                    value={formData.height}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="weight">Weight (kg)</Label>
                  <Input
                    id="weight"
                    name="weight"
                    type="number"
                    placeholder="Enter your weight in kg"
                    value={formData.weight}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label>How often do you exercise?</Label>
                  <RadioGroup
                    value={formData.exerciseFrequency}
                    onValueChange={(value) => handleRadioChange("exerciseFrequency", value)}
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="never" id="never" />
                      <Label htmlFor="never">Never</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="rarely" id="rarely" />
                      <Label htmlFor="rarely">Rarely (1-2 times a month)</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="sometimes" id="sometimes" />
                      <Label htmlFor="sometimes">Sometimes (1-2 times a week)</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="regularly" id="regularly" />
                      <Label htmlFor="regularly">Regularly (3-5 times a week)</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="daily" id="daily" />
                      <Label htmlFor="daily">Daily</Label>
                    </div>
                  </RadioGroup>
                </div>
              </div>
            )}

            {step === 2 && (
              <div className="space-y-6">
                <div className="space-y-2">
                  <Label>Do you have any of these medical conditions?</Label>
                  <div className="grid grid-cols-2 gap-2 mt-2">
                    {["Diabetes", "Hypertension", "Heart Disease", "Asthma", "Thyroid Issues", "Digestive Issues"].map(
                      (condition) => (
                        <div key={condition} className="flex items-center space-x-2">
                          <Checkbox
                            id={condition.toLowerCase().replace(/\s+/g, "-")}
                            checked={formData.medicalConditions.includes(condition)}
                            onCheckedChange={(checked) => handleCheckboxChange(condition, checked as boolean)}
                          />
                          <Label htmlFor={condition.toLowerCase().replace(/\s+/g, "-")}>{condition}</Label>
                        </div>
                      ),
                    )}
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Sleep Hours (per night)</Label>
                  <div className="flex items-center gap-4">
                    <Slider
                      value={[formData.sleepHours]}
                      min={1}
                      max={12}
                      step={1}
                      onValueChange={(value) => handleSliderChange("sleepHours", value)}
                      className="flex-1"
                    />
                    <span className="w-8 text-center">{formData.sleepHours}h</span>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Stress Level (1-10)</Label>
                  <div className="flex items-center gap-4">
                    <Slider
                      value={[formData.stressLevel]}
                      min={1}
                      max={10}
                      step={1}
                      onValueChange={(value) => handleSliderChange("stressLevel", value)}
                      className="flex-1"
                    />
                    <span className="w-8 text-center">{formData.stressLevel}</span>
                  </div>
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="space-y-6">
                <div className="space-y-2">
                  <Label>What type of diet do you follow?</Label>
                  <RadioGroup value={formData.diet} onValueChange={(value) => handleRadioChange("diet", value)}>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="vegetarian" id="vegetarian" />
                      <Label htmlFor="vegetarian">Vegetarian</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="vegan" id="vegan" />
                      <Label htmlFor="vegan">Vegan</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="non-vegetarian" id="non-vegetarian" />
                      <Label htmlFor="non-vegetarian">Non-vegetarian</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="pescatarian" id="pescatarian" />
                      <Label htmlFor="pescatarian">Pescatarian</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="other" id="other-diet" />
                      <Label htmlFor="other-diet">Other</Label>
                    </div>
                  </RadioGroup>
                </div>

                <div className="space-y-2">
                  <Label>How much water do you drink daily?</Label>
                  <RadioGroup
                    value={formData.waterIntake}
                    onValueChange={(value) => handleRadioChange("waterIntake", value)}
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="less-than-1L" id="less-than-1L" />
                      <Label htmlFor="less-than-1L">Less than 1 liter</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="1-2L" id="1-2L" />
                      <Label htmlFor="1-2L">1-2 liters</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="2-3L" id="2-3L" />
                      <Label htmlFor="2-3L">2-3 liters</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="more-than-3L" id="more-than-3L" />
                      <Label htmlFor="more-than-3L">More than 3 liters</Label>
                    </div>
                  </RadioGroup>
                </div>
              </div>
            )}
          </CardContent>

          <CardFooter className="flex justify-between">
            {step > 1 ? (
              <Button type="button" variant="outline" onClick={prevStep}>
                Previous
              </Button>
            ) : (
              <div></div>
            )}

            {step < totalSteps ? (
              <Button type="button" onClick={nextStep}>
                Next
              </Button>
            ) : (
              <Button type="submit" disabled={loading}>
                {loading ? "Submitting..." : "Submit"}
              </Button>
            )}
          </CardFooter>
        </form>
      </Card>
    </div>
  )
}

