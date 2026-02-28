# Geenius Template

A production-ready boilerplate for the Geenius AI app ecosystem. Scaffold a new AI-powered application in seconds.

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | Vite 7 + React 19 + TypeScript |
| Styling | Vanilla CSS (design-system tokens) |
| Backend | Convex (serverless) |
| Auth | Convex Auth (email/password) |
| Payments | Stripe (subscriptions + webhooks) |
| AI | NVIDIA NIMs (chat + image gen) |
| Testing | Vitest + Testing Library |
| Analytics | Vercel Analytics |
| Deployment | Vercel |

## Quick Start

```bash
# Clone this repo
git clone https://github.com/mxn2020/geenius-template.git
cd geenius-template

# Scaffold a new app
node bin/create-geenius-app.mjs

# Or use npx (after publishing)
npx create-geenius-app
```

## What's Included

### 15 Pages (ready to use)
Landing, Login, Pricing, Help, Admin, AuditLogs, Settings, Billing, Model Tests, Profile, Logs, NotFound, Terms, Privacy, AppHome

### 8 Shared Components
AuthGuard, SubscriptionGuard, Toast, ErrorBoundary, CookieBanner, Layout, LoadingScreen, Skeleton

### 12 Convex Backend Modules
Auth, Schema, Users, Stripe, HTTP Router, NVIDIA AI, AI Logs, Prompts CMS, Audit Log, Rate Limiter, Usage Limits, Model Costs, Model Tests

### Full Design System
CSS custom properties, dark theme, responsive, micro-animations

## Project Structure

```
geenius-template/
├── bin/
│   └── create-geenius-app.mjs   # CLI scaffolding tool
├── template/
│   ├── README.md
│   ├── docs/
│   └── web/
│       ├── convex/               # Convex backend
│       ├── src/
│       │   ├── components/       # Shared UI components
│       │   ├── pages/            # All pages
│       │   ├── test/
│       │   ├── App.tsx
│       │   ├── main.tsx
│       │   └── index.css         # Full design system
│       ├── scripts/
│       ├── package.json
│       └── ...configs
├── package.json
└── README.md
```

## License

MIT
