import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';

// Simple authentication - in production, use proper auth
const ADMIN_TOKEN = process.env.ANALYTICS_ADMIN_TOKEN || 'your-secret-admin-token';

export async function DELETE(request: NextRequest) {
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

    // Delete all analytics events
    const { error: deleteError } = await supabaseAdmin
      .from('analytics_events')
      .delete()
      .neq('id', '00000000-0000-0000-0000-000000000000'); // Delete all records

    if (deleteError) {
      console.error('Supabase delete error:', deleteError);
      return NextResponse.json(
        { error: 'Failed to clear analytics data' },
        { status: 500 }
      );
    }

    return NextResponse.json({ 
      success: true, 
      message: 'All analytics data cleared successfully' 
    });
  } catch (error) {
    console.error('Analytics data clearing error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}