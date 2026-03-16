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
    images: [
      {
        url: 'https://arifadito.com/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Arif Adito - Business Growth Leader',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Arif Adito | Business Growth Leader',
    description: 'Strategic leader scaling SaaS, OTT, and Fintech ventures globally.',
    images: ['https://arifadito.com/og-image.png'],
  },
  verification: {
    google: 'YOUR_GOOGLE_VERIFICATION_CODE', // Replace with your actual Google verification code from Search Console
  },
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="en" className={`${inter.variable} ${cormorant.variable}`}>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body className="bg-[#050505] text-[#F5F2ED] antialiased selection:bg-[#F27D26] selection:text-white" suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
