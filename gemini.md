# System Instructions: Personalized Greeting Page Builder

## Project Overview

Build a **personalized greeting page creator** — a minimal, emotional, aesthetic web app that lets users craft beautiful digital greeting pages for birthdays, anniversaries, and special occasions. Each greeting page is shareable via a unique link and viewable by anyone without login. The design aesthetic is inspired by "digital bouquet" style sites — soft, romantic, handcrafted-feeling, and visually expressive.

---

## Navigation Structure

### Top Navigation Tabs
- Home (landing/default view)
- Create
- My Greetings (optional, lightweight session-based)
- Preview
- About

### Header Elements
- App logo / wordmark (soft, elegant branding)
- Dark/Light mode toggle
- Create New Greeting button (CTA)
- Optional: User session indicator (no login required — cookie/session based)

---

## Home / Landing Page

### Hero Section
- Full-width soft background (gradient or floral texture)
- Tagline: e.g., *"Send love that stays."*
- CTA button: **Create a Greeting**
- Preview thumbnail carousel of sample greeting pages

### Feature Highlights Section
- 3-column icon + text layout:
  - 🌸 *Beautiful Templates* — Soft, aesthetic designs for every occasion
  - 💌 *Personal Messages* — Add your words, your way
  - 🔗 *Shareable Links* — One link, forever accessible

### Occasions Section
- Grid of occasion cards:
  - Birthday
  - Anniversary
  - Thank You
  - Congratulations
  - Just Because
  - Custom / Other

---

## Create Page

### Step 1 — Choose Occasion & Template
- Occasion selector (Birthday / Anniversary / Custom etc.)
- Template picker: 4–6 curated visual themes per occasion
  - Each theme shows a thumbnail preview
  - Themes control: background color/pattern, font style, decoration set

### Step 2 — Greeting Details Form

**Cover / Title**
- Text input: Title of the greeting (e.g., "Happy Birthday, Aarav! 🎂")
- Font style selector: Serif / Script / Handwritten / Minimal
- Font size: Small / Medium / Large

**Recipient Name**
- Text input: Name of the person receiving the greeting

**Personal Message**
- Rich text area (multiline)
- Styling options: Bold, Italic, Underline
- Handwritten-style toggle: renders message in a cursive/script font
- Character limit: 500 characters
- Placeholder: *"Write something from the heart..."*

**Image Upload**
- Upload up to 3 images (JPEG, PNG, WebP)
- Alternatively: choose from a curated free image gallery (Unsplash API or static set)
- Image layout options: Single hero / Side-by-side / Collage

**YouTube Video (Optional)**
- Paste YouTube URL
- Auto-generates embedded preview thumbnail
- Video plays inline on the greeting page

**Decorative Elements**
- Sticker/element picker:
  - Flowers (rose, cherry blossom, tulip, daisy)
  - Confetti / Sparkles
  - Hearts
  - Stars
  - Ribbons / Banners
- Drag-to-place interface or preset layout options (Top, Bottom, Corners, Scattered)

### Step 3 — Customize & Preview
- Live preview panel (desktop + mobile toggle)
- Background color / gradient picker
- Border / frame style selector
- Music mood tag (optional metadata label: e.g., "Romantic", "Cheerful", "Calm")

### Step 4 — Generate Link
- **Generate Shareable Link** button
- Displays unique URL (e.g., `greet.app/g/xk29mz`)
- Copy to clipboard button
- Share options: WhatsApp, Instagram, Twitter/X, Email
- QR Code download option

---

## Greeting View Page (`/g/:id`)

### Layout
- Full-page immersive view, no navigation chrome
- Soft animated entrance (fade-in or petal fall animation)
- Scroll-based reveal of content sections

### Content Sections (in order)
1. **Cover** — Title in chosen font, decorative top elements
2. **Image(s)** — Displayed per selected layout
3. **Personal Message** — Styled text, optionally in handwritten font
4. **YouTube Video** (if added) — Embedded inline player
5. **Decorative Footer** — Bottom stickers, creator attribution ("Made with ♥ on [App Name]")

### Interactions
- Optional: Confetti burst animation on page load (for Birthday/Celebration themes)
- Optional: Floating flower petal animation overlay
- "Send a Reply" lightweight comment box (stored with greeting, no login needed)

---

## My Greetings Page (Optional / Session-Based)

### Features
- Lists all greetings created in the current browser session (localStorage)
- Option to copy link, preview, or delete each greeting
- Soft prompt to save via email (for future retrieval) — no account required
- "Start fresh" creates a new greeting

### Greeting Card Item
- Thumbnail preview
- Title and occasion type
- Date created
- Shareable link with copy button
- View count (if tracked)

---

## Templates & Themes

### Template Structure
Each template defines:
- Background: solid color, gradient, or subtle floral pattern
- Primary font: one of [Playfair Display, Dancing Script, Lora, DM Serif, Poppins]
- Accent color: used for headings and decorative elements
- Default sticker set: flowers, confetti, hearts, etc.
- Animation style: fade, float, bloom

### Predefined Themes

