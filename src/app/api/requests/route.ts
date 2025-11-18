import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import CampaignRequest from '@/models/CampaignRequest';
import Campaign from '@/models/Campaign';

// Create a new campaign request
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { campaignId, clientInfo } = body;

    if (!campaignId || !clientInfo) {
      return NextResponse.json(
        { error: 'Campaign ID and client info are required' },
        { status: 400 }
      );
    }

    await dbConnect();

    // Verify campaign exists
    const campaign = await Campaign.findById(campaignId);
    if (!campaign) {
      return NextResponse.json(
        { error: 'Campaign not found' },
        { status: 404 }
      );
    }

    // Create default workflow steps
    const defaultWorkflow = [
      {
        id: 'step1',
        name: 'Revisión Inicial',
        description: 'Revisión de la solicitud y análisis de requisitos',
        status: 'pending',
      },
      {
        id: 'step2',
        name: 'Creación de Artes',
        description: 'Diseño de materiales gráficos y creativos',
        status: 'pending',
      },
      {
        id: 'step3',
        name: 'Aprobación del Cliente',
        description: 'Cliente revisa y aprueba los materiales',
        status: 'pending',
      },
      {
        id: 'step4',
        name: 'Configuración de Campaña',
        description: 'Configuración de plataformas y programación',
        status: 'pending',
      },
      {
        id: 'step5',
        name: 'Lanzamiento',
        description: 'Lanzamiento oficial de la campaña',
        status: 'pending',
      },
      {
        id: 'step6',
        name: 'Monitoreo y Optimización',
        description: 'Seguimiento de resultados y ajustes',
        status: 'pending',
      },
    ];

    const campaignRequest = await CampaignRequest.create({
      campaignId,
      clientInfo,
      status: 'pending',
      workflow: defaultWorkflow,
    });

    return NextResponse.json({
      success: true,
      request: campaignRequest.toObject(),
    });
  } catch (error: any) {
    console.error('Error creating request:', error);
    return NextResponse.json(
      { error: 'Failed to create request' },
      { status: 500 }
    );
  }
}

// Get all campaign requests (for CRM)
export async function GET(request: NextRequest) {
  try {
    await dbConnect();

    const searchParams = request.nextUrl.searchParams;
    const status = searchParams.get('status');

    const query = status ? { status } : {};
    const requests = await CampaignRequest.find(query)
      .populate('campaignId')
      .sort({ createdAt: -1 });

    return NextResponse.json({
      success: true,
      requests: requests.map(r => r.toObject()),
    });
  } catch (error: any) {
    console.error('Error fetching requests:', error);
    return NextResponse.json(
      { error: 'Failed to fetch requests' },
      { status: 500 }
    );
  }
}
