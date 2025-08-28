'use client'

import React, { useEffect } from 'react'

const AiAgentWidget: React.FC = () => {
  useEffect(() => {
    // Create script element
    const script = document.createElement('script')
    script.src = 'https://buildmyagent.io/widget/68aff2d26d39689687c858a6/widget-professional.js?widgetId=68aff2d26d39689687c858a6'
    script.async = true
    
    // Append script to document head
    document.head.appendChild(script)
    
    // Cleanup function to remove script when component unmounts
    return () => {
      if (document.head.contains(script)) {
        document.head.removeChild(script)
      }
    }
  }, [])

  return null // This component doesn't render anything visible
}

export default AiAgentWidget
