import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import {authOptions} from '@/lib/auth';
import connectDB from '@/lib/mongodb';
import AcademicJourney from '@/models/AcademicJourney';

export async function GET(request: NextRequest) {
  try {
    await connectDB();
    const journey = await AcademicJourney.find().sort({ order: 1, createdAt: -1 });
    return NextResponse.json(journey, { status: 200 });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to fetch academic journey' },
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
    // normalize legacy fields to `institutionName`
    if (!data.institutionName) {
      data.institutionName = data.companyOrInstitution ?? data.company ?? data.institution ?? undefined;
    }
    const journey = await AcademicJourney.create(data);
    
    return NextResponse.json(
      { success: true, journey },
      { status: 201 }
    );
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to create academic journey' },
      { status: 500 }
    );
  }
}