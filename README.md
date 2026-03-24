# 🐾 PawfectNotes

**"Send love that stays."**

PawfectNotes is a beautifully crafted, pixel-art themed web application that lets you create personalized, digital greeting pages for your loved ones. From birthdays to anniversaries, you can instantly assemble warm, handcrafted cards packed with your favorite photos, emotional messages, YouTube embeds, and... exactly the right amount of pixel cats!

## ✨ Features

- **Immersive 4-Step Creator Wizard**: Seamlessly click together a fully responsive digital greeting card.
- **7 Curated Pixel-Aesthetic Themes**: Including *Rose Garden*, *Midnight Bloom*, and the vibrant *Pixel Arcade*.
- **Interactive Cat Physics**: Features a custom-built fluid 60fps *Framer Motion* physics engine raining interactive, draggable pixel cats directly on the landing page.
- **Smart Sticker Scattering**: Select from 8 custom pixel-art sprites (Calico, Siamese, Yarnballs) that intelligently scatter around the bounding boxes of your images and messages.
- **Serverless Link Generation**: Deploys via Vercel Edge functions directly into an Upstash Redis database, yielding beautifully short, copy-pasteable URLs (`/g/xyz123`) that embed massively compressed payloads without the need for traditional backend routing.

## 🛠️ Tech Stack

- **Framework**: React 18 + Vite
- **Language**: TypeScript
- **Styling**: Vanilla CSS Modules (No Tailwind, fully custom token architecture)
- **Physics/Animation**: Framer Motion
- **Database**: Upstash Serverless Redis (via `@vercel/kv` & `@upstash/redis` endpoints)
- **Typography**: Space Mono & Pixelify Sans (Google Fonts)

## 🚀 Getting Started

### 1. Clone the repository
```bash
git clone https://github.com/ivaaneoski/pawfect-notes.git
cd pawfect-notes
```

### 2. Install dependencies
```bash
npm install
```

### 3. Environment Variables (Database Setup)
To enable the short URL generation locally, grab a free serverless Redis database from [Upstash](https://upstash.com/) (or connect standard Vercel KV through the Vercel Dashboard).
Create a `.env.local` file at the root:
```env
UPSTASH_REDIS_REST_URL="your-url-here"
UPSTASH_REDIS_REST_TOKEN="your-token-here"
```

### 4. Run the Dev Server
```bash
npm run dev
```
Navigate to `http://localhost:5173/` and start tossing pixel cats around!

## 📦 Deployment
This app is optimally configured to deploy natively to **Vercel**. 
1. Import the repository in Vercel.
2. Under the "Storage" tab, attach the **Upstash Serverless Redis** marketplace integration.
3. The included `/api` folder and `vercel.json` rewrite routing will automatically configure the serverless functions necessary to power your global links!

---
*Made with ♥ by [ivaan](https://github.com/ivaaneoski)*
