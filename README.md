# AI Social Post Generator

Generate platform-specific social media posts using Gemini AI. Create unique, optimized content for LinkedIn, Twitter, Instagram, and Facebook with a single click.

## Features

- 🤖 AI-powered content generation using Google Gemini 2.0
- 📱 Platform-specific formatting (LinkedIn, Twitter, Instagram, Facebook)
- 📋 One-click copy to clipboard
- 🎨 Clean, modern UI with platform-themed cards
- ⚡ Built with React + Vite for fast performance

## Setup

1. Install dependencies:
```bash
npm install
```

2. Create a `.env` file in the root directory:
```bash
VITE_GEMINI_API_KEY=your_gemini_api_key_here
```

Get your API key from: https://aistudio.google.com/app/apikey

3. Run the development server:
```bash
npm run dev
```

## Deployment

### Build for production:
```bash
npm run build
```

### Preview production build:
```bash
npm run preview
```

### Deploy to Vercel (Recommended):
```bash
npm install -g vercel
vercel
```

**Important**: When deploying, add your `VITE_GEMINI_API_KEY` as an environment variable in your hosting platform's dashboard.

## Tech Stack

- React 19
- Vite 7
- Google Gemini AI API
- CSS3 with custom properties

## License

MIT
