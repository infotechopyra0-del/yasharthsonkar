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
    return NextResponse.json(
      { 
        success: false, 
        error: 'Failed to fetch services',
        services: []
      },
      { status: 500 }
    );
  }
}