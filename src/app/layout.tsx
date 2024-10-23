import { SpeedInsights } from '@vercel/speed-insights/next';
import type { Metadata } from "next";
import "./globals.css";
import GridBackground from '@/components/custom/grid_black_background';

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
    <body className="relative min-h-screen">
    <GridBackground />
    <div className="relative z-10"> {/* Wrap content to ensure it's above the background */}
        {/* Render the dashboard or other authenticated content */}
          {children}
          <SpeedInsights />
      </div>
    </body>
</html>
  );
}
