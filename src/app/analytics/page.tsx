'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface AnalyticsData {
  events: any[];
  summary: {
    totalEvents: number;
    uniqueSessions: number;
    eventTypes: Record<string, number>;
    topPages: Record<string, number>;
    topElements: Record<string, number>;
    recentActivity: any[];
    dailyStats: Record<string, number>;
  };
  totalEvents: number;
}

export default function AnalyticsPage() {
  const [data, setData] = useState<AnalyticsData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [token, setToken] = useState('');
  const [authenticated, setAuthenticated] = useState(false);
  const [clearing, setClearing] = useState(false);

  const fetchData = async (authToken: string) => {
    try {
      setLoading(true);
      const response = await fetch('/api/analytics/data', {
        headers: {
          'Authorization': `Bearer ${authToken}`,
        },
      });

      if (response.status === 401) {
        setError('Invalid authentication token');
        setAuthenticated(false);
        return;
      }

      if (!response.ok) {
        throw new Error('Failed to fetch analytics data');
      }

      const analyticsData = await response.json();
      setData(analyticsData);
      setAuthenticated(true);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (token.trim()) {
      fetchData(token.trim());
    }
  };

  const handleClearData = async () => {
    if (!confirm('Are you sure you want to clear ALL analytics data? This action cannot be undone.')) {
      return;
    }

    try {
      setClearing(true);
      const response = await fetch('/api/analytics/clear', {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error('Failed to clear analytics data');
      }

      // Refresh data after clearing
      await fetchData(token);
      alert('Analytics data cleared successfully!');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to clear data');
    } finally {
      setClearing(false);
    }
  };

  const handleDeleteEvent = async (eventId: string) => {
    if (!confirm('Are you sure you want to delete this event?')) {
      return;
    }

    try {
      const response = await fetch('/api/analytics/delete', {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id: eventId }),
      });

      if (!response.ok) {
        throw new Error('Failed to delete event');
      }

      // Remove the event from local state instead of refetching all data
      if (data) {
        const updatedEvents = data.events.filter(event => event.id !== eventId);
        const updatedRecentActivity = data.summary.recentActivity.filter(event => event.id !== eventId);
        
        // Update event type counts
        const deletedEvent = data.events.find(event => event.id === eventId);
        const updatedEventTypes = { ...data.summary.eventTypes };
        if (deletedEvent && updatedEventTypes[deletedEvent.event_type]) {
          updatedEventTypes[deletedEvent.event_type] = Math.max(0, updatedEventTypes[deletedEvent.event_type] - 1);
          if (updatedEventTypes[deletedEvent.event_type] === 0) {
            delete updatedEventTypes[deletedEvent.event_type];
          }
        }

        // Update top elements count
        const updatedTopElements = { ...data.summary.topElements };
        if (deletedEvent && deletedEvent.element_text && updatedTopElements[deletedEvent.element_text]) {
          updatedTopElements[deletedEvent.element_text] = Math.max(0, updatedTopElements[deletedEvent.element_text] - 1);
          if (updatedTopElements[deletedEvent.element_text] === 0) {
            delete updatedTopElements[deletedEvent.element_text];
          }
        }

        // Update top pages count
        const updatedTopPages = { ...data.summary.topPages };
        if (deletedEvent && updatedTopPages[deletedEvent.page_path]) {
          updatedTopPages[deletedEvent.page_path] = Math.max(0, updatedTopPages[deletedEvent.page_path] - 1);
          if (updatedTopPages[deletedEvent.page_path] === 0) {
            delete updatedTopPages[deletedEvent.page_path];
          }
        }

        setData({
          ...data,
          events: updatedEvents,
          summary: {
            ...data.summary,
            totalEvents: Math.max(0, data.summary.totalEvents - 1),
            eventTypes: updatedEventTypes,
            topElements: updatedTopElements,
            topPages: updatedTopPages,
            recentActivity: updatedRecentActivity,
          },
          totalEvents: Math.max(0, data.totalEvents - 1),
        });
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete event');
    }
  };

  useEffect(() => {
    // Try to get token from localStorage
    const savedToken = localStorage.getItem('analytics_token');
    if (savedToken) {
      setToken(savedToken);
      fetchData(savedToken);
    } else {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (authenticated && token) {
      localStorage.setItem('analytics_token', token);
    }
  }, [authenticated, token]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading analytics data...</p>
        </div>
      </div>
    );
  }

  if (!authenticated) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle>Analytics Dashboard</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label htmlFor="token" className="block text-sm font-medium text-gray-700">
                  Access Token
                </label>
                <input
                  type="password"
                  id="token"
                  value={token}
                  onChange={(e) => setToken(e.target.value)}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter your admin token"
                  required
                />
              </div>
              {error && (
                <div className="text-red-600 text-sm">{error}</div>
              )}
              <button
                type="submit"
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Access Dashboard
              </button>
            </form>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardContent className="text-center py-8">
            <p className="text-red-600 mb-4">{error}</p>
            <button
              onClick={() => {
                setAuthenticated(false);
                setError(null);
                localStorage.removeItem('analytics_token');
              }}
              className="text-blue-600 hover:text-blue-800"
            >
              Try Again
            </button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6 mt-18">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8 flex justify-between items-center">
          <h1 className="text-3xl font-bold text-gray-900">Portfolio Analytics</h1>
          <div className="flex gap-2">
            <button
              onClick={() => fetchData(token)}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
              Refresh Data
            </button>
            <button
              onClick={handleClearData}
              disabled={clearing}
              className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {clearing ? 'Clearing...' : 'Clear All Data'}
            </button>
          </div>
        </div>

        {data && (
          <>
            {/* Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-gray-600">Total Events</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{data.summary.totalEvents}</div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-gray-600">Unique Sessions</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{data.summary.uniqueSessions}</div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-gray-600">Page Views</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{data.summary.eventTypes.page_view || 0}</div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-gray-600">Clicks</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{data.summary.eventTypes.click || 0}</div>
                </CardContent>
              </Card>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
              {/* Event Types */}
              <Card>
                <CardHeader>
                  <CardTitle>Event Types</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {Object.entries(data.summary.eventTypes).map(([type, count]) => (
                      <div key={type} className="flex justify-between items-center">
                        <span className="capitalize">{type.replace('_', ' ')}</span>
                        <span className="font-semibold">{count}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Top Pages */}
              <Card>
                <CardHeader>
                  <CardTitle>Top Pages</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {Object.entries(data.summary.topPages)
                      .sort(([,a], [,b]) => b - a)
                      .slice(0, 10)
                      .map(([page, count]) => (
                      <div key={page} className="flex justify-between items-center">
                        <span className="truncate">{page}</span>
                        <span className="font-semibold">{count}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Top Clicked Elements */}
            <Card className="mb-8">
              <CardHeader>
                <CardTitle>Most Clicked Elements</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {Object.entries(data.summary.topElements)
                    .sort(([,a], [,b]) => b - a)
                    .slice(0, 12)
                    .map(([element, count]) => (
                    <div key={element} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                      <span className="truncate text-sm">{element}</span>
                      <span className="font-semibold text-blue-600">{count}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Recent Activity */}
            <Card className="mb-8">
              <CardHeader>
                <CardTitle>Recent Activity (Last 20)</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {data.summary.recentActivity.map((event, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div className="flex-1">
                        <div className="flex items-center space-x-2">
                          <span className="px-2 py-1 text-xs bg-blue-100 text-blue-800 rounded">
                            {event.event_type}
                          </span>
                          <span className="text-sm text-gray-600">{event.page_path}</span>
                        </div>
                        {event.element_text && (
                          <div className="text-sm text-gray-500 mt-1">
                            {event.element_text}
                          </div>
                        )}
                      </div>
                      <div className="flex items-center space-x-2">
                        <div className="text-xs text-gray-400">
                          {new Date(event.timestamp).toLocaleString()}
                        </div>
                        <button
                          onClick={() => handleDeleteEvent(event.id)}
                          className="px-2 py-1 text-xs bg-red-100 text-red-600 rounded hover:bg-red-200 transition-colors"
                          title="Delete this event"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* All Events Table */}
            <Card>
              <CardHeader>
                <CardTitle>All Events</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left p-2">Type</th>
                        <th className="text-left p-2">Element</th>
                        <th className="text-left p-2">Page</th>
                        <th className="text-left p-2">Session</th>
                        <th className="text-left p-2">Timestamp</th>
                        <th className="text-left p-2">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {data.events.map((event, index) => (
                        <tr key={index} className="border-b hover:bg-gray-50">
                          <td className="p-2">
                            <span className="px-2 py-1 text-xs bg-blue-100 text-blue-800 rounded">
                              {event.event_type}
                            </span>
                          </td>
                          <td className="p-2 max-w-xs truncate" title={event.element_text}>
                            {event.element_text || '-'}
                          </td>
                          <td className="p-2 max-w-xs truncate" title={event.page_path}>
                            {event.page_path}
                          </td>
                          <td className="p-2 text-xs text-gray-500 max-w-xs truncate" title={event.session_id}>
                            {event.session_id?.slice(-8) || '-'}
                          </td>
                          <td className="p-2 text-xs text-gray-500">
                            {new Date(event.timestamp).toLocaleString()}
                          </td>
                          <td className="p-2">
                            <button
                              onClick={() => handleDeleteEvent(event.id)}
                              className="px-2 py-1 text-xs bg-red-100 text-red-600 rounded hover:bg-red-200 transition-colors"
                              title="Delete this event"
                            >
                              Delete
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  {data.events.length === 0 && (
                    <div className="text-center py-8 text-gray-500">
                      No events found
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </>
        )}
      </div>
    </div>
  );
}