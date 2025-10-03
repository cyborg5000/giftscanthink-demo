# Energia Sleep Coach - MVP

A simple sleep tracking and supplement recommendation web app for Energia.sg customers.

## Features

### 1. Sleep Assessment Quiz
- Quick 3-question assessment
- Calculates personalized sleep score (0-100)
- Identifies sleep issues and patterns

### 2. Personalized Supplement Protocol
- AI-driven recommendations based on sleep issues
- Specific dosage and timing instructions
- Direct links to purchase on Energia.sg

### 3. Sleep Dashboard
- Daily sleep logging
- 7-day sleep trend visualization
- Track supplement adherence
- Personalized insights and improvements

## Tech Stack

- **Pure HTML/CSS/JavaScript** - No build process required
- **LocalStorage** - Client-side data persistence
- **Canvas API** - Sleep trend charts

## File Structure

```
energiasg/
├── index.html          # Main app (landing + dashboard)
├── styles.css          # All styling
├── app.js              # Core functionality
├── images/
│   └── Energia-Logo.png
└── README.md
```

## How It Works

1. **Sleep Assessment**: User completes quick quiz about sleep quality
2. **Score Calculation**: Algorithm calculates sleep score from hours, quality, and mood
3. **Protocol Generation**: Matches sleep issues to specific Energia supplements
4. **Dashboard Tracking**: Users log daily sleep and track improvements
5. **Insights**: Shows correlations between supplements and sleep quality

## Supplement Recommendation Logic

- **Can't Fall Asleep** → Magnesium Glycinate + Melatonin
- **Wake Up Often** → L-Theanine
- **Not Refreshed** → Ashwagandha
- **Stress/Anxiety** → Magnesium + L-Theanine + Ashwagandha

## Local Development

Simply open `index.html` in a browser. No build process required.

## Deployment

Deployed to Vercel at: `demo.giftsthatthink.com/energiasg`

The vercel.json configuration handles routing automatically.

## Future Enhancements

- Email reminder system
- Wearable device integration (Oura, Apple Watch)
- AI chat for sleep questions
- Community features
- Advanced analytics

## Data Storage

All data is stored in browser LocalStorage:
- `sleepLogs` - Array of daily sleep entries
- `userProtocol` - Personalized supplement recommendations

No backend or database required for this MVP.
