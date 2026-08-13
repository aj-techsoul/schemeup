# 🚀 SchemeUp - Smart Scheme Search & Matching Engine

**SchemeUp** is an intelligent web application and discovery engine designed to help citizens and users find relevant government schemes, grants, subsidies, scholarships, and policies tailored to their profile (age, occupation, income bracket, and category).

---

## ✨ Features

- 🔍 **Real-time Search & Filtering**: Instant search across scheme titles, descriptions, and keywords.
- 🎯 **Smart Eligibility Matching Score**: Algorithmic scoring that calculates compatibility based on user demographic attributes (Age, Income, Occupation, Category).
- 💾 **Bookmarks & Saved Schemes**: Save schemes locally and manage your bookmarked collection.
- 🕷️ **Scraper Integration**: Built-in scraper drawer and triggers to fetch and update scheme listings.
- 📱 **Progressive Web App (PWA)**: Support for offline caching and mobile home screen installation.
- 🌐 **Dual Serving Engines**:
  - Light Python Server (`server.py`) with SQLite database (`schemeup.db`).
  - Next.js 14 App Router integration (`app/`).

---

## 🛠️ Project Structure

```text
schemeup/
├── app/                  # Next.js 14 App Router UI & API routes
│   ├── api/              # API endpoints (/api/schemes, /api/user, /api/bookmarks, /api/scrape)
│   ├── page.jsx          # Main Home page component
│   └── layout.jsx        # Root Layout & metadata
├── components/           # UI Components (Navbar, SchemeCard, UserProfileModal, ScraperDrawer, Footer)
├── scraper/              # Python scraper scripts
├── db/                   # Database schemas & SQL setup
├── server.py             # Pure Python HTTP backend server with SQLite integration
├── index.html            # Static PWA entry point
├── railway.toml          # Railway.app deployment configuration
├── netlify.toml          # Netlify deployment configuration
└── package.json          # Dependencies & npm scripts
```

---

## 🚀 Getting Started

### 1. Run via Python (Lightweight Backend)

```bash
python server.py
```
Open [http://localhost:8080](http://localhost:8080) in your browser.

---

### 2. Run via Next.js Dev Server

```bash
# Install dependencies
npm install

# Start Next.js development server
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## ☁️ Deployment

### 🚂 Railway Deployment
This repository is configured with `railway.toml` to automatically deploy using Nixpacks and Python:
- **Start Command**: `python server.py`
- Connect your GitHub repository (`aj-techsoul/schemeup`) on **[Railway.app](https://railway.app)**.

### 🌐 Netlify Deployment
This repository includes `netlify.toml` for seamless static/PWA frontend hosting.

---

## 📄 License
MIT License. Created for SchemeUp search engine platform.
