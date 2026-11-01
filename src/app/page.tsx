import React from "react";
import Link from "next/link";
import { 
  Mail, 
  Sparkles, 
  MessageSquare, 
  TrendingUp, 
  Search, 
  ArrowRight,
  ShieldCheck,
  Zap,
  Clock
} from "lucide-react";

export default function LandingPage() {
  const features = [
    {
      title: "Cold Email Generator",
      description: "Instantly create high-converting cold email sequences personalized with your business details.",
      icon: Mail,
      color: "from-blue-500/20 to-blue-600/5 text-blue-400"
    },
    {
      title: "Marketing Content Generator",
      description: "Generate copy for Facebook ads, Instagram posts, and LinkedIn outreach customized to your target audience.",
      icon: Sparkles,
      color: "from-cyan-500/20 to-cyan-600/5 text-cyan-400"
    },
    {
      title: "AI Sales Coach",
      description: "Practice overcoming objections like 'too expensive' or 'no time' with custom psychologically backed responses.",
      icon: MessageSquare,
      color: "from-indigo-500/20 to-indigo-600/5 text-indigo-400"
    },
    {
      title: "Follow-Up Automation",
      description: "Create 3-step follow-up email flows with custom delays to make sure you never drop the ball on a lead.",
      icon: Clock,
      color: "from-purple-500/20 to-purple-600/5 text-purple-400"
    },
    {
      title: "Lead Recommendations",
      description: "Receive AI-augmented targeting lists based on your specific location and industry vertical.",
      icon: Search,
      color: "from-teal-500/20 to-teal-600/5 text-teal-400"
    }
  ];

  const metrics = [
    { value: "5", label: "Built-in Sales Tools", icon: Zap },
    { value: "0", label: "Sign-ups Needed", icon: ShieldCheck },
    { value: "100%", label: "Runs in Your Browser", icon: Clock }
  ];

  return (
    <div className="relative isolate flex-1 overflow-hidden bg-bg-dark">
      {/* Background Glows */}
      <div
        className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
        aria-hidden="true"
      >
        <div
          className="relative left-[calc(50%-11rem)] aspect-1155/678 w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-blue-600 to-cyan-400 opacity-20 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
          style={{
            clipPath:
              "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
          }}
        />
      </div>

      {/* Hero Section */}
      <div className="mx-auto max-w-7xl px-6 pt-20 pb-16 sm:pt-28 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-blue-500/20 bg-blue-500/5 px-4 py-1.5 text-xs font-semibold text-blue-400 mb-6 backdrop-blur-md">
            <Sparkles className="h-3.5 w-3.5 animate-pulse text-cyan-400" />
            <span>Introducing SalesPilot AI v1.0</span>
          </div>

          <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-6xl lg:text-7xl">
            <span className="block">AI-Powered Sales Growth</span>
            <span className="block mt-2 bg-gradient-to-r from-blue-400 via-cyan-400 to-indigo-500 bg-clip-text text-transparent">
              for Small Businesses
            </span>
          </h1>

          <p className="mt-6 text-lg leading-8 text-gray-400 max-w-xl mx-auto">
            Generate outreach, marketing content, and sales strategies in seconds. Spend less time writing and more time closing deals.
          </p>

          <div className="mt-10 flex items-center justify-center gap-x-6">
            <Link
              href="/generate"
              className="rounded-xl bg-blue-600 px-6 py-3.5 text-sm font-semibold text-white shadow-lg shadow-blue-500/20 hover:bg-blue-500 hover:shadow-blue-500/30 transition-all duration-200"
            >
              Generate Campaign
            </Link>
            <Link
              href="/generate?demo=true"
              className="group flex items-center gap-2 rounded-xl border border-gray-800 bg-gray-900/60 px-6 py-3.5 text-sm font-semibold text-gray-300 hover:text-white hover:bg-gray-800/80 transition-all duration-200"
            >
              Try Demo
              <ArrowRight className="h-4 w-4 text-gray-500 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </div>

      {/* Metrics Section */}
      <div className="mx-auto max-w-7xl px-6 py-8 lg:px-8">
        <div className="rounded-2xl border border-border-dark bg-card-dark/50 p-8 backdrop-blur-sm">
          <div className="grid grid-cols-1 gap-y-8 text-center sm:grid-cols-3 sm:gap-x-8">
            {metrics.map((metric, idx) => {
              const Icon = metric.icon;
              return (
                <div key={idx} className="flex flex-col items-center justify-center p-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-500/10 text-blue-400 mb-4 border border-blue-500/10">
                    <Icon className="h-6 w-6 text-blue-400" />
                  </div>
                  <dd className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
                    {metric.value}
                  </dd>
                  <dt className="text-sm font-medium text-gray-400 mt-1">{metric.label}</dt>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Feature Cards Grid */}
      <div className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
        <div className="mx-auto max-w-2xl lg:text-center">
          <h2 className="text-base font-semibold leading-7 text-blue-400 uppercase tracking-wider">Features</h2>
          <p className="mt-2 text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Everything you need to jumpstart your sales
          </p>
        </div>

        <div className="mx-auto mt-12 max-w-5xl sm:mt-16 lg:mt-20">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((feature, idx) => {
              const Icon = feature.icon;
              return (
                <div key={idx} className="glow-card flex flex-col p-6 h-full">
                  <div className={`flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br ${feature.color} border border-white/5 mb-5`}>
                    <Icon className="h-6 w-6" />
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2">{feature.title}</h3>
                  <p className="text-sm text-gray-400 leading-relaxed flex-1">{feature.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* How It Works Section */}
      <div className="mx-auto max-w-7xl px-6 py-16 sm:py-24 lg:px-8 border-t border-border-dark">
        <div className="mx-auto max-w-2xl lg:text-center mb-16">
          <h2 className="text-base font-semibold leading-7 text-cyan-400 uppercase tracking-wider">Workflow</h2>
          <p className="mt-2 text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Go from zero to ready-to-send in seconds
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-3 max-w-5xl mx-auto">
          {/* Step 1 */}
          <div className="relative flex flex-col p-6 rounded-2xl border border-border-dark bg-card-dark/30">
            <div className="absolute -top-4 -left-4 flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600 font-extrabold text-white text-lg shadow-lg shadow-blue-500/20">
              1
            </div>
            <h3 className="text-lg font-bold text-white mt-2 mb-2">Enter Business Information</h3>
            <p className="text-sm text-gray-400 leading-relaxed">
              Describe your company, offer, target customer location, and select your signature brand tone.
            </p>
          </div>

          {/* Step 2 */}
          <div className="relative flex flex-col p-6 rounded-2xl border border-border-dark bg-card-dark/30">
            <div className="absolute -top-4 -left-4 flex h-10 w-10 items-center justify-center rounded-xl bg-cyan-600 font-extrabold text-white text-lg shadow-lg shadow-cyan-500/20">
              2
            </div>
            <h3 className="text-lg font-bold text-white mt-2 mb-2">AI Generates Campaigns</h3>
            <p className="text-sm text-gray-400 leading-relaxed">
              Our simulated AI templates produce multi-channel cold emails, ads, cold call scripts, and suggestions.
            </p>
          </div>

          {/* Step 3 */}
          <div className="relative flex flex-col p-6 rounded-2xl border border-border-dark bg-card-dark/30">
            <div className="absolute -top-4 -left-4 flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-600 font-extrabold text-white text-lg shadow-lg shadow-indigo-500/20">
              3
            </div>
            <h3 className="text-lg font-bold text-white mt-2 mb-2">Launch and Close</h3>
            <p className="text-sm text-gray-400 leading-relaxed">
              Copy templates, export sequences, check lead suggestions, and practice objection handling to close.
            </p>
          </div>
        </div>
      </div>

      {/* CTA Banner */}
      <div className="mx-auto max-w-7xl px-6 py-16 sm:py-24 lg:px-8 border-t border-border-dark">
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-blue-900/40 via-cyan-900/10 to-indigo-900/30 border border-blue-500/20 p-8 sm:p-12 md:p-16 text-center">
          <h2 className="mx-auto max-w-2xl text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
            Boost Your Sales Productivity Today
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-md text-gray-300">
            No registration fee, no complex API setups, no subscription limits. Explore the power of simulated campaigns.
          </p>
          <div className="mt-8 flex justify-center">
            <Link
              href="/generate"
              className="rounded-xl bg-blue-600 px-8 py-4 text-sm font-semibold text-white shadow-lg shadow-blue-500/20 hover:bg-blue-500 transition-all duration-200 hover:-translate-y-0.5"
            >
              Start Generating Campaigns
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
