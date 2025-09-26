'use client';

import { useState, useEffect } from 'react';

interface AnalyticsEvent {
  id: string;
  event_type: string;
  element_id?: string;
  element_text?: string;
  page_path: string;
  timestamp: string;
}

export function AnalyticsDebug() {
  const [events, setEvents] = useState<AnalyticsEvent[]>([]);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Listen for analytics events
    const originalFetch = window.fetch;
    window.fetch = async (...args) => {
      const response = await originalFetch(...args);
      
      // Check if this is an analytics tracking request
      if (args[0] === '/api/analytics/track' && args[1]?.method === 'POST') {
        try {
          const body = JSON.parse(args[1].body as string);
          setEvents(prev => [
            {
              id: Date.now().toString(),
              event_type: body.event_type,
              element_id: body.element_id,
              element_text: body.element_text,
              page_path: body.page_path,
              timestamp: new Date().toLocaleTimeString(),
            },
            ...prev.slice(0, 9) // Keep only last 10 events
          ]);
        } catch (e) {
          console.error('Failed to parse analytics event:', e);
        }
      }
      
      return response;
    };

    return () => {
      window.fetch = originalFetch;
    };
  }, []);

  if (!isVisible) {
    return (
      <button
        onClick={() => setIsVisible(true)}
        className="fixed bottom-4 left-4 z-50 bg-blue-500 text-white px-3 py-2 rounded-lg text-xs shadow-lg hover:bg-blue-600"
      >
        Show Analytics Debug
      </button>
    );
  }

  return (
    <div className="fixed bottom-4 left-4 z-50 bg-white dark:bg-gray-800 p-4 rounded-lg shadow-lg border max-w-sm">
      <div className="flex justify-between items-center mb-2">
        <h3 className="text-sm font-semibold">Analytics Debug</h3>
        <button
          onClick={() => setIsVisible(false)}
          className="text-xs text-gray-500 hover:text-gray-700"
        >
          ✕
        </button>
      </div>
      
      <div className="text-xs text-gray-600 mb-2">
        Events tracked: {events.length}
      </div>
      
      <div className="max-h-60 overflow-y-auto space-y-1">
        {events.length === 0 ? (
          <div className="text-xs text-gray-500 italic">
            No events tracked yet. Click around to see events appear here.
          </div>
        ) : (
          events.map((event) => (
            <div key={event.id} className="text-xs p-2 bg-gray-50 dark:bg-gray-700 rounded">
              <div className="font-semibold text-blue-600">{event.event_type}</div>
              <div className="text-gray-600 dark:text-gray-300">
                {event.element_text || event.element_id || 'Unknown element'}
              </div>
              <div className="text-gray-400 text-xs">{event.timestamp}</div>
            </div>
          ))
        )}
      </div>
      
      {events.length > 0 && (
        <button
          onClick={() => setEvents([])}
          className="mt-2 text-xs text-red-500 hover:text-red-700"
        >
          Clear Events
        </button>
      )}
    </div>
  );
}