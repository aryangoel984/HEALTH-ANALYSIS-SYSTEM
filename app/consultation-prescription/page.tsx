"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Printer, Download, Share2, FileText, Pill, Calendar } from "lucide-react"
import DashboardHeader from "@/components/dashboard-header"

export default function ConsultationPrescription() {
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

    // Get consultation prescription from localStorage
    const prescriptionData = localStorage.getItem("consultationPrescription")
    if (!prescriptionData) {
      router.push("/doctors")
      return
    }

    setPrescriptionData(JSON.parse(prescriptionData))
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
    <div className ="flex justify-center">
    <div className="min-h-screen bg-background">
      <DashboardHeader />

      <main className="container py-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Consultation Prescription</h1>
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
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle>Consultation Summary</CardTitle>
                    <CardDescription>AI-generated summary based on your doctor consultation</CardDescription>
                  </div>
                  <div className="text-right text-sm text-muted-foreground">
                    <p>Date: {new Date().toLocaleDateString()}</p>
                    <p>Ref: CONS-{Math.random().toString(36).substring(2, 10).toUpperCase()}</p>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="whitespace-pre-line">{prescriptionData.summary}</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Pill className="h-5 w-5 text-primary" />
                  Prescribed Medications
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="border rounded-lg overflow-hidden">
                  <table className="w-full">
                    <thead className="bg-muted">
                      <tr>
                        <th className="px-4 py-2 text-left">Medication</th>
                        <th className="px-4 py-2 text-left">Dosage</th>
                        <th className="px-4 py-2 text-left">Frequency</th>
                        <th className="px-4 py-2 text-left">Duration</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y">
                      {prescriptionData.medications.map((med: any, index: number) => (
                        <tr key={index}>
                          <td className="px-4 py-3 font-medium">{med.name}</td>
                          <td className="px-4 py-3">{med.dosage}</td>
                          <td className="px-4 py-3">{med.frequency}</td>
                          <td className="px-4 py-3">{med.duration}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <div className="mt-4 p-3 bg-muted/50 rounded-lg">
                  <h4 className="font-medium mb-1">Special Instructions</h4>
                  <p className="text-sm">{prescriptionData.medicationInstructions}</p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5 text-primary" />
                  Diagnosis & Observations
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="diagnosis">
                  <TabsList className="mb-4">
                    <TabsTrigger value="diagnosis">Diagnosis</TabsTrigger>
                    <TabsTrigger value="symptoms">Symptoms</TabsTrigger>
                    <TabsTrigger value="observations">Observations</TabsTrigger>
                  </TabsList>

                  <TabsContent value="diagnosis">
                    <div className="space-y-3">
                      <div className="p-3 border rounded-lg">
                        <h4 className="font-medium mb-1">Primary Diagnosis</h4>
                        <p>{prescriptionData.diagnosis.primary}</p>
                      </div>

                      {prescriptionData.diagnosis.secondary && (
                        <div className="p-3 border rounded-lg">
                          <h4 className="font-medium mb-1">Secondary Diagnosis</h4>
                          <p>{prescriptionData.diagnosis.secondary}</p>
                        </div>
                      )}

                      <div className="p-3 border rounded-lg">
                        <h4 className="font-medium mb-1">Notes</h4>
                        <p>{prescriptionData.diagnosis.notes}</p>
                      </div>
                    </div>
                  </TabsContent>

                  <TabsContent value="symptoms">
                    <ul className="space-y-2">
                      {prescriptionData.symptoms.map((symptom: string, index: number) => (
                        <li key={index} className="flex gap-2">
                          <span className="h-5 w-5 rounded-full bg-primary/10 text-primary flex items-center justify-center flex-shrink-0">
                            {index + 1}
                          </span>
                          <span>{symptom}</span>
                        </li>
                      ))}
                    </ul>
                  </TabsContent>

                  <TabsContent value="observations">
                    <div className="space-y-3">
                      {prescriptionData.observations.map((observation: string, index: number) => (
                        <div key={index} className="p-3 border rounded-lg">
                          <p>{observation}</p>
                        </div>
                      ))}
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-6">
            <Card>
              <CardHeader className="bg-primary/5 border-b">
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="h-5 w-5 text-primary" />
                  Follow-up Plan
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-6">
                <div className="space-y-4">
                <Button variant="outline" className="w-full mt-2" onClick={() => router.push("/view-health-products")}>
                  View Recommended Health Products
            </Button>
                  <div className="p-3 border rounded-lg">
                    
                    <h4 className="font-medium mb-1">Next Appointment</h4>
                    <p>{prescriptionData.followUp.nextAppointment}</p>
                  </div>

                  {prescriptionData.followUp.tests.length > 0 && (
                    <div>
                      <h4 className="font-medium mb-2">Recommended Tests</h4>
                      <ul className="space-y-2">
                        {prescriptionData.followUp.tests.map((test: string, index: number) => (
                          <li key={index} className="flex gap-2">
                            <span className="h-5 w-5 rounded-full bg-primary/10 text-primary flex items-center justify-center flex-shrink-0">
                              {index + 1}
                            </span>
                            <span>{test}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </CardContent>
              <CardFooter className="border-t">
                <Button className="w-full">Schedule Follow-up</Button>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader className="bg-primary/5 border-b">
                <CardTitle>Lifestyle Recommendations</CardTitle>
              </CardHeader>
              <CardContent className="pt-6">
                <div className="space-y-4">
                  {prescriptionData.lifestyle.map((item: string, index: number) => (
                    <div key={index} className="flex gap-3">
                      <div className="h-6 w-6 rounded-full bg-primary/10 text-primary flex items-center justify-center flex-shrink-0 mt-0.5">
                        {index + 1}
                      </div>
                      <p>{item}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
              <CardFooter className="border-t">
                <Button className="w-full" onClick={() => router.push("/lifestyle-plan")}>
                  Get Personalized Lifestyle Plan
                </Button>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader className="bg-primary/5 border-b">
                <CardTitle>Doctor Information</CardTitle>
              </CardHeader>
              <CardContent className="pt-6">
                <div className="space-y-2">
                  <p>
                    <span className="font-medium">Name:</span> {prescriptionData.doctor.name}
                  </p>
                  <p>
                    <span className="font-medium">Specialty:</span> {prescriptionData.doctor.specialty}
                  </p>
                  <p>
                    <span className="font-medium">License:</span> {prescriptionData.doctor.license}
                  </p>
                  <p>
                    <span className="font-medium">Contact:</span> {prescriptionData.doctor.contact}
                  </p>
                </div>
              </CardContent>
            </Card>
            
          </div>
        </div>
      </main>
    </div>
    </div>
  )
}

