"use client"

import { ReactNode, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ChevronRight, Cpu, Globe, BarChart2, Users, Mail, Phone, MapPin, Zap, Trophy, UserCheck, Briefcase, Bot, Bell, Search, BookOpen } from "lucide-react"

export default function LandingPage() {
  const [activeTab, setActiveTab] = useState("home")

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <nav className="border-b border-gray-800 sticky top-0 z-50 backdrop-blur-lg bg-gray-900/80">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <Zap className="w-8 h-8 text-blue-500" />
            <span className="text-2xl font-bold">FutureTrade</span>
          </div>
          <div className="hidden md:flex space-x-8">
            {["Home", "Features", "Pricing", "About", "Contact"].map((item) => (
              <button
                key={item}
                className={`text-lg hover:text-blue-400 transition-colors ${
                  activeTab === item.toLowerCase() ? "text-blue-400" : ""
                }`}
                onClick={() => setActiveTab(item.toLowerCase())}
              >
                {item}
              </button>
            ))}
          </div>
          <AnimatedButton>Get Started</AnimatedButton>
        </div>
      </nav>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="container mx-auto px-4 py-12">
        <TabsContent value="home">
          <HeroSection />
        </TabsContent>
        <TabsContent value="features">
          <FeaturesSection />
        </TabsContent>
        <TabsContent value="pricing">
          <PricingSection />
        </TabsContent>
        <TabsContent value="about">
          <AboutSection />
        </TabsContent>
        <TabsContent value="contact">
          <ContactSection />
        </TabsContent>
      </Tabs>

      <footer className="bg-gray-800 py-12">
        <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">FutureTrade</h3>
            <p className="text-gray-400">Revolutionizing virtual trading with cutting-edge technology and real-time analytics.</p>
          </div>
          <div>
            <h3 className="text-xl font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              {["Home", "Features", "Pricing", "About", "Contact"].map((item) => (
                <li key={item}>
                  <button
                    className="text-gray-400 hover:text-blue-400 transition-colors"
                    onClick={() => setActiveTab(item.toLowerCase())}
                  >
                    {item}
                  </button>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="text-xl font-bold mb-4">Connect With Us</h3>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
                </svg>
              </a>
              <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" />
                </svg>
              </a>
              <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                </svg>
              </a>
            </div>
          </div>
        </div>
        <div className="mt-8 text-center text-gray-400">
          <p>&copy; 2024 FutureTrade. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}

interface AnimatedButtonProps {
  children: ReactNode;
  className?: string;
}

function AnimatedButton({ children, className = "" }: AnimatedButtonProps) {
  return (
    <Button className={`relative group ${className}`}>
      <span className="relative z-10">{children}</span>
      <span className="absolute inset-0 rounded-md overflow-hidden">
        <span className="absolute inset-0 bg-blue-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
        <span className="absolute inset-0 flex items-center justify-center">
          <span className="w-full h-full border-2 border-white rounded-md scale-0 group-hover:scale-100 transition-transform duration-300"></span>
        </span>
      </span>
    </Button>
  )
}

interface ShadedHeadingProps {
  children: ReactNode;
}

function ShadedHeading({ children }: ShadedHeadingProps) {
  return (
    <h2 className="text-4xl font-bold mb-8 bg-gradient-to-r from-blue-500 to-purple-600 text-transparent bg-clip-text">
      {children}
    </h2>
  )
}
function HeroSection() {
  return (
    <section className="py-20 text-center">
      <ShadedHeading>The Future of Virtual Trading</ShadedHeading>
      <p className="text-xl text-gray-400 mb-10 max-w-2xl mx-auto">
        Experience the next generation of trading with our AI-powered platform. Real-time analytics, advanced algorithms, and seamless cross-device synchronization.
      </p>
      <AnimatedButton>Start Trading Now</AnimatedButton>
    </section>
  )
}

