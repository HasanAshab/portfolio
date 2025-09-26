# Manual Supabase Setup Instructions

Since the automatic setup script couldn't create the table, please follow these manual steps:

## 📋 Step-by-Step Setup

### 1. Open Supabase Dashboard
1. Go to [https://supabase.com/dashboard](https://supabase.com/dashboard)
2. Select your project: `ylzllpzfkstoqpsorrum`

### 2. Create Analytics Table
1. Click on **SQL Editor** in the left sidebar
2. Click **New Query**
3. Copy and paste this SQL code:

```sql
-- Create analytics_events table
CREATE TABLE IF NOT EXISTS analytics_events (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    event_type VARCHAR(50) NOT NULL,
    element_id VARCHAR(255),
    element_text TEXT,
    page_path VARCHAR(500) NOT NULL,
    user_agent TEXT,
    ip_address INET,
    session_id VARCHAR(100) NOT NULL,
    timestamp TIMESTAMPTZ DEFAULT NOW(),
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_analytics_events_timestamp ON analytics_events(timestamp DESC);
CREATE INDEX IF NOT EXISTS idx_analytics_events_session_id ON analytics_events(session_id);
CREATE INDEX IF NOT EXISTS idx_analytics_events_event_type ON analytics_events(event_type);
CREATE INDEX IF NOT EXISTS idx_analytics_events_page_path ON analytics_events(page_path);
CREATE INDEX IF NOT EXISTS idx_analytics_events_created_at ON analytics_events(created_at DESC);

-- Create a view for daily analytics summary
CREATE OR REPLACE VIEW daily_analytics_summary AS
SELECT 
    DATE(timestamp) as date,
    COUNT(*) as total_events,
    COUNT(DISTINCT session_id) as unique_sessions,
    COUNT(CASE WHEN event_type = 'page_view' THEN 1 END) as page_views,
    COUNT(CASE WHEN event_type = 'click' THEN 1 END) as clicks,
    COUNT(CASE WHEN event_type = 'download' THEN 1 END) as downloads,
    COUNT(CASE WHEN event_type = 'contact' THEN 1 END) as contacts
FROM analytics_events 
GROUP BY DATE(timestamp)
ORDER BY date DESC;

-- Enable Row Level Security (RLS)
ALTER TABLE analytics_events ENABLE ROW LEVEL SECURITY;

-- Create policy to allow inserts from anyone (for tracking)
CREATE POLICY "Allow analytics tracking" ON analytics_events
    FOR INSERT WITH CHECK (true);

-- Create policy to allow reads only with service role (for dashboard)
CREATE POLICY "Allow analytics reading with service role" ON analytics_events
    FOR SELECT USING (auth.role() = 'service_role');
```

4. Click **Run** to execute the SQL

### 3. Verify Setup
After running the SQL, you should see:
- ✅ `analytics_events` table created
- ✅ 5 indexes created for performance
- ✅ `daily_analytics_summary` view created
- ✅ Row Level Security enabled
- ✅ Policies created for secure access

### 4. Test the Setup
1. Start your development server: `npm run dev`
2. Visit your portfolio and click around
3. Go to `http://localhost:3000/analytics`
4. Use admin token: `portfolio-analytics-2025-secure-token`
5. You should see your interactions being tracked!

## 🔧 Troubleshooting

### If you get "table does not exist" errors:
1. Make sure you ran the SQL in the correct project
2. Check the **Table Editor** to see if `analytics_events` table exists
3. Try refreshing the Supabase dashboard

### If analytics tracking doesn't work:
1. Check browser console for errors
2. Verify environment variables are set correctly
3. Make sure Supabase URL and keys are correct

### If dashboard shows "Unauthorized":
1. Check that `ANALYTICS_ADMIN_TOKEN` is set in your `.env`
2. Make sure you're using the correct token in the dashboard
3. Verify `SUPABASE_SERVICE_ROLE_KEY` is set correctly

## 🎉 Next Steps

Once setup is complete:
1. **Update your components** to use analytics tracking
2. **Change the admin token** to something secure
3. **Deploy to production** with proper environment variables
4. **Monitor your analytics** at `/analytics`

## 📊 Example Usage

```tsx
import { TrackableElement } from '@/components/analytics/TrackableElement';

// Track button clicks
<TrackableElement elementId="hero-cta" elementText="Get Started">
  <button>Get Started</button>
</TrackableElement>

// Track downloads
<TrackableDownload fileName="resume.pdf">
  <a href="/resume.pdf">Download Resume</a>
</TrackableDownload>
```

The analytics system is now ready to track user interactions on your portfolio!