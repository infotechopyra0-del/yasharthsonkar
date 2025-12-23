import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/auth';
import connectDB from '@/lib/mongodb';
import ProfessionalJourney from '@/models/ProfessionalJourney';
import JourneyHighlight from '@/models/JourneyHighlight';

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    await connectDB();
    const data = await request.json();
    const resolvedParams = await params;
    const id = resolvedParams.id as string;
    const professionalJourney = await ProfessionalJourney.findByIdAndUpdate(
      id,
      data,
      { new: true, runValidators: true }
    );

    if (!professionalJourney) {
      return NextResponse.json(
        { success: false, error: 'Professional Journey not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, professionalJourney }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to update professional journey' },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    await connectDB();
    const resolvedParams = await params;
    const id = resolvedParams.id as string;
    const professionalJourney = await ProfessionalJourney.findByIdAndDelete(id);

    if (!professionalJourney) {
      return NextResponse.json(
        { success: false, error: 'Professional Journey not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { success: true, message: 'Professional Journey deleted' },
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to delete professional journey' },
      { status: 500 }
    );
  }
}