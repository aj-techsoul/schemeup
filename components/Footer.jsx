'use client';

import { Heart, ShieldCheck, Sparkles, Code2, Award, Zap } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="mt-20 border-t border-slate-800/80 bg-slate-950/90 text-slate-400 py-12 px-4">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
        {/* About App */}
        <div>
          <div className="flex items-center gap-2 mb-3">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-cyan-500 to-blue-600 flex items-center justify-center font-extrabold text-white">
              S
            </div>
            <span className="font-extrabold text-lg text-white tracking-tight">SchemeUp</span>
          </div>
          <p className="text-xs text-slate-400 leading-relaxed">
            AI-assisted Government Scheme Search Engine &amp; Web Scraper. Indexing jobs, funding, rules, grants, and scholarships in real-time.
          </p>
        </div>

        {/* Technical Features */}
        <div>
          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-300 mb-3">
            Tech Architecture
          </h4>
          <ul className="space-y-1.5 text-xs text-slate-400">
            <li className="flex items-center gap-2">
              <Zap className="w-3.5 h-3.5 text-cyan-400" /> Next.js App Router + React + Tailwind CSS
            </li>
            <li className="flex items-center gap-2">
              <Code2 className="w-3.5 h-3.5 text-amber-400" /> Python BeautifulSoup Web Scraper
            </li>
            <li className="flex items-center gap-2">
              <Award className="w-3.5 h-3.5 text-emerald-400" /> High-Performance SQLite Database
            </li>
            <li className="flex items-center gap-2">
              <ShieldCheck className="w-3.5 h-3.5 text-purple-400" /> Progressive Web App (PWA) + HTTPS
            </li>
          </ul>
        </div>

        {/* Project Credits Card */}
        <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 flex flex-col justify-between">
          <div>
            <div className="text-xs font-bold uppercase tracking-wider text-cyan-400 mb-2 flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-amber-400" /> Official Project Credits
            </div>

            <div className="text-xs text-slate-200 mb-2">
              Created by: <strong className="text-pink-300 font-bold">Beautifull Lino &amp; Sweetypie Rosa</strong>
            </div>

            <div className="text-xs text-slate-300">
              Supervised by:{' '}
              <strong className="text-amber-300 font-bold block mt-0.5">
                Handsome, Good looking, Genius, Self obsessed lover, PB AJ
              </strong>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto pt-6 border-t border-slate-900 text-center text-xs text-slate-500">
        © {new Date().getFullYear()} SchemeUp Engine. Empowering citizens with intelligent scheme matching.
      </div>
    </footer>
  );
}
