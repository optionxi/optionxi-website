import { FeatureCard } from "@/components/featurecard/feature-card";
import {
  BellRing, 
  Filter,
  GaugeCircle,
  ArrowDownNarrowWide,
  ArrowUpNarrowWide,
  BarChart2,
  ScanLine,
  Zap,
  LineChart
} from "lucide-react";

// Using your original FeatureCard component with added link property
// This assumes FeatureCard can handle an href prop

export default function FeaturesSection() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <FeatureCard
          icon={<BellRing className="h-8 w-8 text-blue-500" />}
          title="Smart Alerts"
          description="Get notified when stocks break higher highs and lower lows with customizable price alerts."
          href="https://app.optionxi.com/alerts"
        />
        <FeatureCard
          icon={<GaugeCircle className="h-8 w-8 text-green-500" />}
          title="Market Trend Analysis"
          description="Track overall market sentiment with bullish and bearish indicators to inform your trading decisions."
          href="https://app.optionxi.com/atlas"
        />
        <FeatureCard
          icon={<Zap className="h-8 w-8 text-yellow-500" />}
          title="Breakout Detection"
          description="Identify stocks with significant breakout potential before major price movements occur."
          href="https://app.optionxi.com/bollinger-breakouts"
        />
        <FeatureCard
          icon={<ArrowUpNarrowWide className="h-8 w-8 text-purple-500" />}
          title="Top Gainers Tracking"
          description="Monitor the best-performing stocks across all major exchanges in real-time."
          href="https://app.optionxi.com/top-gainers"
        />
        <FeatureCard
          icon={<ScanLine className="h-8 w-8 text-red-500" />}
          title="Custom Scanners"
          description="Build and save personalized scanners with multiple technical indicators and fundamental criteria."
          href="https://app.optionxi.com/scanners"
        />
        <FeatureCard
          icon={<Filter className="h-8 w-8 text-indigo-500" />}
          title="Advanced Screeners"
          description="Filter stocks by technical patterns, fundamentals, and market trends to find bullish and bearish opportunities."
          href="https://app.optionxi.com/screeners"
        />
        <FeatureCard
          icon={<BarChart2 className="h-8 w-8 text-teal-500" />}
          title="Volume Analysis"
          description="Track unusual volume activity and liquidity patterns across different market sectors."
          href="https://app.optionxi.com/top-volume"
        />
        <FeatureCard
          icon={<ArrowDownNarrowWide className="h-8 w-8 text-orange-500" />}
          title="Top Losers Tracking"
          description="Identify declining stocks for potential shorting opportunities or value investments."
          href="https://app.optionxi.com/top-losers"
        />
        <FeatureCard
          icon={<LineChart className="h-8 w-8 text-pink-500" />}
          title="Detailed Stock Analysis"
          description="Get comprehensive technical and fundamental analysis for any stock in your watchlist."
          href="https://app.optionxi.com/tools"
        />
      </div>
    </div>
  );
}