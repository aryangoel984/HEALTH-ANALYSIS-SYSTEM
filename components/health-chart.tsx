"use client"

import {
  RadarChart,
  Radar,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
  Tooltip,
  Legend,
} from "recharts"
import type { HealthData, HealthInsights } from "@/lib/types"

interface HealthChartProps {
  healthData: HealthData | null
  insights: HealthInsights | null
}

export default function HealthChart({ healthData, insights }: HealthChartProps) {
  if (!healthData || !insights) return null

  // Prepare data for radar chart
  const radarData = [
    {
      subject: "BMI",
      score: normalizeScore(insights.bmi.percentile),
      fullMark: 100,
    },
    {
      subject: "Sleep",
      score: normalizeScore(insights.sleep.percentile),
      fullMark: 100,
    },
    {
      subject: "Stress",
      score: normalizeScore(100 - insights.stress.percentile), // Invert stress (lower is better)
      fullMark: 100,
    },
    {
      subject: "Exercise",
      score: getExerciseScore(healthData.exerciseFrequency),
      fullMark: 100,
    },
    {
      subject: "Hydration",
      score: getHydrationScore(healthData.waterIntake),
      fullMark: 100,
    },
    {
      subject: "Diet",
      score: getDietScore(healthData.diet),
      fullMark: 100,
    },
  ]

  return (
    <div className="w-full h-full">
      <ResponsiveContainer width="100%" height="100%">
        <RadarChart cx="50%" cy="50%" outerRadius="80%" data={radarData}>
          <PolarGrid />
          <PolarAngleAxis dataKey="subject" />
          <PolarRadiusAxis angle={30} domain={[0, 100]} />
          <Radar name="Your Health Score" dataKey="score" stroke="#2563eb" fill="#3b82f6" fillOpacity={0.6} />
          <Tooltip />
          <Legend />
        </RadarChart>
      </ResponsiveContainer>
    </div>
  )
}

// Helper functions to normalize scores
function normalizeScore(value: number): number {
  return Math.min(Math.max(value, 0), 100)
}

function getExerciseScore(frequency: string): number {
  const scores: Record<string, number> = {
    never: 10,
    rarely: 30,
    sometimes: 50,
    regularly: 80,
    daily: 100,
  }
  return scores[frequency] || 50
}

function getHydrationScore(waterIntake: string): number {
  const scores: Record<string, number> = {
    "less-than-1L": 20,
    "1-2L": 50,
    "2-3L": 80,
    "more-than-3L": 100,
  }
  return scores[waterIntake] || 50
}

function getDietScore(diet: string): number {
  // This is a simplified scoring system
  const scores: Record<string, number> = {
    vegetarian: 80,
    vegan: 85,
    "non-vegetarian": 70,
    pescatarian: 75,
    other: 65,
  }
  return scores[diet] || 70
}

