'use client';

import { X, ExternalLink, Sparkles, Building2, CheckCircle2, ShieldCheck, Tag, Calendar, UserCheck } from 'lucide-react';

export default function SchemeModal({ scheme, onClose, user }) {
  if (!scheme) return null;

  const keywordsList = scheme.keywords ? scheme.keywords.split(',') : [];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fade-in">
      <div className="bg-slate-900 border border-slate-800 rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6 sm:p-8 shadow-2xl text-white relative">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 p-2 rounded-xl text-slate-400 hover:text-white bg-slate-800/80 hover:bg-slate-800 transition"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="flex flex-wrap items-center gap-2 mb-3">
          <span className="px-3 py-1 text-xs font-bold rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/30">
            {scheme.category}
          </span>
          <span className="px-3 py-1 text-xs font-extrabold rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/40">
            {scheme.match_score}% User Eligibility Match
          </span>
        </div>

        <h2 className="text-2xl font-black text-white mb-2 leading-tight">
          {scheme.title}
        </h2>

        <div className="flex items-center gap-2 text-sm text-slate-400 mb-6">
          <Building2 className="w-4 h-4 text-cyan-400" />
          <span>{scheme.offered_by || 'Government of India'}</span>
        </div>

        {/* Benefit Summary Highlight */}
        {scheme.benefit_amount && (
          <div className="p-4 rounded-2xl bg-gradient-to-r from-cyan-950/80 to-blue-950/80 border border-cyan-500/30 mb-6">
            <div className="text-xs font-semibold uppercase tracking-wider text-cyan-400 mb-1 flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-amber-400" /> Key Financial Benefit / Grant
            </div>
            <div className="text-lg font-bold text-white">{scheme.benefit_amount}</div>
          </div>
        )}

        {/* Description */}
        <div className="mb-6">
          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">Overview &amp; Objectives</h4>
          <p className="text-sm text-slate-200 leading-relaxed bg-slate-950/60 p-4 rounded-2xl border border-slate-800/80">
            {scheme.description}
          </p>
        </div>

        {/* Eligibility Details Grid */}
        <div className="mb-6">
          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3 flex items-center gap-2">
            <UserCheck className="w-4 h-4 text-cyan-400" /> Eligibility Criteria Match
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
            <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
              <span className="text-slate-400 block mb-0.5">Target Occupations</span>
              <strong className="text-slate-200">{scheme.eligibility_occupations}</strong>
            </div>
            <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
              <span className="text-slate-400 block mb-0.5">Age Limit</span>
              <strong className="text-slate-200">{scheme.eligibility_min_age} to {scheme.eligibility_max_age} Years</strong>
            </div>
            <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
              <span className="text-slate-400 block mb-0.5">Income Limit</span>
              <strong className="text-slate-200">{scheme.eligibility_income}</strong>
            </div>
            <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
              <span className="text-slate-400 block mb-0.5">Target Category</span>
              <strong className="text-slate-200">{scheme.eligibility_category}</strong>
            </div>
          </div>
        </div>

        {/* Extracted Keywords */}
        {keywordsList.length > 0 && (
          <div className="mb-6">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2 flex items-center gap-1.5">
              <Tag className="w-3.5 h-3.5" /> Scraped &amp; Indexed Keywords
            </h4>
            <div className="flex flex-wrap gap-1.5">
              {keywordsList.map((kw, i) => (
                <span key={i} className="px-2.5 py-1 text-xs bg-slate-800/80 text-cyan-300 rounded-lg border border-slate-700">
                  #{kw.trim()}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Modal Action Footer */}
        <div className="pt-6 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-xs text-slate-400 flex items-center gap-1.5">
            <Calendar className="w-4 h-4 text-slate-500" />
            Deadline: <strong className="text-white">{scheme.application_deadline}</strong>
          </div>

          <a
            href={scheme.source_url || '#'}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-bold text-xs shadow-lg shadow-cyan-500/20 transition transform hover:-translate-y-0.5"
          >
            Apply / Official Portal <ExternalLink className="w-4 h-4" />
          </a>
        </div>
      </div>
    </div>
  );
}
