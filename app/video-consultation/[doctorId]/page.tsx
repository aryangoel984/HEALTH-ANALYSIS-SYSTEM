"use client"

import { useState, useEffect, useRef } from "react"
import { useRouter, useParams } from "next/navigation"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Mic, MicOff, Video, VideoOff, Phone, Send } from "lucide-react"
import { getDoctorById } from "@/lib/doctors"
import { generatePrescription } from "@/lib/consultation-analysis"
import type { Doctor } from "@/lib/types"

export default function VideoConsultation() {
  const router = useRouter()
  const params = useParams()
  const doctorId = params.doctorId as string

  const [doctor, setDoctor] = useState<Doctor | null>(null)
  const [loading, setLoading] = useState(true)
  const [callStatus, setCallStatus] = useState<"connecting" | "connected" | "ended">("connecting")
  const [isMuted, setIsMuted] = useState(false)
  const [isVideoOff, setIsVideoOff] = useState(false)
  const [activeTab, setActiveTab] = useState("video")
  const [messages, setMessages] = useState<{ text: string; sender: "user" | "doctor"; time: Date }[]>([])
  const [messageInput, setMessageInput] = useState("")
  const [callDuration, setCallDuration] = useState(0)
  const [isGeneratingPrescription, setIsGeneratingPrescription] = useState(false)

  const localVideoRef = useRef<HTMLVideoElement>(null)
  const remoteVideoRef = useRef<HTMLVideoElement>(null)
  const timerRef = useRef<NodeJS.Timeout | null>(null)

  useEffect(() => {
    // Check if user is logged in
    const isLoggedIn = localStorage.getItem("isLoggedIn")
    if (!isLoggedIn) {
      router.push("/login")
      return
    }

    // Get doctor data
    const doctorData = getDoctorById(doctorId)
    if (!doctorData) {
      router.push("/doctors")
      return
    }

    setDoctor(doctorData)
    setLoading(false)

    // Simulate connecting to call
    setTimeout(() => {
      setCallStatus("connected")

      // Start timer for call duration
      timerRef.current = setInterval(() => {
        setCallDuration((prev) => prev + 1)
      }, 1000)

      // Simulate doctor sending a message
      setTimeout(() => {
        setMessages([
          {
            text: `Hello! I'm Dr. ${doctorData.name}. How can I help you today?`,
            sender: "doctor",
            time: new Date(),
          },
        ])
      }, 2000)

      // Setup mock video streams
      setupMockVideoStreams()
    }, 2000)

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current)
      }
    }
  }, [router, doctorId])

  const setupMockVideoStreams = () => {
    // Mock local video (user)
    if (localVideoRef.current) {
      localVideoRef.current.srcObject = new MediaStream()
      localVideoRef.current.muted = true // Mute local video to prevent echo
      localVideoRef.current.play().catch((e) => console.error("Error playing local video:", e))
    }

    // Mock remote video (doctor)
    if (remoteVideoRef.current) {
      remoteVideoRef.current.srcObject = new MediaStream()
      remoteVideoRef.current.play().catch((e) => console.error("Error playing remote video:", e))
    }
  }

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`
  }

  const handleSendMessage = () => {
    if (!messageInput.trim()) return

    const newMessage = {
      text: messageInput,
      sender: "user" as const,
      time: new Date(),
    }

    setMessages((prev) => [...prev, newMessage])
    setMessageInput("")

    // Simulate doctor response
    setTimeout(() => {
      const responses = [
        "I understand. Could you tell me more about your symptoms?",
        "How long have you been experiencing this?",
        "Have you taken any medication for this condition?",
        "I recommend we run some additional tests to get a clearer picture.",
        "Based on what you've told me, I have a few recommendations.",
      ]

      const randomResponse = responses[Math.floor(Math.random() * responses.length)]

      setMessages((prev) => [
        ...prev,
        {
          text: randomResponse,
          sender: "doctor",
          time: new Date(),
        },
      ])
    }, 2000)
  }

  const endCall = async () => {
    setCallStatus("ended")

    if (timerRef.current) {
      clearInterval(timerRef.current)
    }

    // Generate prescription based on consultation
    setIsGeneratingPrescription(true)

    try {
      // In a real app, this would analyze the actual conversation
      const prescription = await generatePrescription(messages, doctor?.specialty || "")

      // Save prescription to localStorage
      localStorage.setItem("consultationPrescription", JSON.stringify(prescription))

      // Redirect to prescription page after a delay
      setTimeout(() => {
        router.push("/consultation-prescription")
      }, 2000)
    } catch (error) {
      console.error("Error generating prescription:", error)
      setIsGeneratingPrescription(false)
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="mt-4 text-muted-foreground">Setting up your consultation...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="flex justify-center">
    <div className="min-h-screen bg-background flex flex-col">
      <div className="container py-4">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            {doctor && (
              <>
                <div className="relative h-10 w-10 rounded-full overflow-hidden">
                  <Image
                    src={doctor.image || "/placeholder.svg?height=40&width=40"}
                    alt={doctor.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <h2 className="font-medium">{doctor.name}</h2>
                  <p className="text-sm text-muted-foreground">{doctor.specialty}</p>
                </div>
              </>
            )}
          </div>

          <div className="flex items-center gap-2">
            <div className="text-sm font-medium">
              {callStatus === "connected" && (
                <span className="flex items-center gap-1">
                  <span className="h-2 w-2 rounded-full bg-green-500"></span>
                  {formatTime(callDuration)}
                </span>
              )}
              {callStatus === "connecting" && (
                <span className="flex items-center gap-1">
                  <span className="h-2 w-2 rounded-full bg-amber-500 animate-pulse"></span>
                  Connecting...
                </span>
              )}
            </div>

            <Button variant="destructive" size="sm" className="rounded-full h-8 w-8 p-0" onClick={endCall}>
              <Phone className="h-4 w-4 rotate-135" />
              <span className="sr-only">End call</span>
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 h-[calc(100vh-8rem)]">
          <div className="lg:col-span-2">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="h-full flex flex-col">
              <TabsList className="self-center mb-4">
                <TabsTrigger value="video">Video</TabsTrigger>
                <TabsTrigger value="chat">Chat</TabsTrigger>
              </TabsList>

              <TabsContent value="video" className="flex-1 flex flex-col">
                <div className="relative flex-1 bg-black rounded-lg overflow-hidden">
                  {callStatus === "connected" ? (
                    <>
                      <video
                        ref={remoteVideoRef}
                        className="w-full h-full object-cover"
                        poster="/placeholder.svg?height=600&width=800"
                      />

                      <div className="absolute bottom-4 right-4 w-32 h-48 rounded-lg overflow-hidden border-2 border-background shadow-lg">
                        <video
                          ref={localVideoRef}
                          className="w-full h-full object-cover"
                          poster="/placeholder.svg?height=150&width=100"
                        />
                      </div>

                      {isVideoOff && (
                        <div className="absolute inset-0 flex items-center justify-center bg-black/80">
                          <p className="text-white">Camera is off</p>
                        </div>
                      )}
                    </>
                  ) : callStatus === "connecting" ? (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="text-center text-white">
                        <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                        <p>Connecting to doctor...</p>
                      </div>
                    </div>
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center bg-black/90">
                      <div className="text-center text-white">
                        <p className="text-xl mb-2">Call Ended</p>
                        {isGeneratingPrescription ? (
                          <>
                            <div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                            <p>Generating your prescription...</p>
                          </>
                        ) : (
                          <Button onClick={() => router.push("/doctors")}>Return to Doctors</Button>
                        )}
                      </div>
                    </div>
                  )}
                </div>

                {callStatus === "connected" && (
                  <div className="flex justify-center gap-4 mt-4">
                    <Button
                      variant="outline"
                      size="icon"
                      className={`rounded-full h-12 w-12 ${isMuted ? "bg-red-100 text-red-600" : ""}`}
                      onClick={() => setIsMuted(!isMuted)}
                    >
                      {isMuted ? <MicOff className="h-5 w-5" /> : <Mic className="h-5 w-5" />}
                    </Button>
                    <Button
                      variant="outline"
                      size="icon"
                      className={`rounded-full h-12 w-12 ${isVideoOff ? "bg-red-100 text-red-600" : ""}`}
                      onClick={() => setIsVideoOff(!isVideoOff)}
                    >
                      {isVideoOff ? <VideoOff className="h-5 w-5" /> : <Video className="h-5 w-5" />}
                    </Button>
                    <Button variant="destructive" size="icon" className="rounded-full h-12 w-12" onClick={endCall}>
                      <Phone className="h-5 w-5 rotate-135" />
                    </Button>
                  </div>
                )}
              </TabsContent>

              <TabsContent value="chat" className="flex-1 flex flex-col">
                <div className="flex-1 border rounded-lg overflow-hidden flex flex-col">
                  <div className="flex-1 p-4 overflow-y-auto space-y-4">
                    {messages.map((message, index) => (
                      <div
                        key={index}
                        className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}
                      >
                        <div
                          className={`max-w-[80%] rounded-lg p-3 ${
                            message.sender === "user" ? "bg-primary text-primary-foreground" : "bg-muted"
                          }`}
                        >
                          <p>{message.text}</p>
                          <p className="text-xs opacity-70 mt-1">
                            {message.time.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="p-3 border-t">
                    <div className="flex gap-2">
                      <Input
                        placeholder="Type your message..."
                        value={messageInput}
                        onChange={(e) => setMessageInput(e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === "Enter") {
                            handleSendMessage()
                          }
                        }}
                      />
                      <Button size="icon" onClick={handleSendMessage}>
                        <Send className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </div>

          <div className="space-y-4">
            <Card>
              <CardContent className="p-4">
                <h3 className="font-medium mb-2">Patient Notes</h3>
                <Textarea placeholder="Take notes during your consultation..." className="min-h-[150px]" />
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <h3 className="font-medium mb-2">Doctor Information</h3>
                {doctor && (
                  <div className="space-y-2">
                    <p className="text-sm">
                      <span className="font-medium">Specialty:</span> {doctor.specialty}
                    </p>
                    <p className="text-sm">
                      <span className="font-medium">Experience:</span> {doctor.experience} years
                    </p>
                    <p className="text-sm">
                      <span className="font-medium">Bio:</span> {doctor.bio}
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <h3 className="font-medium mb-2">How It Works</h3>
                <ul className="space-y-2 text-sm">
                  <li className="flex gap-2">
                    <span className="h-5 w-5 rounded-full bg-primary/10 text-primary flex items-center justify-center flex-shrink-0">
                      1
                    </span>
                    <span>Discuss your health concerns with the doctor</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="h-5 w-5 rounded-full bg-primary/10 text-primary flex items-center justify-center flex-shrink-0">
                      2
                    </span>
                    <span>AI analyzes your conversation</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="h-5 w-5 rounded-full bg-primary/10 text-primary flex items-center justify-center flex-shrink-0">
                      3
                    </span>
                    <span>Receive a detailed prescription with recommendations</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
    </div>
  )
}

