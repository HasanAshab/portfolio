'use client';

import { useEffect, useCallback } from 'react';
import { analytics } from '@/lib/analytics';
import { usePathname } from 'next/navigation';

export function useAnalytics() {
  const pathname = usePathname();

  // Page view tracking disabled - using Vercel Analytics instead
  // useEffect(() => {
  //   analytics.trackPageView();
  // }, [pathname]);

  // Enhanced click tracking with automatic element detection
  const trackClick = useCallback((
    event: React.MouseEvent<HTMLElement>,
    customId?: string,
    customText?: string
  ) => {
    const element = event.currentTarget;
    const elementId = customId || element.id || element.className;
    const elementText = customText || 
      element.textContent?.trim() || 
      element.getAttribute('aria-label') ||
      element.getAttribute('title') ||
      'Unknown';

    analytics.trackClick(elementId, elementText);
  }, []);

  // Track specific interactions
  const trackDownload = useCallback((fileName: string) => {
    analytics.trackDownload(fileName);
  }, []);

  const trackContact = useCallback((method: string) => {
    analytics.trackContact(method);
  }, []);

  const trackProjectView = useCallback((projectName: string) => {
    analytics.trackProjectView(projectName);
  }, []);

  return {
    trackClick,
    trackDownload,
    trackContact,
    trackProjectView,
  };
}