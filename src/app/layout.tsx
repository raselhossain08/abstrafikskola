import type { Metadata } from 'next';
import { Raleway } from 'next/font/google';
import './globals.css';
import localFont from 'next/font/local';
import Header from '@/components/common/Header';
import Contact from '@/components/common/Contact';
import Footer from '@/components/common/Footer';
import { LanguageProvider } from '@/contexts/LanguageContext';
import { AuthProvider } from '@/contexts/AuthContext';
import { ClientOnly } from '@/components/common/ClientOnly';

// Load Raleway font with variable support
const raleway = Raleway({
  variable: '--font-raleway',
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
});
const sansation = localFont({
  src: [
    {
      path: '../../public/fonts/Sansation-Light.ttf', // Updated path
      weight: '300',
      style: 'normal',
    },
    {
      path: '../../public/fonts/Sansation-Regular.ttf',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../../public/fonts/Sansation-Bold.ttf',
      weight: '700',
      style: 'normal',
    },
  ],
  variable: '--font-satoshi',
});
// App-wide metadata for SEO
export const metadata: Metadata = {
  title: 'ABS Trafikskola',
  description:
    'ABS Trafikskola is a modern driving school app that helps students learn to drive safely and confidently. Book driving lessons, track progress, and access driving theory – all in one app.',
  keywords: [
    'Driving School',
    'ABS Trafikskola',
    'Learn to Drive',
    'Trafikskola',
    'Swedish Driving Lessons',
    'Theory Test',
  ],
  authors: [{ name: 'ABS Trafikskola Team', url: 'https://yourdomain.com' }],
  creator: 'ABS Trafikskola',
  icons: {
    icon: '/favicon.ico',
  },
  openGraph: {
    title: 'ABS Trafikskola',
    description:
      'Join ABS Trafikskola to become a confident and safe driver. Book lessons and learn theory from your phone.',
    url: 'https://yourdomain.com',
    siteName: 'ABS Trafikskola',
    images: [
      {
        url: '/og-image.jpg', // Optional: Add OpenGraph preview image
        width: 1200,
        height: 630,
        alt: 'ABS Trafikskola App',
      },
    ],
    locale: 'sv_SE',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Default language - will be detected client-side by LanguageProvider
  const initialLanguage = 'en';

  return (
    <html
      lang={initialLanguage}
      className={`${raleway.variable} ${sansation.variable}`}
     
    >
      <body className="font-sansation antialiased" suppressHydrationWarning  dir="ltr">
        <ClientOnly>
          <AuthProvider>
            <LanguageProvider initialLanguage={initialLanguage}>
              <Header />
              <main>{children}</main>
              <Footer />
            </LanguageProvider>
          </AuthProvider>
        </ClientOnly>
      </body>
    </html>
  );
}
