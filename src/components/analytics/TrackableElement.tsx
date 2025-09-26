'use client';

import { ReactElement, cloneElement } from 'react';
import { useAnalyticsContext } from './AnalyticsProvider';

interface TrackableElementProps {
  children: ReactElement;
  eventType?: 'click' | 'download' | 'contact' | 'project_view';
  elementId?: string;
  elementText?: string;
  trackingData?: string; // For downloads, project names, etc.
}

export function TrackableElement({
  children,
  eventType = 'click',
  elementId,
  elementText,
  trackingData,
}: TrackableElementProps) {
  const { trackClick, trackDownload, trackContact, trackProjectView } = useAnalyticsContext();

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    // Call original onClick if it exists
    if (children.props.onClick) {
      children.props.onClick(event);
    }

    // Track the interaction
    switch (eventType) {
      case 'download':
        if (trackingData) trackDownload(trackingData);
        break;
      case 'contact':
        if (trackingData) trackContact(trackingData);
        break;
      case 'project_view':
        if (trackingData) trackProjectView(trackingData);
        break;
      default:
        trackClick(event, elementId, elementText);
    }
  };

  return cloneElement(children, {
    onClick: handleClick,
  });
}

// Convenience components for common use cases
export function TrackableButton({ children, ...props }: Omit<TrackableElementProps, 'children'> & { children: ReactElement }) {
  return <TrackableElement {...props}>{children}</TrackableElement>;
}

export function TrackableLink({ children, ...props }: Omit<TrackableElementProps, 'children'> & { children: ReactElement }) {
  return <TrackableElement {...props}>{children}</TrackableElement>;
}

export function TrackableDownload({ fileName, children }: { fileName: string; children: ReactElement }) {
  return (
    <TrackableElement eventType="download" trackingData={fileName}>
      {children}
    </TrackableElement>
  );
}

export function TrackableContact({ method, children }: { method: string; children: ReactElement }) {
  return (
    <TrackableElement eventType="contact" trackingData={method}>
      {children}
    </TrackableElement>
  );
}

export function TrackableProject({ projectName, children }: { projectName: string; children: ReactElement }) {
  return (
    <TrackableElement eventType="project_view" trackingData={projectName}>
      {children}
    </TrackableElement>
  );
}