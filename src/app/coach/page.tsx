"use client";

import React, { useState } from "react";
import { getObjectionResponse, ObjectionResponse } from "@/utils/generator-templates";
import { 
  MessageSquare, 
  HelpCircle, 
  Check, 
  Copy, 
  Sparkles, 
  BrainCircuit, 
  Shuffle, 
  ArrowRight,
  TrendingUp,
  Award
} from "lucide-react";

export default function SalesCoach() {
  const [objection, setObjection] = useState("Too expensive");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [objectionData, setObjectionData] = useState<ObjectionResponse>(
    getObjectionResponse("Too expensive")
  );
  const [copied, setCopied] = useState(false);

  const handleObjectionChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const val = e.target.value;
    setObjection(val);
    setIsAnalyzing(true);

    // Simulate coach analyzing the objection
    setTimeout(() => {
      setObjectionData(getObjectionResponse(val));
      setIsAnalyzing(false);
    }, 800);
  };

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="mx-auto w-full max-w-5xl px-4 py-8 sm:px-6 lg:px-8 flex-1 flex flex-col justify-start">
      {/* Title */}
      <div className="mb-8">
        <h1 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl flex items-center gap-2">
          <MessageSquare className="h-8 w-8 text-blue-400" />
          AI Sales Coach
        </h1>
        <p className="mt-2 text-md text-gray-400">
          Select customer objections and receive psychologically backed response scripts and negotiation playbooks.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-8 md:grid-cols-12 items-start">
        {/* Left Column: Selector */}
        <div className="md:col-span-4 rounded-2xl border border-border-dark bg-card-dark p-6 shadow-xl space-y-4">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-500/10 text-blue-400 border border-blue-500/20">
            <BrainCircuit className="h-5 w-5" />
          </div>
          <div>
            <h2 className="text-md font-bold text-white">Select Objection</h2>
            <p className="text-xs text-gray-500 mt-1">What is the client saying to you?</p>
          </div>

          <div>
            <label htmlFor="objectionDropdown" className="sr-only">Choose Objection</label>
            <select
              id="objectionDropdown"
              value={objection}
              onChange={handleObjectionChange}
              className="w-full rounded-xl border border-border-dark bg-bg-dark px-4 py-3 text-sm text-white focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 transition-all duration-200 cursor-pointer"
            >
              <option value="Too expensive">"It's too expensive..."</option>
              <option value="Need time to think">"I need time to think about it..."</option>
              <option value="Already using another provider">"We're already using another provider..."</option>
              <option value="Not interested">"I'm not interested right now..."</option>
            </select>
          </div>

          <div className="rounded-xl bg-bg-dark/40 p-4 border border-border-dark">
            <h4 className="text-xs font-bold text-white flex items-center gap-1.5">
              <Award className="h-4 w-4 text-yellow-400" />
              Coach's Tip
            </h4>
            <p className="text-xs text-gray-400 mt-2 leading-relaxed">
              Objections are not rejections. They are requests for more information. A client raising an objection is actively engaged in the buying conversation.
            </p>
          </div>
        </div>

        {/* Right Column: Coach Feedback Output */}
        <div className="md:col-span-8">
          {isAnalyzing ? (
            /* Loading State */
            <div className="rounded-2xl border border-border-dark bg-card-dark p-12 text-center flex flex-col items-center justify-center h-[420px]">
              <Sparkles className="h-8 w-8 text-blue-400 animate-spin mb-4" />
              <h3 className="text-md font-bold text-white">Coach is analyzing objection...</h3>
              <p className="text-xs text-gray-500 mt-1">Drafting psychologically-optimized rebuttals...</p>
            </div>
          ) : (
            /* Results Panel */
            <div className="space-y-6">
              {/* Objection Script */}
              <div className="rounded-2xl border border-border-dark bg-card-dark p-6 shadow-xl relative overflow-hidden">
                <div className="absolute top-0 right-0 bg-blue-500/10 px-3 py-1 rounded-bl-xl border-l border-b border-blue-500/20 text-[10px] font-bold text-blue-400">
                  Recommended Response Script
                </div>

                <div className="flex justify-between items-center mb-4 mt-2">
                  <span className="text-xs font-semibold uppercase tracking-wider text-blue-400">Response Script</span>
                  <button
                    onClick={() => handleCopy(objectionData.responseScript)}
                    className="flex items-center gap-1 text-xs text-gray-400 hover:text-white transition-colors border border-border-dark bg-bg-dark/50 px-2.5 py-1.5 rounded-lg"
                  >
                    {copied ? (
                      <>
                        <Check className="h-3 w-3 text-green-400" />
                        <span className="text-green-400 font-semibold">Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="h-3 w-3" />
                        <span>Copy Script</span>
                      </>
                    )}
                  </button>
                </div>

                <div className="rounded-xl border border-border-dark bg-bg-dark/60 p-4 font-mono text-sm leading-relaxed text-gray-300 italic relative">
                  <span className="absolute text-5xl text-gray-700 font-serif leading-none top-1 left-2 pointer-events-none">“</span>
                  <p className="pl-6 pr-4 relative z-10">{objectionData.responseScript}</p>
                </div>
              </div>

              {/* Strategy Details Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Negotiation Tips */}
                <div className="rounded-2xl border border-border-dark bg-card-dark p-6 shadow-xl">
                  <h4 className="text-sm font-bold text-white flex items-center gap-2 mb-3">
                    <TrendingUp className="h-4.5 w-4.5 text-cyan-400" />
                    Negotiation Strategy
                  </h4>
                  <p className="text-xs text-gray-400 leading-relaxed">
                    {objectionData.negotiationTips}
                  </p>
                </div>

                {/* Sales Psychology */}
                <div className="rounded-2xl border border-border-dark bg-card-dark p-6 shadow-xl">
                  <h4 className="text-sm font-bold text-white flex items-center gap-2 mb-3">
                    <BrainCircuit className="h-4.5 w-4.5 text-indigo-400" />
                    Under the Hood (Psychology)
                  </h4>
                  <p className="text-xs text-gray-400 leading-relaxed">
                    {objectionData.salesPsychology}
                  </p>
                </div>
              </div>

              {/* Recommended Next Step */}
              <div className="rounded-2xl border border-green-500/20 bg-green-500/5 p-5 flex items-start gap-4">
                <div className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-green-500/10 text-green-400 border border-green-500/25">
                  <Check className="h-4 w-4" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white">Recommended Next Action</h4>
                  <p className="text-xs text-gray-400 mt-1 leading-relaxed">
                    {objectionData.nextStep}
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
