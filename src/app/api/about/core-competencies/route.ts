import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import CoreCompetency from '@/models/CoreCompetency';

export async function GET() {
  try {
    await connectDB();
    const competencies = await CoreCompetency.find().sort({ skillName: 1 }).lean();
    return NextResponse.json(competencies, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || 'Failed to load competencies' }, { status: 500 });
  }
}
