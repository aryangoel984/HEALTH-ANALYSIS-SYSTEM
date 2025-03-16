// "use client"

// import Link from "next/link"
// import { Button } from "@/components/ui/button"
// import { ArrowRight } from "lucide-react"

// export default function Home() {
//   return (
//     <div className="flex min-h-screen flex-col">
//       <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur">
//         <div className="container flex h-16 items-center justify-between">
//           <div className="flex items-center gap-2 font-bold text-xl text-primary">
//             <span className="bg-primary text-primary-foreground rounded-md p-1">Health</span>
//             <span>Sync</span>
//           </div>
//           <nav className="flex items-center gap-4">
//             <Link href="/login" className="text-sm font-medium hover:underline">
//               Login
//             </Link>
//             <Link href="/register">
//               <Button>Sign Up</Button>
//             </Link>
//           </nav>
//         </div>
//       </header>

//       <main className="flex-1">
//         <section className="py-20 md:py-28">
//           <div className="container flex flex-col items-center text-center">
//             <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
//               Your Complete <span className="text-primary">Health</span> Management Platform
//             </h1>
//             <p className="mt-6 max-w-3xl text-lg md:text-xl text-muted-foreground">
//               Get personalized health insights, AI-powered report analysis, and connect with doctors through live video
//               consultations.
//             </p>
//             <div className="mt-10 flex flex-col sm:flex-row gap-4">
//               <Link href="/register">
//                 <Button size="lg" className="gap-2">
//                   Get Started <ArrowRight size={16} />
//                 </Button>
//               </Link>
//               <Button
//                 size="lg"
//                 variant="outline"
//                 onClick={() => {
//                   const featuresSection = document.getElementById("features")
//                   if (featuresSection) {
//                     featuresSection.scrollIntoView({ behavior: "smooth" })
//                   }
//                 }}
//               >
//                 Learn More
//               </Button>
//             </div>
//           </div>
//         </section>

//         <section id="features" className="py-16 bg-muted/50">
//           <div className="container">
//             <h2 className="text-3xl font-bold text-center mb-12">How It Works</h2>
//             <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
//               {features.map((feature, index) => (
//                 <div
//                   key={index}
//                   className="flex flex-col items-center text-center p-6 bg-background rounded-lg shadow-sm"
//                 >
//                   <div className="h-12 w-12 flex items-center justify-center rounded-full bg-primary/10 text-primary mb-4">
//                     {feature.icon}
//                   </div>
//                   <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
//                   <p className="text-muted-foreground">{feature.description}</p>
//                 </div>
//               ))}
//             </div>
//           </div>
//         </section>
//       </main>

//       <footer className="border-t py-8">
//         <div className="container flex flex-col md:flex-row justify-between items-center gap-4">
//           <div className="flex items-center gap-2 font-bold">
//             <span className="bg-primary text-primary-foreground rounded-md p-1">Health</span>
//             <span>Sync</span>
//           </div>
//           <p className="text-sm text-muted-foreground">© {new Date().getFullYear()} HealthSync. All rights reserved.</p>
//         </div>
//       </footer>
//     </div>
//   )
// }

// const features = [
//   {
//     title: "Health Assessment",
//     description: "Complete a comprehensive health questionnaire to get personalized insights about your wellbeing.",
//     icon: (
//       <svg
//         xmlns="http://www.w3.org/2000/svg"
//         width="24"
//         height="24"
//         viewBox="0 0 24 24"
//         fill="none"
//         stroke="currentColor"
//         strokeWidth="2"
//         strokeLinecap="round"
//         strokeLinejoin="round"
//         className="lucide lucide-clipboard-list"
//       >
//         <rect width="8" height="4" x="8" y="2" rx="1" ry="1" />
//         <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" />
//         <path d="M12 11h4" />
//         <path d="M12 16h4" />
//         <path d="M8 11h.01" />
//         <path d="M8 16h.01" />
//       </svg>
//     ),
//   },
//   {
//     title: "AI Report Analysis",
//     description: "Upload your medical reports and get AI-powered analysis with detailed insights and recommendations.",
//     icon: (
//       <svg
//         xmlns="http://www.w3.org/2000/svg"
//         width="24"
//         height="24"
//         viewBox="0 0 24 24"
//         fill="none"
//         stroke="currentColor"
//         strokeWidth="2"
//         strokeLinecap="round"
//         strokeLinejoin="round"
//         className="lucide lucide-file-scan"
//       >
//         <path d="M20 10V7.5L14.5 2H6a2 2 0 0 0-2 2v16c0 1.1.9 2 2 2h4.5" />
//         <path d="M14 2v6h6" />
//         <path d="M16 22a2 2 0 0 1-2-2" />
//         <path d="M20 22a2 2 0 0 0 2-2" />
//         <path d="M20 14a2 2 0 0 1 2 2" />
//         <path d="M16 14a2 2 0 0 0-2 2" />
//       </svg>
//     ),
//   },
//   {
//     title: "Doctor Consultations",
//     description:
//       "Connect with specialized doctors through live video consultations and get personalized medical advice.",
//     icon: (
//       <svg
//         xmlns="http://www.w3.org/2000/svg"
//         width="24"
//         height="24"
//         viewBox="0 0 24 24"
//         fill="none"
//         stroke="currentColor"
//         strokeWidth="2"
//         strokeLinecap="round"
//         strokeLinejoin="round"
//         className="lucide lucide-video"
//       >
//         <path d="m22 8-6 4 6 4V8Z" />
//         <rect width="14" height="12" x="2" y="6" rx="2" ry="2" />
//       </svg>
//     ),
//   },
// ]

