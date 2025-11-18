// Types para el sistema de marketing

export interface Campaign {
  _id: string;
  productService: string;
  targetAudience: {
    age: string;
    gender: string;
    interests: string[];
    behavior: string;
    purchasingPower: string;
    location: string;
  };
  competitiveAnalysis: {
    mainCompetitors: string[];
    strengths: string[];
    weaknesses: string[];
    differentiators: string[];
  };
  swotAnalysis: {
    strengths: string[];
    weaknesses: string[];
    opportunities: string[];
    threats: string[];
  };
  customerPainPoints: string[];
  objectives: {
    primary: string;
    kpis: string[];
    timeline: {
      launch: string;
      milestones: string[];
      completion: string;
    };
  };
  creativeBrief: {
    coreMessage: string;
    tagline: string;
    brandVoice: string;
    campaignTheme: string;
    creativeAssets: string[];
  };
  mediaStrategy: {
    platforms: string[];
    mediaBuying: string;
    contentPlan: Record<string, string>;
    frequencyAndTiming: string;
  };
  budget: {
    total: number;
    breakdown: Record<string, number>;
    roiProjections: string;
  };
  execution: {
    launchStrategy: string;
    optimization: string;
    influencerStrategy?: string;
  };
  monitoring: {
    analyticsTools: string[];
    reportingSchedule: string;
  };
  retention: {
    engagement: string;
    reengagement: string;
  };
  createdAt: Date;
  updatedAt: Date;
}

export interface CampaignRequest {
  _id: string;
  campaignId: string;
  campaign?: Campaign;
  clientInfo: {
    name: string;
    email: string;
    phone: string;
    company?: string;
  };
  status: 'pending' | 'in_review' | 'in_progress' | 'completed' | 'rejected';
  workflow: WorkflowStep[];
  createdAt: Date;
  updatedAt: Date;
  notes?: string;
}

export interface WorkflowStep {
  id: string;
  name: string;
  description: string;
  status: 'pending' | 'in_progress' | 'completed' | 'rejected';
  assignedTo?: string;
  completedAt?: Date;
  files?: string[];
  feedback?: string;
}

export interface User {
  _id: string;
  email: string;
  password: string;
  name: string;
  role: 'admin' | 'agent' | 'client';
  createdAt: Date;
}

export interface GenerateCampaignInput {
  productService: string;
  targetLocation?: string;
  budget?: string;
  additionalInfo?: string;
}
