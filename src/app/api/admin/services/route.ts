import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Service from '@/models/Service';

export async function GET(req: NextRequest) {
  try {
    await dbConnect();

    const services = await Service.find({})
      .sort({ createdAt: -1 })
      .select('-__v')
      .lean();

    return NextResponse.json({
      success: true,
      services,
      count: services.length
    });
  } catch (error: any) {
    console.error('GET /api/admin/services error:', error);
    return NextResponse.json(
      {
        success: false,
        error: error.message || 'Failed to fetch services',
        services: []
      },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    await dbConnect();
    const body = await req.json();
    if (!body.name || !body.description) {
      return NextResponse.json({ success: false, error: 'Missing required fields' }, { status: 400 });
    }

    const service = await Service.create(body);
    return NextResponse.json({ success: true, data: service, message: 'Service created successfully' }, { status: 201 });
  } catch (error: any) {
    console.error('POST /api/admin/services error:', error);
    return NextResponse.json({ success: false, error: error.message || 'Failed to create service' }, { status: 400 });
  }
}
