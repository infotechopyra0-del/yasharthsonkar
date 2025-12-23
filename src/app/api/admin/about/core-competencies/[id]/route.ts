import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/auth';
import connectDB from '@/lib/mongodb';
import CoreCompetency from '@/models/CoreCompetency';


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
    const competency = await CoreCompetency.findByIdAndUpdate(
      id,
      data,
      { new: true, runValidators: true }
    );

    if (!competency) {
      return NextResponse.json(
        { success: false, error: 'Competency not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, competency }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to update competency' },
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
    const competency = await CoreCompetency.findByIdAndDelete(id);

    if (!competency) {
      return NextResponse.json(
        { success: false, error: 'Competency not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { success: true, message: 'Competency deleted' },
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to delete competency' },
      { status: 500 }
    );
  }
}