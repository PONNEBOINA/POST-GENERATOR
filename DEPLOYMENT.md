# Deployment Guide

## ✅ Pre-Deployment Checklist

Your app is now ready for deployment! Here's what was done:

- ✅ API key moved to environment variables
- ✅ .env added to .gitignore
- ✅ README updated with project info
- ✅ Unused components removed

## 🚀 Quick Deploy Options

### Option 1: Vercel (Easiest - 2 minutes)

1. Install Vercel CLI:
```bash
npm install -g vercel
```

2. Deploy:
```bash
cd POST-GENERATOR
vercel
```

3. Follow the prompts (just press Enter for defaults)

4. **IMPORTANT**: Add environment variable in Vercel dashboard:
   - Go to your project settings
   - Navigate to "Environment Variables"
   - Add: `VITE_GEMINI_API_KEY` = `your_api_key`
   - Redeploy

### Option 2: Netlify

1. Install Netlify CLI:
```bash
npm install -g netlify-cli
```

2. Build and deploy:
```bash
cd POST-GENERATOR
npm run build
netlify deploy --prod
```

3. Add environment variable in Netlify dashboard:
   - Site settings → Environment variables
   - Add: `VITE_GEMINI_API_KEY` = `your_api_key`

### Option 3: GitHub Pages

1. Install gh-pages:
```bash
cd POST-GENERATOR
npm install --save-dev gh-pages
```

2. Add to package.json scripts:
```json
"predeploy": "npm run build",
"deploy": "gh-pages -d dist"
```

3. Update vite.config.js (add base path):
```javascript
export default defineConfig({
  base: '/POST-GENERATOR/',
  plugins: [...]
})
```

4. Deploy:
```bash
npm run deploy
```

5. **Note**: GitHub Pages doesn't support environment variables well. Consider using Vercel or Netlify instead.

### Option 4: Cloudflare Pages

1. Push your code to GitHub
2. Go to Cloudflare Pages dashboard
3. Connect your repository
4. Build settings:
   - Build command: `npm run build`
   - Output directory: `dist`
5. Add environment variable: `VITE_GEMINI_API_KEY`

## 🔒 Security Note

Your API key is now stored in `.env` file which is gitignored. When deploying:

1. **Never commit the .env file**
2. **Always add the API key as an environment variable in your hosting platform**
3. The `.env.example` file shows what variables are needed

## 🧪 Test Before Deploying

```bash
cd POST-GENERATOR
npm run build
npm run preview
```

Visit the preview URL to make sure everything works!

## 📝 After Deployment

Remember to add your `VITE_GEMINI_API_KEY` environment variable in your hosting platform's dashboard, or the app won't work in production.
