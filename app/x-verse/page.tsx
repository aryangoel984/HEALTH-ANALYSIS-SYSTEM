// "use client"
// import { useState, useRef } from "react"
// import { Canvas, useFrame, useThree } from "@react-three/fiber"
// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
// import DashboardHeader from "@/components/dashboard-header"

// function HumanModel({ setSelectedPart }) {
//   // In a real app, we would load an actual 3D model
//   // For this demo, we'll create a simple representation

//   // Create refs for each body part
//   const headRef = useRef()
//   const chestRef = useRef()
//   const stomachRef = useRef()
//   const leftArmRef = useRef()
//   const rightArmRef = useRef()
//   const leftLegRef = useRef()
//   const rightLegRef = useRef()

//   // Hover state
//   const [hovered, setHovered] = useState(null)

//   // Colors
//   const defaultColor = "#f3f4f6"
//   const hoverColor = "#d1d5db"
//   const selectedColor = "#6366f1"

//   return (
//     <group position={[0, -1, 0]}>
//       {/* Head */}
//       <mesh
//         ref={headRef}
//         position={[0, 2, 0]}
//         onClick={() => setSelectedPart("head")}
//         onPointerOver={() => setHovered("head")}
//         onPointerOut={() => setHovered(null)}
//       >
//         <sphereGeometry args={[0.5, 32, 32]} />
//         <meshStandardMaterial color={hovered === "head" ? hoverColor : defaultColor} />
//       </mesh>

//       {/* Chest */}
//       <mesh
//         ref={chestRef}
//         position={[0, 1, 0]}
//         onClick={() => setSelectedPart("chest")}
//         onPointerOver={() => setHovered("chest")}
//         onPointerOut={() => setHovered(null)}
//       >
//         <boxGeometry args={[1.2, 0.8, 0.6]} />
//         <meshStandardMaterial color={hovered === "chest" ? hoverColor : defaultColor} />
//       </mesh>

//       {/* Stomach */}
//       <mesh
//         ref={stomachRef}
//         position={[0, 0.2, 0]}
//         onClick={() => setSelectedPart("stomach")}
//         onPointerOver={() => setHovered("stomach")}
//         onPointerOut={() => setHovered(null)}
//       >
//         <boxGeometry args={[1.1, 0.8, 0.5]} />
//         <meshStandardMaterial color={hovered === "stomach" ? hoverColor : defaultColor} />
//       </mesh>

//       {/* Left Arm */}
//       <mesh
//         ref={leftArmRef}
//         position={[-0.9, 0.8, 0]}
//         onClick={() => setSelectedPart("arms")}
//         onPointerOver={() => setHovered("arms")}
//         onPointerOut={() => setHovered(null)}
//       >
//         <boxGeometry args={[0.3, 1.2, 0.3]} />
//         <meshStandardMaterial color={hovered === "arms" ? hoverColor : defaultColor} />
//       </mesh>

//       {/* Right Arm */}
//       <mesh
//         ref={rightArmRef}
//         position={[0.9, 0.8, 0]}
//         onClick={() => setSelectedPart("arms")}
//         onPointerOver={() => setHovered("arms")}
//         onPointerOut={() => setHovered(null)}
//       >
//         <boxGeometry args={[0.3, 1.2, 0.3]} />
//         <meshStandardMaterial color={hovered === "arms" ? hoverColor : defaultColor} />
//       </mesh>

//       {/* Left Leg */}
//       <mesh
//         ref={leftLegRef}
//         position={[-0.4, -1, 0]}
//         onClick={() => setSelectedPart("legs")}
//         onPointerOver={() => setHovered("legs")}
//         onPointerOut={() => setHovered(null)}
//       >
//         <boxGeometry args={[0.4, 1.5, 0.4]} />
//         <meshStandardMaterial color={hovered === "legs" ? hoverColor : defaultColor} />
//       </mesh>

//       {/* Right Leg */}
//       <mesh
//         ref={rightLegRef}
//         position={[0.4, -1, 0]}
//         onClick={() => setSelectedPart("legs")}
//         onPointerOver={() => setHovered("legs")}
//         onPointerOut={() => setHovered(null)}
//       >
//         <boxGeometry args={[0.4, 1.5, 0.4]} />
//         <meshStandardMaterial color={hovered === "legs" ? hoverColor : defaultColor} />
//       </mesh>
//     </group>
//   )
// }

// function Scene({ setSelectedPart }) {
//   // Auto-rotate the scene
//   const { camera } = useThree()

//   useFrame(({ clock }) => {
//     const a = clock.getElapsedTime() * 0.2
//     camera.position.x = Math.sin(a) * 5
//     camera.position.z = Math.cos(a) * 5
//     camera.lookAt(0, 0, 0)
//   })

//   return (
//     <>
//       <ambientLight intensity={0.5} />
//       <directionalLight position={[10, 10, 5]} intensity={1} />
//       <HumanModel setSelectedPart={setSelectedPart} />
//     </>
//   )
// }

