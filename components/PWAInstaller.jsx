'use client';

import { useState, useEffect } from 'react';
import { Download, Smartphone, X, CheckCircle2 } from 'lucide-react';

export default function PWAInstaller() {
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [showPrompt, setShowPrompt] = useState(false);
  const [isInstalled, setIsInstalled] = useState(false);

  useEffect(() => {
    // Register Service Worker
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('/sw.js').then(
        (registration) => {
          console.log('[SchemeUp PWA] ServiceWorker registered:', registration.scope);
        },
        (err) => {
          console.log('[SchemeUp PWA] ServiceWorker registration failed:', err);
        }
      );
    }

    const handleBeforeInstallPrompt = (e) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setShowPrompt(true);
    };

    const handleAppInstalled = () => {
      setIsInstalled(true);
      setShowPrompt(false);
      setDeferredPrompt(null);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    window.addEventListener('appinstalled', handleAppInstalled);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
      window.removeEventListener('appinstalled', handleAppInstalled);
    };
  }, []);

  const handleInstallClick = async () => {
    if (!deferredPrompt) {
      alert("App installation prompt is ready! If you are on desktop Chrome/Edge, click the Install icon in your browser address bar.");
      return;
    }
    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    if (outcome === 'accepted') {
      console.log('[SchemeUp PWA] User accepted install prompt');
      setIsInstalled(true);
    }
    setDeferredPrompt(null);
    setShowPrompt(false);
  };

  if (isInstalled) return null;

  return (
    <>
      {showPrompt && (
        <div className="fixed bottom-6 right-6 z-50 max-w-md w-full p-4 bg-slate-900/95 backdrop-blur-md border border-cyan-500/40 text-white rounded-2xl shadow-2xl animate-fade-in-up">
          <div className="flex items-start justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-cyan-600/20 text-cyan-400 rounded-xl border border-cyan-500/30">
                <Smartphone className="w-6 h-6 animate-pulse" />
              </div>
              <div>
                <h4 className="font-bold text-base text-cyan-300">Install SchemeUp App</h4>
                <p className="text-xs text-slate-300 mt-0.5">
                  Get instant offline access to government jobs, grants & schemes.
                </p>
              </div>
            </div>
            <button
              onClick={() => setShowPrompt(false)}
              className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800 transition"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="mt-4 flex items-center justify-end gap-2">
            <button
              onClick={() => setShowPrompt(false)}
              className="px-3 py-1.5 text-xs text-slate-400 hover:text-white transition"
            >
              Maybe Later
            </button>
            <button
              onClick={handleInstallClick}
              className="flex items-center gap-2 px-4 py-2 text-xs font-semibold bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white rounded-xl shadow-lg transition transform hover:-translate-y-0.5 active:translate-y-0"
            >
              <Download className="w-4 h-4" />
              Install Now
            </button>
          </div>
        </div>
      )}
    </>
  );
}
