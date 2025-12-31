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
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to fetch project' },
      { status: 500 }
    );
  }
}

export async function PUT(
  req: NextRequest,
  context: any
) {
  try {
    await dbConnect();
    const body = await req.json();
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
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to update project' },
      { status: 400 }
    );
  }
}

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
      } catch (error) {
      }
    }
    
    await Project.findByIdAndDelete(id);
    
    return NextResponse.json({
      success: true,
      message: 'Project deleted successfully'
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to delete project' },
      { status: 500 }
    );
  }
}