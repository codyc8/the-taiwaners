import type { Metadata } from 'next';
import { Baloo_2, Chivo_Mono } from 'next/font/google';
import Image from 'next/image';
import Link from 'next/link';
import './globals.css';

// Brand faces, self-hosted by next/font so there is no render-blocking request
// to Google. Exposed as CSS variables and applied via .display / .label in
// globals.css rather than being forced onto every element.
const display = Baloo_2({
  subsets: ['latin'],
  weight: ['500', '800'],
  variable: '--font-display',
  display: 'swap',
});

const mono = Chivo_Mono({
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--font-mono',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'The Taiwaners',
  description: 'Where to eat, shop and go in Taipei and beyond — a shared list of places, mapped by area and MRT stop.',
  // SVG first (crisp at any size, and what the kit prefers); the 32px PNG is
  // the fallback for browsers that ignore SVG icons.
  icons: {
    icon: [
      { url: '/favicon.svg', type: 'image/svg+xml' },
      { url: '/favicon-32.png', sizes: '32x32', type: 'image/png' },
    ],
    apple: [{ url: '/favicon-180.png', sizes: '180x180', type: 'image/png' }],
  },
};

const NAV = [
  { href: '/',     label: 'List' },
  { href: '/map',  label: 'Map' },
  { href: '/add',  label: 'Add' },
];

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${display.variable} ${mono.variable}`}>
      <body className="min-h-screen">
        {/* Opaque, not translucent: the lockup PNG carries the cream ground
            baked in, so a see-through header would show a plate edge around it. */}
        <header
          className="sticky top-0 z-40 border-b"
          style={{ borderColor: 'var(--border)', background: 'var(--bg)' }}
        >
          <div className="mx-auto flex max-w-3xl items-center justify-between px-4 py-2.5">
            <Link href="/" className="flex items-center" aria-label="The Taiwaners — home">
              <Image
                src="/logo-horizontal.png"
                alt="The Taiwaners"
                width={980}
                height={352}
                priority
                className="h-7 w-auto"
              />
            </Link>
            <nav className="flex gap-1">
              {NAV.map(n => (
                <Link
                  key={n.href}
                  href={n.href}
                  className="label rounded-full px-3 py-1.5 text-[11px] transition-colors hover:bg-[color-mix(in_srgb,var(--accent)_10%,transparent)]"
                  style={{ color: 'var(--muted)' }}
                >
                  {n.label}
                </Link>
              ))}
            </nav>
          </div>
        </header>
        <main className="mx-auto max-w-3xl px-4 pb-24 pt-4">{children}</main>
      </body>
    </html>
  );
}
