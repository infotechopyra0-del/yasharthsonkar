import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import {authOptions} from '@/lib/auth';
import connectDB from '@/lib/mongodb';
import CoreCompetency from '@/models/CoreCompetency';
export async function GET(request: NextRequest) {
  try {
    await connectDB();
    const competencies = await CoreCompetency.find().sort({ skillName: 1 });
    return NextResponse.json(competencies, { status: 200 });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to fetch competencies' },
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
    const normalized: any = {
      skillName: data.skillName ?? '',
      description: data.description ?? '',
      skillImage: data.skillImage ?? ''
    };

    if (!normalized.skillName || String(normalized.skillName).trim() === '') {
      return NextResponse.json({ success: false, error: 'Missing required field: skillName' }, { status: 400 });
    }

    const competency = await CoreCompetency.create({
      skillName: String(normalized.skillName).trim(),
      description: normalized.description || undefined,
      skillImage: normalized.skillImage || undefined,
    });

    return NextResponse.json({ success: true, competency }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to create competency' },
      { status: 500 }
    );
  }
}