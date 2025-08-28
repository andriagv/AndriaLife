'use client'

import React, { useEffect, useState, useCallback } from 'react'

const AiAgentWidget: React.FC = () => {
  const [isLoaded, setIsLoaded] = useState(false)
  const [hasError, setHasError] = useState(false)
  const [shouldLoad, setShouldLoad] = useState(false)
  const [loadAttempts, setLoadAttempts] = useState(0)
  const [showManualTrigger, setShowManualTrigger] = useState(false)

  // Load widget only when user actually needs it
  const loadWidget = useCallback(() => {
    if (isLoaded || hasError || shouldLoad || loadAttempts > 2) return
    
    setShouldLoad(true)
    setLoadAttempts(prev => prev + 1)
  }, [isLoaded, hasError, shouldLoad, loadAttempts])

  // Manual trigger for loading widget
  const triggerLoad = useCallback(() => {
    loadWidget()
  }, [loadWidget])

  useEffect(() => {
    // Add global trigger function for manual loading
    ;(window as any).loadAiAgent = triggerLoad

    // Show manual trigger after 10 seconds if widget hasn't loaded
    const manualTriggerTimer = setTimeout(() => {
      if (!isLoaded && !shouldLoad) {
        setShowManualTrigger(true)
      }
    }, 10000)

    // Load widget only after user has been on the page for a while
    // or when they show clear intent to interact
    const timer = setTimeout(() => {
      loadWidget()
    }, 15000) // Load after 15 seconds for better performance

    // Load on specific user interactions that indicate they might need help
    const handleUserInteraction = () => {
      loadWidget()
    }

    // More specific event listeners
    document.addEventListener('click', handleUserInteraction, { once: true })
    document.addEventListener('keydown', handleUserInteraction, { once: true })
    
    // Load when user scrolls significantly (indicates engagement)
    let scrollCount = 0
    const handleScroll = () => {
      scrollCount++
      if (scrollCount > 5) { // Load after 5 scroll events
        loadWidget()
        document.removeEventListener('scroll', handleScroll)
      }
    }
    document.addEventListener('scroll', handleScroll)

    // Load when user hovers over potential help areas
    const handleHelpHover = () => {
      loadWidget()
    }
    
    // Add hover listeners to potential help areas
    const helpElements = document.querySelectorAll('[data-help], .help-trigger, .support-area')
    helpElements.forEach(element => {
      element.addEventListener('mouseenter', handleHelpHover, { once: true })
    })

    return () => {
      clearTimeout(timer)
      clearTimeout(manualTriggerTimer)
      document.removeEventListener('click', handleUserInteraction)
      document.removeEventListener('keydown', handleUserInteraction)
      document.removeEventListener('scroll', handleScroll)
      
      // Clean up hover listeners
      helpElements.forEach(element => {
        element.removeEventListener('mouseenter', handleHelpHover)
      })
      
      // Clean up global function
      delete (window as any).loadAiAgent
    }
  }, [loadWidget, triggerLoad, isLoaded, shouldLoad])

  useEffect(() => {
    if (!shouldLoad) return

    // Add performance monitoring
    const startTime = performance.now()

    // Preload the script for better performance
    const preloadLink = document.createElement('link')
    preloadLink.rel = 'preload'
    preloadLink.as = 'script'
    preloadLink.href = 'https://buildmyagent.io/widget/68aff2d26d39689687c858a6/widget-professional.js?widgetId=68aff2d26d39689687c858a6'
    document.head.appendChild(preloadLink)

    // Create script element with optimized loading
    const script = document.createElement('script')
    script.src = 'https://buildmyagent.io/widget/68aff2d26d39689687c858a6/widget-professional.js?widgetId=68aff2d26d39689687c858a6'
    script.async = true
    script.defer = true
    
    // Add loading event handlers with performance monitoring
    script.onload = () => {
      const loadTime = performance.now() - startTime
      setIsLoaded(true)
      setShowManualTrigger(false)
      console.log(`AI Agent Widget loaded successfully in ${loadTime.toFixed(2)}ms`)
    }
    
    script.onerror = () => {
      const loadTime = performance.now() - startTime
      setHasError(true)
      console.error(`Failed to load AI Agent Widget after ${loadTime.toFixed(2)}ms`)
    }
    
    // Append script to document head
    document.head.appendChild(script)
    
    // Cleanup function to remove script when component unmounts
    return () => {
      if (document.head.contains(script)) {
        document.head.removeChild(script)
      }
      if (document.head.contains(preloadLink)) {
        document.head.removeChild(preloadLink)
      }
    }
  }, [shouldLoad])

  // Show loading state if needed
  if (hasError && loadAttempts <= 2) {
    console.warn('AI Agent Widget failed to load, will retry on next interaction')
  }

  // Manual trigger button with beautiful design
  if (showManualTrigger && !isLoaded && !shouldLoad) {
    return (
      <>
        <style jsx>{`
          @keyframes pulse {
            0% {
              box-shadow: 0 4px 15px rgba(0,0,0,0.2);
            }
            50% {
              box-shadow: 0 4px 25px rgba(102, 126, 234, 0.4);
            }
            100% {
              box-shadow: 0 4px 15px rgba(0,0,0,0.2);
            }
          }
        `}</style>
        <div 
          style={{
            position: 'fixed',
            bottom: '20px',
            right: '20px',
            zIndex: 9999,
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            color: 'white',
            padding: '12px 20px',
            borderRadius: '25px',
            cursor: 'pointer',
            boxShadow: '0 4px 15px rgba(0,0,0,0.2)',
            fontSize: '14px',
            fontWeight: '500',
            transition: 'all 0.3s ease',
            border: '2px solid rgba(255,255,255,0.2)',
            backdropFilter: 'blur(10px)',
            animation: 'pulse 2s infinite'
          }}
          onClick={triggerLoad}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'scale(1.05)'
            e.currentTarget.style.boxShadow = '0 6px 20px rgba(0,0,0,0.3)'
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'scale(1)'
            e.currentTarget.style.boxShadow = '0 4px 15px rgba(0,0,0,0.2)'
          }}
        >
          💬 Need Help?
        </div>
      </>
    )
  }

  return null // This component doesn't render anything visible
}

export default AiAgentWidget
