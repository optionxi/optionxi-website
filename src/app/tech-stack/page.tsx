'use client';

import React, { useState, useEffect } from 'react';
import { 
  ChevronDown, Server, Database, Zap, Globe, Clock, Code, Activity, 
  Layers, Box, HardDrive, Network, Cpu, Terminal, FileCode,
  Play, Square, AlertCircle, TrendingUp, RefreshCw, Package, 
  Lock, Users, BarChart3, Calendar, Search, Bell, ShoppingCart, 
  BookOpen, GitBranch, Workflow, Timer, LineChart,
  MessageCircle,
  Mail,
  FileText,
  Share2,
  Wrench,
  MessageSquare,
  Cloud,
  X
} from 'lucide-react';

// Brand Icons
import { 
  SiPython, SiFastapi, SiNodedotjs, SiSupabase, SiFirebase, 
  SiPostgresql, SiRedis, SiCloudflare, SiDocker, SiGithubactions, 
  SiNextdotjs, SiReact, SiVercel, SiRabbitmq, SiMinio, 
  SiUpptime,
  SiChatwoot,
  SiMattermost,
  SiWhatsapp,
  SiCampaignmonitor,
  SiGoogleanalytics,
  SiYoutube,
  SiPandas,
  SiErpnext,
  SiCashapp,
  SiNextcloud,
  SiImmich,
  SiKasasmart,
  SiTypescript,
  SiMeilisearch,
  SiThreads,
  SiLinkedin,
  SiInstagram,
  SiMintlify,
  SiFlutter,
  SiBillboard,
  SiSanity,
  SiZoho,
  SiBrevo,
  SiCanonical,
  SiPosthog,
  SiGooglesearchconsole,
  SiBetterstack,
  SiClaude,
  SiOpenai,
  SiGooglegemini,
  SiQemu
} from 'react-icons/si';

type ServerType = 'hestia' | 'python' | 'database';
type Environment = 'production' | 'staging' | 'backup';

interface CronJob {
  time: string;
  description: string;
  script: string;
  frequency: string;
}

interface ServerData {
  name: string;
  hostname: string;
  type: ServerType;
  environment: Environment;
  storage: string;
  domains?: string[];
  primaryRole: string;
  cronJobs?: CronJob[];
  keyScripts?: string[];
  technologies: string[];
}

