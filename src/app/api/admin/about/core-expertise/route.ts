import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import {authOptions} from '@/lib/auth';
import connectDB from '@/lib/mongodb';
import CoreExpertise from '@/models/CoreExpertise';

export async function GET(request: NextRequest) {
  try {
    await connectDB();
    const expertise = await CoreExpertise.find().sort({ order: 1, createdAt: -1 });
    return NextResponse.json(expertise, { status: 200 });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to fetch expertise' },
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
    const expertise = await CoreExpertise.create(data);
    
    return NextResponse.json(
      { success: true, expertise },
      { status: 201 }
    );
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to create expertise' },
      { status: 500 }
    );
  }
}