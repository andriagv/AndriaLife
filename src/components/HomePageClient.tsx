'use client'

import React from 'react'
import Hero from '@/components/Hero'
import About from '@/components/About'
import CategorySelection from '@/components/CategorySelection'
import MathematicsTimeline from '@/components/MathematicsTimeline'
import AcademicAchievementsTimeline from '@/components/AcademicAchievementsTimeline'
import RoboticsComingSoon from '@/components/RoboticsComingSoon'
import Projects from '@/components/Projects'
import Footer from '@/components/Footer'

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
          <MathematicsTimeline setShowSplashCursor={() => {}} />
        )}
        {category === 'academic' && (
          <AcademicAchievementsTimeline setShowSplashCursor={() => {}} />
        )}
        {category === 'robotics' && (
          <RoboticsComingSoon />
        )}
        {category !== 'robotics' && category !== 'academic' && category !== 'mathematics' && <Projects />}
      </main>
      <Footer />
    </div>
  )
}
