import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Gallery from '@/models/Gallery';

{/* GET - Fetch Gallery Items */}
export async function GET(request: Request) {
  try {
    await connectDB();
    
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');
    
    const query = category && category !== 'all' ? { category } : {};
    
    const items = await Gallery.find(query)
      .sort({ createdAt: -1 })
      .select('-__v'); 
    
    return NextResponse.json(items);
  } catch (error) {
    console.error('Error fetching gallery:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch gallery' },
      { status: 500 }
    );
  }
}