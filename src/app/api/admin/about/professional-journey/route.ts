import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import {authOptions} from '@/lib/auth';
import connectDB from '@/lib/mongodb';
import ProfessionalJourney from '@/models/ProfessionalJourney';

export async function GET(request: NextRequest) {
  try {
    await connectDB();
    const professionalJourney = await ProfessionalJourney.find().sort({ order: 1, createdAt: -1 });
    return NextResponse.json(professionalJourney, { status: 200 });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to fetch professional journey' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    await connectDB();
    const data = await request.json();
    const professionalJourney = await ProfessionalJourney.create(data);
    
    return NextResponse.json(
      { success: true, professionalJourney },
      { status: 201 }
    );
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to create professional journey' },
      { status: 500 }
    );
  }
}