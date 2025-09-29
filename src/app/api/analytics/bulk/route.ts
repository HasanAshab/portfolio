import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase'


export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { events } = body

    if (!events || !Array.isArray(events) || events.length === 0) {
      return NextResponse.json({ error: 'Events array is required' }, { status: 400 })
    }

    // Get client IP
    const ip = request.headers.get('x-forwarded-for') ||
      request.headers.get('x-real-ip') ||
      'unknown';

    // Validate and prepare events for Supabase (matching existing table structure)
    const preparedEvents = events.map((event: any) => {
      // Validate required fields
      if (!event.event_type || !event.session_id || !event.timestamp) {
        throw new Error('Each event must have event_type, session_id, and timestamp')
      }

      // Prepare event data matching existing table structure
      return {
        event_type: event.event_type,
        element_id: event.element_id || null,
        element_text: event.element_text || null,
        page_path: event.page_path,
        user_agent: event.user_agent || null,
        ip_address: ip,
        session_id: event.session_id,
        timestamp: event.timestamp ? new Date(event.timestamp).toISOString() : new Date().toISOString(),
      }
    })

    // Bulk insert to Supabase using admin client to bypass RLS
    const { data, error } = await supabaseAdmin
      .from('analytics_events')
      .insert(preparedEvents)
      .select()

    if (error) {
      console.error('Supabase bulk insert error:', error)
      console.error('Failed events:', JSON.stringify(preparedEvents, null, 2))
      return NextResponse.json({ error: 'Failed to save events' }, { status: 500 })
    }

    return NextResponse.json({
      success: true,
      message: `Successfully saved ${events.length} events`,
      insertedCount: data?.length || 0
    })

  } catch (error) {
    console.error('Bulk analytics error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}