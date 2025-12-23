import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import {authOptions} from '@/lib/auth';
import connectDB from '@/lib/mongodb';
import JourneyHighlight from '@/models/JourneyHighlight';

export async function GET(request: NextRequest) {
  try {
    await connectDB();
    const highlights = await JourneyHighlight.find().sort({ order: 1, createdAt: -1 });
    return NextResponse.json(highlights, { status: 200 });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to fetch highlights' },
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
    const highlight = await JourneyHighlight.create(data);
    
    return NextResponse.json(
      { success: true, highlight },
      { status: 201 }
    );
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to create highlight' },
      { status: 500 }
    );
  }
}