"use client"

import Link from "next/link"
import { useCallback } from "react"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"

export default function Home() {
  const scrollToFeatures = useCallback(() => {
    document.getElementById("features")?.scrollIntoView({ behavior: "smooth" })
  }, [])

  return (
    <div className="flex min-h-screen flex-col bg-gray-50 text-gray-900">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b bg-white/90 backdrop-blur-md shadow-md">
        <div className="container flex h-16 items-center justify-between px-6">
          {/* Logo */}
          <div className="flex items-center gap-2 text-2xl font-extrabold text-primary">
            <span className="bg-primary text-white px-2 py-1 rounded-md shadow">Health</span>
            <span>Sync</span>
          </div>

          {/* Navigation */}
          <nav className="flex items-center gap-6">
            <Link href="/login" className="text-sm font-medium hover:underline">
              Login
            </Link>
            <Link href="/register">
              <Button className="hover:shadow-lg transition-all">Sign Up</Button>
            </Link>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 pt-16">
        {/* Hero Section */}
        <section className="py-24 md:py-32 bg-gradient-to-b from-white to-gray-100 text-center">
          <div className="container flex flex-col items-center">
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight leading-tight">
              Your Complete <span className="text-primary">Health</span> Management Platform
            </h1>
            <p className="mt-6 max-w-2xl text-lg md:text-xl text-gray-600">
              Get personalized health insights, AI-powered report analysis, and connect with doctors through live video
              consultations.
            </p>

            {/* CTA Buttons */}
            <div className="mt-10 flex flex-col sm:flex-row gap-4">
              <Link href="/register">
                <Button size="lg" className="gap-2 shadow-md hover:shadow-lg transition-all" aria-label="Get Started">
                  Get Started <ArrowRight size={16} />
                </Button>
              </Link>
              <Button
                size="lg"
                variant="outline"
                onClick={scrollToFeatures}
                className="hover:bg-gray-200 transition-all"
                aria-label="Learn More"
              >
                Learn More
              </Button>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="py-20 bg-white">
          <div className="container">
            <h2 className="text-3xl font-bold text-center mb-12">How It Works</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {features.map((feature, index) => (
                <div
                  key={index}
                  className="flex flex-col items-center text-center p-6 bg-gray-50 rounded-lg shadow-md border border-gray-200 transition-all hover:shadow-lg"
                >
                  <div className="h-14 w-14 flex items-center justify-center rounded-full bg-primary/10 text-primary mb-4">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t py-8 bg-gray-100">
        <div className="container flex flex-col md:flex-row justify-between items-center px-6">
          {/* Logo */}
          <div className="flex items-center gap-2 text-lg font-semibold">
            <span className="bg-primary text-white px-2 py-1 rounded-md">Health</span>
            <span>Sync</span>
          </div>
          <p className="text-sm text-gray-500">© {new Date().getFullYear()} HealthSync. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}

// Features Data
const features = [
  {
    title: "Health Assessment",
    description: "Complete a comprehensive health questionnaire to get personalized insights about your wellbeing.",
    icon: <img src="https://www.svgrepo.com/show/260715/checkup.svg" alt="Health Assessment" width={32} height={32} loading="lazy" />,
  },
  {
    title: "AI Report Analysis",
    description: "Upload your medical reports and get AI-powered analysis with detailed insights and recommendations.",
    icon: <img src="https://cdn1.iconfinder.com/data/icons/artificial-intelligence-in-agriculture-line/128/Artificial_Intelligence_in_Agriculture_-_Line-03-512.png" alt="AI Report Analysis" width={32} height={32} loading="lazy" />,
  },
  {
    title: "Doctor Consultations",
    description:
      "Connect with specialized doctors through live video consultations and get personalized medical advice.",
    icon: <img src="https://uxwing.com/wp-content/themes/uxwing/download/medical-science-lab/online-doctor-consultation-icon.svg" alt="Doctor Consultations" width={32} height={32} loading="lazy" />,
  },
]
