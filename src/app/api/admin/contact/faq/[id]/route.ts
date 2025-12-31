import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import FAQ from '@/models/FAQ';

export async function GET(_request: NextRequest, context: any) {
  const params = await context.params;
  try {
    await connectDB();
    const faq = await FAQ.findById(params.id);

    if (!faq) {
      return NextResponse.json({ success: false, error: 'FAQ not found' }, { status: 404 });
    }

    return NextResponse.json(faq);
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Failed to fetch FAQ' }, { status: 500 });
  }
}

export async function PUT(request: NextRequest, context: any) {
  const params = await context.params;
  try {
    await connectDB();
    const body = await request.json();

    const updatedFAQ = await FAQ.findByIdAndUpdate(
      params.id,
      body,
      { new: true, runValidators: true }
    );
    if (!updatedFAQ) {
      return NextResponse.json({ success: false, error: 'FAQ not found' }, { status: 404 });
    }
    return NextResponse.json({ success: true, data: updatedFAQ });
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Failed to update FAQ' }, { status: 500 });
  }
}

export async function DELETE(_request: NextRequest, context: any) {
  const params = await context.params;
  try {
    await connectDB();
    const deletedFAQ = await FAQ.findByIdAndDelete(params?.id);
    if (!deletedFAQ) {
      return NextResponse.json({ success: false, error: 'FAQ not found' }, { status: 404 });
    }
    return NextResponse.json({ success: true, message: 'FAQ deleted successfully' });
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Failed to delete FAQ' }, { status: 500 });
  }
}