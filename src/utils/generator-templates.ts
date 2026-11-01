export interface CampaignData {
  id: string;
  timestamp: string;
  businessName: string;
  industry: string;
  services: string;
  targetCustomer: string;
  location: string;
  tone: string;
  coldEmail: { subject: string; body: string };
  followUps: Array<{ subject: string; body: string; delay: string }>;
  phoneScript: string;
  facebookAd: string;
  instagramPost: string;
  linkedinMessage: string;
  leadSuggestions: string[];
}

export function generateCampaignData(
  businessName: string,
  industry: string,
  services: string,
  targetCustomer: string,
  location: string,
  tone: string
): CampaignData {
  const cleanName = businessName || "Our Company";
  const cleanServices = services || "our high-quality services";
  const cleanTarget = targetCustomer || "valued clients";
  const cleanLocation = location || "your local area";
  
  // 1. Determine greetings and signoffs based on Tone
  let greeting = "Hi [First Name],";
  let signoff = "Best regards,";
  let phoneOpening = `Hi, is this [Name]? My name is [My Name] from ${cleanName}.`;

  switch (tone) {
    case "Friendly":
      greeting = "Hey [First Name]! 😊";
      signoff = `Warmly,\n\n[My Name]\n${cleanName}`;
      phoneOpening = `Hey there! Hope you're having a great day. I'm [My Name] calling from ${cleanName}.`;
      break;
    case "Luxury":
      greeting = "Dear [Name],";
      signoff = `Yours sincerely,\n\n[My Name]\n${cleanName}`;
      phoneOpening = `Good day, [Name]. This is [My Name] with ${cleanName}. I hope I have caught you at a convenient moment.`;
      break;
    case "Aggressive Sales":
      greeting = "Hi [First Name],";
      signoff = `Let's connect,\n\n[My Name]\n${cleanName}\n[Phone Number]`;
      phoneOpening = `Hi [First Name], [My Name] here from ${cleanName}. I'll keep this short because time is money.`;
      break;
    case "Casual":
      greeting = "Hey [First Name],";
      signoff = `Cheers,\n\n[My Name]\n${cleanName}`;
      phoneOpening = `Hey [First Name], this is [My Name] over at ${cleanName}. Quick question for you.`;
      break;
    default: // Professional
      greeting = "Dear [First Name],";
      signoff = `Best regards,\n\n[My Name]\n${cleanName}`;
      phoneOpening = `Hello [First Name], my name is [My Name] with ${cleanName}. I hope you're doing well today.`;
      break;
  }

  // 2. Generate customized content by Industry
  let emailIntro = "";
  let emailPitch = "";
  let emailCTA = "";
  
  let objectionHandling = "";
  let adCopy = "";
  let instaCopy = "";
  let linkedinCopy = "";
  let leadSuggestions: string[] = [];

  switch (industry) {
    case "Roofing":
      emailIntro = `I was recently looking at properties around ${cleanLocation} and noticed several homes in your neighborhood could benefit from a preventative roof assessment.`;
      emailPitch = `At ${cleanName}, we specialize in ${cleanServices} for ${cleanTarget}. Whether it's repairing storm damage, replacing old shingles, or installing weather-resistant coating, we ensure your property stays completely dry and safe.`;
      emailCTA = `Are you available for a quick 10-minute roof inspection this week? We have a crew in the ${cleanLocation} area on Thursday and can stop by at no charge.`;
      
      adCopy = `🏠 Attention ${cleanLocation} Homeowners! 🏠\n\nWhen was the last time you checked your roof? Storms and seasonal wear can cause hidden leaks that ruin your ceilings.\n\nProtect your investment with ${cleanName}! We are offering FREE, no-obligation roof inspections this month for all ${cleanTarget} in the area.\n\nSpecializing in: ${cleanServices}.\n\n👉 Click 'Learn More' to book your free inspection today!`;
      
      instaCopy = `Is your roof ready for the next big storm? 🌧️💨\n\nDon't wait for a leak in your living room to tell you there's a problem. Protect your home and family with ${cleanName}.\n\nWe provide top-tier ${cleanServices} right here in ${cleanLocation}. Swipe to see some of our recent transformations! 👉\n\nDM us today to get your free inspection! 📲\n\n#Roofing #HomeImprovement #${location.replace(/\s+/g, '')} #Contractor #RoofRepair`;
      
      linkedinCopy = `Hi [First Name],\n\nI noticed you manage a portfolio of commercial properties in the ${cleanLocation} area.\n\nAs property managers, unexpected roof leaks are one of the most frustrating (and expensive) emergencies to deal with. At ${cleanName}, we help companies like yours stay ahead of issues with our specialized ${cleanServices}.\n\nI'd love to share our commercial maintenance checklist with you. Do you have 5 minutes for a quick chat next Tuesday?`;
      
      leadSuggestions = [
        `Local property management companies in ${cleanLocation}`,
        `Real estate investors with multi-family homes in ${cleanLocation}`,
        `Commercial plaza owners and retail facility managers`,
        `Homeowners in neighborhoods recently hit by high winds/storms`
      ];
      break;

    case "Restaurant":
      emailIntro = `I wanted to reach out because we've just launched a new menu and dining experience tailored specifically for local food lovers like you in ${cleanLocation}.`;
      emailPitch = `At ${cleanName}, we bring you the finest culinary creations. We specialize in ${cleanServices}, catering to clients who expect nothing less than fresh, local ingredients and outstanding flavors.`;
      emailCTA = `I'd love to host you and a guest for dinner. Can I send you a VIP voucher for a free appetizer or 15% off your first reservation?`;

      adCopy = `✨ Craving something delicious in ${cleanLocation}? ✨\n\nTreat yourself to an unforgettable dining experience at ${cleanName}! We're known for our premium ${cleanServices}.\n\nBring your family, friends, or that special someone. A culinary adventure awaits!\n\n👇 Claim your 15% off VIP voucher today!`;

      instaCopy = `Fresh ingredients, bold flavors, and great vibes. 🍕🍔🍷\n\nThis is what weekends are made of at ${cleanName}! Come try our signature ${cleanServices} right here in ${cleanLocation}. Your taste buds will thank you.\n\nReserve your table via the link in our bio! 🔗\n\n#Foodie #LocalEats #${location.replace(/\s+/g, '')} #DateNight #FoodLovers`;

      linkedinCopy = `Hi [First Name],\n\nWith corporate events returning in ${cleanLocation}, finding reliable, high-quality catering that impresses clients can be a hassle.\n\nAt ${cleanName}, we specialize in premium ${cleanServices} for corporate meetings, networking events, and team lunches. We take care of everything so you can focus on the business.\n\nCan I send you our corporate catering package menu for your next team event?`;

      leadSuggestions = [
        `Office managers at local companies looking for corporate lunch catering`,
        `Local event planners, wedding planners, and party venues`,
        `Residents in ${cleanLocation} celebrating birthdays, anniversaries, or special events`,
        `Local food bloggers and influencers for media invites`
      ];
      break;

    case "Real Estate":
      emailIntro = `The real estate market in ${cleanLocation} is moving quickly, and I wanted to share some key insights that might affect the value of your property.`;
      emailPitch = `At ${cleanName}, we help ${cleanTarget} navigate the market successfully. We specialize in ${cleanServices}, ensuring you buy at the best price or sell for absolute top dollar with zero stress.`;
      emailCTA = `Would you be open to a complimentary, data-backed valuation of your home or property? It takes just 15 minutes, and there's no pressure at all.`;

      adCopy = `🏡 Thinking of buying or selling in ${cleanLocation}? 🏡\n\nDon't navigate this market alone. At ${cleanName}, we guide you every step of the way. We specialize in ${cleanServices} designed to maximize your equity and save you time.\n\nSee what your home is worth in today's market in just 60 seconds!\n\n👉 Click here for your free home equity report!`;

      instaCopy = `Welcome home. ✨🔑\n\nFinding the perfect place is about more than just square footage—it's about lifestyle. At ${cleanName}, we match ${cleanTarget} with spaces they love, specializing in ${cleanServices} across ${cleanLocation}.\n\nClick the link in our bio to browse our latest exclusive listings! 🏠\n\n#RealEstate #HomeBuying #NewHome #${location.replace(/\s+/g, '')} #DreamHome`;

      linkedinCopy = `Hi [First Name],\n\nI see you're growing your team in ${cleanLocation}. Often, expansion means relocating or adjusting office spaces.\n\nAt ${cleanName}, we specialize in commercial real estate and ${cleanServices} for expanding businesses. We help local leaders secure the best lease terms and locations.\n\nIf you're planning any spatial changes over the next 12 months, let's connect. Do you have 10 minutes for an introductory chat?`;

      leadSuggestions = [
        `First-time homebuyers renting in high-end apartments in ${cleanLocation}`,
        `Homeowners looking to upsell/downsize in target neighborhoods`,
        `Local business owners seeking commercial/retail space expansion`,
        `Out-of-town buyers looking to relocate to ${cleanLocation}`
      ];
      break;

    case "Car Dealership":
      emailIntro = `I'm reaching out because we're currently holding an exclusive vehicle upgrade event for drivers in the ${cleanLocation} area.`;
      emailPitch = `At ${cleanName}, we offer a premium selection and specialized ${cleanServices}. We make upgrading your daily drive seamless with flexible financing, high trade-in valuations, and transparent service.`;
      emailCTA = `Would you be open to booking a VIP test drive this week? We can value your current trade-in in just 10 minutes while you drive.`;

      adCopy = `🚗 Upgrade your ride with ${cleanName}! 🚗\n\nGet the keys to your dream vehicle today. We are offering top-dollar for trade-ins in ${cleanLocation} and custom financing options for ${cleanTarget}.\n\nOur focus: ${cleanServices}.\n\n👉 Tap 'Shop Now' to view our active inventory and lock in your pre-approval!`;

      instaCopy = `There's nothing quite like that new car smell. 😍✨\n\nFrom sleek sedans to adventure-ready SUVs, find your perfect match at ${cleanName}. We specialize in ${cleanServices} designed to get you on the road with total confidence.\n\nStop by for a test drive in ${cleanLocation} today! 📍\n\n#CarDealer #NewRide #DriveClean #${location.replace(/\s+/g, '')} #AutoSales`;

      linkedinCopy = `Hi [First Name],\n\nAs companies scale, managing mobile employees or sales fleets in ${cleanLocation} can get expensive and complex.\n\nAt ${cleanName}, we specialize in commercial fleet consulting and ${cleanServices}. We help businesses secure tax-efficient vehicle write-offs and volume leasing rates.\n\nWould you be open to a quick 5-minute review of your current company transit setups?`;

      leadSuggestions = [
        `Current vehicle owners with leases expiring in the next 6 months in ${cleanLocation}`,
        `Families looking to upgrade to larger SUVs/Minivans`,
        `Local businesses needing commercial vans/trucks for service fleets`,
        `Young professionals who recently started high-income jobs`
      ];
      break;

    case "Consulting":
      emailIntro = `I've been following your company's growth and noticed some areas where streamlining operations could unlock major revenue.`;
      emailPitch = `At ${cleanName}, we partner with ${cleanTarget} to solve complex challenges. We specialize in ${cleanServices}, helping clients scale efficiency, eliminate bottlenecks, and drive higher profit margins.`;
      emailCTA = `I've compiled a brief 3-step audit of how firms in ${cleanLocation} are tackling these challenges. Do you have 15 minutes for a free discovery session?`;

      adCopy = `📈 Ready to scale your business but hitting a growth ceiling? 📈\n\nAt ${cleanName}, we help ${cleanTarget} overcome bottlenecks, optimize operations, and boost profitability. We specialize in professional ${cleanServices}.\n\nStop guessing. Start executing with clear data.\n\n👇 Book a complimentary 30-minute growth strategy session today!`;

      instaCopy = `Success isn't about working harder; it's about building scalable systems. ⚙️💡\n\nAt ${cleanName}, we guide ${cleanTarget} in ${cleanLocation} through operational transformations, specializing in ${cleanServices}.\n\nReady to elevate your business? Click the link in our bio to book your audit! 🔗\n\n#BusinessConsulting #StrategicGrowth #Entrepreneurship #Productivity #${location.replace(/\s+/g, '')}`;

      linkedinCopy = `Hi [First Name],\n\nI see you're leading operations at your firm. Often, rapid scale creates process gaps that drain executive time and trim margins.\n\nAt ${cleanName}, we consult with leaders in ${cleanLocation} to streamline ${cleanServices}, allowing you to delegate confidently and protect profit.\n\nI wrote a short case study on how we helped a similar business increase margins by 22%. May I send you a copy?`;

      leadSuggestions = [
        `Small business owners making $500k-$5M in revenue looking to delegate`,
        `Tech startups in ${cleanLocation} that recently closed seed funding`,
        `Professional service firms (law, accounting) wanting to optimize client onboarding`,
        `E-commerce brands looking to optimize supply chain and logistics`
      ];
      break;

    case "Fitness":
      emailIntro = `I'm reaching out because we're launching a local health and wellness initiative specifically for busy professionals in ${cleanLocation}.`;
      emailPitch = `At ${cleanName}, we help ${cleanTarget} achieve life-changing physical results. We specialize in ${cleanServices}, blending expert coaching, nutrition tracking, and a supportive environment to keep you on track.`;
      emailCTA = `Would you like to try a free 1-on-1 private coaching session and body composition scan? We have 3 spots open this week.`;

      adCopy = `💪 Ready to transform your health and build real strength? 💪\n\nNo boring workouts, no extreme diets. At ${cleanName}, we specialize in ${cleanServices} tailored to your busy schedule in ${cleanLocation}. \n\nJoin a community that supports your goals!\n\n👉 Click to claim your FREE 3-day guest pass and kickstart your journey!`;

      instaCopy = `Your body can stand almost anything. It's your mind you have to convince. 🧠✨\n\nAt ${cleanName}, we build strong minds and strong bodies. Offering premium ${cleanServices} right here in ${cleanLocation}.\n\nReady to make a change? Tap the link in our bio to get started! 🏋️‍♀️\n\n#FitnessGoals #HealthyLiving #PersonalTrainer #${location.replace(/\s+/g, '')} #GymLife`;

      linkedinCopy = `Hi [First Name],\n\nEmployee burnout is at an all-time high, and smart companies in ${cleanLocation} are turning to corporate wellness to boost retention and energy levels.\n\nAt ${cleanName}, we organize corporate fitness challenges and provide ${cleanServices} specifically for high-growth teams. It's a great team-building activity that pays off in productivity.\n\nCan I send you our 1-page corporate wellness package info?`;

      leadSuggestions = [
        `Busy corporate executives and professionals working in downtown ${cleanLocation}`,
        `Local companies looking to offer wellness perks to employees`,
        `Moms and dads seeking flexible morning or evening training groups`,
        `Individuals preparing for athletic events or weddings in the area`
      ];
      break;

    case "Retail":
      emailIntro = `I wanted to personally invite you to preview our newest arrivals and customer appreciation event in the ${cleanLocation} storefront.`;
      emailPitch = `At ${cleanName}, we curate premium goods for ${cleanTarget}. We specialize in ${cleanServices}, bringing you high-quality craftsmanship, unique styles, and personal service that you won't find anywhere else.`;
      emailCTA = `Can I send you a VIP access pass with a 20% discount code for your next visit?`;

      adCopy = `🛍️ Elevate your lifestyle with ${cleanName}! 🛍️\n\nDiscover curated products, handmade details, and incredible styles in ${cleanLocation}. We specialize in ${cleanServices} that make everyday living a little more beautiful.\n\n✨ Shop in-store or online today!\n\n👇 Click below to unlock your 20% welcome discount!`;

      instaCopy = `Quality is in the details. ✨👚\n\nFind your new favorites at ${cleanName}. We specialize in bringing ${cleanTarget} the best in ${cleanServices} in the heart of ${cleanLocation}.\n\nWhich one is your favorite? Comment below! 👇\n\n#RetailTherapy #ShopLocal #NewArrivals #${location.replace(/\s+/g, '')} #Boutique`;

      linkedinCopy = `Hi [First Name],\n\nAs local business networks strengthen in ${cleanLocation}, corporate gifting has become a crucial way to nurture relationships.\n\nAt ${cleanName}, we help local businesses compile custom curated gift packages, specializing in ${cleanServices} that impress partners and staff.\n\nIf you're planning any vendor appreciation or holiday gifting, let's connect. Can I send you our digital gift catalog?`;

      leadSuggestions = [
        `Local shoppers who support boutique and small retailers in ${cleanLocation}`,
        `Corporate coordinators needing customized premium gift baskets`,
        `Event planners looking for locally curated decor, goods, or favors`,
        `Affluent residents in target ZIP codes around the retail storefront`
      ];
      break;

    default: // Other / Custom
      emailIntro = `I'm reaching out because we've developed a custom solution to help ${cleanTarget} in ${cleanLocation} optimize their operations.`;
      emailPitch = `At ${cleanName}, we deliver tailored outcomes. We specialize in ${cleanServices}, helping you save time, reduce overhead, and scale operations smoothly.`;
      emailCTA = `Would you be open to a brief 10-minute introductory call to see if this matches your goals for this quarter?`;

      adCopy = `🚀 Transform the way you work with ${cleanName}! 🚀\n\nWe provide specialized ${cleanServices} designed to solve your biggest problems. Trusted by ${cleanTarget} in ${cleanLocation}.\n\nLearn how we can support you.\n\n👉 Click 'Learn More' for a custom proposal!`;

      instaCopy = `We exist to make your life simpler and more successful. 🤝✨\n\nAt ${cleanName}, we deliver high-quality ${cleanServices} tailored to your needs in ${cleanLocation}. \n\nDM us to learn how we can help you grow today! 📲\n\n#Innovation #LocalBusiness #${location.replace(/\s+/g, '')} #ClientSuccess #Solutions`;

      linkedinCopy = `Hi [First Name],\n\nI noticed your focus on business development in ${cleanLocation}.\n\nAt ${cleanName}, we partner with organizations like yours to implement custom ${cleanServices}, removing friction and accelerating growth.\n\nI'd love to share a short overview of how we align with teams like yours. Do you have a few minutes for a brief call next week?`;

      leadSuggestions = [
        `Local businesses in ${cleanLocation} facing operational inefficiencies`,
        `Managers looking to outsource specialized tasks to experts`,
        `Early adopters and niche buyers in the target customer profile`,
        `B2B partnerships and distributors in related local networks`
      ];
      break;
  }

  // 3. Assemble Cold Email and Follow-ups
  const coldEmail = {
    subject: `Partnership proposal for ${businessName} in ${location}`,
    body: `${greeting}\n\n${emailIntro}\n\n${emailPitch}\n\n${emailCTA}\n\n${signoff}`
  };

  const followUps = [
    {
      subject: `Re: Partnership proposal for ${businessName}`,
      delay: "3 days later",
      body: `Hey [First Name],\n\nJust following up on my email from a few days ago. I know you're busy, but I wanted to make sure you saw my note about our ${cleanServices} in ${cleanLocation}.\n\nWe recently helped another local group save about 10 hours a week doing exactly this.\n\nDo you have 5 minutes for a quick call this Thursday afternoon?\n\n${signoff}`
    },
    {
      subject: `Quick question about your ${industry || "business"} strategy`,
      delay: "7 days later",
      body: `Hi [First Name],\n\nI hope you're having a productive week.\n\nSince I haven't heard back, I wanted to share one quick tip that has worked wonders for ${cleanTarget}: focus heavily on optimizing your ${cleanServices} to streamline conversions.\n\nI'd love to discuss how ${businessName} can implement this for you. Are you open to a brief chat next Tuesday at 10 AM?\n\n${signoff}`
    },
    {
      subject: `One last try from ${businessName}`,
      delay: "14 days later",
      body: `${greeting}\n\nI promise this is my last email. I understand now might not be the right time to talk about upgrading your ${cleanServices}.\n\nIf anything changes and you'd like to explore this in the future, feel free to reply directly to this email or visit us at our site.\n\nWishing you all the best with your business goals this year!\n\n${signoff}`
    }
  ];

  // 4. Assemble Phone Script
  const phoneScript = `[Script Intro]\n${phoneOpening}\n\n[The Hook]\nI'm calling because we've been helping ${cleanTarget} in ${cleanLocation} get better results with their ${cleanServices}. Specifically, we help them save time and get higher quality outcomes.\n\n[The Pitch]\nOur team at ${cleanName} specializes in this, and we have a local crew working right near you this month. We're offering a free 15-minute consultation to see if we can help you achieve similar improvements.\n\n[The Close / CTA]\nWould you happen to have a few minutes this Thursday at 2 PM, or would Friday morning work better for you?`;

  return {
    id: `camp_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
    timestamp: new Date().toLocaleString(),
    businessName: cleanName,
    industry,
    services: cleanServices,
    targetCustomer: cleanTarget,
    location: cleanLocation,
    tone,
    coldEmail,
    followUps,
    phoneScript,
    facebookAd: adCopy,
    instagramPost: instaCopy,
    linkedinMessage: linkedinCopy,
    leadSuggestions
  };
}

// 5. AI Sales Coach - Objection Handling Templates
export interface ObjectionResponse {
  objection: string;
  responseScript: string;
  negotiationTips: string;
  salesPsychology: string;
  nextStep: string;
}

export function getObjectionResponse(objection: string): ObjectionResponse {
  switch (objection) {
    case "Too expensive":
      return {
        objection: "Too expensive",
        responseScript: `"I completely understand, [Name]. Value is incredibly important, and I wouldn't expect you to invest in this if you weren't convinced of the return on investment. Let's set price aside for just a moment: if this service was completely within your budget, is this the exact solution you believe would solve your problem?"`,
        negotiationTips: "Shift the conversation from cost to value/ROI. Break down the price into daily/weekly segments (e.g. 'This is equivalent to the price of a coffee a day'). Ask what parts of the package they see as non-essential to customize a package within their reach rather than discounting immediately.",
        salesPsychology: "Objections about price are rarely about the budget itself; they are usually about a lack of perceived value or trust. By asking if the product actually solves their problem, you isolate whether the objection is truly financial or if they just aren't sold on the benefits yet.",
        nextStep: "Isolate the budget. Ask, 'How far apart are we?' and check if a split payment plan or scaled-back starter package would bridge the gap."
      };
    case "Need time to think":
      return {
        objection: "Need time to think",
        responseScript: `"That's completely fair, [Name]. It's a significant decision, and I want you to feel 100% comfortable. Just to make sure I did my job correctly today—what are the key factors you'll be weighing while you think it over? Is it the pricing, the timeline, or the fit for your business?"`,
        negotiationTips: "Do not let them leave with a vague 'I'll think about it'. Force them to outline their decision-making criteria. Set a concrete, scheduled time to follow up rather than leaving it open-ended (e.g. 'Let's chat this Thursday at 10am after you've had time to review').",
        salesPsychology: "This objection is often a polite delay tactic to avoid confrontation or saying 'no'. Isolating the core doubt (price, fit, timing) immediately forces the buyer to articulate their real hesitation, which you can then address on the spot.",
        nextStep: "Schedule a specific 'follow-up review' appointment in their calendar before hanging up or ending the meeting."
      };
    case "Already using another provider":
      return {
        objection: "Already using another provider",
        responseScript: `"That's great! It means you already know how valuable this service is for your business. Out of curiosity, what is one thing they do that you absolutely love, and what is one small thing you wish they did differently or faster?"`,
        negotiationTips: "Avoid badmouthing the competitor. Focus instead on finding the service gaps. Position yourself as a backup option or a specialized addition. Offer a free audit or comparison test of their current setups to highlight where they could get better efficiency.",
        salesPsychology: "People naturally defend their choices. By praising their current setup first, you lower their defensive guard. Asking for the 'one small change' bypasses their automatic loyalty and highlights areas of dissatisfaction.",
        nextStep: "Offer a low-commitment, risk-free trial or a comparative analysis to demonstrate your superior speed, quality, or features side-by-side."
      };
    case "Not interested":
      return {
        objection: "Not interested",
        responseScript: `"That's completely fine, [Name]. I don't want to waste your time if this isn't a fit. Out of curiosity, is it that this isn't a priority for your business right now, or did you have a bad experience with something similar in the past?"`,
        negotiationTips: "Pivot to learning. When a prospect says they aren't interested, you have nothing to lose. Ask open-ended diagnostic questions to see if their lack of interest stems from a misconception, past trauma with another vendor, or bad timing.",
        salesPsychology: "Conceding the rejection immediately disarms the prospect, as they expect you to argue. When you calmly ask 'why' they aren't interested, they are much more likely to give you a candid, informative response.",
        nextStep: "Ask if you can send them a useful, free industry checklist/case study and add them to your monthly newsletter for future reference."
      };
    default:
      return {
        objection: "General Doubt",
        responseScript: `"I appreciate your honesty, [Name]. Let's take a step back. What is the single biggest challenge you are facing in your business operations right now, and what would it look like if that problem disappeared?"`,
        negotiationTips: "Focus on uncovering the underlying pain point. If they don't see the need, you cannot sell the solution. Listen more than you talk and mirror their exact phrasing.",
        salesPsychology: "Buyers make decisions based on emotion and justify with logic. Uncovering the active pain point connects your offering to their emotional desire for relief.",
        nextStep: "Offer a 10-minute audit or demo focusing specifically on their single biggest headache."
      };
  }
}
