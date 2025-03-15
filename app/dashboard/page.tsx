"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { FileText, Video, User, Calendar, Activity, Heart, Pill } from "lucide-react"
import DashboardHeader from "@/components/dashboard-header"
import HealthChart from "@/components/health-chart"
import { generateHealthInsights } from "@/lib/health-analysis"
import type { HealthData, HealthInsights } from "@/lib/types"

export default function Dashboard() {
  const router = useRouter()
  const [healthData, setHealthData] = useState<HealthData | null>(null)
  const [insights, setInsights] = useState<HealthInsights | null>(null)
  const [loading, setLoading] = useState(true)
  const [userName, setUserName] = useState("User")

  useEffect(() => {
    // Check if user is logged in
    const isLoggedIn = localStorage.getItem("isLoggedIn")
    if (!isLoggedIn) {
      router.push("/login")
      return
    }

    // Get user data
    const userData = localStorage.getItem("user")
    if (userData) {
      const parsedUserData = JSON.parse(userData)
      setUserName(parsedUserData.name || "User")
    }

    // Get health data from localStorage
    const healthDataStr = localStorage.getItem("healthData")
    if (!healthDataStr) {
      router.push("/health-assessment")
      return
    }

    const parsedHealthData = JSON.parse(healthDataStr)
    setHealthData(parsedHealthData)

    // Generate health insights
    const healthInsights = generateHealthInsights(parsedHealthData)
    setInsights(healthInsights)

    setLoading(false)
  }, [router])

  const handleOptionSelect = (option: string) => {
    if (option === "report-upload") {
      router.push("/report-upload")
    } else if (option === "doctor-consultation") {
      router.push("/doctors")
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="mt-4 text-muted-foreground">Loading your health dashboard...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <DashboardHeader />

      <main className="container py-6">
        <div className="flex flex-col md:flex-row justify-between items-start mb-6 gap-4">
          <div>
            <h1 className="text-3xl font-bold">Welcome back, {userName}</h1>
            <p className="text-muted-foreground">Here's an overview of your health status and recommendations</p>
          </div>
          <div className="flex gap-2">
            <Button
              variant="outline"
              className="flex items-center gap-2"
              onClick={() => router.push("/health-assessment")}
            >
              <User className="h-4 w-4" />
              Update Health Profile
            </Button>
            <Button
              variant="outline"
              className="flex items-center gap-2"
              onClick={() => router.push("/health-tracker")}
            >
              <Activity className="h-4 w-4" />
              Track Health Metrics
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="bg-gradient-to-br from-primary/10 to-primary/5">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center gap-2">
                <Heart className="h-5 w-5 text-primary" />
                Health Score
              </CardTitle>
              <CardDescription>Your overall health assessment</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold mb-2">{insights?.bmi.score.toFixed(1)}</div>
              <div className="text-sm text-muted-foreground mb-4">{insights?.bmi.category}</div>
              <Progress value={insights?.bmi.percentile} className="h-2" />
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-blue-500/10 to-blue-500/5">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center gap-2">
                <Calendar className="h-5 w-5 text-blue-500" />
                Sleep Quality
              </CardTitle>
              <CardDescription>Based on your sleep patterns</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold mb-2">{insights?.sleep.score}/10</div>
              <div className="text-sm text-muted-foreground mb-4">{insights?.sleep.quality}</div>
              <Progress value={insights?.sleep.percentile} className="h-2" />
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-amber-500/10 to-amber-500/5">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center gap-2">
                <Activity className="h-5 w-5 text-amber-500" />
                Stress Level
              </CardTitle>
              <CardDescription>Based on your reported stress</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold mb-2">{insights?.stress.level}/10</div>
              <div className="text-sm text-muted-foreground mb-4">{insights?.stress.category}</div>
              <Progress value={insights?.stress.percentile} className="h-2" />
            </CardContent>
          </Card>
        </div>

        <div className="mb-8">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Activity className="h-5 w-5 text-primary" />
                Your Health Overview
              </CardTitle>
              <CardDescription>Comprehensive visualization of your health metrics</CardDescription>
            </CardHeader>
            <CardContent className="h-[400px]">
              <HealthChart healthData={healthData} insights={insights} />
            </CardContent>
          </Card>
        </div>

        <div className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Personalized Health Recommendations</h2>
          <Tabs defaultValue="general">
            <TabsList className="mb-4">
              <TabsTrigger value="general">General</TabsTrigger>
              <TabsTrigger value="nutrition">Nutrition</TabsTrigger>
              <TabsTrigger value="fitness">Fitness</TabsTrigger>
              <TabsTrigger value="mental">Mental Health</TabsTrigger>
            </TabsList>

            <TabsContent value="general" className="space-y-4">
              {insights?.recommendations.general.map((recommendation, index) => (
                <div key={index} className="p-4 border rounded-lg bg-muted/50 hover:bg-muted/70 transition-colors">
                  <p>{recommendation}</p>
                </div>
              ))}
            </TabsContent>

            <TabsContent value="nutrition" className="space-y-4">
              {insights?.recommendations.nutrition.map((recommendation, index) => (
                <div key={index} className="p-4 border rounded-lg bg-muted/50 hover:bg-muted/70 transition-colors">
                  <p>{recommendation}</p>
                </div>
              ))}
            </TabsContent>

            <TabsContent value="fitness" className="space-y-4">
              {insights?.recommendations.fitness.map((recommendation, index) => (
                <div key={index} className="p-4 border rounded-lg bg-muted/50 hover:bg-muted/70 transition-colors">
                  <p>{recommendation}</p>
                </div>
              ))}
            </TabsContent>

            <TabsContent value="mental" className="space-y-4">
              {insights?.recommendations.mental.map((recommendation, index) => (
                <div key={index} className="p-4 border rounded-lg bg-muted/50 hover:bg-muted/70 transition-colors">
                  <p>{recommendation}</p>
                </div>
              ))}
            </TabsContent>
          </Tabs>
        </div>

        <div>
          <h2 className="text-2xl font-semibold mb-4">Your Health Journey</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="hover:shadow-md transition-shadow bg-gradient-to-br from-green-500/10 to-green-500/5">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5 text-green-600" />
                  Upload Medical Report
                </CardTitle>
                <CardDescription>Get AI analysis and personalized insights from your medical reports</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="mb-4">
                  Our AI will analyze your medical reports to provide detailed insights, identify potential health
                  issues, and suggest preventive measures.
                </p>
                <Button onClick={() => handleOptionSelect("report-upload")} className="w-full">
                  Upload Report
                </Button>
              </CardContent>
            </Card>

            <Card className="hover:shadow-md transition-shadow bg-gradient-to-br from-blue-500/10 to-blue-500/5">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Video className="h-5 w-5 text-blue-600" />
                  Consult with a Doctor
                </CardTitle>
                <CardDescription>Connect with specialized doctors through live video consultations</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="mb-4">
                  Speak directly with healthcare professionals who can provide personalized advice, diagnoses, and
                  treatment plans based on your health data.
                </p>
                <Button onClick={() => handleOptionSelect("doctor-consultation")} className="w-full">
                  Find Doctors
                </Button>
              </CardContent>
            </Card>

            <Card className="hover:shadow-md transition-shadow bg-gradient-to-br from-purple-500/10 to-purple-500/5">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Pill className="h-5 w-5 text-purple-600" />
                  Personalized Health Plan
                </CardTitle>
                <CardDescription>Get a customized lifestyle and wellness plan</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="mb-4">
                  Based on your health assessment and medical data, we'll create a personalized plan to help you achieve
                  your health goals.
                </p>
                <Button onClick={() => router.push("/lifestyle-plan")} className="w-full">
                  View Health Plan
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  )
}