const servers: ServerData[] = [
  // HESTIA SERVERS
  {
    name: "MLV 3",
    hostname: "hcp3.optionxi.com",
    type: "hestia",
    environment: "production",
    storage: "12GB",
    domains: ["vedicmathsclass.in", "btechtraders.com", "grandmatrix.in", "hirelogin.com", "scooter.media", "canna-hemp.org", "jimoffsetprinters.in", "deivadan.org"],
    primaryRole: "Client website hosting with Hestia Control Panel",
    technologies: ["Hestia"]
  },
  {
    name: "MLV 4",
    hostname: "hcp4.paalana.in",
    type: "hestia",
    environment: "production",
    storage: "12GB",
    domains: ["paalana.in", "campfinder.in", "satviknellogi.com", "aloeinternational.com", "migstaffing.com", "circleelevators.com", "oharipadanam.com", "artbykeerthi.in"],
    primaryRole: "Client website hosting with Hestia Control Panel",
    technologies: ["Hestia"]
  },
   {
    name: "NTN 2",
    hostname: "hcp5.optionxi.com",
    type: "hestia",
    environment: "production",
    storage: "1GB",
    domains: ["kcymdioceseofpalghat.in"],
    primaryRole: "Client websites & services",
    technologies: ["Hestia"]
  },
  {
    name: "SDK 1",
    hostname: "hcp6.optionxi.com",
    type: "hestia",
    environment: "production",
    storage: "12GB",
    domains: ["skepskew.com", "dubaidocs.com", "bytsinterior.com", "sinairenewalcentre.org", "lanscomuae.com", "benchmateapp.com"],
    primaryRole: "Client website hosting with Hestia Control Panel",
    technologies: ["Hestia",]
  },
  {
    name: "SUM 1",
    hostname: "hcp.optionxi.com",
    type: "hestia",
    environment: "production",
    storage: "12GB",
    domains: ["brainyedge.co.uk", "deluxebifolds.co.uk", "evertrustconsultancy.com", "tanvaayurveda.com"],
    primaryRole: "Client websites & services",
    technologies: ["Hestia"]
  },

  // PYTHON SERVERS
  {
    name: "NTN 1",
    hostname: "app.optionxi.com",
    type: "python",
    environment: "production",
    storage: "50GB",
    primaryRole: "Virtual trading & order management",
    cronJobs: [
      { time: "03:47 UTC", description: "Orders startup", script: "optionxi-orders.sh", frequency: "Daily" },
      { time: "09:50 UTC", description: "Square off positions", script: "op_aftermarket_orderplacement.py", frequency: "Daily" },
      { time: "03:00 UTC", description: "Pre-market cleanup", script: "before-market-scripts.sh", frequency: "Mon-Fri" },
      { time: "03:47 UTC", description: "Start Chartink & Greeks", script: "chartink-greeks-scripts.sh", frequency: "Mon-Fri" },
      { time: "Every 15min", description: "AI automated alerts", script: "op_ai_alerts.py", frequency: "Mon-Fri" },
      { time: "10:01 UTC", description: "End of market cleanup", script: "after-market-scripts.sh", frequency: "Mon-Fri" },
      { time: "10:05 UTC", description: "Aftermarket orders", script: "optionxi-orders-aftermarket.sh", frequency: "Daily" },
      { time: "17:00 UTC", description: "Leaderboard alerts", script: "op_ai_alerts_leaderboad.py", frequency: "Daily" }
    ],
    keyScripts: [
      "Virtual trading order execution",
      "Chartink scanner & notifications",
      "Greeks calculation for options",
      "AI-powered trading alerts",
      "Market holiday checker",
      "Position square-off automation",
      "P&L calculation & leaderboard",
      "Referral & rewards system"
    ],
    technologies: ["Python", "Supabase", "Firebase", "Cron","Chartink API", "Tmux"]
  },
  {
    name: "VBN",
    hostname: "app.optionxi.com",
    type: "python",
    environment: "production",
    storage: "24GB",
    primaryRole: "Real-time market data processing",
    cronJobs: [
      { time: "02:30 UTC", description: "Clear & store data", script: "op_clear_tables_8am.py", frequency: "Daily" },
      { time: "03:48 UTC", description: "Start live data streams", script: "live-market-scripts.sh", frequency: "Mon-Fri" },
      { time: "10:21 UTC", description: "Process 5-day history", script: "after-market-scripts-supabase.sh", frequency: "Mon-Fri" },
      { time: "18:31 UTC", description: "Weekly history fetch", script: "once-week-scripts.sh", frequency: "Weekly" }
    ],
    keyScripts: [
      "Fyers real-time data (5 streams)",
      "Historical data processing",
      "Technical indicators calculation",
      "Sector & screener updates"
    ],
    technologies: ["Python","Tmux","Fyers API", "Pandas", "PostgreSQL"]
  },
  {
    name: "LEO",
    hostname: "app.optionxi.com",
    type: "python",
    environment: "production",
    storage: "1GB",
    primaryRole: "Trading basket & journal operations",
    cronJobs: [
      { time: "20:30 UTC", description: "Reset sessions", script: "tmux kill-server", frequency: "Daily" },
      { time: "20:31 UTC", description: "Start basket/journal", script: "optionxi-basket-journal.sh", frequency: "Daily" }
    ],
    keyScripts: [
      "Basket add/edit/exit listeners",
      "Journal create/edit/delete",
      "Firebase real-time sync"
    ],
    technologies: ["Python", "Firebase Realtime DB", "Tmux"]
  },
  {
    name: "ADR 2",
    hostname: "beszel.optionxi.com",
    type: "python",
    environment: "production",
    storage: "24GB",
    primaryRole: "Stock alerts backend of optionxi, Melie search updation script",
    cronJobs: [
      { time: "Every 5min", description: "Update search index", script: "update_stocks_supabase_to_meili.py", frequency: "Mon-Fri" },
      { time: "02:30 UTC", description: "Rebuild index", script: "populate_stocks_supabase_to_meili.py", frequency: "Daily" }
    ],
    keyScripts: [
      "Redis and RedisUI for Caching", 
      "Beszel for Monitoring",
      "Bigcapital For Accounting",
      "Python to update stock names in meliesearch",
      "Mattermost for blog forums",
      "Real-time stock Breakout Alerts as backend for optionxi"
    ],
    technologies: ["Python","Redis", "Beszel","BigCapital","Mattermost"],
    domains:["bigcapital.optionxi.com",
        "beszel.optionxi.com",
        "redis.optionxi.com",
        "redisui.optionxi.com",
        "redis-cloud.optionxi.com",
        "redisapi.optionxi.com",
        "forum.optionxi.com",
        "alerts.optionxi.com"]
  },
  {
    name: "JTN 1",
    hostname: "broker-auth.optionxi.com",
    type: "python",
    environment: "production",
    storage: "1GB",
    primaryRole: "Broker authentication & token management",
    cronJobs: [
      { time: "20:30 UTC", description: "Clear broker tokens", script: "clear_token_access.py", frequency: "Daily" }
    ],
    keyScripts: [
      "OAuth token lifecycle",
      "Broker authentication cleanup"
    ],
    technologies: ["Python", "OAuth", "Fyers API"],
    domains: ["zerodha.optionxi.com", "upstox.optionxi.com","fyers.optionxi.com"],
  },
  {
    name: "SUM 1",
    hostname: "fastapi.optionxi.com",
    type: "python",
    environment: "production",
    storage: "1GB",
    primaryRole: "FastAPI backend services",
    keyScripts: [
      "RESTful API endpoints",
      "Real-time SSE connections"
    ],
    technologies: ["FastAPI", "Python", "Cloudflare"]
  },
  {
    name: "SUM 2",
    hostname: "signal.optionxi.com",
    type: "database",
    environment: "production",
    storage: "12GB",
    primaryRole: "High performance backend server",
    technologies: ["hcb server", "turnserver comb"]
  },
  {
    name: "AKKU 1",
    hostname: "fastapi.optionxi.com",
    type: "python",
    environment: "production",
    storage: "1GB",
    primaryRole: "Fastapi For Socialmedia Auth Token",
    technologies: ["Python"],
    domains:["fastapi.optionxi.com","insta.optionxi.com","linkedn.optionxi.com","threads.optionxi.com"]
  },

  //Database
    {
    name: "SDK 2",
    hostname: "coolify.optionxi.com",
    type: "database",
    environment: "production",
    storage: "12GB",
    domains: ["optionxi.com", "coolify.optionxi.com", "supabase.optionxi.com", 
        "docs.optionxi.com","n8n.optionxi.com"],
    primaryRole: "Core backend of optionXi and its services",
    technologies: ["Hestia", "Coolify", "Supabase", "Mintlify","N8N"]
  },
  {
    name: "SDK 3",
    hostname: "s3.optionxi.com",
    type: "database",
    environment: "backup",
    storage: "1GB",
    domains: ["s3.optionxi.com", "minio.optionxi.com"],
    primaryRole: "S3-compatible backup storage with MinIO",
    technologies: ["MinIO", "S3"]
  },
  {
    name: "AKKU 2",
    hostname: "photos.optionxi.com",
    type: "database",
    environment: "production",
    storage: "24GB",
    primaryRole: "Self Hosted Versions of Next cloud and chatwoot",
    technologies: ["chatwoot","immich","Evolution API"],
    domains:["chat.optionxi.com","nextcloud.optionxi.com","photos.optionxi.com","evolution.optionxi.com"]
  },
   {
    name: "JTN 2",
    hostname: "kasm.optionxi.com",
    type: "database",
    environment: "production",
    storage: "24GB",
    primaryRole: "Self Hosted Solutions, Virtual Environments, Queues, Youtube Downlaoders",
    technologies: ["Rabitmq", "Meliesearch", "Typesense","Youtubedownloader","Metube","Ntfy","Kasm"],
    domains: ["rabbitmq.optionxi.com",
                "rabbitmq-api.optionxi.com",
                "supabasebckp.optionxi.com",
                "meilisearch.optionxi.com",
                "typesense.optionxi.com",
                "ntfy.optionxi.com",
                "youtube.optionxi.com",
                "metube.optionxi.com",
                "kasm.optionxi.com"],
  },
  {
    name: "LEO 2",
    hostname: "oneuptime.optionxi.com",
    type: "database",
    environment: "production",
    storage: "24GB",
    primaryRole: "Self Hosted Solutions, ERPNext, Stirling PDF, Oneuptime Monitor",
    technologies: ["Oneuptime", "Stirling PDF", "ERP Next"],
    domains: ["oneuptime.optionxi.com",
                "pdf.optionxi.com",
                "erpnext.optionxi.com",],
  },
];

