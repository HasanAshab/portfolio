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