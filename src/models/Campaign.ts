import mongoose from 'mongoose';

const CampaignSchema = new mongoose.Schema({
  productService: {
    type: String,
    required: true,
  },
  targetAudience: {
    age: String,
    gender: String,
    interests: [String],
    behavior: String,
    purchasingPower: String,
    location: String,
  },
  competitiveAnalysis: {
    mainCompetitors: [String],
    strengths: [String],
    weaknesses: [String],
    differentiators: [String],
  },
  swotAnalysis: {
    strengths: [String],
    weaknesses: [String],
    opportunities: [String],
    threats: [String],
  },
  customerPainPoints: [String],
  objectives: {
    primary: String,
    kpis: [String],
    timeline: {
      launch: String,
      milestones: [String],
      completion: String,
    },
  },
  creativeBrief: {
    coreMessage: String,
    tagline: String,
    brandVoice: String,
    campaignTheme: String,
    creativeAssets: [String],
  },
  mediaStrategy: {
    platforms: [String],
    mediaBuying: String,
    contentPlan: mongoose.Schema.Types.Mixed,
    frequencyAndTiming: String,
  },
  budget: {
    total: Number,
    breakdown: mongoose.Schema.Types.Mixed,
    roiProjections: String,
  },
  execution: {
    launchStrategy: String,
    optimization: String,
    influencerStrategy: String,
  },
  monitoring: {
    analyticsTools: [String],
    reportingSchedule: String,
  },
  retention: {
    engagement: String,
    reengagement: String,
  },
}, {
  timestamps: true,
});

export default mongoose.models.Campaign || mongoose.model('Campaign', CampaignSchema);
