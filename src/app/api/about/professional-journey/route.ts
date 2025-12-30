import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import ProfessionalJourney from '@/models/ProfessionalJourney';

export async function GET() {
  try {
    await connectDB();
    const experiences = await ProfessionalJourney.find({})
      .sort({ startDate: -1, createdAt: -1 })
      .lean();

    return NextResponse.json(experiences, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || 'Failed to load professional journey' }, { status: 500 });
  }
}