const dataFlowStages = [
  {
    stage: "Pre-Market Setup",
    time: "2:00 - 9:15 AM IST",
    icon: Timer,
    color: "blue",
    activities: [
      { task: "Clear broker tokens & auth data", servers: ["JTN"], icon: Lock },
      { task: "Store previous day's data", servers: ["VBN"], icon: Database },
      { task: "Rebuild Meilisearch index", servers: ["ADR"], icon: Search },
      { task: "Check market holidays", servers: ["NTN 1", "VBN"], icon: Calendar },
      { task: "Start basket/journal listeners", servers: ["LEO"], icon: BookOpen }
    ]
  },
  {
    stage: "Market Open",
    time: "9:15 AM IST",
    icon: Play,
    color: "green",
    activities: [
      { task: "Start Chartink scanners", servers: ["NTN 1"], icon: BarChart3 },
      { task: "Begin Greeks calculation", servers: ["NTN 1"], icon: TrendingUp },
      { task: "Activate 5 Fyers data streams", servers: ["VBN"], icon: Workflow },
      { task: "Enable order listeners", servers: ["NTN 2", "LEO"], icon: ShoppingCart },
      { task: "Start AI alert system", servers: ["NTN 1"], icon: Bell }
    ]
  },
  {
    stage: "Active Trading",
    time: "9:15 AM - 3:30 PM IST",
    icon: Activity,
    color: "purple",
    activities: [
      { task: "Process real-time stock data", servers: ["VBN"], icon: Zap },
      { task: "Update search index every 5min", servers: ["ADR"], icon: RefreshCw },
      { task: "Send alerts every 15min", servers: ["NTN 1"], icon: Bell },
      { task: "Monitor orders & baskets", servers: ["NTN 2", "LEO"], icon: ShoppingCart },
      { task: "Calculate live P&L", servers: ["NTN 2"], icon: TrendingUp },
      { task: "Update indicators & screeners", servers: ["VBN"], icon: BarChart3 }
    ]
  },
  {
    stage: "Position Square Off",
    time: "3:20 - 3:30 PM IST",
    icon: Square,
    color: "orange",
    activities: [
      { task: "Close all open positions", servers: ["NTN 2"], icon: Square },
      { task: "Execute aftermarket orders", servers: ["NTN 2"], icon: ShoppingCart },
      { task: "Stop live data streams", servers: ["VBN", "NTN 1"], icon: Square }
    ]
  },
  {
    stage: "Post-Market Processing",
    time: "3:30 - 10:30 PM IST",
    icon: Package,
    color: "yellow",
    activities: [
      { task: "Backup Chartink data", servers: ["NTN 1"], icon: Database },
      { task: "Process 5-day history", servers: ["VBN"], icon: RefreshCw },
      { task: "Update referrals & rewards", servers: ["NTN 2"], icon: Users },
      { task: "Merge pandas dataframes", servers: ["VBN"], icon: GitBranch },
      { task: "Calculate final balances", servers: ["NTN 2"], icon: TrendingUp },
      { task: "Send leaderboard alerts", servers: ["NTN 2"], icon: Bell }
    ]
  },
  {
    stage: "End of Day Cleanup",
    time: "10:15 PM - 2:00 AM IST",
    icon: AlertCircle,
    color: "red",
    activities: [
      { task: "Final square off check", servers: ["NTN 2"], icon: Square },
      { task: "Delete old JSON data", servers: ["VBN"], icon: Database },
      { task: "Clear live scanner data", servers: ["NTN 1"], icon: RefreshCw },
      { task: "Kill all tmux sessions", servers: ["All Python"], icon: Terminal }
    ]
  },
  {
    stage: "Weekly Maintenance",
    time: "Sunday 12:01 AM IST",
    icon: Calendar,
    color: "indigo",
    activities: [
      { task: "Fetch full historical data", servers: ["VBN"], icon: Database },
      { task: "Handle stock splits", servers: ["VBN"], icon: GitBranch },
      { task: "Rebuild pandas datasets", servers: ["VBN"], icon: RefreshCw }
    ]
  }
];
const techStackCategories = [
  {
    name: "Frontend UI",
    description: "User interfaces & client portals",
    icon: Globe,
    color: "cyan",
    span: "md:col-span-1",
    technologies: [
      { name: "Next.js", icon: SiNextdotjs, hex: "#000000" },
      { name: "Flutter", icon: SiFlutter, hex: "#02569B" },
      { name: "React", icon: SiReact, hex: "#61DAFB" },
      { name: "Vercel", icon: SiVercel, hex: "#000000" }
    ]
  },
  {
    name: "Backend Core",
    description: "Application logic & APIs",
    icon: Code,
    color: "blue",
    span: "md:col-span-2 lg:col-span-1",
    technologies: [
      { name: "Python 3", icon: SiPython, hex: "#3776AB" },
      { name: "FastAPI", icon: SiFastapi, hex: "#009688" },
      { name: "Node.js", icon: SiNodedotjs, hex: "#339933" }
    ]
  },
  {
    name: "Database Layer",
    description: "Persistent storage & caching",
    icon: Database,
    color: "green",
    span: "md:col-span-2 lg:col-span-1",
    technologies: [
      { name: "Supabase", icon: SiSupabase, hex: "#3ECF8E" },
      { name: "Firebase", icon: SiFirebase, hex: "#FFCA28" },
      { name: "PostgreSQL", icon: SiPostgresql, hex: "#4169E1" }
    ]
  },
  {
    name: "Trading Connectors",
    description: "Broker APIs & market data feeds",
    icon: LineChart,
    color: "orange",
    span: "md:col-span-2 lg:col-span-1",
    technologies: [
      { name: "Zerodha Kite", icon: TrendingUp, hex: "#E75E3D" },
      { name: "Fyers API", icon: Activity, hex: "#1D4ED8" },
      { name: "Upstox", icon: Zap, hex: "#8B5CF6" },
      { name: "Chartink", icon: BarChart3, hex: "#F59E0B" }
    ]
  },
  {
    name: "Infrastructure & DevOps",
    description: "Deployment & orchestration",
    icon: Server,
    color: "purple",
    span: "md:col-span-2 lg:col-span-1",
    technologies: [
      { name: "Docker", icon: SiDocker, hex: "#2496ED" },
      { name: "GitHub Actions", icon: SiGithubactions, hex: "#2088FF" },
      { name: "Cloudflare", icon: SiCloudflare, hex: "#F38020" },
      { name: "Hestia CP", icon: Server, hex: "#6B7280" },
      { name: "Coolify", icon: Box, hex: "#A855F7" }
    ]
  },
  {
    name: "Storage & Queues",
    description: "Object storage & message brokers",
    icon: HardDrive,
    color: "pink",
    span: "md:col-span-2 lg:col-span-1",
    technologies: [
      { name: "MinIO S3", icon: SiMinio, hex: "#C72048" },
      { name: "RabbitMQ", icon: SiRabbitmq, hex: "#FF6600" },
      { name: "Redis", icon: SiRedis, hex: "#DC382D" }
    ]
  },
  {
    name: "AI & ML",
    description: "LLMs for intelligent automation",
    icon: Cpu,
    color: "indigo",
    span: "md:col-span-2 lg:col-span-1",
    technologies: [
      { name: "Groq", icon: Cpu, hex: "#F55036" },
      { name: "Claude", icon: SiClaude, hex: "#D97757" },
      { name: "ChatGPT", icon: SiOpenai, hex: "#10A37F" },
      { name: "Gemini", icon: SiGooglegemini, hex: "#4285F4" },
      { name: "Deepseek", icon: SiQemu, hex: "#6366F1" }
    ]
  },
  {
    name: "Monitoring & Analytics",
    description: "Performance tracking & observability",
    icon: Activity,
    color: "rose",
    span: "md:col-span-2 lg:col-span-1",
    technologies: [
      { name: "Beszel", icon: SiCampaignmonitor, hex: "#10B981" },
      { name: "Oneuptime", icon: SiUpptime, hex: "#34D399" },
      { name: "Betterstack", icon: SiBetterstack, hex: "#0EA5E9" },
      { name: "Google Analytics", icon: SiGoogleanalytics, hex: "#E37400" },
      { name: "Google Search Console", icon: SiGooglesearchconsole, hex: "#4285F4" },
      { name: "Posthog", icon: SiPosthog, hex: "#1D4ED8" }
    ]
  },
  {
    name: "Communication",
    description: "Customer support & team chat",
    icon: MessageSquare,
    color: "teal",
    span: "md:col-span-2 lg:col-span-1",
    technologies: [
      { name: "Chatwoot", icon: SiChatwoot, hex: "#1F93FF" },
      { name: "Mattermost", icon: SiMattermost, hex: "#0058CC" },
      { name: "EvolutionAPI", icon: SiWhatsapp, hex: "#25D366" }
    ]
  },
  {
    name: "Cloud Productivity",
    description: "File sync, photos & business apps",
    icon: Cloud,
    color: "sky",
    span: "md:col-span-2 lg:col-span-1",
    technologies: [
      { name: "Nextcloud", icon: SiNextcloud, hex: "#0082C9" },
      { name: "Immich", icon: SiImmich, hex: "#4250AF" },
      { name: "ERPNext", icon: SiErpnext, hex: "#0089FF" },
      { name: "Bigcapital", icon: SiCashapp, hex: "#00C851" },
      { name: "Crater", icon: SiBillboard, hex: "#5851DB" }
    ]
  },
  {
    name: "Self-hosted Utilities",
    description: "PDF tools, media & browser streaming",
    icon: Wrench,
    color: "amber",
    span: "md:col-span-2 lg:col-span-1",
    technologies: [
      { name: "Stirling PDF", icon: SiPandas, hex: "#EF4444" },
      { name: "Metube", icon: SiYoutube, hex: "#FF0000" },
      { name: "Kasm", icon: SiKasasmart, hex: "#00B4D8" }
    ]
  },
  {
    name: "Search Infrastructure",
    description: "Fast full-text search engines",
    icon: Search,
    color: "violet",
    span: "md:col-span-2 lg:col-span-1",
    technologies: [
      { name: "Typesense", icon: SiTypescript, hex: "#E84142" },
      { name: "Meilisearch", icon: SiMeilisearch, hex: "#FF4F81" }
    ]
  },
  {
    name: "Social Media APIs",
    description: "Authentication & content automation",
    icon: Share2,
    color: "fuchsia",
    span: "md:col-span-2 lg:col-span-1",
    technologies: [
      { name: "Instagram", icon: SiInstagram, hex: "#E4405F" },
      { name: "LinkedIn", icon: SiLinkedin, hex: "#0A66C2" },
      { name: "Threads", icon: SiThreads, hex: "#000000" }
    ]
  },
  {
    name: "Documentation",
    description: "API docs & developer portals",
    icon: BookOpen,
    color: "emerald",
    span: "md:col-span-2 lg:col-span-1",
    technologies: [
      { name: "Mintlify", icon: SiMintlify, hex: "#11DAAC" }
    ]
  },
  {
    name: "Content Management",
    description: "Headless CMS for blog posts",
    icon: FileText,
    color: "red",
    span: "md:col-span-2 lg:col-span-1",
    technologies: [
      { name: "Sanity", icon: SiSanity, hex: "#F03E2F" }
    ]
  },
  {
    name: "Email Services",
    description: "Transactional & marketing emails",
    icon: Mail,
    color: "blue",
    span: "md:col-span-2 lg:col-span-1",
    technologies: [
      { name: "Zoho", icon: SiZoho, hex: "#C8202F" },
      { name: "Brevo", icon: SiBrevo, hex: "#0B996E" }
    ]
  },
  {
    name: "Feedback Management",
    description: "User feedback & feature voting",
    icon: MessageCircle,
    color: "slate",
    span: "md:col-span-2 lg:col-span-1",
    technologies: [
      { name: "Canny.io", icon: SiCanonical, hex: "#7C3AED" }
    ]
  }
];

