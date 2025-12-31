import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Project from '@/models/Project';
import { deleteFromCloudinary } from '@/lib/cloudinary';

export async function GET(
  req: NextRequest,
  context: any
) {
  try {
    await dbConnect();
    const id = context?.params?.id as string;
    const project = await Project.findById(id);
    
    if (!project) {
      return NextResponse.json(
        { success: false, error: 'Project not found' },
        { status: 404 }
      );
    }
    
    return NextResponse.json({
      success: true,
      data: project
    });
  } catch (error: any) {
    console.error('GET /api/admin/projects/[id] error:', error);
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to fetch project' },
      { status: 500 }
    );
  }
}

// PUT - Update project by ID
export async function PUT(
  req: NextRequest,
  context: any
) {
  try {
    await dbConnect();
    
    const body = await req.json();
    
    // Check if slug is being changed and if it's unique
    if (body.slug) {
      const id = context?.params?.id as string;
      const existingProject = await Project.findOne({ 
        slug: body.slug,
        _id: { $ne: id }
      });
      
      if (existingProject) {
        return NextResponse.json(
          { success: false, error: 'A project with this slug already exists' },
          { status: 400 }
        );
      }
    }
    
    const id = context?.params?.id as string;
    const project = await Project.findByIdAndUpdate(
      id,
      body,
      { new: true, runValidators: true }
    );
    
    if (!project) {
      return NextResponse.json(
        { success: false, error: 'Project not found' },
        { status: 404 }
      );
    }
    
    return NextResponse.json({
      success: true,
      data: project,
      message: 'Project updated successfully'
    });
  } catch (error: any) {
    console.error('PUT /api/admin/projects/[id] error:', error);
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to update project' },
      { status: 400 }
    );
  }
}

// DELETE - Delete project by ID
export async function DELETE(
  req: NextRequest,
  context: any
) {
  try {
    await dbConnect();
    const id = context?.params?.id as string;
    const project = await Project.findById(id);
    
    if (!project) {
      return NextResponse.json(
        { success: false, error: 'Project not found' },
        { status: 404 }
      );
    }
    
    // Delete project image from Cloudinary if exists
    if (project.projectImagePublicId) {
      try {
        await deleteFromCloudinary(project.projectImagePublicId);
        console.log('Deleted image from Cloudinary:', project.projectImagePublicId);
      } catch (error) {
        console.error('Error deleting image from Cloudinary:', error);
        // Continue with project deletion even if image deletion fails
      }
    }
    
    await Project.findByIdAndDelete(id);
    
    return NextResponse.json({
      success: true,
      message: 'Project deleted successfully'
    });
  } catch (error: any) {
    console.error('DELETE /api/admin/projects/[id] error:', error);
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to delete project' },
      { status: 500 }
    );
  }
}