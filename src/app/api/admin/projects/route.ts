import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Project from '@/models/Project';

export async function GET(req: NextRequest) {
  try {
    await dbConnect();
    
    const { searchParams } = new URL(req.url);
    const published = searchParams.get('published');
    const featured = searchParams.get('featured');
    const category = searchParams.get('category');
    
    let query: any = {};
    
    if (published !== null) {
      query.published = published === 'true';
    }
    if (featured !== null) {
      query.featured = featured === 'true';
    }
    if (category) {
      query.category = category;
    }
    
    const projects = await Project.find(query).sort({ order: 1, createdAt: -1 });
    
    return NextResponse.json({
      success: true,
      data: projects,
      count: projects.length
    });
  } catch (error: any) {
    console.error('GET /api/admin/projects error:', error);
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to fetch projects' },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    await dbConnect();
    
    const body = await req.json();
    
    if (!body.title || !body.description || !body.projectImage || !body.techStack) {
      return NextResponse.json(
        { success: false, error: 'Missing required fields: title, description, projectImage, techStack' },
        { status: 400 }
      );
    }
    
    if (!body.slug && body.title) {
      body.slug = body.title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-+|-+$/g, '');
    }
    
    const existingProject = await Project.findOne({ slug: body.slug });
    if (existingProject) {
      return NextResponse.json(
        { success: false, error: 'A project with this slug already exists' },
        { status: 400 }
      );
    }
    
    const project = await Project.create(body);
    
    return NextResponse.json({
      success: true,
      data: project,
      message: 'Project created successfully'
    }, { status: 201 });
  } catch (error: any) {
    console.error('POST /api/admin/projects error:', error);
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to create project' },
      { status: 400 }
    );
  }
}