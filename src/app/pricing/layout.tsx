import type { Metadata } from "next"
import "./globals.css"
import TestimonialGrid from "@/components/custom/tesimonial_grid"
import TestimonialSection from "@/components/custom/testimonial_section"
import ContentSection from "@/components/custom/content_section"
import { TimeLineCustom } from "@/components/custom/timeline"
import { GroupedTimeline } from "@/components/custom/grouped_timeline"
import { ActivityLogUsers } from "@/components/custom/activity_log"
import InvestmentSection from "@/components/custom/investment_section"
import { InvestmentSection2 } from "@/components/custom/investment_section2"

export const metadata: Metadata = {
  title: "Pricing Page",
  description: "Pricing page for a SaaS product using Shadcn UI",
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <div> 
        {children}
        <TestimonialSection/>
        <TimeLineCustom></TimeLineCustom>
        <br/>
        <TestimonialGrid/>
        <br/>
        <ContentSection/>
        <br/>
        <GroupedTimeline/>
        <br/>
        <ActivityLogUsers/>
        <br/>
        <InvestmentSection/>
        <br/>
        <InvestmentSection2/>
    </div>
  )
}