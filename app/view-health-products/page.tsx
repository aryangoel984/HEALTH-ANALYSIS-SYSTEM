"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ShoppingCart, ArrowLeft } from "lucide-react"
import DashboardHeader from "@/components/dashboard-header"

// Mock product database
const allProducts = [
  {
    id: "ashwagandha-500mg",
    name: "Ashwagandha Root Extract",
    category: "stress-relief",
    image: "/product-images/ashwagandha.jpg",
    price: 599,
    rating: 4.7,
    reviewCount: 128,
    benefits: [
      "Reduces stress and anxiety",
      "Improves energy levels",
      "Supports immune function",
      "Enhances focus and concentration",
    ],
  },
  {
    id: "triphala-60caps",
    name: "Triphala Capsules",
    category: "detox",
    image: "/product-images/triphala.jpg",
    price: 499,
    rating: 4.5,
    reviewCount: 92,
    benefits: [
      "Supports healthy digestion",
      "Gentle detoxification",
      "Promotes regular elimination",
      "Rich in antioxidants",
    ],
  },
  {
    id: "brahmi-memory",
    name: "Brahmi Memory Support",
    category: "brain-health",
    image: "/product-images/brahmi.jpg",
    price: 649,
    rating: 4.6,
    reviewCount: 75,
    benefits: [
      "Enhances memory and recall",
      "Improves focus and concentration",
      "Reduces mental fatigue",
      "Supports overall brain health",
    ],
  },
  {
    id: "turmeric-curcumin",
    name: "Turmeric Curcumin Complex",
    category: "inflammation",
    image: "/product-images/turmeric.jpg",
    price: 549,
    rating: 4.8,
    reviewCount: 156,
    benefits: ["Reduces inflammation", "Supports joint health", "Powerful antioxidant", "Enhances immune function"],
  },
  {
    id: "shilajit-resin",
    name: "Pure Himalayan Shilajit Resin",
    category: "energy-boost",
    image: "/product-images/resin.jpg",
    price: 1299,
    rating: 4.9,
    reviewCount: 64,
    benefits: [
      "Boosts energy and reduces fatigue",
      "Enhances nutrient absorption",
      "Supports cognitive function",
      "Promotes cellular regeneration",
    ],
  },
  {
    id: "chyawanprash",
    name: "Traditional Chyawanprash",
    category: "immunity",
    image: "/product-images/chawanprash.jpg",
    price: 449,
    rating: 4.6,
    reviewCount: 108,
    benefits: [
      "Strengthens immune system",
      "Rich in antioxidants",
      "Supports respiratory health",
      "Enhances digestion",
    ],
  },
  {
    id: "arjuna-heart",
    name: "Arjuna Heart Support",
    category: "heart-health",
    image: "/product-images/arjuna.jpg",
    price: 699,
    rating: 4.7,
    reviewCount: 87,
    benefits: [
      "Supports heart function",
      "Maintains healthy blood pressure",
      "Strengthens cardiac muscle",
      "Antioxidant protection",
    ],
  },
  {
    id: "sleep-formula",
    name: "Ayurvedic Sleep Formula",
    category: "sleep-support",
    image: "/product-images/ayurveda.jpg",
    price: 599,
    rating: 4.5,
    reviewCount: 94,
    benefits: ["Promotes restful sleep", "Reduces time to fall asleep", "Calms the mind", "No morning grogginess"],
  },
  {
    id: "gymnema-blood-sugar",
    name: "Gymnema Blood Sugar Support",
    category: "diabetes-support",
    image: "/product-images/gymnema.jpg",
    price: 649,
    rating: 4.6,
    reviewCount: 72,
    benefits: [
      "Supports healthy blood sugar levels",
      "Reduces sugar cravings",
      "Supports pancreatic function",
      "Promotes metabolic health",
    ],
  },
  {
    id: "garcinia-weight",
    name: "Garcinia Weight Management",
    category: "weight-management",
    image: "/product-images/garcinia.jpg",
    price: 549,
    rating: 4.3,
    reviewCount: 118,
    benefits: ["Reduces appetite", "Blocks fat production", "Supports weight management", "Improves metabolism"],
  },
]

