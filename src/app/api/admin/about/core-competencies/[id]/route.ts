import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/auth';
import connectDB from '@/lib/mongodb';
import CoreCompetency from '@/models/CoreCompetency';
import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const getPublicIdFromUrl = (url?: string) => {
  if (!url) return null;
  try {
    const parts = url.split('/');
    const filename = parts[parts.length - 1];
    return filename.split('.').slice(0, -1).join('.') || filename.split('.')[0];
  } catch (e) {
    return null;
  }
};


export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    await connectDB();
    const data = await request.json();
    const resolvedParams = await params;
    const id = resolvedParams.id as string;
   
    const existing = await CoreCompetency.findById(id);
    if (!existing) {
      return NextResponse.json(
        { success: false, error: 'Competency not found' },
        { status: 404 }
      );
    }

    const existingPublicId = getPublicIdFromUrl(existing.skillImage as any);
    const newPublicId = getPublicIdFromUrl(data?.skillImage as any);

    if (existingPublicId && existingPublicId !== newPublicId) {
      try {
        await cloudinary.uploader.destroy(existingPublicId);
      } catch (err) {
      }
    }

    const competency = await CoreCompetency.findByIdAndUpdate(
      id,
      data,
      { new: true, runValidators: true }
    );

    if (!competency) {
      return NextResponse.json(
        { success: false, error: 'Competency not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, competency }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to update competency' },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    await connectDB();
    const resolvedParams = await params;
    const id = resolvedParams.id as string;
    const competency = await CoreCompetency.findByIdAndDelete(id);

    if (!competency) {
      return NextResponse.json(
        { success: false, error: 'Competency not found' },
        { status: 404 }
      );
    }

    const publicId = getPublicIdFromUrl(competency.skillImage as any);
    if (publicId) {
      try {
        await cloudinary.uploader.destroy(publicId);
      } catch (err) {
      }
    }

    return NextResponse.json(
      { success: true, message: 'Competency deleted' },
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to delete competency' },
      { status: 500 }
    );
  }
}