import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import JourneyHighlight from '@/models/JourneyHighlight';

export async function GET() {
  try {
    await connectDB();
    const highlights = await JourneyHighlight.find().sort({ id: 1 }).lean();
    return NextResponse.json(highlights, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || 'Failed to load highlights' }, { status: 500 });
  }
}
