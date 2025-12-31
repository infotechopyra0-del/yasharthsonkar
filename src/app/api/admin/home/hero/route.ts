import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Hero from '@/models/home/Hero';

export async function GET() {
  try {
    await connectDB();
    const heroes = await Hero.find().sort({ createdAt: -1 });
    return NextResponse.json(heroes);
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Failed to fetch heroes' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    await connectDB();
    const body = await req.json();
    const hero = await Hero.create(body);
    return NextResponse.json({ success: true, data: hero }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Failed to create hero' }, { status: 500 });
  }
}