import Anthropic from '@anthropic-ai/sdk';

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY || '',
});

const CAMPAIGN_PROMPT_TEMPLATE = `As an expert in marketing and advertising for Cuenca, Ecuador, develop a comprehensive advertising campaign for the following product/service:

**Product/Service:** {productService}
**Target Location:** {targetLocation}
**Budget:** {budget}
**Additional Information:** {additionalInfo}

Create a COMPLETE and DETAILED marketing campaign that includes ALL of the following sections. Format your response as a JSON object with this EXACT structure:

{
  "productService": "Name of product/service",
  "targetAudience": {
    "age": "Age range (e.g., 25-45 years)",
    "gender": "Target gender or 'All'",
    "interests": ["interest 1", "interest 2", "interest 3"],
    "behavior": "Consumer behavior description",
    "purchasingPower": "Economic level description",
    "location": "Cuenca, Ecuador (specific neighborhoods if relevant)"
  },
  "competitiveAnalysis": {
    "mainCompetitors": ["Competitor 1", "Competitor 2", "Competitor 3"],
    "strengths": ["Their strength 1", "Their strength 2"],
    "weaknesses": ["Their weakness 1", "Their weakness 2"],
    "differentiators": ["Our differentiator 1", "Our differentiator 2"]
  },
  "swotAnalysis": {
    "strengths": ["Internal strength 1", "Internal strength 2"],
    "weaknesses": ["Internal weakness 1", "Internal weakness 2"],
    "opportunities": ["Market opportunity 1", "Market opportunity 2"],
    "threats": ["Market threat 1", "Market threat 2"]
  },
  "customerPainPoints": [
    "Pain point 1 that customers experience",
    "Pain point 2 that customers experience",
    "Pain point 3 that customers experience"
  ],
  "objectives": {
    "primary": "Main campaign objective (e.g., Increase brand awareness by 40% in 3 months)",
    "kpis": [
      "CTR: Target 3.5%",
      "Conversion Rate: Target 5%",
      "ROI: Target 300%",
      "Engagement Rate: Target 8%"
    ],
    "timeline": {
      "launch": "2024-02-01",
      "milestones": [
        "Week 1: Campaign launch and initial ads",
        "Week 4: First optimization review",
        "Week 8: Mid-campaign analysis",
        "Week 12: Final results and report"
      ],
      "completion": "2024-04-30"
    }
  },
  "creativeBrief": {
    "coreMessage": "The central message of the campaign",
    "tagline": "A catchy, memorable tagline in Spanish",
    "brandVoice": "Tone description (e.g., Friendly, professional, inspirational)",
    "campaignTheme": "Main theme name (e.g., 'Cuenca Emprende')",
    "creativeAssets": [
      "Social media carousel (10 images)",
      "Video ads 15s and 30s",
      "Instagram Stories templates",
      "Facebook ad banners",
      "Google Display ads"
    ]
  },
  "mediaStrategy": {
    "platforms": ["Facebook", "Instagram", "TikTok", "Google Ads", "Radio local"],
    "mediaBuying": "Strategy description (e.g., CPM for awareness, CPC for conversions)",
    "contentPlan": {
      "Facebook": "3 posts/week, carousel ads, community engagement",
      "Instagram": "Daily stories, 5 posts/week, reels 3x/week",
      "TikTok": "5 short videos/week, trending challenges",
      "Google Ads": "Search and Display campaigns",
      "Radio": "15 spots/day on local stations"
    },
    "frequencyAndTiming": "Peak times: 7-9am, 12-2pm, 6-9pm (Cuenca local time)"
  },
  "budget": {
    "total": 5000,
    "breakdown": {
      "Digital Ads (Facebook/Instagram/Google)": 2000,
      "Content Creation (Videos, Graphics)": 1500,
      "Influencer Marketing": 800,
      "Traditional Media (Radio)": 500,
      "Monitoring Tools & Software": 200
    },
    "roiProjections": "Expected ROI: 300% over 3 months, Break-even at week 6"
  },
  "execution": {
    "launchStrategy": "Soft launch with teaser campaign 1 week before, followed by full launch with influencer partnerships and local event",
    "optimization": "Daily monitoring, A/B testing every week, budget reallocation based on performance",
    "influencerStrategy": "Partner with 3-5 micro-influencers from Cuenca (5K-50K followers) focusing on local lifestyle and community"
  },
  "monitoring": {
    "analyticsTools": ["Google Analytics", "Facebook Insights", "Instagram Analytics", "Hootsuite"],
    "reportingSchedule": "Daily dashboard review, Weekly team reports, Monthly client presentations"
  },
  "retention": {
    "engagement": "Email newsletter bi-weekly, Loyalty program with points, Exclusive offers for existing customers",
    "reengagement": "Retargeting ads for cart abandoners, Special comeback offers, Personalized email sequences"
  }
}

IMPORTANT INSTRUCTIONS:
1. All content must be relevant to Cuenca, Ecuador market
2. Budget in USD, appropriate for local market
3. Consider local culture, holidays, and events in Cuenca
4. Use Spanish for taglines and campaign themes when appropriate
5. Include specific local platforms and media outlets
6. Make it comprehensive, creative, and actionable
7. Return ONLY valid JSON, no additional text

Generate the complete campaign now:`;

