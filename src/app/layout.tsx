import type { Metadata, Viewport } from 'next';
import { Inter } from 'next/font/google';
import { ThemeProvider } from '@/components/providers/ThemeProvider';
import { SoundProvider } from '@/components/providers/SoundProvider';
import { SafeArea } from '@/components/layout/SafeArea';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-stack-sans-text',
  display: 'swap',
});

export const metadata: Metadata = {
  title: {
    default: 'SCREAM: The Complete Catch-Up',
    template: '%s | SCREAM Catch-Up',
  },
  description:
    'Explore all six Scream movies before Scream 7 arrives. Cast, plot summaries, killer reveals, and franchise legacy for every film.',
  manifest: '/manifest.json',
  metadataBase: new URL('https://screamcatchup.netlify.app'),
  openGraph: {
    type: 'website',
    siteName: 'SCREAM: The Complete Catch-Up',
    title: 'SCREAM: The Complete Catch-Up',
    description:
      'Explore all six Scream movies before Scream 7 arrives. Cast, plot summaries, killer reveals, and franchise legacy for every film.',
    images: [
      {
        url: '/images/og-image.jpg',
        width: 1200,
        height: 675,
        alt: 'SCREAM: The Complete Catch-Up — All six films, one guide',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'SCREAM: The Complete Catch-Up',
    description:
      'Explore all six Scream movies before Scream 7 arrives.',
    images: ['/images/og-image.jpg'],
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: 'black-translucent',
    title: 'SCREAM',
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  viewportFit: 'cover',
  themeColor: '#0A0A0A',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={inter.variable}
    >
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var theme = localStorage.getItem('theme');
                  var isDark = theme === 'light' ? false : true;
                  if (isDark) document.documentElement.classList.add('dark');
                } catch(e) {}
              })();
            `,
          }}
        />
      </head>
      <body>
        <ThemeProvider>
          <SoundProvider>
            <SafeArea>{children}</SafeArea>
          </SoundProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
