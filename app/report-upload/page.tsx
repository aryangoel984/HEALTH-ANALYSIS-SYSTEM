"use client"

import type React from "react"

import { useState, useRef } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { FileUp, FileText, AlertCircle, CheckCircle2, Loader2 } from "lucide-react"
import DashboardHeader from "@/components/dashboard-header"
import { analyzeReport } from "@/lib/report-analysis"

export default function ReportUpload() {
  const router = useRouter()
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [file, setFile] = useState<File | null>(null)
  const [uploadProgress, setUploadProgress] = useState(0)
  const [uploadStatus, setUploadStatus] = useState<"idle" | "uploading" | "analyzing" | "complete" | "error">("idle")
  const [analysisResult, setAnalysisResult] = useState<any>(null)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0])
      setUploadStatus("idle")
      setAnalysisResult(null)
    }
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setFile(e.dataTransfer.files[0])
      setUploadStatus("idle")
      setAnalysisResult(null)
    }
  }

  const handleUpload = async () => {
    if (!file) return

    setUploadStatus("uploading")

    // Simulate upload progress
    let progress = 0
    const interval = setInterval(() => {
      progress += 5
      setUploadProgress(progress)
      if (progress >= 100) {
        clearInterval(interval)
        setUploadStatus("analyzing")

        // Simulate AI analysis
        setTimeout(async () => {
          try {
            // In a real app, we would send the file to a server for analysis
            const result = await analyzeReport(file.name)
            setAnalysisResult(result)
            setUploadStatus("complete")

            // Save the analysis result to localStorage
            localStorage.setItem("reportAnalysis", JSON.stringify(result))
          } catch (error) {
            console.error("Error analyzing report:", error)
            setUploadStatus("error")
          }
        }, 3000)
      }
    }, 100)
  }

  const handleViewPrescription = () => {
    router.push("/prescription")
  }

  return (
    <div className="flex justify-center">
    <div className="min-h-screen bg-background">
      <DashboardHeader />

      <main className="container py-6">
        <h1 className="text-3xl font-bold mb-6">Upload Medical Report</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Upload Your Medical Report</CardTitle>
                <CardDescription>
                  Upload your medical test reports for AI analysis and personalized insights
                </CardDescription>
              </CardHeader>
              <CardContent>
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleFileChange}
                  className="hidden"
                  accept=".pdf,.jpg,.jpeg,.png"
                />

                <div
                  className={`border-2 border-dashed rounded-lg p-10 text-center cursor-pointer transition-colors ${
                    file
                      ? "border-primary/50 bg-primary/5"
                      : "border-muted-foreground/25 hover:border-muted-foreground/50"
                  }`}
                  onClick={() => fileInputRef.current?.click()}
                  onDragOver={handleDragOver}
                  onDrop={handleDrop}
                >
                  {file ? (
                    <div className="space-y-2">
                      <CheckCircle2 className="h-10 w-10 text-primary mx-auto" />
                      <h3 className="font-medium text-lg">{file.name}</h3>
                      <p className="text-sm text-muted-foreground">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      <FileUp className="h-10 w-10 text-muted-foreground mx-auto" />
                      <h3 className="font-medium text-lg">Drag and drop your file here or click to browse</h3>
                      <p className="text-sm text-muted-foreground">Supported formats: PDF, JPG, JPEG, PNG (max 10MB)</p>
                    </div>
                  )}
                </div>

                {uploadStatus === "uploading" && (
                  <div className="mt-6 space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Uploading...</span>
                      <span>{uploadProgress}%</span>
                    </div>
                    <Progress value={uploadProgress} className="h-2" />
                  </div>
                )}

                {uploadStatus === "analyzing" && (
                  <div className="mt-6 flex items-center justify-center gap-2 text-primary">
                    <Loader2 className="h-5 w-5 animate-spin" />
                    <span>Analyzing your report with AI...</span>
                  </div>
                )}

                {uploadStatus === "error" && (
                  <div className="mt-6 flex items-center justify-center gap-2 text-destructive">
                    <AlertCircle className="h-5 w-5" />
                    <span>There was an error analyzing your report. Please try again.</span>
                  </div>
                )}
              </CardContent>
              <CardFooter className="flex justify-end gap-2">
                <Button
                  variant="outline"
                  onClick={() => {
                    setFile(null)
                    setUploadStatus("idle")
                    setAnalysisResult(null)
                  }}
                  disabled={!file || uploadStatus === "uploading" || uploadStatus === "analyzing"}
                >
                  Clear
                </Button>
                <Button
                  onClick={handleUpload}
                  disabled={
                    !file || uploadStatus === "uploading" || uploadStatus === "analyzing" || uploadStatus === "complete"
                  }
                >
                  {uploadStatus === "uploading"
                    ? "Uploading..."
                    : uploadStatus === "analyzing"
                      ? "Analyzing..."
                      : "Upload & Analyze"}
                </Button>
              </CardFooter>
            </Card>

            {uploadStatus === "complete" && (
              <Card className="mt-6">
                <CardHeader>
                  <CardTitle className="text-green-600 flex items-center gap-2">
                    <CheckCircle2 className="h-5 w-5" />
                    Analysis Complete
                  </CardTitle>
                  <CardDescription>Our AI has analyzed your medical report and generated insights</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="p-4 bg-muted rounded-lg">
                      <h3 className="font-medium mb-2">Summary</h3>
                      <p>{analysisResult?.summary}</p>
                    </div>

                    <div>
                      <h3 className="font-medium mb-2">Key Findings</h3>
                      <ul className="list-disc pl-5 space-y-1">
                        {analysisResult?.keyFindings.map((finding: string, index: number) => (
                          <li key={index}>{finding}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button onClick={handleViewPrescription} className="w-full">
                    View Full Prescription & Recommendations
                  </Button>
                </CardFooter>
              </Card>
            )}
          </div>

          <div>
            <Card>
              <CardHeader>
                <CardTitle>How It Works</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex gap-3">
                  <div className="h-8 w-8 rounded-full bg-primary/10 text-primary flex items-center justify-center flex-shrink-0">
                    1
                  </div>
                  <div>
                    <h3 className="font-medium">Upload Your Report</h3>
                    <p className="text-sm text-muted-foreground">
                      Upload your medical test reports in PDF or image format
                    </p>
                  </div>
                </div>

                <div className="flex gap-3">
                  <div className="h-8 w-8 rounded-full bg-primary/10 text-primary flex items-center justify-center flex-shrink-0">
                    2
                  </div>
                  <div>
                    <h3 className="font-medium">AI Analysis</h3>
                    <p className="text-sm text-muted-foreground">
                      Our AI analyzes your report to identify key health metrics and potential issues
                    </p>
                  </div>
                </div>

                <div className="flex gap-3">
                  <div className="h-8 w-8 rounded-full bg-primary/10 text-primary flex items-center justify-center flex-shrink-0">
                    3
                  </div>
                  <div>
                    <h3 className="font-medium">Get Personalized Insights</h3>
                    <p className="text-sm text-muted-foreground">
                      Receive a detailed prescription with insights, recommendations, and preventive measures
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="mt-6">
              <CardHeader>
                <CardTitle>Supported Report Types</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  <li className="flex items-center gap-2">
                    <FileText className="h-4 w-4 text-primary" />
                    <span>Complete Blood Count (CBC)</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <FileText className="h-4 w-4 text-primary" />
                    <span>Lipid Profile</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <FileText className="h-4 w-4 text-primary" />
                    <span>Liver Function Test</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <FileText className="h-4 w-4 text-primary" />
                    <span>Kidney Function Test</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <FileText className="h-4 w-4 text-primary" />
                    <span>Thyroid Function Test</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <FileText className="h-4 w-4 text-primary" />
                    <span>Blood Glucose Tests</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <FileText className="h-4 w-4 text-primary" />
                    <span>Vitamin & Mineral Panels</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
    </div>
  )
}

