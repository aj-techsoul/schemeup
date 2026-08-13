'use client';

import { useState } from 'react';
import { Search, UserCheck, Bot, Sparkles, Download, ShieldCheck, Heart } from 'lucide-react';

export default function Navbar({ user, onOpenProfile, onOpenScraper }) {
  return (
    <header className="sticky top-0 z-40 bg-slate-950/85 backdrop-blur-xl border-b border-slate-800/80">
      {/* Supervised Header Ticker */}
      <div className="bg-gradient-to-r from-blue-900/60 via-purple-900/60 to-cyan-900/60 py-1.5 px-4 border-b border-cyan-500/20 text-xs text-center text-cyan-200 flex items-center justify-center gap-2">
        <Sparkles className="w-3.5 h-3.5 text-amber-400 animate-spin" />
        <span>
          Supervised by: <strong className="text-amber-300">Handsome, Good looking, Genius, Self obsessed lover, PB AJ</strong>
        </span>
        <span className="hidden md:inline text-slate-400">|</span>
        <span className="hidden md:inline text-slate-300">
          Created by: <strong className="text-pink-300">Beautifull Lino &amp; Sweetypie Rosa</strong>
        </span>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Brand / Logo */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-cyan-500 via-blue-600 to-indigo-600 flex items-center justify-center shadow-lg shadow-cyan-500/20 text-white font-black text-xl tracking-tighter">
            S
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-extrabold text-xl tracking-tight text-white bg-clip-text text-transparent bg-gradient-to-r from-white via-slate-100 to-cyan-400">
                SchemeUp
              </span>
              <span className="px-2 py-0.5 text-[10px] font-bold tracking-wide uppercase rounded-full bg-cyan-500/20 text-cyan-400 border border-cyan-500/30">
                PWA Ready
              </span>
            </div>
            <p className="text-[11px] text-slate-400 hidden sm:block">
              AI Scheme Matcher &amp; Scraper Engine
            </p>
          </div>
        </div>

        {/* User Status & Controls */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* User Profile Chip */}
          <button
            onClick={onOpenProfile}
            className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-800 hover:border-cyan-500/50 hover:bg-slate-850 transition group text-left"
          >
            <div className="w-7 h-7 rounded-lg bg-cyan-600/20 text-cyan-400 flex items-center justify-center font-bold text-xs">
              <UserCheck className="w-4 h-4" />
            </div>
            <div className="hidden sm:block text-xs">
              <div className="font-semibold text-slate-200 group-hover:text-cyan-300 transition">
                {user ? user.name : 'Logged In User'}
              </div>
              <div className="text-[10px] text-slate-400">
                {user ? `${user.occupation} • ${user.category}` : 'Setup Profile'}
              </div>
            </div>
          </button>

          {/* Scraper Control Drawer Button */}
          <button
            onClick={onOpenScraper}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-800 hover:border-amber-500/50 hover:bg-slate-850 text-xs font-medium text-slate-300 hover:text-amber-300 transition"
            title="Backend Scraper Control Console"
          >
            <Bot className="w-4 h-4 text-amber-400 animate-pulse" />
            <span className="hidden md:inline">Scraper Engine</span>
          </button>
        </div>
      </div>
    </header>
  );
}