const ServerCard: React.FC<{ server: ServerData; index: number; isSearched?: boolean }> = ({ server, index, isSearched }) => {
  const [expanded, setExpanded] = useState(isSearched || false);

  // Auto-expand if the card is part of a search result to make details easily viewable
  useEffect(() => {
    if (isSearched !== undefined) {
      setExpanded(isSearched);
    }
  }, [isSearched]);

  const typeConfig = {
    hestia: { 
      gradient: 'from-blue-500/10 to-cyan-500/10 hover:from-blue-500/20 hover:to-cyan-500/20', 
      border: 'border-blue-500/20 hover:border-blue-500/40',
      icon: Server,
      iconColor: 'text-blue-400'
    },
    python: { 
      gradient: 'from-green-500/10 to-emerald-500/10 hover:from-green-500/20 hover:to-emerald-500/20', 
      border: 'border-green-500/20 hover:border-green-500/40',
      icon: Code,
      iconColor: 'text-green-400'
    },
    database: { 
      gradient: 'from-purple-500/10 to-pink-500/10 hover:from-purple-500/20 hover:to-pink-500/20', 
      border: 'border-purple-500/20 hover:border-purple-500/40',
      icon: Database,
      iconColor: 'text-purple-400'
    }
  };

  const envColors = {
    production: 'bg-green-500/10 text-green-400 border-green-500/30',
    staging: 'bg-yellow-500/10 text-yellow-400 border-yellow-500/30',
    backup: 'bg-blue-500/10 text-blue-400 border-blue-500/30'
  };

  const config = typeConfig[server.type];
  const TypeIcon = config.icon;

  return (
    <div 
      className={`bg-gradient-to-br ${config.gradient} backdrop-blur-md border ${config.border} rounded-2xl p-5 md:p-6 transition-all duration-300`}
      style={{ animationDelay: `${index * 50}ms` }}
    >
      <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 mb-4">
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2.5 bg-black/40 rounded-xl border border-white/10 shadow-inner">
              <TypeIcon className={`w-5 h-5 ${config.iconColor}`} />
            </div>
            <div>
              <h3 className="text-xl font-bold text-white tracking-tight">{server.name}</h3>
              <p className="text-xs md:text-sm text-gray-400 font-mono break-all">{server.hostname}</p>
            </div>
          </div>
          <div className="flex items-center gap-2 mt-3 flex-wrap">
            <span className={`px-2.5 py-1 rounded-full text-[10px] md:text-xs font-semibold border uppercase tracking-wider ${envColors[server.environment]}`}>
              {server.environment}
            </span>
            <span className="px-2.5 py-1 bg-black/30 rounded-full text-[10px] md:text-xs text-gray-300 border border-white/10 flex items-center gap-1.5 font-medium">
              <HardDrive className="w-3 h-3" />
              {server.storage}
            </span>
          </div>
        </div>
        <button
          onClick={() => setExpanded(!expanded)}
          className="self-end md:self-auto p-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg transition-colors flex items-center gap-2 text-xs text-gray-300 md:w-auto w-full justify-center"
        >
          <span className="md:hidden">{expanded ? 'Show Less' : 'Show Details'}</span>
          <ChevronDown className={`w-4 h-4 transition-transform ${expanded ? 'rotate-180' : ''}`} />
        </button>
      </div>

      <p className="text-gray-300 text-sm mb-4 leading-relaxed flex items-start gap-2 bg-black/20 p-3 rounded-lg border border-white/5">
        <Activity className="w-4 h-4 mt-0.5 text-gray-400 flex-shrink-0" />
        {server.primaryRole}
      </p>

      <div className="flex flex-wrap gap-2 mb-2">
        {server.technologies.map((tech, i) => (
          <span key={i} className="px-2.5 py-1 bg-white/5 hover:bg-white/10 transition-colors cursor-default rounded-md text-xs text-gray-300 border border-white/10 flex items-center gap-1.5">
            <Layers className="w-3 h-3 text-gray-400" />
            {tech}
          </span>
        ))}
      </div>

      {expanded && (
        <div className="space-y-4 mt-5 pt-5 border-t border-white/10 animate-fadeIn">
          {server.domains && server.domains.length > 0 && (
            <div>
              <div className="flex items-center gap-2 mb-3">
                <Globe className="w-4 h-4 text-blue-400" />
                <h4 className="text-sm font-semibold text-white">Hosted Domains ({server.domains.length})</h4>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {server.domains.map((domain, i) => (
                  <span key={i} className="px-2 py-1 bg-blue-500/10 rounded-md text-[11px] text-blue-200 border border-blue-500/20 font-mono transition-colors hover:bg-blue-500/20 cursor-pointer">
                    {domain}
                  </span>
                ))}
              </div>
            </div>
          )}

          {server.keyScripts && server.keyScripts.length > 0 && (
            <div>
              <div className="flex items-center gap-2 mb-3">
                <FileCode className="w-4 h-4 text-yellow-400" />
                <h4 className="text-sm font-semibold text-white">Key Operations</h4>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                {server.keyScripts.map((script, i) => (
                  <div key={i} className="flex items-start gap-2 text-xs text-gray-300 p-2 bg-black/20 rounded border border-white/5">
                    <Code className="w-3.5 h-3.5 text-yellow-500/70 flex-shrink-0" />
                    <span className="leading-snug">{script}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {server.cronJobs && server.cronJobs.length > 0 && (
            <div>
              <div className="flex items-center gap-2 mb-3">
                <Clock className="w-4 h-4 text-purple-400" />
                <h4 className="text-sm font-semibold text-white">Scheduled Jobs ({server.cronJobs.length})</h4>
              </div>
              <div className="space-y-2">
                {server.cronJobs.map((job, i) => (
                  <div key={i} className="p-3 bg-black/30 rounded-lg border border-white/5 hover:border-white/10 transition-colors">
                    <div className="flex flex-col md:flex-row md:items-center justify-between mb-2 gap-2">
                      <span className="text-xs font-mono text-purple-300 flex items-center gap-1.5 bg-purple-500/10 px-2 py-1 rounded w-fit">
                        <Timer className="w-3 h-3" />
                        {job.time}
                      </span>
                      <span className="text-[10px] text-gray-400 uppercase tracking-wider font-semibold px-2 py-0.5 bg-white/5 rounded border border-white/10 w-fit">{job.frequency}</span>
                    </div>
                    <p className="text-sm text-gray-200 mb-2 font-medium">{job.description}</p>
                    <code className="w-full overflow-x-auto text-[11px] text-gray-400 font-mono bg-black/50 p-2 rounded flex items-center gap-2 no-scrollbar border border-white/5">
                      <Terminal className="w-3 h-3 text-green-400 flex-shrink-0" />
                      <span className="whitespace-nowrap">{job.script}</span>
                    </code>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default function OptionXiInfrastructure() {
  const [activeTab, setActiveTab] = useState<'servers' | 'dataflow' | 'techstack'>('techstack');
  const [searchQuery, setSearchQuery] = useState('');

  // Global search across all properties of the server
  const filteredServers = servers.filter((server) => {
    if (!searchQuery) return true;
    
    const q = searchQuery.toLowerCase();
    
    const matchName = server.name.toLowerCase().includes(q);
    const matchHost = server.hostname.toLowerCase().includes(q);
    const matchType = server.type.toLowerCase().includes(q);
    const matchEnv = server.environment.toLowerCase().includes(q);
    const matchRole = server.primaryRole.toLowerCase().includes(q);
    
    const matchTech = server.technologies.some(t => t.toLowerCase().includes(q));
    const matchDomain = server.domains?.some(d => d.toLowerCase().includes(q));
    const matchScripts = server.keyScripts?.some(s => s.toLowerCase().includes(q));
    const matchCron = server.cronJobs?.some(c => 
      c.description.toLowerCase().includes(q) || 
      c.script.toLowerCase().includes(q)
    );

    return matchName || matchHost || matchType || matchEnv || matchRole || matchTech || matchDomain || matchScripts || matchCron;
  });

  const hestiaServers = servers.filter(s => s.type === 'hestia');
  const pythonServers = servers.filter(s => s.type === 'python');
  const databaseServers = servers.filter(s => s.type === 'database');

  return (
    <div className="min-h-screen bg-[#020617] text-slate-200 font-sans selection:bg-blue-500/30">
      <div className="fixed inset-0 bg-gradient-to-br from-blue-900/10 via-purple-900/10 to-emerald-900/10 animate-gradient pointer-events-none"></div>
      
      <div className="relative z-10">
        <header className="z-50 border-b border-white/10 backdrop-blur-2xl bg-slate-950/70">
          <div className="container mx-auto px-4 sm:px-6 py-6 sm:py-8">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div>
                <h1 className="text-3xl sm:text-4xl md:text-5xl font-black mb-2 sm:mb-3 bg-gradient-to-r from-blue-400 via-indigo-400 to-emerald-400 bg-clip-text text-transparent tracking-tight">
                  OptionXi Core
                </h1>
                <p className="text-slate-400 text-sm sm:text-base font-medium flex items-center gap-2">
                  <Network className="w-4 h-4 text-emerald-500" />
                  Distributed Trading Platform Architecture
                </p>
              </div>
              <div className="flex items-center gap-4">
                <div className="px-3 sm:px-4 py-2 bg-emerald-500/10 rounded-lg border border-emerald-500/20 shadow-[0_0_15px_rgba(16,185,129,0.1)]">
                  <div className="flex items-center gap-2 sm:gap-3">
                    <div className="relative flex h-2 sm:h-2.5 w-2 sm:w-2.5">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 sm:h-2.5 w-2 sm:w-2.5 bg-emerald-500"></span>
                    </div>
                    <span className="text-xs sm:text-sm text-emerald-400 font-semibold tracking-wide uppercase">All Systems Nominal</span>
                  </div>
                </div>
                <div className="hidden sm:block text-right bg-slate-900/50 px-4 py-2 rounded-lg border border-white/5">
                  <div className="text-xl font-bold text-white leading-none">{servers.length}</div>
                  <div className="text-[10px] text-slate-400 uppercase tracking-wider mt-1">Active Nodes</div>
                </div>
              </div>
            </div>

            {/* Global Search Bar */}
            <div className="mt-6 sm:mt-8 relative max-w-2xl">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-slate-400" />
              </div>
              <input
                type="text"
                className="block w-full pl-11 pr-10 py-3 md:py-3.5 border border-slate-700/60 rounded-xl leading-5 bg-slate-900/50 text-slate-200 placeholder-slate-400 focus:outline-none focus:bg-slate-900 focus:ring-1 focus:ring-blue-500 focus:border-blue-500 sm:text-sm transition-all shadow-sm"
                placeholder="Search domains, servers, tech stacks, roles (e.g., rabbit, optionxi.com)..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              {searchQuery && (
                <button 
                  onClick={() => setSearchQuery('')}
                  className="absolute inset-y-0 right-0 pr-4 flex items-center text-slate-400 hover:text-white transition-colors"
                >
                  <X className="h-5 w-5" />
                </button>
              )}
            </div>

            {/* Mobile Scrollable Tabs (Hide when actively searching) */}
            {!searchQuery && (
              <div className="flex gap-2 mt-6 sm:mt-8 overflow-x-auto pb-2 no-scrollbar -mx-4 px-4 sm:mx-0 sm:px-0">
                {[
                  { id: 'techstack' as const, label: 'Tech Stack', icon: Layers },
                  { id: 'dataflow' as const, label: 'Pipeline Flow', icon: Workflow },
                  { id: 'servers' as const, label: 'Server Nodes', icon: Server },
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-medium text-sm transition-all whitespace-nowrap flex-shrink-0 ${
                      activeTab === tab.id
                        ? 'bg-blue-600 text-white shadow-lg shadow-blue-900/20 border border-blue-500/50'
                        : 'bg-slate-900 text-slate-400 border border-slate-800 hover:bg-slate-800 hover:text-slate-200'
                    }`}
                  >
                    <tab.icon className="w-4 h-4" />
                    {tab.label}
                  </button>
                ))}
              </div>
            )}
          </div>
        </header>

        <main className="container mx-auto px-4 sm:px-6 py-8 sm:py-12">
          
          {/* Active Search Results Overrides the Standard Tabs */}
          {searchQuery ? (
            <div className="space-y-6 animate-fadeIn">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-3 bg-blue-500/10 rounded-xl border border-blue-500/20 w-fit">
                  <Search className="w-6 h-6 text-blue-400" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-white tracking-tight">Search Results</h2>
                  <p className="text-sm text-slate-400 mt-1">Found {filteredServers.length} matching system{filteredServers.length !== 1 ? 's' : ''}</p>
                </div>
              </div>

              {filteredServers.length > 0 ? (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
                  {filteredServers.map((server, index) => (
                    <ServerCard key={server.name} server={server} index={index} isSearched={true} />
                  ))}
                </div>
              ) : (
                <div className="text-center py-16 bg-slate-900/30 rounded-2xl border border-white/5">
                  <Search className="w-12 h-12 text-slate-600 mx-auto mb-4 opacity-50" />
                  <h3 className="text-lg font-medium text-slate-300">No matches found</h3>
                  <p className="text-slate-500 mt-1">Try adjusting your search terms</p>
                </div>
              )}
            </div>
          ) : (
            /* Standard View Modes Start */
            <>
              {activeTab === 'servers' && (
                <div className="space-y-12 sm:space-y-16 animate-fadeIn">
                  {/* Hestia Servers */}
                  <section>
                    <div className="flex flex-col sm:flex-row sm:items-center gap-3 mb-6">
                      <div className="p-3 bg-blue-500/10 rounded-xl border border-blue-500/20 w-fit">
                        <Globe className="w-6 h-6 text-blue-400" />
                      </div>
                      <div>
                        <h2 className="text-2xl font-bold text-white tracking-tight">Frontend & Client Nodes</h2>
                        <p className="text-sm text-slate-400 mt-1">Hestia Control Panel driven website & app hosting</p>
                      </div>
                    </div>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
                      {hestiaServers.map((server, index) => (
                        <ServerCard key={server.name} server={server} index={index} />
                      ))}
                    </div>
                  </section>

                  {/* Python Servers */}
                  <section>
                    <div className="flex flex-col sm:flex-row sm:items-center gap-3 mb-6">
                      <div className="p-3 bg-emerald-500/10 rounded-xl border border-emerald-500/20 w-fit">
                        <Code className="w-6 h-6 text-emerald-400" />
                      </div>
                      <div>
                        <h2 className="text-2xl font-bold text-white tracking-tight">Python Application Layer</h2>
                        <p className="text-sm text-slate-400 mt-1">Trading automation, ML models, and market data processing</p>
                      </div>
                    </div>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
                      {pythonServers.map((server, index) => (
                        <ServerCard key={server.name} server={server} index={index} />
                      ))}
                    </div>
                  </section>

                  {/* Database Servers */}
                  <section>
                    <div className="flex flex-col sm:flex-row sm:items-center gap-3 mb-6">
                      <div className="p-3 bg-purple-500/10 rounded-xl border border-purple-500/20 w-fit">
                        <Database className="w-6 h-6 text-purple-400" />
                      </div>
                      <div>
                        <h2 className="text-2xl font-bold text-white tracking-tight">Storage & Redundancy</h2>
                        <p className="text-sm text-slate-400 mt-1">S3-compatible backups and deep database archives</p>
                      </div>
                    </div>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
                      {databaseServers.map((server, index) => (
                        <ServerCard key={server.name} server={server} index={index} />
                      ))}
                    </div>
                  </section>
                </div>
              )}

              {activeTab === 'dataflow' && (
                <div className="max-w-4xl mx-auto space-y-6 sm:space-y-8 animate-fadeIn">
                  <div className="text-center mb-8 sm:mb-12 px-4">
                    <h2 className="text-2xl sm:text-3xl font-bold mb-3 text-white tracking-tight">Daily Trading Cycle</h2>
                    <p className="text-slate-400 text-sm sm:text-base">Orchestrated multi-server pipeline strictly following IST market hours</p>
                  </div>
                  
                  <div className="relative pl-4 sm:pl-0">
                    {/* Mobile line tracking */}
                    <div className="absolute left-10 top-8 bottom-8 w-0.5 bg-gradient-to-b from-slate-800 via-slate-700 to-slate-800 sm:hidden"></div>
                    
                    {dataFlowStages.map((flow, index) => {
                      const StageIcon = flow.icon;
                      const colorMap: Record<string, string> = {
                        blue: 'from-blue-500/10 border-blue-500/20 text-blue-400 icon-bg-blue-500/20',
                        green: 'from-emerald-500/10 border-emerald-500/20 text-emerald-400 icon-bg-emerald-500/20',
                        purple: 'from-purple-500/10 border-purple-500/20 text-purple-400 icon-bg-purple-500/20',
                        orange: 'from-orange-500/10 border-orange-500/20 text-orange-400 icon-bg-orange-500/20',
                        yellow: 'from-yellow-500/10 border-yellow-500/20 text-yellow-400 icon-bg-yellow-500/20',
                        red: 'from-red-500/10 border-red-500/20 text-red-400 icon-bg-red-500/20',
                        indigo: 'from-indigo-500/10 border-indigo-500/20 text-indigo-400 icon-bg-indigo-500/20'
                      };
                      
                      const cMap = colorMap[flow.color];
                      const gradientBase = cMap.split(' ')[0];
                      const borderBase = cMap.split(' ')[1];
                      const textBase = cMap.split(' ')[2];
                      
                      return (
                        <div 
                          key={flow.stage}
                          className="relative mb-8 sm:mb-12 last:mb-0"
                          style={{ animationDelay: `${index * 100}ms` }}
                        >
                          {/* Desktop Line Tracking */}
                          {index < dataFlowStages.length - 1 && (
                            <div className="hidden sm:block absolute left-8 top-[60px] bottom-[-48px] w-0.5 bg-gradient-to-b from-slate-800 to-transparent z-0"></div>
                          )}
                          
                          <div className={`relative z-10 bg-gradient-to-br ${gradientBase} to-transparent backdrop-blur-sm border ${borderBase} rounded-2xl p-4 sm:p-6 transition-all hover:bg-slate-900/50`}>
                            <div className="flex flex-col sm:flex-row sm:items-center gap-4 mb-5">
                              <div className={`p-3 rounded-xl border ${borderBase} bg-slate-950 flex-shrink-0 w-fit`}>
                                <StageIcon className={`w-5 h-5 sm:w-6 sm:h-6 ${textBase}`} />
                              </div>
                              <div>
                                <h3 className="text-lg sm:text-xl font-bold text-white mb-1 tracking-tight">{flow.stage}</h3>
                                <div className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-black/40 rounded-md border border-white/5">
                                  <Clock className={`w-3 h-3 ${textBase}`} />
                                  <span className="text-xs sm:text-sm text-slate-300 font-mono">{flow.time}</span>
                                </div>
                              </div>
                            </div>
                            
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:ml-16">
                              {flow.activities.map((activity, i) => {
                                const ActivityIcon = activity.icon;
                                return (
                                  <div key={i} className="flex items-start gap-3 p-3 bg-black/40 rounded-xl border border-white/5 hover:border-white/10 transition-colors">
                                    <ActivityIcon className="w-4 h-4 text-slate-400 mt-0.5 flex-shrink-0" />
                                    <div>
                                      <p className="text-sm text-slate-200 mb-2 leading-snug">{activity.task}</p>
                                      <div className="flex flex-wrap gap-1.5">
                                        {activity.servers.map((server, j) => (
                                          <span key={j} className={`px-2 py-0.5 bg-slate-800/50 rounded text-[10px] sm:text-xs text-slate-300 font-medium border ${borderBase}`}>
                                            {server}
                                          </span>
                                        ))}
                                      </div>
                                    </div>
                                  </div>
                                );
                              })}
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {activeTab === 'techstack' && (
                <div className="max-w-6xl mx-auto animate-fadeIn">
                  <div className="text-center mb-8 sm:mb-12 px-4">
                    <h2 className="text-2xl sm:text-3xl font-bold mb-3 text-white tracking-tight">System Architecture</h2>
                    <p className="text-slate-400 text-sm sm:text-base">Modern, decoupled microservices stack powering operations</p>
                  </div>
                  
                  {/* Bento Grid Layout */}
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                    {techStackCategories.map((category, index) => {
                      const CategoryIcon = category.icon;
                      return (
                        <div
                          key={category.name}
                          className={`group relative overflow-hidden bg-slate-900/40 backdrop-blur-md border border-slate-800 hover:border-slate-600 rounded-2xl p-5 sm:p-6 transition-all duration-300 ${category.span}`}
                          style={{ animationDelay: `${index * 50}ms` }}
                        >
                          {/* Subtle hover gradient background */}
                          <div className="absolute inset-0 bg-gradient-to-br from-white/[0.02] to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                          
                          <div className="relative z-10 flex flex-col h-full">
                            <div className="flex items-start justify-between mb-4">
                              <div>
                                <h3 className="text-lg font-bold text-white mb-1 tracking-tight">{category.name}</h3>
                                <p className="text-xs text-slate-400">{category.description}</p>
                              </div>
                              <div className="p-2.5 bg-slate-950 rounded-lg border border-slate-800 shadow-inner">
                                <CategoryIcon className="w-5 h-5 text-slate-300" />
                              </div>
                            </div>
                            
                            <div className="mt-auto pt-4 flex flex-wrap gap-2">
                              {category.technologies.map((tech, i) => {
                                const TechIcon = tech.icon;
                                return (
                                  <div 
                                    key={i} 
                                    className="flex items-center gap-2 px-3 py-1.5 bg-slate-950/80 rounded-md border border-slate-800 hover:border-slate-700 transition-colors cursor-default"
                                    title={tech.name}
                                  >
                                    <TechIcon 
                                      className="w-4 h-4 flex-shrink-0" 
                                      style={{ color: tech.hex }} 
                                    />
                                    <span className="text-[13px] font-medium text-slate-300">{tech.name}</span>
                                  </div>
                                );
                              })}
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </>
            /* Standard View Modes End */
          )}

        </main>

        <footer className="border-t border-slate-800 backdrop-blur-xl bg-slate-950/50 mt-12 sm:mt-20">
          <div className="container mx-auto px-4 sm:px-6 py-6 sm:py-8">
            <div className="flex flex-col sm:flex-row items-center justify-between text-xs sm:text-sm text-slate-500 gap-4 text-center sm:text-left">
              <div>
                <p className="font-semibold text-slate-300 mb-1 flex items-center justify-center sm:justify-start gap-2">
                  <TrendingUp className="w-4 h-4 text-emerald-500" />
                  OptionXi Trading Architecture
                </p>
                <p>Secure, distributed systems across {servers.length} physical/virtual nodes.</p>
              </div>
              <div>
                <p className="flex items-center justify-center sm:justify-end gap-2 bg-slate-900 px-3 py-1.5 rounded-full border border-slate-800">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                  System Status: Online
                </p>
              </div>
            </div>
          </div>
        </footer>
      </div>

      <style jsx global>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes gradient {
          0%, 100% { opacity: 0.5; }
          50% { opacity: 0.8; }
        }
        .animate-fadeIn {
          animation: fadeIn 0.4s ease-out forwards;
        }
        .animate-gradient {
          animation: gradient 10s ease-in-out infinite;
        }
        /* Custom scrollbar hiding utilities */
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
  );
}