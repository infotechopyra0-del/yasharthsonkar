import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Brand from '@/models/home/Brand';

export async function GET() {
  try {
    await connectDB();
    const brands = await Brand.find().sort({ order: 1, createdAt: -1 });
    return NextResponse.json(brands);
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    await connectDB();
    const body = await req.json();
    const createData: any = {};
    if (body && typeof body === 'object') {
      createData.name = body.name ? String(body.name).trim() : '';
      createData.category = body.category ? String(body.category).trim() : '';
      createData.description = body.description ? String(body.description).trim() : '';
      createData.logoUrl = body.logoUrl || '';
      createData.logoPublicId = body.logoPublicId || '';
      if (body.tags !== undefined) {
        if (Array.isArray(body.tags)) createData.tags = body.tags.map((t: any) => String(t).trim()).filter(Boolean);
        else createData.tags = String(body.tags).split(',').map((t: string) => t.trim()).filter(Boolean);
      } else {
        createData.tags = [];
      }
    }
    if (!createData.name || !createData.category || !createData.description) {
      return NextResponse.json(
        { success: false, error: 'name, category and description are required' },
        { status: 400 }
      );
    }

    const brand = await Brand.create(createData);
    return NextResponse.json({ success: true, data: brand });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 400 }
    );
  }
}