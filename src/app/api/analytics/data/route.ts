import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';

// Simple authentication - in production, use proper auth
const ADMIN_TOKEN = process.env.ANALYTICS_ADMIN_TOKEN || 'your-secret-admin-token';

export async function GET(request: NextRequest) {
  try {
    // Check authentication
    const authHeader = request.headers.get('authorization');
    const token = authHeader?.replace('Bearer ', '');
    
    if (token !== ADMIN_TOKEN) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    // Get recent events from Supabase (last 500 events)
    const { data: events, error: eventsError } = await supabaseAdmin
      .from('analytics_events')
      .select('*')
      .order('timestamp', { ascending: false })
      .limit(500);

    if (eventsError) {
      console.error('Supabase query error:', eventsError);
      return NextResponse.json(
        { error: 'Failed to retrieve analytics data' },
        { status: 500 }
      );
    }

    if (!events || events.length === 0) {
      return NextResponse.json({ 
        events: [], 
        summary: {
          totalEvents: 0,
          uniqueSessions: 0,
          eventTypes: {},
          topPages: {},
          topElements: {},
          recentActivity: [],
          dailyStats: {},
        }
      });
    }

    // Generate summary statistics
    const summary = generateSummary(events);

    return NextResponse.json({
      events: events.slice(0, 100), // Return only first 100 for display
      summary,
      totalEvents: events.length,
    });
  } catch (error) {
    console.error('Analytics data retrieval error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

function generateSummary(events: any[]) {
  const summary = {
    totalEvents: events.length,
    uniqueSessions: new Set(events.map(e => e.session_id)).size,
    eventTypes: {} as Record<string, number>,
    topPages: {} as Record<string, number>,
    topElements: {} as Record<string, number>,
    recentActivity: events.slice(0, 10),
    dailyStats: {} as Record<string, number>,
  };

  events.forEach(event => {
    // Count event types
    summary.eventTypes[event.event_type] = (summary.eventTypes[event.event_type] || 0) + 1;
    
    // Count page visits
    summary.topPages[event.page_path] = (summary.topPages[event.page_path] || 0) + 1;
    
    // Count element interactions
    if (event.element_text) {
      summary.topElements[event.element_text] = (summary.topElements[event.element_text] || 0) + 1;
    }
    
    // Daily stats
    const date = new Date(event.timestamp).toISOString().split('T')[0];
    summary.dailyStats[date] = (summary.dailyStats[date] || 0) + 1;
  });

  return summary;
}