# DesoFall

**Private Equity Waterfall Distribution Calculator**

DesoFall is a browser-based tool for modeling LP agreement waterfall distributions for private equity and alternative asset funds. It ingests LPA language, accepts investment proceeds data, and outputs a full distribution waterfall with GP/LP breakdowns.

---

## Features

- **LPA Ingest** — paste LPA clause text; auto-parses management fee, carry %, hurdle rate, catch-up structure, clawback, and waterfall type
- **Waterfall Tiers** — Return of Capital → Preferred Return → GP Catch-Up → Carried Interest
- **GP / LP Summary** — net distributions, MOIC, and profit per party
- **Clawback Analysis** — flags GP repayment obligation if triggered
- **Visual Output** — bar chart by distribution tier
- **No backend required** — all calculations run in the browser

---

## Getting Started

### Prerequisites
- Node.js 18+ installed ([nodejs.org](https://nodejs.org))

### Local Development

```bash
# 1. Clone the repo
git clone https://github.com/YOUR_USERNAME/desofall.git
cd desofall

# 2. Install dependencies
npm install

# 3. Run locally
npm run dev
```

Then open `http://localhost:5173` in your browser.

### Build for Production

```bash
npm run build
```

Output goes to the `/dist` folder. This is what Vercel deploys.

---

## Deploying to Vercel

1. Push this repo to GitHub
2. Go to [vercel.com](https://vercel.com) → New Project → Import from GitHub
3. Select the `desofall` repo
4. Leave all default settings (Vercel auto-detects Vite)
5. Click **Deploy**

Vercel will auto-deploy on every future push to `main`.

---

## Project Structure

```
desofall/
├── public/
│   └── index.html       # HTML shell
├── src/
│   ├── App.jsx          # Main application component
│   └── main.jsx         # React entry point
├── package.json         # Dependencies and scripts
├── vite.config.js       # Build tool configuration
└── README.md
```

---

## Disclaimer

DesoFall is a modeling tool intended for illustrative and analytical purposes. It does not constitute legal, financial, or tax advice. Waterfall calculations should be verified against the specific language of the governing Limited Partnership Agreement.
