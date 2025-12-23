import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/auth';
import connectDB from '@/lib/mongodb';
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

    const highlight = await JourneyHighlight.findByIdAndUpdate(
      id,
      data,
      { new: true, runValidators: true }
    );

    if (!highlight) {
      return NextResponse.json(
        { success: false, error: 'Highlight not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, highlight }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to update highlight' },
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

    const highlight = await JourneyHighlight.findByIdAndDelete(id);

    if (!highlight) {
      return NextResponse.json(
        { success: false, error: 'Highlight not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { success: true, message: 'Highlight deleted' },
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to delete highlight' },
      { status: 500 }
    );
  }
}