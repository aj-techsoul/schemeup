'use client';

import { Bookmark, ExternalLink, Sparkles, Building2, CheckCircle2, ArrowRight, Zap } from 'lucide-react';

export default function SchemeCard({ scheme, onSelect, onBookmark }) {
  const getCategoryColor = (cat) => {
    switch (cat) {
      case 'Funding':
        return 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30';
      case 'Grants':
        return 'bg-purple-500/10 text-purple-400 border-purple-500/30';
      case 'Jobs':
        return 'bg-blue-500/10 text-blue-400 border-blue-500/30';
      case 'Scholarships':
        return 'bg-amber-500/10 text-amber-400 border-amber-500/30';
      case 'Rules':
        return 'bg-rose-500/10 text-rose-400 border-rose-500/30';
      default:
        return 'bg-cyan-500/10 text-cyan-400 border-cyan-500/30';
    }
  };

  const getMatchBadgeColor = (score) => {
    if (score >= 85) return 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40';
    if (score >= 70) return 'bg-cyan-500/20 text-cyan-300 border-cyan-500/40';
    return 'bg-slate-800 text-slate-400 border-slate-700';
  };

  const keywordsList = scheme.keywords ? scheme.keywords.split(',').slice(0, 5) : [];

  return (
    <div className="group relative bg-slate-900/90 hover:bg-slate-900 border border-slate-800 hover:border-cyan-500/40 rounded-3xl p-6 transition-all duration-300 shadow-xl hover:shadow-cyan-500/10 flex flex-col justify-between">
      <div>
        {/* Card Header: Category & Match Score */}
        <div className="flex items-center justify-between gap-2 mb-4">
          <span className={`px-3 py-1 text-xs font-bold rounded-full border ${getCategoryColor(scheme.category)}`}>
            {scheme.category}
          </span>

          <div className="flex items-center gap-2">
            <span className={`px-2.5 py-1 text-xs font-extrabold rounded-full border flex items-center gap-1.5 ${getMatchBadgeColor(scheme.match_score)}`}>
              <Zap className="w-3 h-3 animate-bounce" />
              {scheme.match_score}% Match
            </span>

            <button
              onClick={(e) => {
                e.stopPropagation();
                onBookmark(scheme.id);
              }}
              className={`p-2 rounded-xl border transition ${
                scheme.is_saved
                  ? 'bg-amber-500/20 text-amber-400 border-amber-500/40'
                  : 'bg-slate-800/80 text-slate-400 border-slate-700 hover:text-white'
              }`}
              title={scheme.is_saved ? "Saved to Bookmarks" : "Save Scheme"}
            >
              <Bookmark className={`w-4 h-4 ${scheme.is_saved ? 'fill-amber-400' : ''}`} />
            </button>
          </div>
        </div>

        {/* Title */}
        <h3 
          onClick={() => onSelect(scheme)}
          className="text-lg font-bold text-white group-hover:text-cyan-300 transition cursor-pointer line-clamp-2"
        >
          {scheme.title}
        </h3>

        {/* Department / Offered By */}
        <div className="flex items-center gap-1.5 text-xs text-slate-400 mt-2 mb-3">
          <Building2 className="w-3.5 h-3.5 text-slate-500 shrink-0" />
          <span className="truncate">{scheme.offered_by || 'Government of India'}</span>
        </div>

        {/* Benefit Highlight Box */}
        {scheme.benefit_amount && (
          <div className="p-3 rounded-2xl bg-cyan-950/40 border border-cyan-800/30 text-cyan-200 text-xs font-semibold mb-4 flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-cyan-400 shrink-0" />
            <span className="line-clamp-1">{scheme.benefit_amount}</span>
          </div>
        )}

        {/* Description snippet */}
        <p className="text-xs text-slate-300 line-clamp-3 mb-4 leading-relaxed">
          {scheme.description}
        </p>

        {/* Scraped Keywords */}
        {keywordsList.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mb-6">
            {keywordsList.map((kw, i) => (
              <span key={i} className="px-2 py-0.5 text-[10px] font-medium bg-slate-800 text-slate-300 rounded-md">
                #{kw.trim()}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Card Footer Action */}
      <div className="pt-4 border-t border-slate-800/80 flex items-center justify-between">
        <span className="text-[11px] text-slate-400">
          Deadline: <strong className="text-slate-200">{scheme.application_deadline}</strong>
        </span>

        <button
          onClick={() => onSelect(scheme)}
          className="flex items-center gap-1 text-xs font-bold text-cyan-400 hover:text-cyan-300 transition"
        >
          View Scheme <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
}
