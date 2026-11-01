import { CampaignData } from "./generator-templates";

const STORAGE_KEY = "salespilot_campaigns";

// Default seed campaign so the dashboard looks loaded and impressive on first view
const SEED_CAMPAIGN: CampaignData = {
  id: "camp_seed_1",
  timestamp: new Date(Date.now() - 3600000 * 2).toLocaleString(), // 2 hours ago
  businessName: "Elite Roofing Co.",
  industry: "Roofing",
  services: "emergency storm leak repair and commercial roof replacements",
  targetCustomer: "commercial property managers and business owners",
  location: "Austin, TX",
  tone: "Professional",
  coldEmail: {
    subject: "Partnership proposal for Elite Roofing Co. in Austin, TX",
    body: "Dear Property Manager,\n\nI was recently looking at properties around Austin, TX and noticed several commercial roofs in your neighborhood could benefit from a preventative assessment.\n\nAt Elite Roofing Co., we specialize in emergency storm leak repair and commercial roof replacements for commercial property managers and business owners. We ensure your assets stay completely dry and safe.\n\nAre you available for a quick 10-minute roof inspection this week? We have a crew in the Austin area on Thursday and can stop by at no charge.\n\nBest regards,\n\nJohn Doe\nElite Roofing Co."
  },
  followUps: [
    {
      subject: "Re: Partnership proposal for Elite Roofing Co.",
      delay: "3 days later",
      body: "Hey [First Name],\n\nJust following up on my email from a few days ago. I know you're busy, but I wanted to make sure you saw my note about our emergency storm leak repair in Austin, TX.\n\nWe recently helped another local property group save about 10 hours a week in headache and emergency repairs.\n\nDo you have 5 minutes for a quick call this Thursday afternoon?\n\nBest regards,\n\nJohn Doe\nElite Roofing Co."
    },
    {
      subject: "Quick question about your roofing maintenance strategy",
      delay: "7 days later",
      body: "Hi [First Name],\n\nI hope you're having a productive week.\n\nSince I haven't heard back, I wanted to share one quick tip that has worked wonders for commercial property managers: focus heavily on optimizing your preventative maintenance.\n\nI'd love to discuss how Elite Roofing Co. can implement this for you.\n\nBest regards,\n\nJohn Doe\nElite Roofing Co."
    },
    {
      subject: "One last try from Elite Roofing Co.",
      delay: "14 days later",
      body: "Dear [First Name],\n\nI promise this is my last email. I understand now might not be the right time to talk about commercial roof maintenance.\n\nIf anything changes and you'd like to explore this, feel free to reply directly.\n\nBest regards,\n\nJohn Doe\nElite Roofing Co."
    }
  ],
  phoneScript: "[Script Intro]\nHello, my name is John Doe with Elite Roofing Co. I hope you're doing well today.\n\n[The Hook]\nI'm calling because we've been helping property managers in Austin, TX get better results with emergency storm leak repair.\n\n[The Pitch]\nWe specialize in commercial replacements, and we have a crew working near your plaza this week. We're offering a free 15-minute consultation to inspect your structure.\n\n[The Close]\nWould you happen to have a few minutes this Thursday at 2 PM?",
  facebookAd: "🏠 Attention Austin Property Managers! 🏠\n\nProtect your investment with Elite Roofing Co.! We are offering FREE, no-obligation commercial roof inspections this month.\n\n👉 Click 'Learn More' to book yours today!",
  instagramPost: "Is your commercial roof ready for the next big storm? 🌧️💨\n\nDon't wait for a leak to shut down operations. Protect your property with Elite Roofing Co.\n\n#Roofing #AustinTX #CommercialProperty",
  linkedinMessage: "Hi [First Name],\n\nI noticed you manage a portfolio of commercial properties in the Austin area. As a manager, unexpected leaks are one of the most frustrating emergencies to deal with. At Elite Roofing Co., we help companies like yours stay ahead of issues.\n\nDo you have 5 minutes for a chat?",
  leadSuggestions: [
    "Commercial property management companies in Austin, TX",
    "Real estate investors with multi-family buildings in Austin, TX",
    "Commercial plaza owners and retail facility managers",
    "Industrial warehouse operators around Austin, TX"
  ]
};

export function getSavedCampaigns(): CampaignData[] {
  if (typeof window === "undefined") return [SEED_CAMPAIGN];
  
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      // Seed initial data
      localStorage.setItem(STORAGE_KEY, JSON.stringify([SEED_CAMPAIGN]));
      return [SEED_CAMPAIGN];
    }
    return JSON.parse(raw);
  } catch (error) {
    console.error("Error accessing localStorage", error);
    return [SEED_CAMPAIGN];
  }
}

export function saveCampaign(campaign: CampaignData): void {
  if (typeof window === "undefined") return;
  try {
    const campaigns = getSavedCampaigns();
    // Prepend so latest shows up first
    const updated = [campaign, ...campaigns.filter(c => c.id !== campaign.id)];
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  } catch (error) {
    console.error("Error saving campaign", error);
  }
}

export function deleteCampaign(id: string): CampaignData[] {
  if (typeof window === "undefined") return [];
  try {
    const campaigns = getSavedCampaigns();
    const updated = campaigns.filter(c => c.id !== id);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    return updated;
  } catch (error) {
    console.error("Error deleting campaign", error);
    return [];
  }
}

export interface DashboardStats {
  totalCampaigns: number;
  hoursSaved: number;
  templatesCreated: number;
}

export function getDashboardStats(): DashboardStats {
  const campaigns = getSavedCampaigns();
  const total = campaigns.length;
  // Let's assume each campaign saves 4.5 hours of copywriting/outreach planning
  const hoursSaved = parseFloat((total * 4.5).toFixed(1));
  // Each campaign has 1 cold email, 3 followups, 1 phone script, 3 ads/social posts = 8 templates
  const templatesCreated = total * 8;

  return {
    totalCampaigns: total,
    hoursSaved,
    templatesCreated
  };
}
