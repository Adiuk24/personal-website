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
  title: 'Arif Adito | Business Growth Leader',
  description: 'Strategic leader scaling SaaS, OTT, and Fintech ventures globally.',
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="en" className={`${inter.variable} ${cormorant.variable}`}>
      <body className="bg-[#050505] text-[#F5F2ED] antialiased selection:bg-[#F27D26] selection:text-white" suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
