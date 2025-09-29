import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY!
const supabase = createClient(supabaseUrl, supabaseKey)

const ADMIN_TOKEN = process.env.ANALYTICS_ADMIN_TOKEN || 'portfolio-analytics-2025-secure-token'

export async function DELETE(request: NextRequest) {
  try {
    // Check authentication
    const authHeader = request.headers.get('authorization')
    const token = authHeader?.replace('Bearer ', '')
    
    if (!token || token !== ADMIN_TOKEN) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // Get the bulk delete parameters from the request body
    const body = await request.json()
    const { eventType, startDate, endDate } = body

    if (!eventType || !startDate || !endDate) {
      return NextResponse.json({ 
        error: 'Event type, start date, and end date are required' 
      }, { status: 400 })
    }

    // Convert dates to proper format for database query
    const startDateTime = new Date(startDate).toISOString()
    const endDateTime = new Date(endDate + 'T23:59:59.999Z').toISOString()

    // Delete events matching the criteria from Supabase
    const { data, error } = await supabase
      .from('analytics_events')
      .delete()
      .eq('event_type', eventType)
      .gte('timestamp', startDateTime)
      .lte('timestamp', endDateTime)
      .select('id') // Select id to count deleted records

    if (error) {
      console.error('Supabase bulk delete error:', error)
      return NextResponse.json({ error: 'Failed to delete events' }, { status: 500 })
    }

    const deletedCount = data?.length || 0

    return NextResponse.json({ 
      success: true, 
      message: `Successfully deleted ${deletedCount} events`,
      deletedCount
    })

  } catch (error) {
    console.error('Bulk delete analytics events error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}