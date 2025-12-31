import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import SocialLink from '@/models/SocialLink';

export async function GET(_request: NextRequest, context: any) {
  const { params } = await context;
  try {
    await connectDB();
    const socialLink = await SocialLink.findById(params.id);

    if (!socialLink) {
      return NextResponse.json({ success: false, error: 'Social link not found' }, { status: 404 });
    }

    return NextResponse.json(socialLink);
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Failed to fetch social link' }, { status: 500 });
  }
}

export async function PUT(request: NextRequest, context: any) {
  const params = await context.params;
  try {
    await connectDB();
    const body = await request.json();
    const updatedSocialLink = await SocialLink.findByIdAndUpdate(
      params?.id,
      body,
      { new: true, runValidators: true }
    );

    if (!updatedSocialLink) {
      return NextResponse.json({ success: false, error: 'Social link not found' }, { status: 404 });
    }
    return NextResponse.json({ success: true, data: updatedSocialLink });
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Failed to update social link' }, { status: 500 });
  }
}

export async function DELETE(_request: NextRequest, context: any) {
  const { params } = await context;
  try {
    await connectDB();
    const deletedSocialLink = await SocialLink.findByIdAndDelete(params.id);
    if (!deletedSocialLink) {
      return NextResponse.json({ success: false, error: 'Social link not found' }, { status: 404 });
    }
    return NextResponse.json({ success: true, message: 'Social link deleted successfully' });
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Failed to delete social link' }, { status: 500 });
  }
}
