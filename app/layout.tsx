import { Suspense } from 'react';
import type {Metadata} from 'next';
import { Inter, Cormorant_Garamond } from 'next/font/google';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
});

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-serif',
});

export const metadata: Metadata = {
  title: 'Arif Adito | Business Growth Leader - SaaS, OTT & Fintech Expert',
  description: 'Strategic leader with 15+ years of experience scaling SaaS, OTT, and Fintech ventures globally. Specializing in business growth and innovation.',
  keywords: ['business leader', 'SaaS', 'OTT', 'Fintech', 'growth strategy', 'Arif Adito'],
  authors: [{ name: 'Arif Adito' }],
  creator: 'Arif Adito',
  publisher: 'Arif Adito',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
      'max-video-preview': -1,
    },
  },
  metadataBase: new URL('https://arifadito.com'),
  alternates: {
    canonical: 'https://arifadito.com',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://arifadito.com',
    title: 'Arif Adito | Business Growth Leader - SaaS, OTT & Fintech Expert',
    description: 'Strategic leader with 15+ years of experience scaling SaaS, OTT, and Fintech ventures globally.',
    siteName: 'Arif Adito',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Arif Adito | Business Growth Leader',
    description: 'Strategic leader scaling SaaS, OTT, and Fintech ventures globally.',
  },
  verification: {
    google: 'Q1U0UL_ObRfoFeSKvShOv8sGXVpYv2bu_4_BtVM_6AU',
  },
};

import Analytics from '@/components/Analytics';

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="en" className={`${inter.variable} ${cormorant.variable}`}>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
      </head>
      <body className="bg-[#050505] text-[#F5F2ED] antialiased selection:bg-[#F27D26] selection:text-white" suppressHydrationWarning>
        {children}
        <Suspense fallback={null}><Analytics /></Suspense>
      </body>
    </html>
  );
}
