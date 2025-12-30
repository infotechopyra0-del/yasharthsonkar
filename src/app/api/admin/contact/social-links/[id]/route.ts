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
  console.log('[API] PUT /api/admin/contact/social-links/:id called - id=', params?.id);
  try {
    await connectDB();
    console.log('[API] connected to DB for social-links update, id=', params?.id);

    const body = await request.json();
    console.log('[API] update payload for social-link', params?.id, body);

    const updatedSocialLink = await SocialLink.findByIdAndUpdate(
      params?.id,
      body,
      { new: true, runValidators: true }
    );

    if (!updatedSocialLink) {
      console.log('[API] social-link not found for update, id=', params?.id);
      return NextResponse.json({ success: false, error: 'Social link not found' }, { status: 404 });
    }

    console.log('[API] social-link updated', params?.id);
    return NextResponse.json({ success: true, data: updatedSocialLink });
  } catch (error) {
    console.error('[API] error updating social-link', params.id, error);
    return NextResponse.json({ success: false, error: 'Failed to update social link' }, { status: 500 });
  }
}

export async function DELETE(_request: NextRequest, context: any) {
  const { params } = await context;
  console.log('[API] DELETE /api/admin/contact/social-links/:id called - id=', params.id);
  try {
    await connectDB();
    console.log('[API] connected to DB for social-links delete, id=', params.id);

    const deletedSocialLink = await SocialLink.findByIdAndDelete(params.id);

    if (!deletedSocialLink) {
      console.log('[API] social-link not found for delete, id=', params.id);
      return NextResponse.json({ success: false, error: 'Social link not found' }, { status: 404 });
    }

    console.log('[API] social-link deleted', params.id);
    return NextResponse.json({ success: true, message: 'Social link deleted successfully' });
  } catch (error) {
    console.error('[API] error deleting social-link', params.id, error);
    return NextResponse.json({ success: false, error: 'Failed to delete social link' }, { status: 500 });
  }
}