export async function generateCampaign(input: {
  productService: string;
  targetLocation?: string;
  budget?: string;
  additionalInfo?: string;
}): Promise<any> {
  try {
    const prompt = CAMPAIGN_PROMPT_TEMPLATE
      .replace('{productService}', input.productService)
      .replace('{targetLocation}', input.targetLocation || 'Cuenca, Ecuador')
      .replace('{budget}', input.budget || 'No especificado - sugerir presupuesto apropiado')
      .replace('{additionalInfo}', input.additionalInfo || 'Ninguna');

    const message = await anthropic.messages.create({
      model: 'claude-sonnet-4-5-20250929',
      max_tokens: 8000,
      temperature: 0.7,
      messages: [
        {
          role: 'user',
          content: prompt,
        },
      ],
    });

    const content = message.content[0];
    if (content.type !== 'text') {
      throw new Error('Unexpected response type from Claude');
    }

    // Parse the JSON response
    const jsonMatch = content.text.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      throw new Error('No JSON found in response');
    }

    const campaign = JSON.parse(jsonMatch[0]);
    return campaign;
  } catch (error) {
    console.error('Error generating campaign:', error);
    throw new Error('Failed to generate campaign with AI');
  }
}

export async function generateCreativeIdeas(campaign: any): Promise<string[]> {
  try {
    const prompt = `Based on this marketing campaign for ${campaign.productService}, generate 10 creative and specific ideas for visual content and advertising materials suitable for Cuenca, Ecuador market:

Campaign Theme: ${campaign.creativeBrief?.campaignTheme}
Tagline: ${campaign.creativeBrief?.tagline}
Target Audience: ${campaign.targetAudience?.age}, ${campaign.targetAudience?.location}

Generate creative ideas for:
- Social media posts
- Video concepts
- Print materials
- Street advertising
- Local event activations

Return as a JSON array of strings. Be specific, creative, and culturally relevant to Cuenca.`;

    const message = await anthropic.messages.create({
      model: 'claude-sonnet-4-5-20250929',
      max_tokens: 2000,
      messages: [
        {
          role: 'user',
          content: prompt,
        },
      ],
    });

    const content = message.content[0];
    if (content.type !== 'text') {
      throw new Error('Unexpected response type');
    }

    const jsonMatch = content.text.match(/\[[\s\S]*\]/);
    if (!jsonMatch) {
      return [];
    }

    return JSON.parse(jsonMatch[0]);
  } catch (error) {
    console.error('Error generating creative ideas:', error);
    return [];
  }
}
