'use client';

import { createContext, useContext, ReactNode } from 'react';
import { useAnalytics } from '@/hooks/useAnalytics';

interface AnalyticsContextType {
  trackClick: (event: React.MouseEvent<HTMLElement>, customId?: string, customText?: string) => void;
  trackDownload: (fileName: string) => void;
  trackContact: (method: string) => void;
  trackProjectView: (projectName: string) => void;
}

const AnalyticsContext = createContext<AnalyticsContextType | undefined>(undefined);

export function AnalyticsProvider({ children }: { children: ReactNode }) {
  const analytics = useAnalytics();

  return (
    <AnalyticsContext.Provider value={analytics}>
      {children}
    </AnalyticsContext.Provider>
  );
}

export function useAnalyticsContext() {
  const context = useContext(AnalyticsContext);
  if (context === undefined) {
    // Return a fallback that logs to console instead of throwing
    console.warn('useAnalyticsContext used outside of AnalyticsProvider, using fallback');
    return {
      trackClick: () => console.log('Analytics: Click tracked (fallback)'),
      trackDownload: () => console.log('Analytics: Download tracked (fallback)'),
      trackContact: () => console.log('Analytics: Contact tracked (fallback)'),
      trackProjectView: () => console.log('Analytics: Project view tracked (fallback)'),
    };
  }
  return context;
}