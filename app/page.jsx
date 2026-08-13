'use client';

import { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import SchemeCard from '@/components/SchemeCard';
import SchemeModal from '@/components/SchemeModal';
import UserProfileModal from '@/components/UserProfileModal';
import ScraperDrawer from '@/components/ScraperDrawer';
import Footer from '@/components/Footer';
import { Search, Filter, Sparkles, SlidersHorizontal, Bot, UserCheck, CheckCircle2, Bookmark, RefreshCw, AlertCircle } from 'lucide-react';

export default function Home() {
  const [schemes, setSchemes] = useState([]);
  const [user, setUser] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');
  const [selectedScheme, setSelectedScheme] = useState(null);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isScraperOpen, setIsScraperOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [onlySaved, setOnlySaved] = useState(false);

  const categories = [
    { id: 'All', label: 'All Schemes' },
    { id: 'Grants', label: 'Grants & Subsidies' },
    { id: 'Funding', label: 'Funding & Capital' },
    { id: 'Jobs', label: 'Government Jobs' },
    { id: 'Scholarships', label: 'Scholarships' },
    { id: 'Rules', label: 'Rules & Policies' },
  ];

  const fetchSchemesData = async () => {
    setLoading(true);
    try {
      const url = new URL('/api/schemes', window.location.origin);
      if (searchQuery) url.searchParams.set('q', searchQuery);
      if (activeCategory !== 'All') url.searchParams.set('category', activeCategory);

      const res = await fetch(url.toString());
      const data = await res.json();
      if (data.success) {
        setSchemes(data.schemes || []);
        if (data.user) setUser(data.user);
      }
    } catch (err) {
      console.error('Error loading schemes:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSchemesData();
  }, [searchQuery, activeCategory]);

  const handleUpdateProfile = async (updatedUser) => {
    try {
      const res = await fetch('/api/user', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedUser)
      });
      const data = await res.json();
      if (data.success) {
        setUser(data.user);
        fetchSchemesData(); // recalculate match percentages
      }
    } catch (e) {
      console.error(e);
    }
  };

  const handleToggleBookmark = async (schemeId) => {
    try {
      const res = await fetch('/api/bookmarks', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ schemeId, userId: user?.id || 1 })
      });
      const data = await res.json();
      if (data.success) {
        setSchemes(prev => prev.map(s => s.id === schemeId ? { ...s, is_saved: data.isSaved } : s));
      }
    } catch (e) {
      console.error(e);
    }
  };

  const displayedSchemes = onlySaved ? schemes.filter(s => s.is_saved) : schemes;

  return (
    <div className="flex-1 flex flex-col">
      <Navbar
        user={user}
        onOpenProfile={() => setIsProfileOpen(true)}
        onOpenScraper={() => setIsScraperOpen(true)}
      />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 flex-1 w-full">
        {/* Hero Section */}
        <div className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-slate-900 via-slate-900 to-cyan-950/60 border border-slate-800 p-6 sm:p-10 mb-8 shadow-2xl">
          <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
          
          <div className="relative z-10 max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-bold mb-4">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              Scraped &amp; Indexed Government Schemes Engine
            </div>

            <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-tight mb-4">
              Find schemes perfectly matched for{' '}
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-blue-400 to-indigo-400">
                your profile.
              </span>
            </h1>

            <p className="text-sm sm:text-base text-slate-300 mb-8 leading-relaxed">
              SchemeUp continuously scrapes web portals for grants, jobs, funding, rules, and scholarships — indexing them with keywords and scoring their suitability for you.
            </p>

            {/* Profile Criteria Quick Bar */}
            {user && (
              <div className="flex flex-wrap items-center gap-2 p-3 rounded-2xl bg-slate-950/80 border border-slate-800/80 mb-6 text-xs text-slate-300">
                <span className="text-slate-400 font-semibold flex items-center gap-1">
                  <UserCheck className="w-4 h-4 text-cyan-400" /> Matching Profile:
                </span>
                <span className="px-2 py-0.5 rounded-md bg-cyan-600/20 text-cyan-300 border border-cyan-500/30 font-medium">
                  {user.occupation}
                </span>
                <span className="px-2 py-0.5 rounded-md bg-slate-800 text-slate-300">
                  {user.age} Yrs
                </span>
                <span className="px-2 py-0.5 rounded-md bg-slate-800 text-slate-300">
                  {user.income_bracket}
                </span>
                <span className="px-2 py-0.5 rounded-md bg-slate-800 text-slate-300">
                  {user.category}
                </span>

                <button
                  onClick={() => setIsProfileOpen(true)}
                  className="ml-auto text-xs font-bold text-cyan-400 hover:text-cyan-300 transition underline underline-offset-4"
                >
                  Edit Profile Criteria →
                </button>
              </div>
            )}

            {/* Search Input Box */}
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
              <input
                type="text"
                placeholder="Search by keywords (e.g. startup, loan, scholarship, recruitment, subsidy, SC/ST, women)..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-4 rounded-2xl bg-slate-950/90 border border-slate-800 text-white text-sm placeholder-slate-500 focus:outline-none focus:border-cyan-500 shadow-xl transition"
              />
            </div>
          </div>
        </div>

        {/* Filter Controls Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
          {/* Category Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 md:pb-0 no-scrollbar">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => {
                  setActiveCategory(cat.id);
                  setOnlySaved(false);
                }}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition whitespace-nowrap border ${
                  activeCategory === cat.id && !onlySaved
                    ? 'bg-cyan-600 text-white border-cyan-500 shadow-lg shadow-cyan-600/30'
                    : 'bg-slate-900/80 text-slate-400 border-slate-800 hover:text-white hover:bg-slate-850'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Bookmarks Toggle Filter */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => setOnlySaved(!onlySaved)}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition border ${
                onlySaved
                  ? 'bg-amber-500 text-slate-950 border-amber-400 shadow-lg shadow-amber-500/20'
                  : 'bg-slate-900/80 text-slate-300 border-slate-800 hover:border-amber-500/50'
              }`}
            >
              <Bookmark className={`w-4 h-4 ${onlySaved ? 'fill-slate-950' : ''}`} />
              Saved Schemes ({schemes.filter(s => s.is_saved).length})
            </button>
          </div>
        </div>

        {/* Schemes Display Grid */}
        {loading ? (
          <div className="py-20 text-center">
            <RefreshCw className="w-8 h-8 text-cyan-400 animate-spin mx-auto mb-3" />
            <p className="text-xs text-slate-400">Filtering &amp; scoring schemes for your profile...</p>
          </div>
        ) : displayedSchemes.length === 0 ? (
          <div className="py-16 px-4 text-center bg-slate-900/50 rounded-3xl border border-slate-800">
            <AlertCircle className="w-10 h-10 text-slate-500 mx-auto mb-3" />
            <h3 className="text-base font-bold text-white mb-1">No schemes found matching criteria</h3>
            <p className="text-xs text-slate-400 mb-4 max-w-md mx-auto">
              Try adjusting your search keywords or switching category filters, or run the web scraper console.
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setActiveCategory('All');
                setOnlySaved(false);
              }}
              className="px-4 py-2 rounded-xl bg-slate-800 text-xs font-bold text-cyan-400 hover:bg-slate-700 transition"
            >
              Clear All Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {displayedSchemes.map((scheme) => (
              <SchemeCard
                key={scheme.id}
                scheme={scheme}
                onSelect={(s) => setSelectedScheme(s)}
                onBookmark={handleToggleBookmark}
              />
            ))}
          </div>
        )}
      </main>

      {/* Modals & Drawers */}
      <SchemeModal
        scheme={selectedScheme}
        onClose={() => setSelectedScheme(null)}
        user={user}
      />

      <UserProfileModal
        isOpen={isProfileOpen}
        onClose={() => setIsProfileOpen(false)}
        user={user}
        onSave={handleUpdateProfile}
      />

      <ScraperDrawer
        isOpen={isScraperOpen}
        onClose={() => setIsScraperOpen(false)}
        onScrapeComplete={fetchSchemesData}
      />

      <Footer />
    </div>
  );
}
