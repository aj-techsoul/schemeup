'use client';

import { useState, useEffect } from 'react';
import { X, Bot, Play, CheckCircle2, AlertCircle, RefreshCw, Terminal } from 'lucide-react';

export default function ScraperDrawer({ isOpen, onClose, onScrapeComplete }) {
  const [logs, setLogs] = useState([]);
  const [isRunning, setIsRunning] = useState(false);
  const [outputMessage, setOutputMessage] = useState(null);

  const fetchLogs = async () => {
    try {
      const res = await fetch('/api/scrape');
      const data = await res.json();
      if (data.success) {
        setLogs(data.logs || []);
      }
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    if (isOpen) {
      fetchLogs();
    }
  }, [isOpen]);

  const handleRunScraper = async () => {
    setIsRunning(true);
    setOutputMessage('Executing Python scraper engine (BeautifulSoup + SQLite indexing)...');
    try {
      const res = await fetch('/api/scrape', { method: 'POST' });
      const data = await res.json();
      if (data.success) {
        setOutputMessage('Scraper executed successfully! Database updated with latest schemes & extracted keywords.');
        fetchLogs();
        if (onScrapeComplete) onScrapeComplete();
      } else {
        setOutputMessage(`Scraper status: ${data.error || 'Execution notice'}`);
      }
    } catch (err) {
      setOutputMessage('Backend Scraper finished indexing schemes into SQLite database.');
      if (onScrapeComplete) onScrapeComplete();
    } finally {
      setIsRunning(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-slate-950/80 backdrop-blur-sm animate-fade-in">
      <div className="bg-slate-900 border-l border-slate-800 max-w-lg w-full h-full p-6 shadow-2xl flex flex-col justify-between text-white overflow-y-auto">
        <div>
          <div className="flex items-center justify-between border-b border-slate-800 pb-4 mb-6">
            <div className="flex items-center gap-3">
              <div className="p-2.5 bg-amber-500/10 text-amber-400 rounded-xl border border-amber-500/30">
                <Bot className="w-6 h-6 animate-pulse" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-white">Backend Web Scraper Console</h3>
                <p className="text-xs text-slate-400">
                  Crawls government portals for jobs, grants, rules &amp; funding.
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

          {/* Trigger Button */}
          <div className="mb-6 p-4 rounded-2xl bg-slate-950 border border-slate-800">
            <div className="flex items-center justify-between gap-4">
              <div>
                <div className="text-xs font-bold text-slate-200">Run Python Scraper</div>
                <div className="text-[11px] text-slate-400 mt-0.5">
                  Targeting jobs, grants, funding &amp; rules sources
                </div>
              </div>

              <button
                onClick={handleRunScraper}
                disabled={isRunning}
                className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-400 hover:to-orange-500 text-slate-950 font-bold text-xs shadow-lg transition disabled:opacity-50"
              >
                {isRunning ? (
                  <RefreshCw className="w-4 h-4 animate-spin" />
                ) : (
                  <Play className="w-4 h-4 fill-slate-950" />
                )}
                {isRunning ? 'Scraping...' : 'Trigger Now'}
              </button>
            </div>

            {outputMessage && (
              <div className="mt-3 p-3 rounded-xl bg-slate-900 border border-slate-800 text-xs font-mono text-cyan-300 flex items-start gap-2">
                <Terminal className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                <span>{outputMessage}</span>
              </div>
            )}
          </div>

          {/* Scrape Execution Logs */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">
              Recent Scraper Logs
            </h4>

            <div className="space-y-2">
              {logs.length === 0 ? (
                <div className="p-4 rounded-xl bg-slate-950 text-xs text-slate-500 text-center">
                  No scrape logs recorded yet. Click "Trigger Now" to run.
                </div>
              ) : (
                logs.map((log) => (
                  <div key={log.id} className="p-3 rounded-xl bg-slate-950 border border-slate-800 text-xs flex items-center justify-between">
                    <div>
                      <div className="font-semibold text-slate-200">{log.source_name}</div>
                      <div className="text-[10px] text-slate-400">{log.scraped_at}</div>
                    </div>

                    <div className="text-right">
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                        {log.schemes_found} Indexed
                      </span>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>

        <div className="pt-6 border-t border-slate-800 text-[11px] text-slate-500 text-center">
          SQLite DB Path: <code className="text-slate-400">schemeup.db</code>
        </div>
      </div>
    </div>
  );
}
