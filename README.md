# Smart Sleep Score Calculator

A React-based calculator that helps users understand the return on investment (ROI) of purchasing a smart mattress by quantifying the hidden costs of poor sleep.

![Smart Sleep Score Calculator](https://img.shields.io/badge/React-18-61DAFB?logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-3178C6?logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-06B6D4?logo=tailwindcss)
![Cloudflare Pages](https://img.shields.io/badge/Cloudflare%20Pages-Deployed-F38020?logo=cloudflare)

## Features

### Calculator
- **Annual Income Input** - For productivity loss calculations
- **Sleep Disruptor Checkboxes** - 9 common sleep issues with associated costs:
  - Back/neck pain: +$1,200/year
  - Hot sleep/night sweats: +$800/year
  - Partner disturbance: +$1,500/year
  - Snoring/sleep apnea: +$3,000/year
  - Restless sleeping: +$600/year
  - Morning fatigue: +$400/year
  - General pain (arthritis, fibromyalgia): +$2,500/year
  - Allergies (dust mites, mold, pet dander): +$1,200/year
  - Acid reflux/GERD: +$1,800/year
- **Caffeine Spending** - Monthly stimulant costs
- **Mattress Price** - Adjustable smart mattress investment

### Results
- **Smart Sleep Score** - 0-100 grading system (A-F)
- **ROI Percentage** - Annual return on investment
- **Break-even Timeline** - Months until mattress pays for itself
- **10-Year Value** - Long-term savings projection
- **Yearly Savings** - Estimated annual cost reduction
- **Cost Breakdown** - Detailed analysis of current sleep costs

### Export Options
- PDF Report generation
- Copy to clipboard
- Share via Email
- Share via SMS/Text

### Mobile-First Design
- Large touch targets (44px minimum)
- Number pad input mode for currency
- Stacked layout on mobile, responsive grid on desktop
- Smooth scrolling and transitions
- PWA support with "Add to Home Screen"

## Tech Stack

- **Framework:** React 18 + Vite
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **PDF Export:** jsPDF
- **Icons:** Lucide React
- **Deployment:** Cloudflare Pages

## Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

1. Clone or navigate to the project:
```bash
cd sleep-score-calculator
```

2. Install dependencies:
```bash
npm install
```

3. Start development server:
```bash
npm run dev
```

4. Open http://localhost:5173 in your browser

### Building for Production

```bash
npm run build
```

The built files will be in the `dist/` directory.

## Deployment to Cloudflare Pages

### Option 1: Using Wrangler CLI

1. Install Wrangler (if not already installed):
```bash
npm install -g wrangler
```

2. Login to Cloudflare:
```bash
wrangler login
```

3. Deploy:
```bash
npm run deploy
```

### Option 2: Using Git Integration

1. Push code to GitHub/GitLab
2. Connect your repository in Cloudflare Pages dashboard
3. Build settings:
   - Build command: `npm run build`
   - Build output directory: `dist`
4. Deploy!

### Option 3: Direct Upload

1. Build the project:
```bash
npm run build
```

2. Upload the `dist/` folder via Cloudflare Pages dashboard

## Project Structure

```
sleep-score-calculator/
├── src/
│   ├── components/
│   │   ├── CalculatorForm.tsx    # Input form component
│   │   ├── ResultsDisplay.tsx    # Results display with exports
│   │   ├── Header.tsx            # App header
│   │   └── Footer.tsx            # App footer
│   ├── hooks/
│   │   └── useCalculator.ts      # Calculator state management
│   ├── types/
│   │   └── index.ts              # TypeScript interfaces
│   ├── utils/
│   │   ├── calculations.ts       # ROI calculation logic
│   │   ├── constants.ts          # Disruptor definitions
│   │   ├── pdfExport.ts          # PDF generation
│   │   └── share.ts              # Sharing functionality
│   ├── App.tsx                   # Main app component
│   ├── main.tsx                  # Entry point
│   └── index.css                 # Global styles + Tailwind
├── public/                       # Static assets
├── dist/                         # Build output
├── index.html                    # HTML entry
├── vite.config.ts                # Vite + PWA configuration
├── wrangler.toml                 # Cloudflare Pages config
├── tailwind.config.js            # Tailwind CSS config
└── package.json
```

## How Calculations Work

### Sleep Score Formula
- **Cost Ratio (max 50 pts):** Based on total sleep costs vs income
- **Disruptor Diversity (max 30 pts):** Number of sleep issues × 5
- **Income Factor (max 20 pts):** Higher earners benefit more from productivity gains
- **Total:** Normalized to 0-100 scale

### ROI Calculation
```
Yearly Savings = Total Annual Cost × 60% improvement
ROI = (Yearly Savings / Mattress Price) × 100
Break-even = Mattress Price / (Yearly Savings / 12)
10-Year Value = (Yearly Savings × 10) - Mattress Price
```

## Browser Support

- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- iOS Safari 14+
- Chrome Android 90+

## License

MIT License - feel free to use and modify as needed.

## Credits

Built with care for better sleep. Icons by Lucide, styling by Tailwind CSS.