| Theme Name     | Occasion       | Palette              | Vibe              |
|----------------|----------------|----------------------|-------------------|
| Rose Garden    | Birthday       | Blush + Dusty Rose   | Romantic, soft    |
| Golden Hour    | Anniversary    | Warm gold + cream    | Elegant, warm     |
| Midnight Bloom | Any            | Deep navy + lavender | Dreamy, mysterious|
| Spring Petals  | Birthday / Thanks | Mint + peach      | Fresh, cheerful   |
| Minimal Ink    | Congratulations | Off-white + black   | Clean, modern     |
| Celestial      | Any            | Soft purple + stars  | Magical, ethereal |

---

## Data Model

### Greeting
```json
{
  "id": "string (nanoid, 6-char)",
  "occasion": "birthday | anniversary | thankyou | congratulations | custom",
  "theme": "string (theme ID)",
  "title": "string",
  "recipientName": "string",
  "message": "string",
  "messageStyle": "normal | handwritten",
  "images": ["string (base64 or URL, max 3)"],
  "youtubeUrl": "string | null",
  "stickers": [
    {
      "type": "string (flower | heart | confetti | star | ribbon)",
      "position": "string (top | bottom | corners | scattered)"
    }
  ],
  "fontStyle": "serif | script | handwritten | minimal",
  "backgroundColor": "string (hex)",
  "createdAt": "timestamp",
  "viewCount": "number",
  "replies": [
    {
      "id": "string",
      "message": "string",
      "senderName": "string | null",
      "createdAt": "timestamp"
    }
  ]
}
```

### Session (Client-Side Only)
```json
{
  "greetingIds": ["string"],
  "lastActive": "timestamp"
}
```

---

## Default Sticker Sets

### Floral
- Rose
- Cherry Blossom
- Tulip
- Daisy
- Wildflower Bunch

### Celebratory
- Confetti Burst
- Balloon Cluster
- Party Hat
- Sparkles
- Star Shower

### Romantic
- Red Heart
- Pink Heart
- Heart Confetti
- Love Letter
- Ribbon Bow

---

## Core Functionalities

### Greeting Creation
- Step-by-step creation wizard (4 steps)
- Live preview panel updates in real time
- Support for image upload (max 3 images, max 5MB each)
- Optional YouTube embed via URL
- Sticker placement via preset positions
- Font and color customization

### Link Generation
- Generate a unique short ID per greeting (e.g., nanoid: `xk29mz`)
- Public URL format: `/g/:id`
- No login required to create or view
- URL is permanent (tied to localStorage or backend store)

### Greeting View
- Clean, immersive full-page layout
- Responsive for mobile and desktop
- Animated entrance effects
- Embedded YouTube player (lazy loaded)
- Lightweight reply system (name optional)

### Sharing
- One-click copy to clipboard
- Native share API (mobile)
- WhatsApp / Twitter / Email direct share links
- QR Code download (PNG)

### Session Management
- Store created greeting IDs in localStorage
- List greetings in "My Greetings" panel
- No authentication required
- Optional: collect email for greeting recovery

---

## Features for MVP

- Greeting creation wizard (4 steps)
- 6 curated themes with live preview
- Image upload (up to 3 images)
- Personal message with handwritten-style toggle
- Sticker/decoration selector (preset positions)
- YouTube embed via URL
- Unique shareable link generation
- Immersive greeting view page
- Copy link + WhatsApp / Twitter share
- My Greetings (session-based, localStorage)

## Features to Exclude from MVP

- User accounts / authentication
- Custom domain vanity URLs
- Scheduled delivery (send on a date)
- Animated GIF stickers
- Audio/background music upload
- AI-generated message suggestions
- Analytics dashboard for creators
- Paid premium themes
- End-to-end encrypted greetings
- Multi-page greeting booklets

---

## Technical Requirements

### Data Storage
- MVP: localStorage for created greeting IDs + greeting JSON
- Structure greetings for future migration to backend (Supabase / Firebase / PlanetScale)
- Images stored as base64 strings in localStorage (keep under 5MB total per greeting)
- Greeting ID indexed by nanoid for URL resolution

### Animations
- Use CSS keyframes or Framer Motion for entrance effects
- Petal / confetti animation: canvas-based or CSS particle system
- Keep animations lightweight — no jank on mobile

### Fonts
- Load via Google Fonts: Playfair Display, Dancing Script, Lora, DM Serif Display, Poppins
- Preload font on theme selection to avoid FOUT

### Forms
- Validate all inputs (title required, message ≤ 500 chars, valid YouTube URL if provided)
- Show inline error messages
- Preview updates live on every keystroke / selection change

### Responsive Design
- Mobile-first layout
- Greeting view page optimized for sharing on phone screens
- Creation wizard works fully on mobile

### Performance
- Lazy load images on greeting view page
- Compress uploaded images client-side before storage
- Page load < 2s on 4G connection

---

## Summary

Build a minimal, beautiful greeting page creator that lets anyone make an emotional, personalized digital card — with images, messages, stickers, and optional YouTube embeds — shareable via a unique link in seconds. No login. No friction. Just warmth, delivered in a link.