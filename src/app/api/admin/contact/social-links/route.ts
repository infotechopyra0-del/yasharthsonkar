import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import SocialLink from '@/models/SocialLink';

export async function GET() {
  try {
    await connectDB();
    const socialLinks = await SocialLink.find().sort({ createdAt: -1 });
    return NextResponse.json(socialLinks);
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Failed to fetch social links' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    await connectDB();
    const body = await request.json();
    const newSocialLink = await SocialLink.create(body);
    return NextResponse.json({ success: true, data: newSocialLink }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Failed to create social link' }, { status: 500 });
  }
}
