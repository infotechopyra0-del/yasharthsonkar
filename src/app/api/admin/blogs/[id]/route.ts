import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Blog from '@/models/Blog';
import { deleteFromCloudinary } from '@/lib/cloudinary';

{/* GET - Fetch Blog By ID */}
export async function GET(
  req: NextRequest,
  { params }: { params: any }
) {
  try {
    await dbConnect();
    const { id } = await params;
    const blog = await Blog.findById(id);
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
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to fetch blog' },
      { status: 500 }
    );
  }
}

{/* PUT - Update Blog By ID */}
export async function PUT(
  req: NextRequest,
  { params }: { params: any }
) {
  try {
    await dbConnect();
    const body = await req.json();
    const { id } = await params;
    if (body.slug) {
      const existingBlog = await Blog.findOne({ 
        slug: body.slug,
        _id: { $ne: id }
      });
      if (existingBlog) {
        return NextResponse.json(
          { success: false, error: 'A blog with this slug already exists' },
          { status: 400 }
        );
      }
    }
    const blog = await Blog.findByIdAndUpdate(
      id,
      body,
      { new: true, runValidators: true }
    );
    if (!blog) {
      return NextResponse.json(
        { success: false, error: 'Blog not found' },
        { status: 404 }
      );
    }
    return NextResponse.json({
      success: true,
      data: blog,
      message: 'Blog updated successfully'
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to update blog' },
      { status: 400 }
    );
  }
}

{/* DELETE - Delete Blog By ID */}
export async function DELETE(
  req: NextRequest,
  { params }: { params: any }
) {
  try {
    await dbConnect();
    const { id } = await params;
    const blog = await Blog.findById(id);
    if (!blog) {
      return NextResponse.json(
        { success: false, error: 'Blog not found' },
        { status: 404 }
      );
    }
    if (blog.featuredImagePublicId) {
      try {
        await deleteFromCloudinary(blog.featuredImagePublicId);
      } catch (error) {
      }
    }
    await Blog.findByIdAndDelete(id);
    return NextResponse.json({
      success: true,
      message: 'Blog deleted successfully'
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to delete blog' },
      { status: 500 }
    );
  }
}
