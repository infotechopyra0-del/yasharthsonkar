import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import ContactInfo from '@/models/ContactInfo';

export async function GET(_request: NextRequest, context: any) {
  const params = await context.params;
  try {
    await connectDB();
    const contactInfo = await ContactInfo.findById(params.id);

    if (!contactInfo) {
      return NextResponse.json({ success: false, error: 'Contact info not found' }, { status: 404 });
    }

    return NextResponse.json(contactInfo);
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Failed to fetch contact info' }, { status: 500 });
  }
}

export async function PUT(request: NextRequest, context: any) {
  const params = await context.params;
  try {
    await connectDB();
    const body = await request.json();

    const updatedContactInfo = await ContactInfo.findByIdAndUpdate(
      params.id,
      body,
      { new: true, runValidators: true }
    );

    if (!updatedContactInfo) {
      return NextResponse.json({ success: false, error: 'Contact info not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true, data: updatedContactInfo });
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Failed to update contact info' }, { status: 500 });
  }
}

export async function DELETE(_request: NextRequest, context: any) {
  const params = await context.params;
  try {
    await connectDB();
    const deletedContactInfo = await ContactInfo.findByIdAndDelete(params?.id);
    if (!deletedContactInfo) {
      return NextResponse.json({ success: false, error: 'Contact info not found' }, { status: 404 });
    }
    return NextResponse.json({ success: true, message: 'Contact info deleted successfully' });
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Failed to delete contact info' }, { status: 500 });
  }
}