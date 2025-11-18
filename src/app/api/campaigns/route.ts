import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Campaign from '@/models/Campaign';

// Get all campaigns (for CRM)
export async function GET(request: NextRequest) {
  try {
    await dbConnect();

    const campaigns = await Campaign.find({})
      .sort({ createdAt: -1 })
      .limit(100);

    return NextResponse.json({
      success: true,
      campaigns: campaigns.map(c => c.toObject()),
    });
  } catch (error: any) {
    console.error('Error fetching campaigns:', error);
    return NextResponse.json(
      { error: 'Failed to fetch campaigns' },
      { status: 500 }
    );
  }
}
