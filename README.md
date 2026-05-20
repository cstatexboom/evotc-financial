# Evolution Tennis Club Financial Forecast

Evolution Tennis Club / 进界网球俱乐部 is a premium dark editorial single-page financial forecast website for an urban tennis club in Changzhou, China.

The page presents a 36-month operating model with bilingual English and Chinese content, covering court economics, Gold stored-value renewals, deferred revenue, coaching contribution, member events, cashflow, dividend events, and key operating risks.

## Version

Current version: `v0.3.0`

This version refines the financial model around member discount economics:

- separates recognized revenue from actual stored-value consumption
- models Gold stored-value renewals as recurring cash inflow
- applies Gold and Diamond member discounts only to stored-value consumption
- tracks Diamond stored value as a non-renewing balance consumed over 36 months
- keeps cashflow, deferred revenue, and quarterly charts tied to the centralized model

## Tech Stack

- React
- Vite
- Tailwind CSS
- Recharts
- Framer Motion
- Lucide Icons

## Development

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
```

The financial assumptions and chart data are centralized in `src/data.ts`.
