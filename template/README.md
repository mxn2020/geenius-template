# {{APP_NAME}}

{{APP_DESCRIPTION}}

## Tech Stack
- **Frontend**: Vite + React + TypeScript
- **Styling**: Vanilla CSS (dark theme design system)
- **Backend**: Convex (Serverless)
- **Auth**: Convex Auth (email/password)
- **Payments**: Stripe (subscriptions)
- **AI**: NVIDIA NIMs
- **Analytics**: Vercel Analytics

## Quick Start

```bash
cd web
pnpm install
npx convex dev        # Start Convex backend (in one terminal)
pnpm run dev          # Start Vite dev server (in another terminal)
```

## First-Time Setup

### 1. Convex Auth Keys
```bash
cd web
node generateKeys.mjs
```

### 2. NVIDIA AI
```bash
npx convex env set NVIDIA_API_KEY nvapi-xxxxx
```

### 3. Stripe
```bash
bash scripts/setup-stripe-products.sh
npx convex env set STRIPE_SECRET_KEY rk_live_xxxxx
npx convex env set STRIPE_WEBHOOK_SECRET whsec_xxxxx
```

### 4. Seed Prompts
Open the Convex dashboard and run `prompts:seedPrompts`.

## Folder Structure

```
web/
├── convex/           # Convex backend (schema, functions, actions)
├── src/
│   ├── components/   # Shared UI components
│   ├── pages/        # Route pages
│   ├── test/         # Test setup
│   ├── App.tsx       # Router + routes
│   ├── main.tsx      # Entry point + providers
│   └── index.css     # Design system
├── scripts/          # Stripe & utility scripts
└── ...configs
```
