import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

interface AnalyticsEvent {
  event_type: string;
  element_id?: string;
  element_text?: string;
  page_path: string;
  user_agent?: string;
  timestamp: string;
  session_id: string;
}

export async function POST(request: NextRequest) {
  try {
    const event: AnalyticsEvent = await request.json();
    
    // Get client IP
    const ip = request.headers.get('x-forwarded-for') || 
               request.headers.get('x-real-ip') || 
               request.ip ||
               'unknown';

    // Validate required fields
    if (!event.event_type || !event.session_id || !event.timestamp) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Prepare event data for Supabase
    const eventData = {
      event_type: event.event_type,
      element_id: event.element_id || null,
      element_text: event.element_text || null,
      page_path: event.page_path,
      user_agent: event.user_agent || null,
      ip_address: ip,
      session_id: event.session_id,
      timestamp: event.timestamp ? new Date(event.timestamp).toISOString() : new Date().toISOString(),
    };

    // Insert into Supabase
    const { error: insertError } = await supabase
      .from('analytics_events')
      .insert([eventData]);

    if (insertError) {
      console.error('Supabase insert error:', insertError);
      return NextResponse.json(
        { error: 'Failed to store analytics event' },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Analytics tracking error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}