import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/auth';
import connectDB from '@/lib/mongodb';
import AcademicJourney from '@/models/AcademicJourney';

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
    if (!data.institutionName) {
      data.institutionName = data.companyOrInstitution ?? data.company ?? data.institution ?? undefined;
    }
    const resolvedParams = await params;
    const id = resolvedParams.id as string;

    const expertise = await AcademicJourney.findByIdAndUpdate(
      id,
      data,
      { new: true, runValidators: true }
    );

    if (!expertise) {
      return NextResponse.json(
        { success: false, error: 'Expertise not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, expertise }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to update expertise' },
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

    const expertise = await AcademicJourney.findByIdAndDelete(id);

    if (!expertise) {
      return NextResponse.json(
        { success: false, error: 'Academic journey not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { success: true, message: 'Academic journey deleted' },
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to delete academic journey' },
      { status: 500 }
    );
  }
}