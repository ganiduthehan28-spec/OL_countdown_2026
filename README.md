# O/L Countdown 2026

This is a Next.js 14 project for a countdown timer to the 2026 O/L Examination.

## Features

- PWA with offline support
- Push notifications with OneSignal
- Daily reminders for users

## Environment Variables

Create a `.env.local` file in the root of the project and add the following environment variables:

```
NEXT_PUBLIC_ONESIGNAL_APP_ID=<Your OneSignal App ID>
ONESIGNAL_APP_ID=<Your OneSignal App ID>
ONESIGNAL_REST_KEY=<Your OneSignal REST API Key>
```

### GitHub Secrets

To enable the scheduled notifications, you need to add the following secrets to your GitHub repository:

- `ONESIGNAL_APP_ID`: Your OneSignal App ID.
- `ONESIGNAL_REST_KEY`: Your OneSignal REST API Key.

## Getting Started

First, install the dependencies:

```bash
npm install
```

Then, run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.