import type { Metadata } from "next";
import { Raleway } from "next/font/google";
import "./globals.css";

// Load Raleway font with variable support
const raleway = Raleway({
  variable: "--font-raleway",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

// App-wide metadata for SEO
export const metadata: Metadata = {
  title: "ABS Trafikskola",
  description:
    "ABS Trafikskola is a modern driving school app that helps students learn to drive safely and confidently. Book driving lessons, track progress, and access driving theory – all in one app.",
  keywords: [
    "Driving School",
    "ABS Trafikskola",
    "Learn to Drive",
    "Trafikskola",
    "Swedish Driving Lessons",
    "Theory Test",
  ],
  authors: [{ name: "ABS Trafikskola Team", url: "https://yourdomain.com" }],
  creator: "ABS Trafikskola",
  icons: {
    icon: "/favicon.ico",
  },
  openGraph: {
    title: "ABS Trafikskola",
    description:
      "Join ABS Trafikskola to become a confident and safe driver. Book lessons and learn theory from your phone.",
    url: "https://yourdomain.com",
    siteName: "ABS Trafikskola",
    images: [
      {
        url: "/og-image.jpg", // Optional: Add OpenGraph preview image
        width: 1200,
        height: 630,
        alt: "ABS Trafikskola App",
      },
    ],
    locale: "sv_SE",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="sv">
      <body className={`${raleway.variable} font-sans antialiased`}>
        {children}
      </body>
    </html>
  );
}
