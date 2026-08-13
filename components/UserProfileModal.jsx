'use client';

import { useState, useEffect } from 'react';
import { X, User, Briefcase, Award, MapPin, DollarSign, Tag, Save } from 'lucide-react';

export default function UserProfileModal({ isOpen, onClose, user, onSave }) {
  const [formData, setFormData] = useState({
    name: 'Beautifull Lino & Sweetypie Rosa',
    age: 24,
    gender: 'All',
    occupation: 'Student',
    income_bracket: 'Under 2.5 Lakhs',
    state: 'All India',
    category: 'General',
    interests: 'scholarship,grant,funding,job'
  });

  useEffect(() => {
    if (user) {
      setFormData(user);
    }
  }, [user]);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fade-in">
      <div className="bg-slate-900 border border-slate-800 rounded-3xl max-w-xl w-full p-6 shadow-2xl overflow-hidden text-white relative">
        <div className="flex items-center justify-between border-b border-slate-800 pb-4 mb-6">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-cyan-600/20 text-cyan-400 rounded-xl border border-cyan-500/30">
              <User className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white">Your Profile Criteria</h3>
              <p className="text-xs text-slate-400">
                SchemeUp uses these details to match government schemes specifically for you.
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Full Name */}
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                Full Name / Profile Tag
              </label>
              <input
                type="text"
                value={formData.name || ''}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-sm text-white focus:outline-none focus:border-cyan-500"
              />
            </div>

            {/* Age */}
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Age (Years)</label>
              <input
                type="number"
                value={formData.age || 24}
                onChange={(e) => setFormData({ ...formData, age: parseInt(e.target.value, 10) })}
                className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-sm text-white focus:outline-none focus:border-cyan-500"
              />
            </div>

            {/* Occupation */}
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Occupation</label>
              <select
                value={formData.occupation || 'Student'}
                onChange={(e) => setFormData({ ...formData, occupation: e.target.value })}
                className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-sm text-white focus:outline-none focus:border-cyan-500"
              >
                <option value="Student">Student</option>
                <option value="Entrepreneur">Entrepreneur / Business Owner</option>
                <option value="Farmer">Farmer / Agriculture Worker</option>
                <option value="Unemployed">Unemployed / Job Seeker</option>
                <option value="Professional">Professional / Employed</option>
              </select>
            </div>

            {/* Income Bracket */}
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Annual Income</label>
              <select
                value={formData.income_bracket || 'Under 2.5 Lakhs'}
                onChange={(e) => setFormData({ ...formData, income_bracket: e.target.value })}
                className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-sm text-white focus:outline-none focus:border-cyan-500"
              >
                <option value="Under 2.5 Lakhs">Under ₹2.5 Lakhs</option>
                <option value="2.5L - 5L">₹2.5 Lakhs - ₹5 Lakhs</option>
                <option value="5L - 10L">₹5 Lakhs - ₹10 Lakhs</option>
                <option value="Above 10L">Above ₹10 Lakhs</option>
              </select>
            </div>

            {/* Social Category */}
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Category</label>
              <select
                value={formData.category || 'General'}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-sm text-white focus:outline-none focus:border-cyan-500"
              >
                <option value="General">General</option>
                <option value="OBC">OBC</option>
                <option value="SC">SC (Scheduled Caste)</option>
                <option value="ST">ST (Scheduled Tribe)</option>
                <option value="EWS">EWS</option>
              </select>
            </div>

            {/* State */}
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">State / Region</label>
              <input
                type="text"
                value={formData.state || 'All India'}
                onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-sm text-white focus:outline-none focus:border-cyan-500"
              />
            </div>
          </div>

          <div className="pt-4 flex justify-end gap-3 border-t border-slate-800">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs text-slate-400 hover:text-white transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex items-center gap-2 px-5 py-2 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white font-semibold text-xs shadow-lg shadow-cyan-600/30 transition"
            >
              <Save className="w-4 h-4" />
              Save &amp; Recalculate Matches
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
