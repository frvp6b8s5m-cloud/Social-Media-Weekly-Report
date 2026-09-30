# CreatorPulse — Social Media Weekly Intelligence

This project is being converted from a local ReelShort weekly-report template into a creator monitoring web app for YouTube, TikTok, Instagram, and Facebook.

## Product goals

- Creator accounts and onboarding
- Connect and manage channels across four platforms
- Track followers/subscribers, views, engagement, watch time, and revenue where supported
- Track individual posts/videos and identify content gaining traction
- Compare performance week over week
- Generate a weekly intelligence report
- Prepare automated email delivery
- Keep provider credentials in deployment environment variables

## Architecture

The current app uses Next/Vinext, React, Cloudflare tooling, and Drizzle. The next implementation layers are authentication, persistent creator/channel data, platform sync jobs, analytics, report generation, and scheduled email delivery.

Live platform metrics require the creator's own API/OAuth credentials; no credentials belong in GitHub.

## Development

```bash
npm install
npm run dev
npm run build
```

## Environment placeholders

```text
DATABASE_URL=
YOUTUBE_CLIENT_ID=
YOUTUBE_CLIENT_SECRET=
TIKTOK_CLIENT_KEY=
TIKTOK_CLIENT_SECRET=
META_APP_ID=
META_APP_SECRET=
REPORT_EMAIL_FROM=
REPORT_CRON_SECRET=
```

## Design direction

Cinematic, premium, dark, data-dense, and fast — a creator command center rather than a spreadsheet.
