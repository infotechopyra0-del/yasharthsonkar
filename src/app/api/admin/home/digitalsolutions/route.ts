import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import DigitalSolutions from '@/models/home/DigitalSolutions';

export async function GET() {
  try {
    await connectDB();
    const digitalsolutions = await DigitalSolutions.find().sort({ order: 1, createdAt: -1 });
    return NextResponse.json(digitalsolutions);
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    await connectDB();
    const body = await req.json();
    const digitalsolutions = await DigitalSolutions.create(body);
    return NextResponse.json({ success: true, data: digitalsolutions });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 400 }
    );
  }
}
