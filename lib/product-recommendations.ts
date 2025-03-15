import type { Product } from "./types"

// Mock product database
const products: Product[] = [
  {
    id: "ashwagandha-500mg",
    name: "Ashwagandha Root Extract",
    category: "stress-relief",
    shortDescription: "Natural stress reliever and energy booster",
    fullDescription:
      "Ashwagandha is an adaptogenic herb that helps the body manage stress and promotes overall wellbeing. Our extract is made from organic ashwagandha roots.",
    price: 599,
    image: "/placeholder.svg?height=300&width=300",
    rating: 4.7,
    reviewCount: 128,
    ingredients: ["Organic Ashwagandha Root Extract", "Vegetable Cellulose Capsule"],
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
    shortDescription: "Digestive support and gentle detoxification",
    fullDescription:
      "Triphala is a traditional Ayurvedic formula made from three fruits: Amalaki, Bibhitaki, and Haritaki. It supports digestion, detoxification, and regular elimination.",
    price: 499,
    image: "/placeholder.svg?height=300&width=300",
    rating: 4.5,
    reviewCount: 92,
    ingredients: [
      "Organic Amalaki Fruit",
      "Organic Bibhitaki Fruit",
      "Organic Haritaki Fruit",
      "Vegetable Cellulose Capsule",
    ],
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
    shortDescription: "Enhances memory and cognitive function",
    fullDescription:
      "Brahmi (Bacopa monnieri) is a powerful herb known for its cognitive-enhancing properties. It supports memory, focus, and overall brain health.",
    price: 649,
    image: "/placeholder.svg?height=300&width=300",
    rating: 4.6,
    reviewCount: 75,
    ingredients: ["Organic Brahmi Extract", "Vegetable Cellulose Capsule"],
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
    shortDescription: "Anti-inflammatory and antioxidant support",
    fullDescription:
      "Our Turmeric Curcumin Complex combines high-potency turmeric extract with black pepper for enhanced absorption. It provides powerful anti-inflammatory and antioxidant benefits.",
    price: 549,
    image: "/placeholder.svg?height=300&width=300",
    rating: 4.8,
    reviewCount: 156,
    ingredients: [
      "Organic Turmeric Extract (95% Curcuminoids)",
      "Black Pepper Extract (Piperine)",
      "Vegetable Cellulose Capsule",
    ],
    benefits: ["Reduces inflammation", "Supports joint health", "Powerful antioxidant", "Enhances immune function"],
  },
  {
    id: "shilajit-resin",
    name: "Pure Himalayan Shilajit Resin",
    category: "energy-boost",
    shortDescription: "Natural energy and vitality enhancer",
    fullDescription:
      "Shilajit is a natural mineral resin found in the Himalayas. It's rich in fulvic acid and minerals that support energy, vitality, and overall health.",
    price: 1299,
    image: "/placeholder.svg?height=300&width=300",
    rating: 4.9,
    reviewCount: 64,
    ingredients: ["Pure Himalayan Shilajit Resin"],
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
    shortDescription: "Immune-boosting herbal jam",
    fullDescription:
      "Chyawanprash is a traditional Ayurvedic herbal jam made with Amla (Indian Gooseberry) and over 40 herbs and spices. It supports immunity, vitality, and overall health.",
    price: 449,
    image: "/placeholder.svg?height=300&width=300",
    rating: 4.6,
    reviewCount: 108,
    ingredients: ["Amla (Indian Gooseberry)", "Honey", "Ghee", "40+ Ayurvedic herbs and spices"],
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
    shortDescription: "Natural support for cardiovascular health",
    fullDescription:
      "Arjuna bark has been used in Ayurveda for centuries to support heart health. Our extract provides concentrated support for cardiovascular function and healthy blood pressure.",
    price: 699,
    image: "/placeholder.svg?height=300&width=300",
    rating: 4.7,
    reviewCount: 87,
    ingredients: ["Organic Arjuna Bark Extract", "Vegetable Cellulose Capsule"],
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
    shortDescription: "Natural sleep aid for restful nights",
    fullDescription:
      "Our Ayurvedic Sleep Formula combines Jatamansi, Ashwagandha, and other traditional herbs to promote relaxation and restful sleep without morning grogginess.",
    price: 599,
    image: "/placeholder.svg?height=300&width=300",
    rating: 4.5,
    reviewCount: 94,
    ingredients: [
      "Organic Jatamansi Root",
      "Organic Ashwagandha Root",
      "Organic Valerian Root",
      "Organic Chamomile Flower",
      "Vegetable Cellulose Capsule",
    ],
    benefits: ["Promotes restful sleep", "Reduces time to fall asleep", "Calms the mind", "No morning grogginess"],
  },
  {
    id: "gymnema-blood-sugar",
    name: "Gymnema Blood Sugar Support",
    category: "diabetes-support",
    shortDescription: "Natural support for healthy blood sugar levels",
    fullDescription:
      "Gymnema Sylvestre has been used in Ayurveda for centuries to support healthy blood sugar levels. Our extract provides concentrated support for metabolic health.",
    price: 649,
    image: "/placeholder.svg?height=300&width=300",
    rating: 4.6,
    reviewCount: 72,
    ingredients: ["Organic Gymnema Sylvestre Leaf Extract", "Vegetable Cellulose Capsule"],
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
    shortDescription: "Natural support for weight management",
    fullDescription:
      "Garcinia Cambogia contains hydroxycitric acid (HCA), which may help support weight management by reducing appetite and blocking fat production.",
    price: 549,
    image: "/placeholder.svg?height=300&width=300",
    rating: 4.3,
    reviewCount: 118,
    ingredients: ["Organic Garcinia Cambogia Extract (60% HCA)", "Vegetable Cellulose Capsule"],
    benefits: ["Reduces appetite", "Blocks fat production", "Supports weight management", "Improves metabolism"],
  },
]

export function getRecommendedProducts(categories: string[]) {
  // If no categories provided, return a selection of popular products
  if (!categories || categories.length === 0) {
    return products.slice(0, 6)
  }

  // Filter products that match the categories
  const matchingProducts = products.filter((product) => categories.includes(product.category))

  // If we have enough matching products, return them
  if (matchingProducts.length >= 3) {
    return matchingProducts
  }

  // Otherwise, add some popular products to fill the gap
  const popularProducts = products
    .filter((product) => !matchingProducts.includes(product))
    .sort((a, b) => b.rating - a.rating)
    .slice(0, 6 - matchingProducts.length)

  return [...matchingProducts, ...popularProducts]
}

