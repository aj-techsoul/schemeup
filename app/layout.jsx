import './globals.css';
import PWAInstaller from '@/components/PWAInstaller';

export const metadata = {
  title: 'SchemeUp - Smart Scheme Search & Matching Engine',
  description: 'Scrapes and matches government jobs, funding, rules, grant schemes and scholarships suitable for your profile.',
  manifest: '/manifest.json',
  themeColor: '#0284c7',
  viewport: 'width=device-width, initial-scale=1, maximum-scale=1',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="dark">
      <head>
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#0284c7" />
        <link rel="apple-touch-icon" href="/icon-192.png" />
      </head>
      <body className="bg-slate-950 text-slate-100 antialiased min-h-screen flex flex-col">
        {children}
        <PWAInstaller />
      </body>
    </html>
  );
}
