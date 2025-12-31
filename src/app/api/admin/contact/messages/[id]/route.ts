import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Message from '@/models/Message';

export async function GET(_request: NextRequest, context: any) {
  const params = await context.params;
  try {
    await connectDB();
    const message = await Message.findById(params.id);

    if (!message) {
      return NextResponse.json({ success: false, error: 'Message not found' }, { status: 404 });
    }

    return NextResponse.json(message);
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Failed to fetch message' }, { status: 500 });
  }
}

export async function PUT(request: NextRequest, context: any) {
  const params = await context.params;
  try {
    await connectDB();
    const body = await request.json();

    const updatedMessage = await Message.findByIdAndUpdate(
      params.id,
      body,
      { new: true, runValidators: true }
    );

    if (!updatedMessage) {
      return NextResponse.json({ success: false, error: 'Message not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true, data: updatedMessage });
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Failed to update message' }, { status: 500 });
  }
}

export async function DELETE(_request: NextRequest, context: any) {
  const params = await context.params;
  try {
    await connectDB();
    const deletedMessage = await Message.findByIdAndDelete(params?.id);
    if (!deletedMessage) {
      return NextResponse.json({ success: false, error: 'Message not found' }, { status: 404 });
    }
    return NextResponse.json({ success: true, message: 'Message deleted successfully' });
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Failed to delete message' }, { status: 500 });
  }
}