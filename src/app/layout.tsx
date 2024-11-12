import { SpeedInsights } from '@vercel/speed-insights/next';
import type { Metadata } from "next";
import "./globals.css";
import GridBackground from '@/components/custom/grid_black_background';
import Navbar from '@/components/navbar/navbar';
import Footer from '@/components/footer/footer';



export const metadata: Metadata = {
  metadataBase: new URL('https://optionxi.com'),
  title: 'OptionXi App',
  description: 'OptionXi is the future of virtual trading, with live scanners and price alerts, also integration live algo trading with past portfolio',
  icons: {
    icon: '/favicon.ico',
    apple: [
      '/metadata/apple-touch-icon-57x57.png',
      '/metadata/apple-touch-icon-72x72.png',
      '/metadata/apple-touch-icon-76x76.png',
      '/metadata/apple-touch-icon-114x114.png',
      '/metadata/apple-touch-icon-120x120.png',
      '/metadata/apple-touch-icon-144x144.png',
      '/metadata/apple-touch-icon-152x152.png',
      '/metadata/apple-touch-icon-180x180.png',
    ],
  },
  openGraph: {
    type: 'website',
    url: 'https://optionxi.com',
    siteName: 'OptionXi',
    title: 'OptionXi',
    description: 'The future of virtual trading, screeners, alerts, heatmaps, AI stock summary',
    images: [
      {
        url: '/metadata/opengraph-image.jpg',
        width: 1200,
        height: 630,
        alt: 'OptionXi Open Graph Image',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    site: 'https://optionxi.com',
    title: 'OptionXi',
    creator: 'Jibin Victor John',
    description: 'The future of virtual trading, with live screeners and price alerts',
    images: [
      {
        url: '/metadata/twitter-image.jpg',
        width: 1200,
        height: 628,
        alt: 'OptionXi Twitter Card Image',
      },
    ],
  }
};



export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className="flex flex-col min-h-screen">
        <GridBackground />
        <header className="fixed top-0 left-0 right-0 z-50 bg-black bg-opacity-50 backdrop-filter backdrop-blur-lg">
          <Navbar />
        </header>
        {/* Add a spacer div to push content below fixed header */}
        <div className="h-16" /> {/* Adjust height to match your navbar height */}
        <main className="relative z-10 flex-grow">
          {children}
        </main>
        <footer className="relative z-10">
          <Footer />
        </footer>
        <SpeedInsights />
      </body>
    </html>
  );
}