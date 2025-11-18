import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Campaign from '@/models/Campaign';
import { generateCampaign } from '@/lib/claude';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { productService, targetLocation, budget, additionalInfo } = body;

    if (!productService) {
      return NextResponse.json(
        { error: 'Product/Service is required' },
        { status: 400 }
      );
    }

    // Generate campaign with Claude AI
    const campaignData = await generateCampaign({
      productService,
      targetLocation: targetLocation || 'Cuenca, Ecuador',
      budget,
      additionalInfo,
    });

    // Save to database
    await dbConnect();
    const campaign = await Campaign.create(campaignData);

    return NextResponse.json({
      success: true,
      campaign: campaign.toObject(),
    });
  } catch (error: any) {
    console.error('Error in generate API:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to generate campaign' },
      { status: 500 }
    );
  }
}
