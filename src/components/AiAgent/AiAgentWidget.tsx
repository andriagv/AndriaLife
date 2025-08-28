'use client'

import React, { useEffect, useState, useCallback } from 'react'

const AiAgentWidget: React.FC = () => {
  const [isLoaded, setIsLoaded] = useState(false)
  const [hasError, setHasError] = useState(false)
  const [shouldLoad, setShouldLoad] = useState(false)
  const [loadAttempts, setLoadAttempts] = useState(0)
  const [showManualTrigger, setShowManualTrigger] = useState(true) // Show immediately

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

    // Load widget immediately for better user experience
    const timer = setTimeout(() => {
      loadWidget()
    }, 2000) // Load after just 2 seconds

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
      if (scrollCount > 3) { // Load after 3 scroll events
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

    // Create script element with optimized loading
    const script = document.createElement('script')
    //script.src = 'https://buildmyagent.io/widget/68aff2d26d39689687c858a6/widget-professional.js?widgetId=68aff2d26d39689687c858a6'
    script.src = 'https://buildmyagent.io/widget/68b06677a76de6ed8699065c/widget-professional.js?widgetId=68b06677a76de6ed8699065c'
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
    }
  }, [shouldLoad])

  // Show loading state if needed
  if (hasError && loadAttempts <= 2) {
    console.warn('AI Agent Widget failed to load, will retry on next interaction')
  }

  // Manual trigger button with beautiful design
  if (showManualTrigger && !isLoaded && !shouldLoad) {
    return (
      <div 
        style={{
          position: 'fixed',
          bottom: '20px',
          right: '20px',
          zIndex: 9999,
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          color: 'white',
          padding: '14px 24px',
          borderRadius: '30px',
          cursor: 'pointer',
          boxShadow: '0 8px 25px rgba(102, 126, 234, 0.4)',
          fontSize: '16px',
          fontWeight: '600',
          transition: 'all 0.3s ease',
          border: '2px solid rgba(255,255,255,0.3)',
          backdropFilter: 'blur(10px)',
          animation: 'pulse 1.5s infinite',
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          fontFamily: 'Inter, sans-serif'
        }}
        onClick={triggerLoad}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = 'scale(1.1)'
          e.currentTarget.style.boxShadow = '0 12px 35px rgba(102, 126, 234, 0.6)'
          e.currentTarget.style.background = 'linear-gradient(135deg, #5a6fd8 0%, #6a4190 100%)'
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = 'scale(1)'
          e.currentTarget.style.boxShadow = '0 8px 25px rgba(102, 126, 234, 0.4)'
          e.currentTarget.style.background = 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
        }}
      >
        <span style={{ fontSize: '20px' }}>💬</span>
        <span>Need Help?</span>
      </div>
    )
  }

  return null // This component doesn't render anything visible
}

export default AiAgentWidget
