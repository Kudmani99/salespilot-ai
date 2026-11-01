"use client";

import React, { useState, useEffect, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { 
  generateCampaignData, 
  CampaignData 
} from "@/utils/generator-templates";
import { saveCampaign } from "@/utils/storage";
import { 
  Sparkles, 
  Copy, 
  Check, 
  Mail, 
  Phone, 
  Share2, 
  Users, 
  RefreshCw,
  Send,
  HelpCircle,
  FileText
} from "lucide-react";

function CampaignGeneratorForm() {
  const searchParams = useSearchParams();
  const router = useRouter();
  
  // Form State
  const [businessName, setBusinessName] = useState("");
  const [industry, setIndustry] = useState("Roofing");
  const [services, setServices] = useState("");
  const [targetCustomer, setTargetCustomer] = useState("");
  const [location, setLocation] = useState("");
  const [tone, setTone] = useState("Professional");

  // App State
  const [isGenerating, setIsGenerating] = useState(false);
  const [activeTab, setActiveTab] = useState("email"); // email, followups, phone, social, leads
  const [activeFollowup, setActiveFollowup] = useState(0); // 0, 1, 2
  const [generatedCampaign, setGeneratedCampaign] = useState<CampaignData | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // Check for demo trigger in URL
  useEffect(() => {
    if (searchParams.get("demo") === "true") {
      fillDemoData();
    }
  }, [searchParams]);

  const fillDemoData = () => {
    setBusinessName("Apex Fitness Club");
    setIndustry("Fitness");
    setServices("personalized high-intensity group training classes and custom nutrition plans");
    setTargetCustomer("busy working professionals looking to get in shape");
    setLocation("Chicago, IL");
    setTone("Friendly");
  };

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => {
      setCopiedId(null);
    }, 2000);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!businessName || !services || !targetCustomer || !location) {
      alert("Please fill in all fields to generate a campaign!");
      return;
    }

    setIsGenerating(true);
    
    // Simulate generation delay
    setTimeout(() => {
      const data = generateCampaignData(
        businessName,
        industry,
        services,
        targetCustomer,
        location,
        tone
      );
      saveCampaign(data);
      setGeneratedCampaign(data);
      setIsGenerating(false);
      
      // Auto scroll to results on mobile
      const resultsSection = document.getElementById("generation-results");
      if (resultsSection) {
        resultsSection.scrollIntoView({ behavior: "smooth" });
      }
    }, 1200);
  };

  return (
    <div className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 lg:px-8 flex-1 flex flex-col justify-start">
      {/* Title */}
      <div className="mb-8">
        <h1 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl flex items-center gap-2">
          <Sparkles className="h-8 w-8 text-blue-400" />
          Campaign Generator
        </h1>
        <p className="mt-2 text-md text-gray-400">
          Configure your business profiles and instantly generate optimized sales copy and leads.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 items-start">
        {/* Form Container */}
        <div className="lg:col-span-5 rounded-2xl border border-border-dark bg-card-dark p-6 shadow-xl">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-bold text-white">Business Information</h2>
            <button
              type="button"
              onClick={fillDemoData}
              className="text-xs font-semibold text-blue-400 hover:text-blue-300 transition-colors"
            >
              ⚡ Fill Demo Data
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Business Name */}
            <div>
              <label htmlFor="businessName" className="block text-xs font-semibold uppercase tracking-wider text-gray-400 mb-1.5">
                Business Name
              </label>
              <input
                type="text"
                id="businessName"
                value={businessName}
                onChange={(e) => setBusinessName(e.target.value)}
                placeholder="e.g. RoofGuard Solutions"
                className="w-full rounded-xl border border-border-dark bg-bg-dark px-4 py-3 text-sm text-white placeholder-gray-600 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 transition-all duration-200"
                required
              />
            </div>

            {/* Industry and Tone (Grid) */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="industry" className="block text-xs font-semibold uppercase tracking-wider text-gray-400 mb-1.5">
                  Industry
                </label>
                <select
                  id="industry"
                  value={industry}
                  onChange={(e) => setIndustry(e.target.value)}
                  className="w-full rounded-xl border border-border-dark bg-bg-dark px-4 py-3 text-sm text-white focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 transition-all duration-200"
                >
                  <option value="Roofing">Roofing</option>
                  <option value="Restaurant">Restaurant</option>
                  <option value="Real Estate">Real Estate</option>
                  <option value="Car Dealership">Car Dealership</option>
                  <option value="Consulting">Consulting</option>
                  <option value="Fitness">Fitness</option>
                  <option value="Retail">Retail</option>
                  <option value="Other">Other / Custom</option>
                </select>
              </div>

              <div>
                <label htmlFor="tone" className="block text-xs font-semibold uppercase tracking-wider text-gray-400 mb-1.5">
                  Brand Tone
                </label>
                <select
                  id="tone"
                  value={tone}
                  onChange={(e) => setTone(e.target.value)}
                  className="w-full rounded-xl border border-border-dark bg-bg-dark px-4 py-3 text-sm text-white focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 transition-all duration-200"
                >
                  <option value="Professional">Professional</option>
                  <option value="Friendly">Friendly</option>
                  <option value="Luxury">Luxury</option>
                  <option value="Aggressive Sales">Aggressive</option>
                  <option value="Casual">Casual</option>
                </select>
              </div>
            </div>

            {/* Location */}
            <div>
              <label htmlFor="location" className="block text-xs font-semibold uppercase tracking-wider text-gray-400 mb-1.5">
                Target Location / City
              </label>
              <input
                type="text"
                id="location"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="e.g. Austin, TX"
                className="w-full rounded-xl border border-border-dark bg-bg-dark px-4 py-3 text-sm text-white placeholder-gray-600 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 transition-all duration-200"
                required
              />
            </div>

            {/* Services Offered */}
            <div>
              <label htmlFor="services" className="block text-xs font-semibold uppercase tracking-wider text-gray-400 mb-1.5">
                Services Offered
              </label>
              <textarea
                id="services"
                rows={3}
                value={services}
                onChange={(e) => setServices(e.target.value)}
                placeholder="e.g. residential shingle repair, storm leak inspection, and roof replacement"
                className="w-full rounded-xl border border-border-dark bg-bg-dark px-4 py-3 text-sm text-white placeholder-gray-600 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 transition-all duration-200 resize-none"
                required
              />
            </div>

            {/* Target Customer */}
            <div>
              <label htmlFor="targetCustomer" className="block text-xs font-semibold uppercase tracking-wider text-gray-400 mb-1.5">
                Target Customer
              </label>
              <input
                type="text"
                id="targetCustomer"
                value={targetCustomer}
                onChange={(e) => setTargetCustomer(e.target.value)}
                placeholder="e.g. homeowners and property managers"
                className="w-full rounded-xl border border-border-dark bg-bg-dark px-4 py-3 text-sm text-white placeholder-gray-600 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 transition-all duration-200"
                required
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isGenerating}
              className="w-full flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-4 py-4 text-sm font-bold text-white hover:bg-blue-500 disabled:bg-blue-800 disabled:text-gray-400 transition-all duration-200 shadow-lg shadow-blue-500/10 cursor-pointer"
            >
              {isGenerating ? (
                <>
                  <RefreshCw className="h-4 w-4 animate-spin text-white" />
                  Generating Sales Campaign...
                </>
              ) : (
                <>
                  <Sparkles className="h-4 w-4 text-cyan-400" />
                  Generate Sales Campaign
                </>
              )}
            </button>
          </form>
        </div>

        {/* Results Panel */}
        <div id="generation-results" className="lg:col-span-7 h-full flex flex-col">
          {!generatedCampaign ? (
            /* Empty State */
            <div className="flex-1 flex flex-col items-center justify-center rounded-2xl border border-dashed border-border-dark bg-card-dark/20 p-12 text-center h-[580px]">
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-500/5 text-blue-400 border border-blue-500/10 mb-6">
                <FileText className="h-8 w-8 text-blue-400/70" />
              </div>
              <h3 className="text-xl font-bold text-white">No Campaign Generated Yet</h3>
              <p className="mt-2 text-sm text-gray-400 max-w-sm mx-auto leading-relaxed">
                Fill in your business details in the left panel and click "Generate Sales Campaign" to see your tailored outreach content.
              </p>
              <div className="mt-6">
                <button
                  onClick={fillDemoData}
                  className="rounded-xl border border-border-dark bg-bg-dark px-4 py-2.5 text-xs font-semibold text-gray-300 hover:text-white transition-all duration-200"
                >
                  ⚡ Auto-fill Demo Data
                </button>
              </div>
            </div>
          ) : (
            /* Generated Content */
            <div className="flex-1 flex flex-col rounded-2xl border border-border-dark bg-card-dark overflow-hidden shadow-2xl">
              {/* Tab Navigation */}
              <div className="border-b border-border-dark bg-card-dark/70 px-4 pt-4 flex flex-wrap gap-1">
                {[
                  { id: "email", label: "Cold Email", icon: Mail },
                  { id: "followups", label: "Follow-Ups", icon: RefreshCw },
                  { id: "phone", label: "Phone Script", icon: Phone },
                  { id: "social", label: "Social & Ads", icon: Share2 },
                  { id: "leads", label: "Leads Suggestions", icon: Users }
                ].map((tab) => {
                  const Icon = tab.icon;
                  const isActive = activeTab === tab.id;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`flex items-center gap-2 px-4 py-3 text-xs font-bold rounded-t-xl border-b-2 transition-all duration-200 ${
                        isActive
                          ? "border-blue-500 text-blue-400 bg-bg-dark/60"
                          : "border-transparent text-gray-400 hover:text-white hover:bg-gray-800/20"
                      }`}
                    >
                      <Icon className="h-3.5 w-3.5" />
                      {tab.label}
                    </button>
                  );
                })}
              </div>

              {/* Tab Body */}
              <div className="p-6 flex-1 bg-bg-dark/20 overflow-y-auto">
                {/* Cold Email Tab */}
                {activeTab === "email" && (
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-xs font-semibold uppercase tracking-wider text-blue-400">Cold Outreach Template</span>
                      <button
                        onClick={() => handleCopy(
                          `Subject: ${generatedCampaign.coldEmail.subject}\n\n${generatedCampaign.coldEmail.body}`,
                          "coldEmail"
                        )}
                        className="flex items-center gap-1.5 rounded-lg border border-border-dark bg-card-dark px-3 py-1.5 text-xs text-gray-400 hover:text-white transition-all hover:bg-gray-800"
                      >
                        {copiedId === "coldEmail" ? (
                          <>
                            <Check className="h-3.5 w-3.5 text-green-400" />
                            <span className="text-green-400 font-semibold">Copied!</span>
                          </>
                        ) : (
                          <>
                            <Copy className="h-3.5 w-3.5" />
                            <span>Copy Full Email</span>
                          </>
                        )}
                      </button>
                    </div>

                    <div className="rounded-xl border border-border-dark bg-card-dark p-4 space-y-3 font-mono text-sm leading-relaxed">
                      <div>
                        <span className="text-gray-500 font-sans font-semibold">Subject:</span>{" "}
                        <span className="text-blue-300 font-medium">{generatedCampaign.coldEmail.subject}</span>
                      </div>
                      <hr className="border-border-dark" />
                      <div className="whitespace-pre-line text-gray-300 text-[13px]">{generatedCampaign.coldEmail.body}</div>
                    </div>
                  </div>
                )}

                {/* Follow Ups Tab */}
                {activeTab === "followups" && (
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <div className="flex gap-2">
                        {[0, 1, 2].map((num) => (
                          <button
                            key={num}
                            onClick={() => setActiveFollowup(num)}
                            className={`px-3 py-1.5 text-xs font-bold rounded-lg border transition-all ${
                              activeFollowup === num
                                ? "bg-blue-600/15 border-blue-500/30 text-blue-400"
                                : "bg-card-dark border-border-dark text-gray-400 hover:text-white"
                            }`}
                          >
                            Follow-Up #{num + 1}
                          </button>
                        ))}
                      </div>

                      <button
                        onClick={() => handleCopy(
                          `Subject: ${generatedCampaign.followUps[activeFollowup].subject}\nDelay: ${generatedCampaign.followUps[activeFollowup].delay}\n\n${generatedCampaign.followUps[activeFollowup].body}`,
                          "followup"
                        )}
                        className="flex items-center gap-1.5 rounded-lg border border-border-dark bg-card-dark px-3 py-1.5 text-xs text-gray-400 hover:text-white transition-all hover:bg-gray-800"
                      >
                        {copiedId === "followup" ? (
                          <>
                            <Check className="h-3.5 w-3.5 text-green-400" />
                            <span className="text-green-400 font-semibold">Copied!</span>
                          </>
                        ) : (
                          <>
                            <Copy className="h-3.5 w-3.5" />
                            <span>Copy Template</span>
                          </>
                        )}
                      </button>
                    </div>

                    <div className="rounded-xl border border-border-dark bg-card-dark p-4 space-y-3 font-mono text-sm leading-relaxed">
                      <div className="flex justify-between items-center">
                        <div>
                          <span className="text-gray-500 font-sans font-semibold">Subject:</span>{" "}
                          <span className="text-blue-300 font-medium">{generatedCampaign.followUps[activeFollowup].subject}</span>
                        </div>
                        <span className="text-[11px] font-sans font-bold px-2 py-0.5 rounded-md bg-purple-500/10 border border-purple-500/20 text-purple-400">
                          ⏱️ {generatedCampaign.followUps[activeFollowup].delay}
                        </span>
                      </div>
                      <hr className="border-border-dark" />
                      <div className="whitespace-pre-line text-gray-300 text-[13px]">{generatedCampaign.followUps[activeFollowup].body}</div>
                    </div>
                  </div>
                )}

                {/* Phone Script Tab */}
                {activeTab === "phone" && (
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-xs font-semibold uppercase tracking-wider text-cyan-400">Cold Call Script Outline</span>
                      <button
                        onClick={() => handleCopy(generatedCampaign.phoneScript, "phone")}
                        className="flex items-center gap-1.5 rounded-lg border border-border-dark bg-card-dark px-3 py-1.5 text-xs text-gray-400 hover:text-white transition-all hover:bg-gray-800"
                      >
                        {copiedId === "phone" ? (
                          <>
                            <Check className="h-3.5 w-3.5 text-green-400" />
                            <span className="text-green-400 font-semibold">Copied!</span>
                          </>
                        ) : (
                          <>
                            <Copy className="h-3.5 w-3.5" />
                            <span>Copy Script</span>
                          </>
                        )}
                      </button>
                    </div>

                    <div className="rounded-xl border border-border-dark bg-card-dark p-4 font-mono text-sm leading-relaxed text-gray-300 whitespace-pre-line text-[13px]">
                      {generatedCampaign.phoneScript}
                    </div>
                  </div>
                )}

                {/* Social & Ads Tab */}
                {activeTab === "social" && (
                  <div className="space-y-6">
                    {/* Facebook Ad */}
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-xs font-bold text-gray-400">📘 Facebook Ad Campaign Copy</span>
                        <button
                          onClick={() => handleCopy(generatedCampaign.facebookAd, "fbAd")}
                          className="flex items-center gap-1 text-[11px] rounded-lg border border-border-dark bg-card-dark px-2.5 py-1 text-gray-400 hover:text-white hover:bg-gray-800"
                        >
                          {copiedId === "fbAd" ? <Check className="h-3 w-3 text-green-400" /> : <Copy className="h-3 w-3" />}
                          <span>{copiedId === "fbAd" ? "Copied" : "Copy"}</span>
                        </button>
                      </div>
                      <div className="rounded-xl border border-border-dark bg-card-dark p-4 text-[13px] leading-relaxed text-gray-300 whitespace-pre-line font-mono">
                        {generatedCampaign.facebookAd}
                      </div>
                    </div>

                    {/* Instagram Post */}
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-xs font-bold text-gray-400">📸 Instagram Post Copy & Hashtags</span>
                        <button
                          onClick={() => handleCopy(generatedCampaign.instagramPost, "igPost")}
                          className="flex items-center gap-1 text-[11px] rounded-lg border border-border-dark bg-card-dark px-2.5 py-1 text-gray-400 hover:text-white hover:bg-gray-800"
                        >
                          {copiedId === "igPost" ? <Check className="h-3 w-3 text-green-400" /> : <Copy className="h-3 w-3" />}
                          <span>{copiedId === "igPost" ? "Copied" : "Copy"}</span>
                        </button>
                      </div>
                      <div className="rounded-xl border border-border-dark bg-card-dark p-4 text-[13px] leading-relaxed text-gray-300 whitespace-pre-line font-mono">
                        {generatedCampaign.instagramPost}
                      </div>
                    </div>

                    {/* LinkedIn Outreach */}
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-xs font-bold text-gray-400">💼 LinkedIn Connection Pitch</span>
                        <button
                          onClick={() => handleCopy(generatedCampaign.linkedinMessage, "liPost")}
                          className="flex items-center gap-1 text-[11px] rounded-lg border border-border-dark bg-card-dark px-2.5 py-1 text-gray-400 hover:text-white hover:bg-gray-800"
                        >
                          {copiedId === "liPost" ? <Check className="h-3 w-3 text-green-400" /> : <Copy className="h-3 w-3" />}
                          <span>{copiedId === "liPost" ? "Copied" : "Copy"}</span>
                        </button>
                      </div>
                      <div className="rounded-xl border border-border-dark bg-card-dark p-4 text-[13px] leading-relaxed text-gray-300 whitespace-pre-line font-mono">
                        {generatedCampaign.linkedinMessage}
                      </div>
                    </div>
                  </div>
                )}

                {/* Lead Suggestions Tab */}
                {activeTab === "leads" && (
                  <div className="space-y-4">
                    <span className="text-xs font-semibold uppercase tracking-wider text-teal-400 block mb-2">AI-Augmented Lead Channels</span>
                    <div className="grid grid-cols-1 gap-3">
                      {generatedCampaign.leadSuggestions.map((suggestion, index) => (
                        <div
                          key={index}
                          className="flex items-start gap-3 rounded-xl border border-border-dark bg-card-dark p-4 text-sm hover:border-teal-500/20 hover:bg-teal-500/5 transition-all duration-200"
                        >
                          <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-lg bg-teal-500/10 text-teal-400 border border-teal-500/20 text-xs font-bold">
                            {index + 1}
                          </div>
                          <div>
                            <p className="font-semibold text-white">{suggestion}</p>
                            <p className="text-xs text-gray-400 mt-0.5">
                              Recommended search query: "Find {suggestion.toLowerCase()} list in {generatedCampaign.location} ZIP codes"
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Status footer banner */}
              <div className="border-t border-border-dark bg-card-dark/60 px-6 py-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 text-xs">
                <span className="text-gray-400">
                  📁 Generated and saved automatically on <strong className="text-white">{generatedCampaign.timestamp}</strong>
                </span>
                <button
                  onClick={() => router.push("/dashboard")}
                  className="inline-flex items-center gap-1 font-bold text-blue-400 hover:text-blue-300 transition-colors"
                >
                  Go to Dashboard <ArrowRightIcon className="h-3.5 w-3.5" />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function ArrowRightIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" {...props}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
    </svg>
  );
}

export default function GenerateCampaign() {
  return (
    <Suspense fallback={
      <div className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 lg:px-8 flex-1 flex items-center justify-center">
        <p className="text-gray-400 text-sm">Loading campaign generator...</p>
      </div>
    }>
      <CampaignGeneratorForm />
    </Suspense>
  );
}
