# Riko Onboarding

Cross-platform onboarding flow for Riko — web (desktop + mobile), iOS, Android.

## Stack

- Expo SDK 54 (React Native 0.81, React 19.1)
- Expo Router (file-based routing)
- NativeWind 4 (Tailwind CSS for React Native)
- TypeScript

## Routes

- `/` \u2014 Landing hero with interactive sample-data demo (Screen 1 of onboarding spec)
- `/onboarding/connect-tally` \u2014 Tally connection with desktop/mobile toggle (Screen 7)

## Run locally

```bash
npm install
npm run web      # web dev at http://localhost:8081
npm run ios      # iOS simulator (macOS only)
npm run android  # Android emulator
```

## Deploy

- **Web \u2192 Vercel**: `npm run export:web` produces static output in `dist/`. Vercel project settings: build command `npm run export:web`, output directory `dist`.
- **iOS / Android \u2192 EAS Build**: `npx eas build -p ios` and `npx eas build -p android` (after `npx eas init`).

## Source of truth

- Design + copy: `../RIKO_ONBOARDING_SPEC.md`
- Original HTML mockups: `../01_landing_hero.html`, `../07_tally_connect.html`
