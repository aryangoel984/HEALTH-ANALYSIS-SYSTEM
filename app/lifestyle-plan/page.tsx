"use client"
import { FileText } from "lucide-react";
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { Heart, Utensils, Dumbbell, Moon, Brain, Calendar } from "lucide-react"
import DashboardHeader from "@/components/dashboard-header"
import { generateLifestylePlan } from "@/lib/lifestyle-recommendations"

export default function LifestylePlan() {
  const router = useRouter()
  const [lifestylePlan, setLifestylePlan] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Check if user is logged in
    const isLoggedIn = localStorage.getItem("isLoggedIn")
    if (!isLoggedIn) {
      router.push("/login")
      return
    }

    // Get health data and prescription data
    const healthData = localStorage.getItem("healthData")
    const reportAnalysis = localStorage.getItem("reportAnalysis")
    const consultationPrescription = localStorage.getItem("consultationPrescription")

    if (!healthData) {
      router.push("/health-assessment")
      return
    }

    // Generate lifestyle plan based on available data
    const parsedHealthData = JSON.parse(healthData)
    const parsedReportAnalysis = reportAnalysis ? JSON.parse(reportAnalysis) : null
    const parsedConsultationPrescription = consultationPrescription ? JSON.parse(consultationPrescription) : null

    const plan = generateLifestylePlan(parsedHealthData, parsedReportAnalysis, parsedConsultationPrescription)
    setLifestylePlan(plan)
    setLoading(false)
  }, [router])

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="mt-4 text-muted-foreground">Generating your personalized lifestyle plan...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <DashboardHeader />

      <main className="container py-6">
        <h1 className="text-3xl font-bold mb-6">Your Personalized Lifestyle Plan</h1>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          <div className="lg:col-span-3 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Overview</CardTitle>
                <CardDescription>
                  Your personalized lifestyle plan based on your health assessment and medical data
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="whitespace-pre-line mb-6">{lifestylePlan.overview}</p>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="p-4 bg-muted/50 rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <Heart className="h-5 w-5 text-primary" />
                      <h3 className="font-medium">Health Score</h3>
                    </div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-muted-foreground">Current</span>
                      <span className="font-medium">{lifestylePlan.scores.current}/100</span>
                    </div>
                    <Progress value={lifestylePlan.scores.current} className="h-2 mb-2" />
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-muted-foreground">Target</span>
                      <span className="font-medium">{lifestylePlan.scores.target}/100</span>
                    </div>
                    <Progress value={lifestylePlan.scores.target} className="h-2" />
                  </div>

                  <div className="p-4 bg-muted/50 rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <Calendar className="h-5 w-5 text-primary" />
                      <h3 className="font-medium">Plan Duration</h3>
                    </div>
                    <p className="text-2xl font-bold">{lifestylePlan.duration} Weeks</p>
                    <p className="text-sm text-muted-foreground mt-1">Starting {new Date().toLocaleDateString()}</p>
                  </div>

                  <div className="p-4 bg-muted/50 rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <Brain className="h-5 w-5 text-primary" />
                      <h3 className="font-medium">Key Focus Areas</h3>
                    </div>
                    <ul className="text-sm space-y-1">
                      {lifestylePlan.focusAreas.map((area: string, index: number) => (
                        <li key={index} className="flex items-center gap-1">
                          <span className="h-2 w-2 rounded-full bg-primary"></span>
                          <span>{area}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Tabs defaultValue="nutrition">
              <TabsList className="mb-4">
                <TabsTrigger value="nutrition" className="flex items-center gap-1">
                  <Utensils className="h-4 w-4" />
                  Nutrition
                </TabsTrigger>
                <TabsTrigger value="exercise" className="flex items-center gap-1">
                  <Dumbbell className="h-4 w-4" />
                  Exercise
                </TabsTrigger>
                <TabsTrigger value="sleep" className="flex items-center gap-1">
                  <Moon className="h-4 w-4" />
                  Sleep
                </TabsTrigger>
                <TabsTrigger value="stress" className="flex items-center gap-1">
                  <Brain className="h-4 w-4" />
                  Stress Management
                </TabsTrigger>
              </TabsList>

              <TabsContent value="nutrition">
                <Card>
                  <CardHeader>
                    <CardTitle>Nutrition Plan</CardTitle>
                    <CardDescription>Personalized dietary recommendations based on your health profile</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div>
                      <h3 className="font-medium mb-2">Dietary Guidelines</h3>
                      <ul className="space-y-2">
                        {lifestylePlan.nutrition.guidelines.map((guideline: string, index: number) => (
                          <li key={index} className="flex gap-3">
                            <div className="h-6 w-6 rounded-full bg-primary/10 text-primary flex items-center justify-center flex-shrink-0 mt-0.5">
                              {index + 1}
                            </div>
                            <p>{guideline}</p>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <h3 className="font-medium mb-2">Foods to Include</h3>
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                        {lifestylePlan.nutrition.include.map((food: string, index: number) => (
                          <div key={index} className="flex items-center gap-2 p-2 border rounded-lg">
                            <span className="h-2 w-2 rounded-full bg-green-500"></span>
                            <span>{food}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h3 className="font-medium mb-2">Foods to Limit</h3>
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                        {lifestylePlan.nutrition.limit.map((food: string, index: number) => (
                          <div key={index} className="flex items-center gap-2 p-2 border rounded-lg">
                            <span className="h-2 w-2 rounded-full bg-amber-500"></span>
                            <span>{food}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h3 className="font-medium mb-2">Sample Meal Plan</h3>
                      <div className="border rounded-lg overflow-hidden">
                        <table className="w-full">
                          <thead className="bg-muted">
                            <tr>
                              <th className="px-4 py-2 text-left">Meal</th>
                              <th className="px-4 py-2 text-left">Options</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y">
                            {Object.entries(lifestylePlan.nutrition.mealPlan).map(([meal, options]: [string, any]) => (
                              <tr key={meal}>
                                <td className="px-4 py-3 font-medium">{meal}</td>
                                <td className="px-4 py-3">
                                  <ul className="list-disc pl-5 space-y-1">
                                    {options.map((option: string, index: number) => (
                                      <li key={index}>{option}</li>
                                    ))}
                                  </ul>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="exercise">
                <Card>
                  <CardHeader>
                    <CardTitle>Exercise Plan</CardTitle>
                    <CardDescription>
                      Personalized physical activity recommendations based on your health profile
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div>
                      <h3 className="font-medium mb-2">Weekly Goals</h3>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="p-4 bg-muted/50 rounded-lg text-center">
                          <p className="text-sm text-muted-foreground mb-1">Activity Minutes</p>
                          <p className="text-2xl font-bold">{lifestylePlan.exercise.weeklyGoals.minutes} min</p>
                        </div>
                        <div className="p-4 bg-muted/50 rounded-lg text-center">
                          <p className="text-sm text-muted-foreground mb-1">Active Days</p>
                          <p className="text-2xl font-bold">{lifestylePlan.exercise.weeklyGoals.days} days</p>
                        </div>
                        <div className="p-4 bg-muted/50 rounded-lg text-center">
                          <p className="text-sm text-muted-foreground mb-1">Steps Per Day</p>
                          <p className="text-2xl font-bold">
                            {lifestylePlan.exercise.weeklyGoals.steps.toLocaleString()}
                          </p>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h3 className="font-medium mb-2">Recommended Activities</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {lifestylePlan.exercise.activities.map((activity: any, index: number) => (
                          <div key={index} className="p-4 border rounded-lg">
                            <h4 className="font-medium mb-1">{activity.name}</h4>
                            <p className="text-sm text-muted-foreground mb-2">{activity.description}</p>
                            <div className="flex items-center justify-between text-sm">
                              <span>Frequency: {activity.frequency}</span>
                              <span>Duration: {activity.duration}</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h3 className="font-medium mb-2">Weekly Schedule</h3>
                      <div className="border rounded-lg overflow-hidden">
                        <table className="w-full">
                          <thead className="bg-muted">
                            <tr>
                              <th className="px-4 py-2 text-left">Day</th>
                              <th className="px-4 py-2 text-left">Activities</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y">
                            {Object.entries(lifestylePlan.exercise.weeklySchedule).map(
                              ([day, activities]: [string, any]) => (
                                <tr key={day}>
                                  <td className="px-4 py-3 font-medium">{day}</td>
                                  <td className="px-4 py-3">
                                    {activities.length > 0 ? (
                                      <ul className="list-disc pl-5 space-y-1">
                                        {activities.map((activity: string, index: number) => (
                                          <li key={index}>{activity}</li>
                                        ))}
                                      </ul>
                                    ) : (
                                      <span className="text-muted-foreground">Rest day</span>
                                    )}
                                  </td>
                                </tr>
                              ),
                            )}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="sleep">
                <Card>
                  <CardHeader>
                    <CardTitle>Sleep Plan</CardTitle>
                    <CardDescription>Recommendations to improve your sleep quality and duration</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div>
                      <h3 className="font-medium mb-2">Sleep Goals</h3>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="p-4 bg-muted/50 rounded-lg text-center">
                          <p className="text-sm text-muted-foreground mb-1">Target Duration</p>
                          <p className="text-2xl font-bold">{lifestylePlan.sleep.goals.duration} hours</p>
                        </div>
                        <div className="p-4 bg-muted/50 rounded-lg text-center">
                          <p className="text-sm text-muted-foreground mb-1">Bedtime</p>
                          <p className="text-2xl font-bold">{lifestylePlan.sleep.goals.bedtime}</p>
                        </div>
                        <div className="p-4 bg-muted/50 rounded-lg text-center">
                          <p className="text-sm text-muted-foreground mb-1">Wake Time</p>
                          <p className="text-2xl font-bold">{lifestylePlan.sleep.goals.wakeTime}</p>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h3 className="font-medium mb-2">Sleep Hygiene Recommendations</h3>
                      <ul className="space-y-2">
                        {lifestylePlan.sleep.recommendations.map((rec: string, index: number) => (
                          <li key={index} className="flex gap-3">
                            <div className="h-6 w-6 rounded-full bg-primary/10 text-primary flex items-center justify-center flex-shrink-0 mt-0.5">
                              {index + 1}
                            </div>
                            <p>{rec}</p>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <h3 className="font-medium mb-2">Bedtime Routine</h3>
                      <div className="border rounded-lg overflow-hidden">
                        <table className="w-full">
                          <thead className="bg-muted">
                            <tr>
                              <th className="px-4 py-2 text-left">Time</th>
                              <th className="px-4 py-2 text-left">Activity</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y">
                            {lifestylePlan.sleep.bedtimeRoutine.map((item: any, index: number) => (
                              <tr key={index}>
                                <td className="px-4 py-3 font-medium">{item.time}</td>
                                <td className="px-4 py-3">{item.activity}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="stress">
                <Card>
                  <CardHeader>
                    <CardTitle>Stress Management Plan</CardTitle>
                    <CardDescription>
                      Techniques and practices to reduce stress and improve mental wellbeing
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div>
                      <h3 className="font-medium mb-2">Daily Practices</h3>
                      <ul className="space-y-2">
                        {lifestylePlan.stress.dailyPractices.map((practice: string, index: number) => (
                          <li key={index} className="flex gap-3">
                            <div className="h-6 w-6 rounded-full bg-primary/10 text-primary flex items-center justify-center flex-shrink-0 mt-0.5">
                              {index + 1}
                            </div>
                            <p>{practice}</p>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <h3 className="font-medium mb-2">Recommended Techniques</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {lifestylePlan.stress.techniques.map((technique: any, index: number) => (
                          <div key={index} className="p-4 border rounded-lg">
                            <h4 className="font-medium mb-1">{technique.name}</h4>
                            <p className="text-sm text-muted-foreground mb-2">{technique.description}</p>
                            <p className="text-sm">Duration: {technique.duration}</p>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h3 className="font-medium mb-2">Stress Triggers to Manage</h3>
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                        {lifestylePlan.stress.triggers.map((trigger: string, index: number) => (
                          <div key={index} className="flex items-center gap-2 p-2 border rounded-lg">
                            <span className="h-2 w-2 rounded-full bg-amber-500"></span>
                            <span>{trigger}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>

          <div className="space-y-6">
            <Card>
              <CardHeader className="bg-primary/5 border-b">
                <CardTitle>Progress Tracking</CardTitle>
              </CardHeader>
              <CardContent className="pt-6">
                <div className="space-y-4">
                  <Button className="w-full">Track Daily Progress</Button>
                  <Button variant="outline" className="w-full">
                    View Progress History
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="bg-primary/5 border-b">
                <CardTitle>Weekly Goals</CardTitle>
              </CardHeader>
              <CardContent className="pt-6">
                <div className="space-y-4">
                  {lifestylePlan.weeklyGoals.map((goal: any, index: number) => (
                    <div key={index} className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="font-medium">{goal.name}</span>
                        <span className="text-sm">{goal.progress}%</span>
                      </div>
                      <Progress value={goal.progress} className="h-2" />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="bg-primary/5 border-b">
                <CardTitle>Resources</CardTitle>
              </CardHeader>
              <CardContent className="pt-6">
                <ul className="space-y-2">
                  {lifestylePlan.resources.map((resource: any, index: number) => (
                    <li key={index}>
                      <a
                        href={resource.url}
                        className="text-primary hover:underline flex items-center gap-2"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <FileText className="h-4 w-4" />
                        {resource.title}
                      </a>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  )
}
