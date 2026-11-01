"use client";

import React, { useState, useEffect } from "react";
import { 
  getSavedCampaigns, 
  getDashboardStats, 
  deleteCampaign,
  DashboardStats 
} from "@/utils/storage";
import { CampaignData } from "@/utils/generator-templates";
import { 
  BarChart, 
  TrendingUp, 
  Trash2, 
  ExternalLink, 
  Clock, 
  Layers, 
  CheckCircle,
  FileText,
  Calendar,
  AlertCircle
} from "lucide-react";

export default function Dashboard() {
  const [stats, setStats] = useState<DashboardStats>({
    totalCampaigns: 0,
    hoursSaved: 0,
    templatesCreated: 0
  });
  const [campaigns, setCampaigns] = useState<CampaignData[]>([]);
  const [selectedCampaign, setSelectedCampaign] = useState<CampaignData | null>(null);
  const [isClient, setIsClient] = useState(false);

  // Load data only on client-side to prevent hydration issues
  useEffect(() => {
    setIsClient(true);
    refreshData();
  }, []);

  const refreshData = () => {
    const data = getSavedCampaigns();
    setCampaigns(data);
    setStats(getDashboardStats());
    if (data.length > 0 && !selectedCampaign) {
      setSelectedCampaign(data[0]);
    }
  };

  const handleDelete = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (confirm("Are you sure you want to delete this campaign? This cannot be undone.")) {
      const remaining = deleteCampaign(id);
      setCampaigns(remaining);
      setStats(getDashboardStats());
      if (selectedCampaign?.id === id) {
        setSelectedCampaign(remaining.length > 0 ? remaining[0] : null);
      }
    }
  };

  if (!isClient) {
    return (
      <div className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 lg:px-8 flex-1 flex items-center justify-center">
        <p className="text-gray-400 text-sm">Loading SalesPilot dashboard...</p>
      </div>
    );
  }

  // Generate some realistic activity logs based on campaigns
  const activityLogs = [
    {
      time: "Just Now",
      text: campaigns.length > 0 
        ? `Campaign generated for "${campaigns[0].businessName}"` 
        : "System initialized",
      type: "success"
    },
    {
      time: "1 hour ago",
      text: "Objection script generated: 'Too expensive' response copied.",
      type: "info"
    },
    {
      time: "2 hours ago",
      text: "Elite Roofing Co. sequence saved to local storage.",
      type: "success"
    },
    {
      time: "1 day ago",
      text: "Facebook ad template updated for high CTR target.",
      type: "info"
    }
  ];

  return (
    <div className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 lg:px-8 flex-1 flex flex-col justify-start">
      {/* Title */}
      <div className="mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl flex items-center gap-2">
            <BarChart className="h-8 w-8 text-blue-400" />
            Sales Dashboard
          </h1>
          <p className="mt-2 text-md text-gray-400">
            Monitor generated assets, analytics performance, and manage campaigns.
          </p>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-3 mb-8">
        {/* Total Campaigns */}
        <div className="glow-card p-6 flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-gray-400">Total Campaigns</p>
            <h3 className="text-3xl font-extrabold text-white mt-1">{stats.totalCampaigns}</h3>
            <p className="text-xs text-green-400 mt-1 flex items-center gap-1">
              <TrendingUp className="h-3 w-3" />
              <span>+100% since start</span>
            </p>
          </div>
          <div className="h-12 w-12 rounded-xl bg-blue-500/10 text-blue-400 flex items-center justify-center border border-blue-500/10">
            <Layers className="h-6 w-6" />
          </div>
        </div>

        {/* Hours Saved */}
        <div className="glow-card p-6 flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-gray-400">Estimated Hours Saved</p>
            <h3 className="text-3xl font-extrabold text-white mt-1">{stats.hoursSaved}h</h3>
            <p className="text-xs text-cyan-400 mt-1 flex items-center gap-1">
              <Clock className="h-3 w-3" />
              <span>Calculated at 4.5h per campaign</span>
            </p>
          </div>
          <div className="h-12 w-12 rounded-xl bg-cyan-500/10 text-cyan-400 flex items-center justify-center border border-cyan-500/10">
            <Clock className="h-6 w-6" />
          </div>
        </div>

        {/* Templates Created */}
        <div className="glow-card p-6 flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-gray-400">Outreach Templates</p>
            <h3 className="text-3xl font-extrabold text-white mt-1">{stats.templatesCreated}</h3>
            <p className="text-xs text-indigo-400 mt-1 flex items-center gap-1">
              <CheckCircle className="h-3 w-3" />
              <span>8 channels per campaign</span>
            </p>
          </div>
          <div className="h-12 w-12 rounded-xl bg-indigo-500/10 text-indigo-400 flex items-center justify-center border border-indigo-500/10">
            <FileText className="h-6 w-6" />
          </div>
        </div>
      </div>

      {/* Analytics & Activity Row */}
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 mb-8">
        {/* Custom SVG Performance Chart */}
        <div className="lg:col-span-8 rounded-2xl border border-border-dark bg-card-dark p-6 shadow-xl">
          <h3 className="text-md font-bold text-white mb-6">Simulated Campaign Performance</h3>
          
          {/* Custom SVG/Tailwind chart */}
          <div className="relative">
            <div className="flex justify-between items-end h-48 gap-4 px-2 border-b border-border-dark pb-2">
              {/* Bar 1 */}
              <div className="flex flex-col items-center flex-1 group">
                <div className="text-[10px] text-gray-500 mb-1 opacity-0 group-hover:opacity-100 transition-opacity">58%</div>
                <div className="w-full bg-blue-600/30 rounded-t-lg border-t border-x border-blue-500/40 transition-all duration-300 h-[58%] group-hover:bg-blue-500/40 relative">
                  <div className="absolute inset-x-0 top-0 h-1 bg-blue-400 rounded-t-lg"></div>
                </div>
                <span className="text-xs text-gray-400 mt-2 font-medium">Email Open</span>
              </div>

              {/* Bar 2 */}
              <div className="flex flex-col items-center flex-1 group">
                <div className="text-[10px] text-gray-500 mb-1 opacity-0 group-hover:opacity-100 transition-opacity">24%</div>
                <div className="w-full bg-cyan-600/30 rounded-t-lg border-t border-x border-cyan-500/40 transition-all duration-300 h-[24%] group-hover:bg-cyan-500/40 relative">
                  <div className="absolute inset-x-0 top-0 h-1 bg-cyan-400 rounded-t-lg"></div>
                </div>
                <span className="text-xs text-gray-400 mt-2 font-medium">Email Reply</span>
              </div>

              {/* Bar 3 */}
              <div className="flex flex-col items-center flex-1 group">
                <div className="text-[10px] text-gray-500 mb-1 opacity-0 group-hover:opacity-100 transition-opacity">38%</div>
                <div className="w-full bg-indigo-600/30 rounded-t-lg border-t border-x border-indigo-500/40 transition-all duration-300 h-[38%] group-hover:bg-indigo-500/40 relative">
                  <div className="absolute inset-x-0 top-0 h-1 bg-indigo-400 rounded-t-lg"></div>
                </div>
                <span className="text-xs text-gray-400 mt-2 font-medium">Call Connect</span>
              </div>

              {/* Bar 4 */}
              <div className="flex flex-col items-center flex-1 group">
                <div className="text-[10px] text-gray-500 mb-1 opacity-0 group-hover:opacity-100 transition-opacity">12%</div>
                <div className="w-full bg-purple-600/30 rounded-t-lg border-t border-x border-purple-500/40 transition-all duration-300 h-[12%] group-hover:bg-purple-500/40 relative">
                  <div className="absolute inset-x-0 top-0 h-1 bg-purple-400 rounded-t-lg"></div>
                </div>
                <span className="text-xs text-gray-400 mt-2 font-medium">Social Reply</span>
              </div>

              {/* Bar 5 */}
              <div className="flex flex-col items-center flex-1 group">
                <div className="text-[10px] text-gray-500 mb-1 opacity-0 group-hover:opacity-100 transition-opacity">8%</div>
                <div className="w-full bg-teal-600/30 rounded-t-lg border-t border-x border-teal-500/40 transition-all duration-300 h-[8%] group-hover:bg-teal-500/40 relative">
                  <div className="absolute inset-x-0 top-0 h-1 bg-teal-400 rounded-t-lg"></div>
                </div>
                <span className="text-xs text-gray-400 mt-2 font-medium">Ad Click</span>
              </div>
            </div>

            {/* Y Axis Grid Label Marks */}
            <div className="absolute left-0 top-0 h-full flex flex-col justify-between text-[8px] text-gray-600 pointer-events-none -translate-x-1 pl-1">
              <div>60%</div>
              <div>40%</div>
              <div>20%</div>
              <div>0%</div>
            </div>
          </div>
          <div className="mt-4 flex items-center gap-4 text-xs text-gray-500 justify-center">
            <div className="flex items-center gap-1"><span className="h-2.5 w-2.5 rounded-full bg-blue-500"></span> Outreach</div>
            <div className="flex items-center gap-1"><span className="h-2.5 w-2.5 rounded-full bg-cyan-500"></span> Responses</div>
            <div className="flex items-center gap-1"><span className="h-2.5 w-2.5 rounded-full bg-teal-500"></span> Ads CTR</div>
          </div>
        </div>

        {/* Activity Feed */}
        <div className="lg:col-span-4 rounded-2xl border border-border-dark bg-card-dark p-6 shadow-xl flex flex-col h-full">
          <h3 className="text-md font-bold text-white mb-4">Activity Log</h3>
          <div className="flex-1 flex flex-col gap-4 overflow-y-auto pr-1">
            {activityLogs.map((log, index) => (
              <div key={index} className="flex gap-3 text-xs leading-relaxed">
                <div className="mt-1 flex h-2 w-2 rounded-full bg-blue-500 shrink-0 shadow-[0_0_8px_rgba(59,130,246,0.6)]"></div>
                <div className="flex-1">
                  <p className="text-gray-300">{log.text}</p>
                  <span className="text-[10px] text-gray-500 flex items-center gap-1 mt-0.5">
                    <Calendar className="h-3 w-3 shrink-0" />
                    {log.time}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Saved Campaigns Section */}
      <div className="rounded-2xl border border-border-dark bg-card-dark p-6 shadow-xl">
        <h3 className="text-lg font-bold text-white mb-6">Saved Outreach Campaigns</h3>

        {campaigns.length === 0 ? (
          <div className="text-center py-12">
            <AlertCircle className="h-10 w-10 text-gray-500 mx-auto mb-4" />
            <p className="text-sm text-gray-400">No saved campaigns. Head over to the generator to create one!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* List Side */}
            <div className="lg:col-span-4 space-y-2.5 max-h-[420px] overflow-y-auto pr-2">
              {campaigns.map((camp) => (
                <div
                  key={camp.id}
                  onClick={() => setSelectedCampaign(camp)}
                  className={`p-4 rounded-xl border text-left cursor-pointer transition-all duration-200 ${
                    selectedCampaign?.id === camp.id
                      ? "border-blue-500 bg-blue-600/10 shadow-[0_0_15px_rgba(59,130,246,0.05)]"
                      : "border-border-dark bg-bg-dark/40 hover:bg-bg-dark/80 hover:border-gray-700"
                  }`}
                >
                  <div className="flex justify-between items-start gap-2">
                    <h4 className="font-bold text-white text-sm truncate flex-1">{camp.businessName}</h4>
                    <button
                      onClick={(e) => handleDelete(camp.id, e)}
                      className="text-gray-500 hover:text-red-400 p-0.5 rounded transition-colors"
                      title="Delete Campaign"
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                    </button>
                  </div>
                  <div className="flex flex-wrap gap-1.5 mt-2">
                    <span className="text-[10px] font-semibold px-2 py-0.5 rounded bg-gray-800 text-gray-300">
                      {camp.industry}
                    </span>
                    <span className="text-[10px] font-semibold px-2 py-0.5 rounded bg-gray-800 text-gray-300">
                      {camp.tone}
                    </span>
                  </div>
                  <span className="text-[10px] text-gray-500 block mt-2">{camp.timestamp}</span>
                </div>
              ))}
            </div>

            {/* Viewer Side */}
            <div className="lg:col-span-8 border border-border-dark rounded-xl bg-bg-dark/40 p-5 overflow-y-auto max-h-[420px]">
              {selectedCampaign ? (
                <div className="space-y-4">
                  <div className="flex items-center justify-between border-b border-border-dark pb-3">
                    <div>
                      <h4 className="font-bold text-white text-base">{selectedCampaign.businessName}</h4>
                      <p className="text-xs text-gray-400 mt-1">
                        📍 {selectedCampaign.location} | Industry: {selectedCampaign.industry}
                      </p>
                    </div>
                    <a
                      href="/generate"
                      className="text-xs font-semibold text-blue-400 hover:text-blue-300 flex items-center gap-1 border border-border-dark rounded-lg px-2.5 py-1.5 bg-card-dark"
                    >
                      <ExternalLink className="h-3 w-3" /> Open in Editor
                    </a>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <h5 className="text-xs font-bold text-blue-400 uppercase tracking-wider mb-2">Cold Email Pitch</h5>
                      <div className="bg-card-dark p-3 rounded-lg border border-border-dark font-mono text-xs text-gray-300 whitespace-pre-line leading-relaxed">
                        <strong>Subject:</strong> {selectedCampaign.coldEmail.subject}
                        {"\n\n"}
                        {selectedCampaign.coldEmail.body}
                      </div>
                    </div>

                    <div>
                      <h5 className="text-xs font-bold text-cyan-400 uppercase tracking-wider mb-2">Social Ad Hook</h5>
                      <div className="bg-card-dark p-3 rounded-lg border border-border-dark font-mono text-xs text-gray-300 whitespace-pre-line leading-relaxed">
                        {selectedCampaign.facebookAd}
                      </div>
                    </div>

                    <div>
                      <h5 className="text-xs font-bold text-teal-400 uppercase tracking-wider mb-2">Lead Targeting Ideas</h5>
                      <ul className="list-disc list-inside text-xs text-gray-300 space-y-1 bg-card-dark p-3 rounded-lg border border-border-dark">
                        {selectedCampaign.leadSuggestions.map((s, idx) => (
                          <li key={idx} className="truncate">{s}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="h-full flex items-center justify-center py-24 text-gray-500 text-sm">
                  Select a campaign on the left to review its content.
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
