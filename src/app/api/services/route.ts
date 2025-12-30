import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Service from '@/models/Service';

export async function GET(req: NextRequest) {
  try {
    await dbConnect();
    
    // Fetch all services, sorted by creation date (newest first)
    const services = await Service.find({})
      .sort({ createdAt: -1 })
      .select('-__v') // Exclude version key
      .lean(); // Convert to plain JavaScript objects for better performance
    
    return NextResponse.json({
      success: true,
      services,
      count: services.length
    });
  } catch (error: any) {
    console.error('Error fetching services:', error);
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