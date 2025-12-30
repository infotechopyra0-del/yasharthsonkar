import { NextResponse, NextRequest } from 'next/server';
import connectDB from '@/lib/mongodb';
import Message from '@/models/Message';

{/* POST - Submit contact */}
export async function POST(request: NextRequest) {
  try {
    await connectDB();
    const body = await request.json();
    
    {/* Validate Required Fields */}
    if (!body.name || !body.email || !body.message) {
      return NextResponse.json(
        { success: false, error: 'All fields are required' },
        { status: 400 }
      );
    }
    
    {/* Create New Message */}
    const newMessage = await Message.create({
      name: body.name,
      email: body.email,
      message: body.message,
      isRead: false
    });
    return NextResponse.json({ 
      success: true, 
      message: 'Message sent successfully!',
      data: newMessage 
    }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ 
      success: false, 
      error: 'Failed to send message. Please try again.' 
    }, { status: 500 });
  }
}