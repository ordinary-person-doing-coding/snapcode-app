import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Script from "next/script";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "SnapCode - Free Beautiful Code Screenshot Generator | Create Stunning Code Images",
  description: "Create beautiful code screenshots instantly for free. Perfect for Twitter, LinkedIn, GitHub, and documentation. 16+ gradient backgrounds, syntax highlighting, line numbers, copy to clipboard. No signup required.",
  keywords: [
    "code screenshot",
    "code image generator", 
    "beautiful code",
    "syntax highlighter",
    "code snippet image",
    "developer tools",
    "free code screenshot",
    "twitter code",
    "linkedin code",
    "github code image",
    "code beautifier",
    "programming screenshot",
    "code to image",
    "carbon alternative",
    "ray.so alternative"
  ],
  authors: [{ name: "SnapCode" }],
  creator: "SnapCode",
  publisher: "SnapCode",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://snapcode-app.vercel.app'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: '/',
    title: "SnapCode - Free Beautiful Code Screenshot Generator",
    description: "Create stunning code screenshots instantly. 16+ gradients, syntax highlighting, copy to clipboard. Free online tool for developers.",
    siteName: 'SnapCode',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'SnapCode - Beautiful Code Screenshots',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: "SnapCode - Free Beautiful Code Screenshot Generator",
    description: "Create stunning code screenshots instantly. Perfect for sharing on social media.",
    images: ['/og-image.png'],
    creator: '@snapcode',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-verification-code',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        {/* Google Analytics */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-79B0G2FLTY"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-79B0G2FLTY');
          `}
        </Script>

        {/* Structured Data for Google */}
        <Script id="structured-data" type="application/ld+json">
          {`
            {
              "@context": "https://schema.org",
              "@type": "WebApplication",
              "name": "SnapCode",
              "description": "Free online tool to create beautiful code screenshots with gradient backgrounds and syntax highlighting",
              "url": "https://snapcode-app.vercel.app",
              "applicationCategory": "DeveloperApplication",
              "operatingSystem": "Any",
              "offers": {
                "@type": "Offer",
                "price": "0",
                "priceCurrency": "USD"
              },
              "featureList": [
                "16+ gradient backgrounds",
                "Syntax highlighting for 10+ languages",
                "Line numbers toggle",
                "Copy to clipboard",
                "Customizable padding and corners",
                "Instant preview",
                "Download as PNG",
                "No signup required"
              ]
            }
          `}
        </Script>
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}