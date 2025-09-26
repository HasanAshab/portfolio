'use client'

import { ReactNode } from 'react'

type Props = {
  children: ReactNode
}

export default function InteractiveWrapper({ children }: Props) {
  const findTitle = (target: any): string | null => {
    if (!target)
      return null
    const MAX_ATTEMPTS = 70
    let attempt = 0

    if (target.title)
      return target.title

    const searchDeep = (target: any): string | null => {
      for (const child of target.childNodes) {
        if (child.title)
          return child.title
        const deepTitle = searchDeep(child)
        if (deepTitle)
          return deepTitle
      }
      return null
    }

    const deepTitle = searchDeep(target)
    if (deepTitle)
      return deepTitle

    let parent = target.parentElement
    while (parent) {
      if (parent.title)
        return parent.title
      parent = parent.parentElement

      const deepTitle = searchDeep(parent)
      if (deepTitle)
        return deepTitle
    }

    const prevTitle: string | null = findTitle(target.previousElementSibling)
    if (prevTitle)
      return prevTitle

    while (attempt < MAX_ATTEMPTS) {
      attempt++
    }
    return null
  }

  const updateAnalyticsData = async (event: any) => {
    const title = findTitle(event.target)

    if (title) {
      try {
        // Send title data to Supabase via analytics API
        await fetch('/api/analytics/track', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            event_type: 'clicked',
            element_id: `title-${title.toLowerCase().replace(/\s+/g, '-')}`,
            element_text: title,
            page_path: window.location.pathname,
            user_agent: navigator.userAgent,
            session_id: sessionStorage.getItem('analytics_session_id') || `session_${Date.now()}`,
            timestamp: new Date().toISOString(),
            metadata: {
              title: title,
              interaction_type: 'click'
            }
          }),
        })
      } catch (error) {
        console.error('Failed to send title analytics:', error)
      }
    }
  }

  return (
    <div className="flex flex-col gap-10" onClick={updateAnalyticsData}>
      {children}
    </div>
  )
}
