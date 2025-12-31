import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Blog from '@/models/Blog';

{/* GET - Fetch Blog By Slug */}
export async function GET(
  req: NextRequest,
  { params }: { params: any }
) {
  try {
    await dbConnect();
    const { slug } = await params;
    const blog = await Blog.findOne({ slug });
    if (!blog) {
      return NextResponse.json(
        { success: false, error: 'Blog not found' },
        { status: 404 }
      );
    }
    return NextResponse.json({
      success: true,
      data: blog
    });
  } catch (error: any) {
    console.error('GET /api/admin/blogs/slug/[slug] error:', error);
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to fetch blog' },
      { status: 500 }
    );
  }
}