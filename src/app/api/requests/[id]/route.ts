import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import CampaignRequest from '@/models/CampaignRequest';

// Get a specific campaign request
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await dbConnect();
    const campaignRequest = await CampaignRequest.findById(params.id)
      .populate('campaignId');

    if (!campaignRequest) {
      return NextResponse.json(
        { error: 'Request not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      request: campaignRequest.toObject(),
    });
  } catch (error: any) {
    console.error('Error fetching request:', error);
    return NextResponse.json(
      { error: 'Failed to fetch request' },
      { status: 500 }
    );
  }
}

// Update campaign request
export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json();
    const { status, workflow, notes } = body;

    await dbConnect();

    const updateData: any = {};
    if (status) updateData.status = status;
    if (workflow) updateData.workflow = workflow;
    if (notes !== undefined) updateData.notes = notes;

    const campaignRequest = await CampaignRequest.findByIdAndUpdate(
      params.id,
      updateData,
      { new: true }
    ).populate('campaignId');

    if (!campaignRequest) {
      return NextResponse.json(
        { error: 'Request not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      request: campaignRequest.toObject(),
    });
  } catch (error: any) {
    console.error('Error updating request:', error);
    return NextResponse.json(
      { error: 'Failed to update request' },
      { status: 500 }
    );
  }
}
