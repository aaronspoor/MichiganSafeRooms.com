import type { Metadata } from "next";
import "./globals.css";
import Link from "next/link";

export const metadata: Metadata = {
  title: {
    default: "Michigan Safe Rooms | Storm Shelters & Safe Room Installation",
    template: "%s | Michigan Safe Rooms",
  },
  description:
    "Michigan's trusted resource for safe rooms and storm shelters. FEMA-compliant installation, pricing guides, and local contractor information for Michigan homeowners.",
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

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-white text-gray-900 font-sans antialiased">
        {/* Header */}
        <header className="bg-brand shadow-sm">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
            <Link href="/" className="flex items-center gap-2 group">
              <span className="text-brand-accent font-bold text-xl">🛡️</span>
              <span className="text-white font-bold text-lg leading-tight">
                Michigan Safe Rooms
              </span>
            </Link>
            <nav className="flex gap-6 text-sm font-medium text-blue-100">
              <Link href="/" className="hover:text-white transition-colors">
                Home
              </Link>
              <Link href="/blog" className="hover:text-white transition-colors">
                Blog
              </Link>
              <a
                href="mailto:aaronspoorconstruction@gmail.com"
                className="bg-brand-accent text-white px-4 py-1.5 rounded font-semibold hover:opacity-90 transition-opacity"
              >
                Get a Quote
              </a>
            </nav>
          </div>
        </header>

        {/* Page content */}
        <main>{children}</main>

        {/* Footer */}
        <footer className="bg-gray-900 text-gray-400 mt-20">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 py-10 grid grid-cols-1 sm:grid-cols-3 gap-8 text-sm">
            <div>
              <p className="text-white font-semibold mb-2">Michigan Safe Rooms</p>
              <p>
                Helping Michigan homeowners find FEMA-compliant safe rooms and
                storm shelters since 2024.
              </p>
            </div>
            <div>
              <p className="text-white font-semibold mb-2">Resources</p>
              <ul className="space-y-1">
                <li>
                  <Link href="/blog" className="hover:text-white">
                    Blog
                  </Link>
                </li>
                <li>
                  <a
                    href="https://www.fema.gov/safe-rooms"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-white"
                  >
                    FEMA Safe Room Resources
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <p className="text-white font-semibold mb-2">Contact</p>
              <ul className="space-y-1">
                <li>
                  <a
                    href="mailto:aaronspoorconstruction@gmail.com"
                    className="hover:text-white"
                  >
                    aaronspoorconstruction@gmail.com
                  </a>
                </li>
                <li className="text-gray-500 text-xs pt-1">
                  Serving all of Michigan
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 text-center text-xs py-4 text-gray-600">
            © {new Date().getFullYear()} MichiganSafeRooms.com — All rights
            reserved.
          </div>
        </footer>
      </body>
    </html>
  );
}