export default function ViewHealthProducts() {
  const router = useRouter()
  const [loading, setLoading] = useState(true)
  const [recommendedProducts, setRecommendedProducts] = useState<any[]>([])

  useEffect(() => {
    // Check if user is logged in
    const isLoggedIn = localStorage.getItem("isLoggedIn")
    if (!isLoggedIn) {
      router.push("/login")
      return
    }

    // Get prescription data from localStorage
    const reportPrescription = localStorage.getItem("reportAnalysis")
    const consultationPrescription = localStorage.getItem("consultationPrescription")

    // Simulate loading
    setTimeout(() => {
      // Randomly select 5 products from the 10 available products
      const shuffled = [...allProducts].sort(() => 0.5 - Math.random())
      setRecommendedProducts(shuffled.slice(0, 5))
      setLoading(false)
    }, 1000)
  }, [router])

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="mt-4 text-muted-foreground">Finding the best products for your health needs...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="flex justify-center">
      <div className="min-h-screen bg-background">
        <DashboardHeader />

        <main className="container py-6">
          <div className="flex items-center gap-4 mb-6">
            <Button variant="outline" size="icon" onClick={() => router.back()} className="h-10 w-10">
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <div>
              <h1 className="text-3xl font-bold">Recommended Health Products</h1>
              <p className="text-muted-foreground">Personalized product recommendations based on your health profile</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"> {/* Modified grid-cols */}
            {recommendedProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          <div className="flex justify-center mt-8">
            <Button
              onClick={() => {
                // Refresh the page to get new random products
                setLoading(true)
                const shuffled = [...allProducts].sort(() => 0.5 - Math.random())
                setTimeout(() => {
                  setRecommendedProducts(shuffled.slice(0, 5))
                  setLoading(false)
                }, 500)
              }}
              className="px-8"
            >
              Show More Products
            </Button>
          </div>
        </main>
      </div>
    </div>
  )
}

interface ProductCardProps {
  product: {
    id: string
    name: string
    category: string
    image: string
    price: number
    rating: number
    reviewCount: number
    benefits: string[]
  }
}

function ProductCard({ product }: ProductCardProps) {
    return (
      <Card className="overflow-hidden hover:shadow-md transition-all">
        <div className="aspect-square relative h-48"> {/* Set fixed height for square aspect ratio */}
          <Image
            src={product.image || "/placeholder.svg"}
            alt={product.name}
            fill
            className="object-cover"
            unoptimized // This will be removed when real images are used
          />
        </div>
        <CardHeader className="p-4">
          <div className="flex justify-between items-start">
            <div>
              <CardTitle className="text-lg">{product.name}</CardTitle>
              <CardDescription>
                <Badge variant="outline" className="mt-1">
                  {product.category
                    .split("-")
                    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                    .join(" ")}
                </Badge>
              </CardDescription>
            </div>
            <div className="text-lg font-bold">₹{product.price.toFixed(2)}</div>
          </div>
        </CardHeader>
        <CardContent className="p-4 pt-0">
          <h4 className="font-medium mb-2">Benefits:</h4>
          <ul className="space-y-1 text-sm">
            {product.benefits.map((benefit, index) => (
              <li key={index} className="flex items-start gap-2">
                <span className="h-5 w-5 rounded-full bg-primary/10 text-primary flex items-center justify-center flex-shrink-0 text-xs">
                  ✓
                </span>
                <span>{benefit}</span>
              </li>
            ))}
          </ul>
          <div className="flex items-center mt-3">
            {Array.from({ length: 5 }).map((_, i) => (
              <svg
                key={i}
                className={`w-4 h-4 ${i < Math.floor(product.rating) ? "text-yellow-400" : "text-gray-300"}`}
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            ))}
            <span className="ml-1 text-sm text-muted-foreground">({product.reviewCount})</span>
          </div>
        </CardContent>
        <CardFooter className="p-4 pt-0">
          <Button className="w-full gap-2">
            <ShoppingCart className="h-4 w-4" />
            Add to Cart
          </Button>
        </CardFooter>
      </Card>
    )
  }
  