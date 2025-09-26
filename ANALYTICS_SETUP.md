# Portfolio Analytics Setup Guide

This guide will help you set up user interaction tracking for your portfolio website using Supabase PostgreSQL database.

## 🚀 Features

- **Real-time tracking** of user interactions (clicks, page views, downloads, etc.)
- **Protected analytics dashboard** with authentication
- **Supabase PostgreSQL** for robust data persistence and querying
- **Easy-to-use components** for tracking any element
- **Comprehensive analytics** with summaries and insights
- **Row Level Security** for data protection

## 📋 Setup Steps

### 1. Database Setup (Automatic)

Run the automated setup script:

```bash
npm run setup-analytics
```

This will:
- Create the `analytics_events` table
- Set up indexes for optimal performance
- Create a daily analytics summary view
- Configure Row Level Security policies
- Test the setup with a sample event

### 2. Manual Database Setup (If Automatic Fails)

If the automatic setup fails, manually run the SQL in your Supabase dashboard:

1. Go to your Supabase project dashboard
2. Navigate to **SQL Editor**
3. Copy and paste the contents of `sql/create_analytics_table.sql`
4. Execute the SQL commands

### 3. Environment Variables

Your environment variables are already configured in `.env`:

```env
# Supabase Configuration (already set)
NEXT_PUBLIC_SUPABASE_URL=https://ylzllpzfkstoqpsorrum.supabase.co
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key

# Analytics Configuration
ANALYTICS_ADMIN_TOKEN=portfolio-analytics-2025-secure-token
```

**⚠️ Important**: Change the `ANALYTICS_ADMIN_TOKEN` to a secure value in production!

### 4. Deploy and Test

```bash
# For local development
npm run dev

# For production deployment
npm run build && npm run start
```

## 🎯 Usage Examples

### Basic Click Tracking

```tsx
import { TrackableElement } from '@/components/analytics/TrackableElement';

// Wrap any element to track clicks
<TrackableElement elementId="hero-button" elementText="Get Started">
  <button>Get Started</button>
</TrackableElement>
```

### Specific Event Types

```tsx
import { 
  TrackableDownload, 
  TrackableContact, 
  TrackableProject 
} from '@/components/analytics/TrackableElement';

// Track downloads
<TrackableDownload fileName="resume.pdf">
  <a href="/resume.pdf">Download Resume</a>
</TrackableDownload>

// Track contact methods
<TrackableContact method="email">
  <a href="mailto:you@example.com">Email Me</a>
</TrackableContact>

// Track project views
<TrackableProject projectName="My Awesome Project">
  <div>Project Card</div>
</TrackableProject>
```

### Manual Tracking with Hook

```tsx
import { useAnalyticsContext } from '@/components/analytics/AnalyticsProvider';

function MyComponent() {
  const { trackClick, trackDownload } = useAnalyticsContext();

  const handleCustomAction = (e) => {
    trackClick(e, 'custom-action', 'Custom Action Performed');
    // Your custom logic here
  };

  return <button onClick={handleCustomAction}>Custom Action</button>;
}
```

## 📊 Analytics Dashboard

Access your analytics at: `https://yourdomain.com/analytics`

**Default admin token**: `your-secret-admin-token` (change this!)

### Dashboard Features

- **Real-time metrics**: Total events, unique sessions, page views, clicks
- **Top pages**: Most visited pages on your portfolio
- **Popular elements**: Most clicked buttons/links
- **Recent activity**: Live feed of user interactions
- **Event breakdown**: Distribution of different event types

## 🔧 Customization

### Adding New Event Types

1. Update the `AnalyticsEvent` interface in `src/lib/analytics.ts`
2. Add new tracking methods to `AnalyticsTracker` class
3. Create new trackable components as needed

### Custom Analytics Components

```tsx
// Create a custom trackable component
export function TrackableCustom({ customData, children }) {
  return (
    <TrackableElement 
      eventType="custom" 
      trackingData={customData}
    >
      {children}
    </TrackableElement>
  );
}
```

## 🛡️ Security Notes

- **Change the default admin token** immediately
- **Use strong, unique tokens** for production
- **Consider IP-based restrictions** for the analytics dashboard
- **Regularly rotate access tokens**

## 📈 Data Retention

- Events are stored in Cloudflare KV with 1-year TTL
- Recent events list maintains last 1000 events
- Dashboard shows last 500 events for performance

## 🔍 Troubleshooting

### Analytics not tracking
1. Check browser console for errors
2. Verify KV namespace is properly configured
3. Ensure AnalyticsProvider wraps your app

### Dashboard not loading
1. Verify admin token is correct
2. Check KV namespace bindings
3. Ensure API routes are deployed

### Missing data
1. Check Cloudflare KV dashboard
2. Verify events are being stored
3. Check API endpoint responses

## 🚀 Next Steps

1. **Replace your existing components** with analytics-enabled versions
2. **Set up monitoring** for your KV usage
3. **Create custom dashboards** for specific metrics
4. **Add more event types** as needed
5. **Set up alerts** for unusual activity patterns

## 📝 Example Implementation

Check `src/components/sub/HeroContentWithAnalytics.tsx` for a complete example of how to add analytics to your existing components.