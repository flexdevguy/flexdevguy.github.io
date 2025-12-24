# Google Analytics Integration Guide

Google Analytics 4 (GA4) has been integrated into the **grwm.dev** website to track visitor behavior and engagement.

## Setup

### 1. Get Your Tracking ID

1. Go to [Google Analytics Admin](https://analytics.google.com/analytics/web/)
2. Create a new property (if you don't have one)
3. Copy your **Measurement ID** (format: `G-XXXXXXXXXX`)

### 2. Configure Environment Variable

Add your tracking ID to `.env.local`:

```bash
VITE_GA_TRACKING_ID=G-XXXXXXXXXX
```

**Note**: Replace `G-XXXXXXXXXX` with your actual tracking ID.

### 3. Restart Development Server

```bash
npm run dev
```

## Features

### Automatic Page View Tracking

Page views are automatically tracked whenever users navigate to a different route. This is handled by the `useGoogleAnalyticsPageView` hook in the root route.

### Custom Event Tracking

Track custom events anywhere in your components:

```tsx
import { trackGAEvent } from '@/shared/hooks/useGoogleAnalytics'

const handleCtaClick = (): void => {
  trackGAEvent('engagement', 'cta_button_click', 'homepage_hero', 1)
}

return <button onClick={handleCtaClick}>Get Started</button>
```

**Event Parameters**:
- `category` (required): Event category (e.g., 'engagement', 'form')
- `action` (required): Event action (e.g., 'click', 'submit')
- `label` (optional): Event label for more detail
- `value` (optional): Numeric value associated with the event

## Implementation Details

### Files Modified/Created

1. **`src/shared/hooks/useGoogleAnalytics.ts`** — GA initialization and tracking functions
2. **`src/shared/hooks/useGoogleAnalytics.test.ts`** — Tests for GA hooks
3. **`src/router.tsx`** — GA initialization on app startup
4. **`src/routes/__root.tsx`** — Page view tracking on route changes
5. **`.env.example`** — Example environment variables
6. **`.env.local`** — Local environment configuration (not committed to git)

### How It Works

1. **Initialization**: When the app starts, the tracking ID is read from environment variables and GA is initialized
2. **Page Views**: Every time the user navigates to a new route, `useGoogleAnalyticsPageView` sends a page view event with the current pathname
3. **Custom Events**: Components can use `trackGAEvent()` to track specific user actions

## Testing

GA functions are fully tested with mocked `react-ga4`:

```bash
npm run test:run -- useGoogleAnalytics
```

## Privacy & Compliance

- Ensure your privacy policy mentions Google Analytics
- Consider GDPR compliance if targeting EU users
- Configure Google Analytics to respect user consent settings

## Debugging

To debug GA in development:

1. Install the [Google Analytics Debugger Chrome Extension](https://chrome.google.com/webstore/detail/google-analytics-debugger/jnkmfdileelhofjcicaksihpklodawohh)
2. Open Chrome DevTools and check the Real-time view in Google Analytics
3. Look for page views and events being logged

## Next Steps (Optional)

1. **Add consent banner** — Implement a cookie consent banner to comply with privacy regulations
2. **Track form submissions** — Add event tracking to CTA and contact form submissions
3. **Track video engagement** — If you add video content, track play/pause events
4. **Track scroll depth** — Measure how far users scroll on pages
5. **User ID tracking** — Track authenticated users (if applicable)

## Useful Resources

- [Google Analytics 4 Documentation](https://developers.google.com/analytics/devguides/collection/ga4)
- [react-ga4 NPM Package](https://www.npmjs.com/package/react-ga4)
- [Analytics Event Naming Best Practices](https://support.google.com/analytics/answer/10085872)
