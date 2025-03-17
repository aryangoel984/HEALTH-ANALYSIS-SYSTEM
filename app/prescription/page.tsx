"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Printer, Download, Share2, AlertCircle } from "lucide-react"
import DashboardHeader from "@/components/dashboard-header"

export default function Prescription() {
  const router = useRouter()
  const [prescriptionData, setPrescriptionData] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Check if user is logged in
    const isLoggedIn = localStorage.getItem("isLoggedIn")
    if (!isLoggedIn) {
      router.push("/login")
      return
    }

    // Get report analysis from localStorage
    const analysisData = localStorage.getItem("reportAnalysis")
    if (!analysisData) {
      router.push("/report-upload")
      return
    }

    setPrescriptionData(JSON.parse(analysisData))
    setLoading(false)
  }, [router])

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="mt-4 text-muted-foreground">Loading your prescription...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="flex justify-center">
    <div className="min-h-screen bg-background">
      <DashboardHeader />

      <main className="container py-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Your Health Prescription</h1>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" className="flex items-center gap-1">
              <Printer className="h-4 w-4" />
              Print
            </Button>
            <Button variant="outline" size="sm" className="flex items-center gap-1">
              <Download className="h-4 w-4" />
              Download
            </Button>
            <Button variant="outline" size="sm" className="flex items-center gap-1">
              <Share2 className="h-4 w-4" />
              Share
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Report Summary</CardTitle>
                <CardDescription>AI-generated summary based on your medical report</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="whitespace-pre-line">{prescriptionData.summary}</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Key Findings</CardTitle>
                <CardDescription>Important health metrics and observations from your report</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-4">
                  {prescriptionData.keyFindings.map((finding: string, index: number) => (
                    <li key={index} className="flex gap-3">
                      <div className="h-6 w-6 rounded-full bg-primary/10 text-primary flex items-center justify-center flex-shrink-0 mt-0.5">
                        {index + 1}
                      </div>
                      <p>{finding}</p>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Detailed Analysis</CardTitle>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="abnormal">
                  <TabsList className="mb-4">
                    <TabsTrigger value="abnormal">Abnormal Values</TabsTrigger>
                    <TabsTrigger value="normal">Normal Values</TabsTrigger>
                    <TabsTrigger value="all">All Parameters</TabsTrigger>
                  </TabsList>

                  <TabsContent value="abnormal">
                    <div className="border rounded-lg overflow-hidden">
                      <table className="w-full">
                        <thead className="bg-muted">
                          <tr>
                            <th className="px-4 py-2 text-left">Parameter</th>
                            <th className="px-4 py-2 text-left">Your Value</th>
                            <th className="px-4 py-2 text-left">Normal Range</th>
                            <th className="px-4 py-2 text-left">Status</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y">
                          {prescriptionData.abnormalParameters.map((param: any, index: number) => (
                            <tr key={index}>
                              <td className="px-4 py-3">{param.name}</td>
                              <td className="px-4 py-3 font-medium">{param.value}</td>
                              <td className="px-4 py-3">{param.range}</td>
                              <td className="px-4 py-3">
                                <span
                                  className={`px-2 py-1 rounded-full text-xs font-medium ${
                                    param.status === "High" ? "bg-red-100 text-red-800" : "bg-amber-100 text-amber-800"
                                  }`}
                                >
                                  {param.status}
                                </span>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </TabsContent>

                  <TabsContent value="normal">
                    <div className="border rounded-lg overflow-hidden">
                      <table className="w-full">
                        <thead className="bg-muted">
                          <tr>
                            <th className="px-4 py-2 text-left">Parameter</th>
                            <th className="px-4 py-2 text-left">Your Value</th>
                            <th className="px-4 py-2 text-left">Normal Range</th>
                            <th className="px-4 py-2 text-left">Status</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y">
                          {prescriptionData.normalParameters.map((param: any, index: number) => (
                            <tr key={index}>
                              <td className="px-4 py-3">{param.name}</td>
                              <td className="px-4 py-3 font-medium">{param.value}</td>
                              <td className="px-4 py-3">{param.range}</td>
                              <td className="px-4 py-3">
                                <span className="px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                                  Normal
                                </span>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </TabsContent>

                  <TabsContent value="all">
                    <div className="border rounded-lg overflow-hidden">
                      <table className="w-full">
                        <thead className="bg-muted">
                          <tr>
                            <th className="px-4 py-2 text-left">Parameter</th>
                            <th className="px-4 py-2 text-left">Your Value</th>
                            <th className="px-4 py-2 text-left">Normal Range</th>
                            <th className="px-4 py-2 text-left">Status</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y">
                          {[...prescriptionData.abnormalParameters, ...prescriptionData.normalParameters]
                            .sort((a, b) => a.name.localeCompare(b.name))
                            .map((param: any, index: number) => (
                              <tr key={index}>
                                <td className="px-4 py-3">{param.name}</td>
                                <td className="px-4 py-3 font-medium">{param.value}</td>
                                <td className="px-4 py-3">{param.range}</td>
                                <td className="px-4 py-3">
                                  <span
                                    className={`px-2 py-1 rounded-full text-xs font-medium ${
                                      param.status === "High"
                                        ? "bg-red-100 text-red-800"
                                        : param.status === "Low"
                                          ? "bg-amber-100 text-amber-800"
                                          : "bg-green-100 text-green-800"
                                    }`}
                                  >
                                    {param.status || "Normal"}
                                  </span>
                                </td>
                              </tr>
                            ))}
                        </tbody>
                      </table>
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-6">
            <Card>
              <CardHeader className="bg-primary/5 border-b">
                <CardTitle>Recommendations</CardTitle>
              </CardHeader>
              <CardContent className="pt-6">
                <div className="space-y-4">
                  {prescriptionData.recommendations.map((rec: string, index: number) => (
                    <div key={index} className="flex gap-3">
                      <div className="h-6 w-6 rounded-full bg-primary/10 text-primary flex items-center justify-center flex-shrink-0 mt-0.5">
                        {index + 1}
                      </div>
                      <p>{rec}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="bg-primary/5 border-b">
                <CardTitle>Potential Health Risks</CardTitle>
              </CardHeader>
              <CardContent className="pt-6">
                {prescriptionData.potentialRisks.length > 0 ? (
                  <div className="space-y-4">
                    {prescriptionData.potentialRisks.map((risk: any, index: number) => (
                      <div key={index} className="p-3 border rounded-lg">
                        <div className="flex items-center gap-2 mb-1">
                          <AlertCircle className="h-4 w-4 text-amber-500" />
                          <h3 className="font-medium">{risk.condition}</h3>
                        </div>
                        <p className="text-sm text-muted-foreground">{risk.description}</p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-center text-muted-foreground py-4">
                    No significant health risks identified based on your report.
                  </p>
                )}
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="bg-primary/5 border-b">
                <CardTitle>Lifestyle Modifications</CardTitle>
              </CardHeader>
              <CardContent className="pt-6">
                <div className="space-y-4">
                  {prescriptionData.lifestyleModifications.map((mod: string, index: number) => (
                    <div key={index} className="flex gap-3">
                      <div className="h-6 w-6 rounded-full bg-primary/10 text-primary flex items-center justify-center flex-shrink-0 mt-0.5">
                        {index + 1}
                      </div>
                      <p>{mod}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
              <CardFooter className="border-t">
                <Button className="w-full" onClick={() => router.push("/lifestyle-plan")}>
                  Get Personalized Lifestyle Plan
                </Button>
                <Button variant="outline" className="w-full mt-2" onClick={() => router.push("/view-health-products")}>
                  View Recommended Health Products
                </Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      </main>
    </div>
    </div>
  )
}

