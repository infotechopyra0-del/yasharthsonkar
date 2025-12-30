import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Gallery from '@/models/Gallery';

// GET - Fetch single gallery item
export async function GET(
  request: Request,
  context: any
) {
  const params = await context.params;
  try {
    await connectDB();
    const item = await Gallery.findById(params?.id);
    
    if (!item) {
      return NextResponse.json(
        { success: false, error: 'Gallery item not found' },
        { status: 404 }
      );
    }
    
    return NextResponse.json(item);
  } catch (error) {
    console.error('Error fetching gallery item:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch gallery item' },
      { status: 500 }
    );
  }
}

// PUT - Update gallery item
export async function PUT(
  request: Request,
  context: any
) {
  const params = await context.params;
  try {
    await connectDB();
    const body = await request.json();

    const updatedItem = await Gallery.findByIdAndUpdate(
      params?.id,
      body,
      { new: true, runValidators: true }
    );
    
    if (!updatedItem) {
      return NextResponse.json(
        { success: false, error: 'Gallery item not found' },
        { status: 404 }
      );
    }
    
    return NextResponse.json({ success: true, data: updatedItem });
  } catch (error: any) {
    console.error('Error updating gallery item:', error);
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to update gallery item' },
      { status: 500 }
    );
  }
}

// DELETE - Delete gallery item
export async function DELETE(
  request: Request,
  context: any
) {
  const params = await context.params;
  try {
    await connectDB();

    const deletedItem = await Gallery.findByIdAndDelete(params?.id);
    
    if (!deletedItem) {
      return NextResponse.json(
        { success: false, error: 'Gallery item not found' },
        { status: 404 }
      );
    }
    
    return NextResponse.json({ 
      success: true, 
      message: 'Gallery item deleted successfully' 
    });
  } catch (error) {
    console.error('Error deleting gallery item:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to delete gallery item' },
      { status: 500 }
    );
  }
}