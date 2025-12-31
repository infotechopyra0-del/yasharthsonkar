import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Service from '@/models/Service';
import { deleteFromCloudinary } from '@/lib/cloudinary';

export async function PUT(
  req: NextRequest,
  context: any
) {
  try {
    await dbConnect();
    const body = await req.json();

    const id = context?.params?.id as string;
    const service = await Service.findByIdAndUpdate(id, body, { new: true, runValidators: true });
    if (!service) {
      return NextResponse.json({ success: false, error: 'Service not found' }, { status: 404 });
    }
    return NextResponse.json({ success: true, data: service, message: 'Service updated successfully' });
  } catch (error: any) {
    console.error('PUT /api/admin/services/[id] error:', error);
    return NextResponse.json({ success: false, error: error.message || 'Failed to update service' }, { status: 400 });
  }
}

export async function DELETE(
  req: NextRequest,
  context: any
) {
  try {
    await dbConnect();
    const id = context?.params?.id as string;
    const service = await Service.findById(id);
    if (!service) {
      return NextResponse.json({ success: false, error: 'Service not found' }, { status: 404 });
    }

    if (service.serviceImagePublicId) {
      try {
        await deleteFromCloudinary(service.serviceImagePublicId);
      } catch (err) {
        console.error('Error deleting image from Cloudinary:', err);
      }
    }

    await Service.findByIdAndDelete(id);
    return NextResponse.json({ success: true, message: 'Service deleted successfully' });
  } catch (error: any) {
    console.error('DELETE /api/admin/services/[id] error:', error);
    return NextResponse.json({ success: false, error: error.message || 'Failed to delete service' }, { status: 500 });
  }
}
