import type { Metadata } from "next";
import "./globals.css";
import Link from "next/link";
import { Analytics } from "@vercel/analytics/next";
import { Barlow_Condensed, DM_Sans } from "next/font/google";
import TrustBar from "@/app/components/TrustBar";
import StickyMobileCta from "@/app/components/StickyMobileCta";

// Barlow Condensed — headings
const barlow = Barlow_Condensed({
  weight: ["400", "600", "700", "800"],
  subsets: ["latin"],
  variable: "--font-barlow",
  display: "swap",
});

// DM Sans — body text
const dmSans = DM_Sans({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
  variable: "--font-dm",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Michigan Safe Rooms | Steel Safe Room Installation",
    template: "%s | Michigan Safe Rooms",
  },
  description:
    "Michigan's trusted safe room installer. Premium steel shelters designed, fabricated, and installed across lower Michigan. Free quotes — fast install times.",
  metadataBase: new URL("https://michigansaferooms.com"),
  openGraph: {
    siteName: "Michigan Safe Rooms",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
  },
};

// Shield SVG icon — used in nav and footer
function ShieldIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4z" />
    </svg>
  );
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${barlow.variable} ${dmSans.variable}`}>
      <body className="bg-white text-gray-900 font-sans antialiased">
        {/* Google Analytics 4 — TODO: Replace G-XXXXXXXXXX with real Measurement ID */}
        {/* eslint-disable-next-line @next/next/no-sync-scripts */}
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX" />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-XXXXXXXXXX');
            `,
          }}
        />

        {/* ── Sticky Navigation ───────────────────────────────────────── */}
        <header className="sticky top-0 z-50 bg-brand shadow-lg">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between gap-6">

            {/* Logo */}
            <Link href="/" className="flex items-center gap-2.5 shrink-0 group">
              <ShieldIcon className="w-7 h-7 text-brand-accent" />
              <span className="text-white font-heading font-bold text-lg tracking-wide leading-none">
                Michigan Safe Rooms
              </span>
            </Link>

            {/* Nav links — hidden on small screens */}
            <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-blue-100">
              <a href="/#how-it-works" className="hover:text-white transition-colors">How It Works</a>
              <Link href="/gallery" className="hover:text-white transition-colors">Gallery</Link>
              <a href="/#faq" className="hover:text-white transition-colors">FAQ</a>
              <a href="/#contact" className="hover:text-white transition-colors">Contact</a>
              <Link href="/blog" className="hover:text-white transition-colors">Blog</Link>
            </nav>

            {/* Right side: phone + CTA */}
            <div className="flex items-center gap-4 shrink-0">
              <a
                href="tel:+19896277291"
                className="hidden sm:block text-brand-accent font-semibold text-sm hover:opacity-80 transition-opacity"
              >
                (989) 627-7291
              </a>
              <a
                href="/#contact"
                className="bg-brand-accent text-white px-4 py-2 rounded-lg font-bold text-sm hover:opacity-90 transition-opacity whitespace-nowrap"
              >
                Get a Quote
              </a>
            </div>

          </div>
        </header>

        <TrustBar />

        {/* ── Page content ─────────────────────────────────────────────── */}
        <main>{children}</main>

        {/* ── Footer ───────────────────────────────────────────────────── */}
        <footer className="bg-gray-900 text-gray-400">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12 grid grid-cols-1 sm:grid-cols-4 gap-8 text-sm">

            {/* Brand column */}
            <div className="sm:col-span-2">
              <div className="flex items-center gap-2.5 mb-4">
                <ShieldIcon className="w-6 h-6 text-brand-accent" />
                <span className="text-white font-heading font-bold text-lg tracking-wide">
                  Michigan Safe Rooms
                </span>
              </div>
              <p className="text-gray-400 leading-relaxed mb-4">
                Protecting Michigan families with premium steel safe rooms.
                Centrally located in lower Michigan — fast install times across the state.
              </p>
              <a href="tel:+19896277291" className="text-brand-accent font-semibold hover:opacity-80">
                (989) 627-7291
              </a>
            </div>

            {/* Quick links */}
            <div>
              <p className="text-white font-semibold mb-3">Quick Links</p>
              <ul className="space-y-2">
                <li><a href="/#how-it-works" className="hover:text-white transition-colors">How It Works</a></li>
                <li><a href="/#faq" className="hover:text-white transition-colors">FAQ</a></li>
                <li><Link href="/blog" className="hover:text-white transition-colors">Blog</Link></li>
              </ul>
            </div>

            {/* Contact */}
            <div>
              <p className="text-white font-semibold mb-3">Contact</p>
              <ul className="space-y-2">
                <li>
                  <a
                    href="mailto:aaronspoorconstruction@gmail.com"
                    className="hover:text-white transition-colors"
                  >
                    aaronspoorconstruction@gmail.com
                  </a>
                </li>
                <li>Durand, MI 48429</li>
                <li className="text-gray-500 text-xs pt-1">Serving all of lower Michigan</li>
              </ul>
            </div>

          </div>

          {/* Copyright bar */}
          <div className="border-t border-gray-800 text-center text-xs py-4 text-gray-600">
            © {new Date().getFullYear()} MichiganSafeRooms.com — All rights reserved.
          </div>
        </footer>

        <Analytics />
        <StickyMobileCta />
      </body>
    </html>
  );
}
