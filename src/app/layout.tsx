import { SpeedInsights } from '@vercel/speed-insights/next';
import type { Metadata } from "next";
import "./globals.css";
import GridBackground from '@/components/custom/grid_black_background';
import Navbar from '@/components/navbar/navbar';
import Footer from '@/components/footer/footer';

export const metadata: Metadata = {
  title: "OptionXI",
  description: "Next generation trading platform",
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