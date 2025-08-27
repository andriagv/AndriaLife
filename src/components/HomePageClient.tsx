'use client'

import React, { Suspense, lazy } from 'react'
import Hero from '@/components/Hero'
import About from '@/components/About'
import CategorySelection from '@/components/CategorySelection'
import Footer from '@/components/Footer'

// Lazy load heavy components
const MathematicsTimeline = lazy(() => import('@/components/MathematicsTimeline'))
const AcademicAchievementsTimeline = lazy(() => import('@/components/AcademicAchievementsTimeline'))
const RoboticsComingSoon = lazy(() => import('@/components/RoboticsComingSoon'))
const Projects = lazy(() => import('@/components/Projects'))

import { useCategory } from '@/contexts/CategoryContext'

export default function HomePageClient() {
  const { category } = useCategory()
  
  return (
    <div className="min-h-screen">
      <main>
        <Hero 
          showHeroAnimation={true} 
        />
        <CategorySelection showTargetCursor={false} setShowTargetCursor={() => {}} />
        {category !== 'robotics' && <About />}
        {category === 'mathematics' && (
          <Suspense fallback={<div className="h-64 flex items-center justify-center">Loading...</div>}>
            <MathematicsTimeline setShowSplashCursor={() => {}} />
          </Suspense>
        )}
        {category === 'academic' && (
          <Suspense fallback={<div className="h-64 flex items-center justify-center">Loading...</div>}>
            <AcademicAchievementsTimeline setShowSplashCursor={() => {}} />
          </Suspense>
        )}
        {category === 'robotics' && (
          <Suspense fallback={<div className="h-64 flex items-center justify-center">Loading...</div>}>
            <RoboticsComingSoon />
          </Suspense>
        )}
        {category !== 'robotics' && category !== 'academic' && category !== 'mathematics' && (
          <Suspense fallback={<div className="h-64 flex items-center justify-center">Loading...</div>}>
            <Projects />
          </Suspense>
        )}
      </main>
      <Footer />
    </div>
  )
}
