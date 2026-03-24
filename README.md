<div align="center">

# 😼 PawfectNotes

### *"Send love that stays."*

PawfectNotes is a beautifully crafted, pixel-art themed web application that lets you create personalized digital greeting pages for your loved ones. From birthdays to anniversaries, instantly assemble warm, handcrafted cards packed with your favorite photos, emotional messages, YouTube embeds, and... exactly the right amount of pixel cats.

[![Live Demo](https://img.shields.io/badge/Live%20Demo-pawfect--notes.vercel.app-brightgreen?style=flat-square&logo=vercel)](https://pawfect-notes.vercel.app/)
[![React](https://img.shields.io/badge/React%2018-61DAFB?style=flat-square&logo=react&logoColor=black)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=flat-square&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-646CFF?style=flat-square&logo=vite&logoColor=white)](https://vitejs.dev/)
[![Deployed on Vercel](https://img.shields.io/badge/Deployed%20on-Vercel-black?style=flat-square&logo=vercel)](https://vercel.com/)

</div>

---

## 📖 About

**PawfectNotes** is a digital greeting platform that lets anyone create a shareable, fully themed greeting page in minutes — no design skills required. Think of it as a more personal, more expressive alternative to a digital bouquet.

You get a 4-step wizard to build your card, a choice of 7 hand-curated pixel-art themes, and a short URL you can paste anywhere — WhatsApp, Instagram DMs, email, wherever. The recipient opens a beautifully animated page made just for them, complete with your photos, message, and an embedded YouTube video if you like.

Oh, and pixel cats rain down on the landing page. It's a feature.

---

## ✨ Features

### 🧙 Immersive 4-Step Creator Wizard
A smooth, guided flow to compose your greeting — choose a theme, write your message, upload images, and embed a YouTube link — all without leaving the page.

### 🎨 7 Curated Pixel-Aesthetic Themes
Each theme is a fully realized visual identity with custom color tokens, backgrounds, and typography. Current themes include:
- 🌹 *Rose Garden*
- 🌙 *Midnight Bloom*
- 🕹️ *Pixel Arcade*
- and 4 more...

### 🐱 Interactive Cat Physics
The landing page features a custom-built fluid 60fps physics engine powered by **Framer Motion** — draggable, bounceable pixel cats that rain down and respond to your cursor in real time.

### 🎴 Smart Sticker Scattering
Choose from 8 custom pixel-art sprites — including Calico, Siamese, and Yarnball variants — that intelligently scatter around the bounding boxes of your images and messages for a natural, handcrafted feel.

### 🖼️ Multi-Image Support
Attach up to **3 images** per greeting, displayed in a beautifully composed layout inside the card.

### 🎥 YouTube Embed Support
Drop in any YouTube URL and it gets embedded directly into the greeting page — perfect for song dedications, video messages, or just a banger playlist.

### ⚡ Serverless Link Generation
Short URLs (`/g/xyz123`) are generated via **Vercel Edge Functions** and stored in **Upstash Serverless Redis** — massively compressed payloads, instant global delivery, zero traditional backend routing.

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| Framework | React 18 + Vite |
| Language | TypeScript |
| Styling | Vanilla CSS Modules (custom token architecture, no Tailwind) |
| Animation / Physics | Framer Motion |
| Database | Upstash Serverless Redis (`@upstash/redis` + `@vercel/kv`) |
| Typography | Space Mono & Pixelify Sans (Google Fonts) |
| Hosting | Vercel (with Edge Functions via `/api` folder) |

---

## 🚀 Getting Started

### Prerequisites

- Node.js `>=18.x`
- npm
- An [Upstash](https://upstash.com/) account (free tier works perfectly)

### 1. Clone the repository

```bash
git clone https://github.com/ivaaneoski/pawfect-notes.git
cd pawfect-notes
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure environment variables

To enable short URL generation locally, grab a free serverless Redis database from [Upstash](https://upstash.com/) (or connect Vercel KV via the Vercel Dashboard).

Create a `.env.local` file at the project root:

```env
UPSTASH_REDIS_REST_URL="your-upstash-rest-url"
UPSTASH_REDIS_REST_TOKEN="your-upstash-rest-token"
```

### 4. Start the dev server

```bash
npm run dev
```

Navigate to `http://localhost:5173/` and start tossing pixel cats around. 🐾

---

## 📦 Deployment

PawfectNotes is configured to deploy natively to **Vercel** with zero extra setup.

1. Import the repository in the [Vercel Dashboard](https://vercel.com/new)
2. Under the **Storage** tab, attach the **Upstash Serverless Redis** marketplace integration
3. The included `/api` folder and `vercel.json` rewrite rules will automatically configure all serverless functions needed to power your global short links

That's it — no manual server config required.

---

## 📁 Project Structure

```
pawfect-notes/
├── api/                    # Vercel Edge Functions (link generation & retrieval)
├── public/                 # Static assets (pixel sprites, favicon, og images)
├── src/
│   ├── components/         # UI components (Wizard, ThemePicker, CatPhysics, etc.)
│   ├── pages/              # Route pages (Home, Creator, Greeting view)
│   ├── hooks/              # Custom React hooks
│   ├── styles/             # CSS Modules + global token architecture
│   ├── lib/                # Utility functions, Redis client, URL helpers
│   └── assets/             # Pixel-art sprites (Calico, Siamese, Yarnball, etc.)
├── vercel.json             # Rewrite rules for /g/:id routing
├── .env.local              # Local environment variables (not committed)
├── vite.config.ts
├── tsconfig.json
└── README.md
```

---

## 📸 Screenshots

| Landing Page | Creator Wizard | Greeting Page |
|---|---|---|
| *(Add screenshot)* | *(Add screenshot)* | *(Add screenshot)* |

> Drag and drop images into the table on GitHub to add screenshots.

---

## 🤝 Contributing

Contributions are welcome! Here's how to get started:

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/your-feature-name`
3. Commit your changes using [Conventional Commits](https://www.conventionalcommits.org/):
   ```bash
   git commit -m "feat: add new pixel sprite"
   git commit -m "fix: cat physics jitter on mobile"
   ```
4. Push to your fork: `git push origin feature/your-feature-name`
5. Open a Pull Request with a clear description of what you changed and why

---

## 🐛 Reporting Issues

Found a bug or have a feature idea? [Open an issue](https://github.com/ivaaneoski/pawfect-notes/issues) with:
- A clear title and description
- Steps to reproduce (for bugs)
- Browser/device info if it's a UI issue
- Screenshots or screen recordings if applicable

---

## 📄 License

This project is licensed under the [MIT License](./LICENSE).

---

<div align="center">

Made with 🐾 by [ivaan](https://github.com/ivaaneoski)

*Because some messages deserve more than just words.*

</div>
