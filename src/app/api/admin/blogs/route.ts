import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Blog from '@/models/Blog';

{/* GET - Fetch All Blogs */}
export async function GET(req: NextRequest) {
  try {
    await dbConnect();
    const { searchParams } = new URL(req.url);
    const published = searchParams.get('published');
    
    let query: any = {};
    if (published !== null) {
      query.isPublished = published === 'true';
    }
    
    const blogs = await Blog.find(query).sort({ createdAt: -1 });
    
    return NextResponse.json({
      success: true,
      data: blogs,
      count: blogs.length
    });
  } catch (error: any) {
    console.error('GET /api/admin/blogs error:', error);
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to fetch blogs' },
      { status: 500 }
    );
  }
}

{/* POST - Create A New Blog */}
export async function POST(req: NextRequest) {
  try {
    await dbConnect();
    const body = await req.json();
    if (!body.title || !body.excerpt || !body.content || !body.featuredImage) {
      return NextResponse.json(
        { success: false, error: 'Missing required fields' },
        { status: 400 }
      );
    }
    if (!body.slug && body.title) {
      body.slug = body.title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-+|-+$/g, '');
    }
    const existingBlog = await Blog.findOne({ slug: body.slug });
    if (existingBlog) {
      return NextResponse.json(
        { success: false, error: 'A blog with this slug already exists' },
        { status: 400 }
      );
    }
    const blog = await Blog.create(body);
    return NextResponse.json({
      success: true,
      data: blog,
      message: 'Blog created successfully'
    }, { status: 201 });
  } catch (error: any) {
    console.error('POST /api/admin/blogs error:', error);
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to create blog' },
      { status: 400 }
    );
  }
}