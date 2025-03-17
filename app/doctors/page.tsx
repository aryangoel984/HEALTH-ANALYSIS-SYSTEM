"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Clock, MapPin, Star, Video, Search } from "lucide-react"
import DashboardHeader from "@/components/dashboard-header"
import { getDoctors } from "@/lib/doctors"
import type { Doctor } from "@/lib/types"

export default function DoctorsPage() {
  const router = useRouter()
  const [doctors, setDoctors] = useState<Doctor[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedSpecialty, setSelectedSpecialty] = useState<string>("all")
  const [searchQuery, setSearchQuery] = useState("")

  useEffect(() => {
    // Check if user is logged in
    const isLoggedIn = localStorage.getItem("isLoggedIn")
    if (!isLoggedIn) {
      router.push("/login")
      return
    }

    // Get doctors data
    const doctorsData = getDoctors()
    setDoctors(doctorsData)
    setLoading(false)
  }, [router])

  const filteredDoctors = doctors
    .filter((doctor) => selectedSpecialty === "all" || doctor.specialty === selectedSpecialty)
    .filter(
      (doctor) =>
        searchQuery === "" ||
        doctor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        doctor.specialty.toLowerCase().includes(searchQuery.toLowerCase()),
    )

  const specialties = ["all", ...new Set(doctors.map((doctor) => doctor.specialty))]

  const handleDoctorSelect = (doctorId: string) => {
    router.push(`/video-consultation/${doctorId}`)
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-background to-muted/50">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="mt-4 text-muted-foreground">Loading doctors...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="flex justify-center">
    <div className="min-h-screen bg-gradient-to-br from-background to-muted/50">
      <DashboardHeader />

      <main className="container py-8">
        <h1 className="text-4xl font-bold mb-6 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
          Find a Doctor
        </h1>

        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search by name or specialty"
              className="pl-9"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <Select value={selectedSpecialty} onValueChange={setSelectedSpecialty}>
            <SelectTrigger className="w-full md:w-[200px]">
              <SelectValue placeholder="Filter by specialty" />
            </SelectTrigger>
            <SelectContent>
              {specialties.map((specialty) => (
                <SelectItem key={specialty} value={specialty}>
                  {specialty === "all" ? "All Specialties" : specialty}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <Tabs defaultValue="available">
          <TabsList className="mb-6">
            <TabsTrigger value="available">Available Now</TabsTrigger>
            <TabsTrigger value="all">All Doctors</TabsTrigger>
            <TabsTrigger value="favorites">Favorites</TabsTrigger>
          </TabsList>

          <TabsContent value="available" className="space-y-6">
            {filteredDoctors.filter((doctor) => doctor.isAvailableNow).length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredDoctors
                  .filter((doctor) => doctor.isAvailableNow)
                  .map((doctor) => (
                    <DoctorCard key={doctor.id} doctor={doctor} onSelect={() => handleDoctorSelect(doctor.id)} />
                  ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <div className="h-12 w-12 rounded-full bg-muted flex items-center justify-center mx-auto mb-4">
                  <Clock className="h-6 w-6 text-muted-foreground" />
                </div>
                <h3 className="text-lg font-medium mb-1">No doctors available right now</h3>
                <p className="text-muted-foreground">
                  Please check back later or view all doctors to schedule an appointment
                </p>
              </div>
            )}
          </TabsContent>

          <TabsContent value="all" className="space-y-6">
            {filteredDoctors.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredDoctors.map((doctor) => (
                  <DoctorCard key={doctor.id} doctor={doctor} onSelect={() => handleDoctorSelect(doctor.id)} />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-muted-foreground">No doctors match your search criteria</p>
              </div>
            )}
          </TabsContent>

          <TabsContent value="favorites" className="space-y-6">
            <div className="text-center py-12">
              <div className="h-12 w-12 rounded-full bg-muted flex items-center justify-center mx-auto mb-4">
                <Star className="h-6 w-6 text-muted-foreground" />
              </div>
              <h3 className="text-lg font-medium mb-1">No favorite doctors yet</h3>
              <p className="text-muted-foreground">Add doctors to your favorites for quick access</p>
            </div>
          </TabsContent>
        </Tabs>
      </main>
    </div>
    </div>
  )
}

interface DoctorCardProps {
  doctor: Doctor
  onSelect: () => void
}

const svgUrl = "YOUR_SVG_URL_HERE"; // Replace with your actual SVG URL

const DoctorIcon = () => {
  const [svgContent, setSvgContent] = useState<string | null>(null);

  useEffect(() => {
    const fetchSvg = async () => {
      try {
        const response = await fetch(svgUrl);
        const text = await response.text();
        setSvgContent(text);
      } catch (error) {
        console.error("Error fetching SVG:", error);
        setSvgContent(null); // Handle error state
      }
    };

    fetchSvg();
  }, []);

  if (!svgContent) {
    return <span>Loading...</span>; // Or some other loading indicator
  }

  return (
    <div
      className="w-4 h-4" // Adjust size as needed
      dangerouslySetInnerHTML={{ __html: svgContent }}
    />
  );
};
function DoctorCard({ doctor, onSelect }: DoctorCardProps) {
  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow bg-gradient-to-br from-background to-muted/50">
      <CardHeader className="pb-2">
        <div className="flex items-start gap-4">
          <div className="relative h-16 w-16 rounded-full overflow-hidden border-2 border-primary/20">
            <Image
              src={doctor.image || "/placeholder.svg?height=64&width=64"}
              alt={doctor.name}
              fill
              style={{ objectFit: "cover" }} // Use style for objectFit
            />
          </div>
          <div className="flex-1"> {/* Take remaining space */}
            <CardTitle className="text-lg">{doctor.name}</CardTitle>
            <CardDescription>{doctor.specialty}</CardDescription>
            <div className="flex items-center mt-1">
              <Star className="h-4 w-4 text-yellow-400 fill-yellow-400" />
              <span className="ml-1 text-sm">{doctor.rating}</span>
              <span className="mx-1 text-muted-foreground">•</span>
              <span className="text-sm text-muted-foreground">
                {doctor.reviewCount} reviews
              </span>
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent className="pb-2">
        <div className="space-y-2 text-sm">
          <div className="flex items-center gap-2">
            <Video className="h-4 w-4 text-muted-foreground" />
            <span>Video Consultation Available</span>
          </div>
          <div className="flex items-center gap-2">
            <Clock className="h-4 w-4 text-muted-foreground" />
            <span>
              {doctor.isAvailableNow ? (
                <span className="text-green-600 font-medium">
                  Available Now
                </span>
              ) : (
                `Available ${doctor.availability}`
              )}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <MapPin className="h-4 w-4 text-muted-foreground" />
            <span>{doctor.location}</span>
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button
          className="w-full gap-2 hover:bg-primary/90 transition-colors"
          onClick={onSelect}
        >
          <Video className="h-4 w-4" />
          {doctor.isAvailableNow
            ? "Start Consultation"
            : "Schedule Consultation"}
        </Button>
      </CardFooter>
    </Card>
  );
}