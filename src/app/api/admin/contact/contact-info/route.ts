import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import ContactInfo from '@/models/ContactInfo';

export async function GET() {
  try {
    await connectDB();
    const contactInfo = await ContactInfo.find().sort({ createdAt: -1 });
    return NextResponse.json(contactInfo);
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Failed to fetch contact info' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    await connectDB();
    const body = await request.json();
    
    const newContactInfo = await ContactInfo.create(body);
    return NextResponse.json({ success: true, data: newContactInfo }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Failed to create contact info' }, { status: 500 });
  }
}