// const bodyPartInfo = {
//   head: {
//     title: "Head & Mind",
//     description: "In Ayurveda, the head is the seat of Prana (life force) and houses important marmas (vital points).",
//     recommendations: [
//       "Brahmi (Bacopa monnieri) - Enhances memory and cognitive function",
//       "Shankhpushpi - Calms the mind and improves focus",
//       "Jatamansi - Promotes restful sleep and reduces anxiety",
//       "Daily oil massage (Shiroabhyanga) to nourish the scalp and calm the mind",
//       "Nasya (nasal administration of herbal oils) to clear the sinuses and improve mental clarity",
//     ],
//   },
//   chest: {
//     title: "Heart & Lungs",
//     description: "The chest region contains vital organs governed primarily by Kapha and Vata doshas.",
//     recommendations: [
//       "Arjuna - Strengthens the heart and supports cardiovascular health",
//       "Tulsi (Holy Basil) - Supports respiratory health and immunity",
//       "Pranayama breathing exercises to improve lung capacity and oxygenation",
//       "Chest-opening yoga poses like Bhujangasana (Cobra Pose)",
//       "Avoid cold foods and drinks which can aggravate Kapha in the chest region",
//     ],
//   },
//   stomach: {
//     title: "Digestive System",
//     description: "Ayurveda considers the digestive system (Agni) as the cornerstone of health and wellbeing.",
//     recommendations: [
//       "Triphala - Supports digestive health and gentle detoxification",
//       "Ginger, cumin, and fennel - Enhance digestion and reduce bloating",
//       "Eat your largest meal at midday when digestive fire is strongest",
//       "Avoid ice-cold beverages which dampen the digestive fire",
//       "Practice Vajrasana (Thunderbolt Pose) after meals to aid digestion",
//     ],
//   },
//   arms: {
//     title: "Arms & Joints",
//     description: "The arms and joints are governed by Vata dosha and require proper lubrication and movement.",
//     recommendations: [
//       "Ashwagandha - Strengthens muscles and supports joint health",
//       "Boswellia and Turmeric - Reduce inflammation in joints",
//       "Regular oil massage with sesame or castor oil to lubricate joints",
//       "Gentle stretching exercises to maintain flexibility",
//       "Avoid excessive dry, cold, and raw foods which can aggravate Vata",
//     ],
//   },
//   legs: {
//     title: "Legs & Lower Body",
//     description: "The lower body is associated with Vata and Kapha doshas and supports our foundation and movement.",
//     recommendations: [
//       "Guggulu - Supports healthy circulation and joint function",
//       "Gotu Kola - Improves venous health and circulation",
//       "Regular walking to maintain joint mobility and circulation",
//       "Padabhyanga (foot massage) with warm oils before sleep",
//       "Viparita Karani (Legs-Up-The-Wall Pose) to improve circulation and reduce swelling",
//     ],
//   },
// }

// export default function XVersePage() {
//   const [selectedPart, setSelectedPart] = useState(null)

//   return (
//     <div className="min-h-screen bg-background">
//       <DashboardHeader />

//       <main className="container py-6">
//         <h1 className="text-3xl font-bold mb-6">X-Verse: Interactive Ayurvedic Body Map</h1>

//         <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
//           <div className="bg-black rounded-lg overflow-hidden h-[500px]">
//             <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
//               <Scene setSelectedPart={setSelectedPart} />
//             </Canvas>
//             <div className="text-center text-white bg-black/80 py-2 -mt-10 relative">
//               Click on different body parts to explore Ayurvedic insights
//             </div>
//           </div>

//           <div>
//             {selectedPart ? (
//               <Card>
//                 <CardHeader>
//                   <CardTitle>{bodyPartInfo[selectedPart].title}</CardTitle>
//                   <CardDescription>{bodyPartInfo[selectedPart].description}</CardDescription>
//                 </CardHeader>
//                 <CardContent>
//                   <h3 className="font-semibold mb-2">Ayurvedic Recommendations:</h3>
//                   <ul className="space-y-2">
//                     {bodyPartInfo[selectedPart].recommendations.map((rec, index) => (
//                       <li key={index} className="flex items-start gap-2">
//                         <span className="h-6 w-6 flex items-center justify-center rounded-full bg-primary/10 text-primary text-sm flex-shrink-0">
//                           {index + 1}
//                         </span>
//                         <span>{rec}</span>
//                       </li>
//                     ))}
//                   </ul>
//                 </CardContent>
//               </Card>
//             ) : (
//               <Card>
//                 <CardHeader>
//                   <CardTitle>Welcome to the Ayurvedic X-Verse</CardTitle>
//                   <CardDescription>
//                     Explore the human body through the lens of Ayurveda, the ancient Indian system of medicine.
//                   </CardDescription>
//                 </CardHeader>
//                 <CardContent>
//                   <p className="mb-4">
//                     Click on different parts of the 3D model to discover Ayurvedic insights and recommendations for each
//                     body region.
//                   </p>
//                   <p>
//                     According to Ayurveda, health is achieved by balancing the three doshas (Vata, Pitta, and Kapha) and
//                     maintaining proper function of the seven dhatus (tissues) and three malas (waste products).
//                   </p>
//                 </CardContent>
//               </Card>
//             )}
//           </div>
//         </div>
//       </main>
//     </div>
//   )
// }