function FeaturesSection() {
  const features = [
    { icon: <BarChart2 className="w-12 h-12 text-blue-500" />, title: "Heatmap", description: "Visualize market trends with our interactive heatmap." },
    { icon: <Zap className="w-12 h-12 text-green-500" />, title: "Live Screeners", description: "Real-time stock screening with customizable parameters." },
    { icon: <Search className="w-12 h-12 text-purple-500" />, title: "Live Scanners", description: "Identify trading opportunities as they happen." },
    { icon: <Globe className="w-12 h-12 text-yellow-500" />, title: "Virtual Trading", description: "Practice strategies without risking real capital." },
    { icon: <Trophy className="w-12 h-12 text-red-500" />, title: "Leaderboard", description: "Compete with traders worldwide and showcase your skills." },
    { icon: <UserCheck className="w-12 h-12 text-indigo-500" />, title: "Recommendations", description: "Get AI-powered trade recommendations." },
    { icon: <Users className="w-12 h-12 text-pink-500" />, title: "Trade Experts", description: "Learn from and follow top-performing traders." },
    { icon: <Briefcase className="w-12 h-12 text-teal-500" />, title: "Trade Portfolios", description: "Manage and track multiple trading portfolios." },
    { icon: <Bot className="w-12 h-12 text-orange-500" />, title: "Algo Trade Execution", description: "Automate your trading strategies with ease." },
    { icon: <Bell className="w-12 h-12 text-cyan-500" />, title: "Price Alerts", description: "Stay informed with customizable price notifications." },
    { icon: <Cpu className="w-12 h-12 text-lime-500" />, title: "Custom Screeners", description: "Create and save your own stock screening criteria." },
    { icon: <BookOpen className="w-12 h-12 text-amber-500" />, title: "Courses", description: "Enhance your trading skills with expert-led courses." },
  ]

  return (
    <section className="py-20 bg-gray-800">
      <div className="container mx-auto px-4">
        <ShadedHeading>Cutting-Edge Features</ShadedHeading>
        <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <Card key={index} className="bg-gray-900 border-gray-700">
              <CardHeader>
                <div className="flex justify-center">{feature.icon}</div>
                <CardTitle className="text-center  mt-4">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-center text-gray-400">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}

function PricingSection() {
  const plans = [
    { name: "Basic", price: "$29", features: ["Real-time market data", "Basic charting tools", "5 trades per day", "Access to heatmap", "Live screeners (limited)", "Virtual trading"] },
    { name: "Pro", price: "$99", features: ["Everything in Basic", "Unlimited trades", "Advanced AI analytics", "Full access to live scanners", "Custom screeners", "Trade expert insights", "Priority support"] },
    { name: "Enterprise", price: "Custom", features: ["Everything in Pro", "Dedicated account manager", "Custom integrations", "Algo trade execution", "Advanced API access", "Personalized trading courses", "24/7 premium support"] },
  ]

  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <ShadedHeading>Choose Your Plan</ShadedHeading>
        <div className="grid md:grid-cols-3 gap-8">
          {plans.map((plan, index) => (
            <Card key={index} className="bg-gray-900 border-gray-700">
              <CardHeader>
                <CardTitle className="text-2xl font-bold text-center">{plan.name}</CardTitle>
                <CardDescription className="text-4xl font-bold text-center text-blue-500 mt-4">{plan.price}</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center">
                      <ChevronRight className="w-5 h-5 text-blue-500 mr-2" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
              <CardFooter>
                <AnimatedButton className="w-full">Get Started</AnimatedButton>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}

function AboutSection() {
  return (
    <section className="py-20 bg-gray-800">
      <div className="container mx-auto px-4">
        <ShadedHeading>About FutureTrade</ShadedHeading>
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <p className="text-lg text-gray-300 mb-6">
              FutureTrade is at the forefront of virtual trading technology. Our mission is to empower traders with cutting-edge tools and insights, leveraging the power of AI and real-time data analysis.
            </p>
            <p className="text-lg text-gray-300 mb-6">
              Founded by a team of financial experts and tech innovators, we're committed to revolutionizing the way people interact with global markets.
            </p>
            <AnimatedButton>Learn More</AnimatedButton>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <Card className="bg-gray-900 border-gray-700">
              <CardHeader>
                <CardTitle className="text-4xl font-bold text-blue-500">5M+</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-400">Active Users</p>
              </CardContent>
            </Card>
            <Card className="bg-gray-900 border-gray-700">
              <CardHeader>
                <CardTitle className="text-4xl font-bold text-green-500">$100B+</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-400">Virtual Trading Volume</p>
              </CardContent>
            </Card>
            <Card className="bg-gray-900 border-gray-700">
              <CardHeader>
                <CardTitle className="text-4xl font-bold text-purple-500">24/7</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-400">Support</p>
              </CardContent>
            </Card>
            <Card className="bg-gray-900 border-gray-700">
              <CardHeader>
                <CardTitle className="text-4xl font-bold text-yellow-500">50+</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-400">Global Markets</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  )
}

function ContactSection() {
  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <ShadedHeading>Get in Touch</ShadedHeading>
        <div className="grid md:grid-cols-2 gap-12">
          <div>
            <p className="text-lg text-gray-300 mb-6">
              Have questions or need support? Our team is here to help. Reach out to us through any of the following channels:
            </p>
            <div className="space-y-4">
              <div className="flex items-center">
                <Mail className="w-6 h-6 text-blue-500 mr-4" />
                <span>support@futuretrade.com</span>
              </div>
              <div className="flex items-center">
                <Phone className="w-6 h-6 text-blue-500 mr-4" />
                <span>+1 (888) 123-4567</span>
              </div>
              <div className="flex items-center">
                <MapPin className="w-6 h-6 text-blue-500 mr-4" />
                <span>123 Trading St, New York, NY 10001</span>
              </div>
            </div>
          </div>
          <Card className="bg-gray-900 border-gray-700">
            <CardHeader>
              <CardTitle>Send Us a Message</CardTitle>
            </CardHeader>
            <CardContent>
              <form className="space-y-4">
                <div>
                  <Label htmlFor="name">Name</Label>
                  <Input id="name" placeholder="Your Name" />
                </div>
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" placeholder="your@email.com" />
                </div>
                <div>
                  <Label htmlFor="message">Message</Label>
                  <textarea
                    id="message"
                    placeholder="Your message here..."
                    className="w-full h-32 px-3 py-2 text-white bg-gray-800 rounded-md border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  ></textarea>
                </div>
                <AnimatedButton className="w-full">Send Message</AnimatedButton>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}