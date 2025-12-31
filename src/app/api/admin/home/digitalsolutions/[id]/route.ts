import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import DigitalSolutions from '@/models/home/DigitalSolutions';

export async function PUT(req: NextRequest, ctx: any) {
  try {
    await connectDB();
    const body = await req.json();
    const maybeParams = ctx && ctx.params ? ctx.params : ctx;
    const resolvedParams = maybeParams && typeof maybeParams.then === 'function' ? await maybeParams : maybeParams;
    const digitalsolutions = await DigitalSolutions.findByIdAndUpdate(
      resolvedParams.id,
      body,
      { new: true, runValidators: true }
    );
    
    if (!digitalsolutions) {
      return NextResponse.json(
        { success: false, error: 'DigitalSolutions not found' },
        { status: 404 }
      );
    }
    
    return NextResponse.json({ success: true, data: digitalsolutions });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 400 }
    );
  }
}

export async function DELETE(req: NextRequest, ctx: any) {
  try {
    await connectDB();
    const maybeParams = ctx && ctx.params ? ctx.params : ctx;
    const resolvedParams = maybeParams && typeof maybeParams.then === 'function' ? await maybeParams : maybeParams;
    const digitalsolutions = await DigitalSolutions.findByIdAndDelete(resolvedParams.id);
    
    if (!digitalsolutions) {
      return NextResponse.json(
        { success: false, error: 'DigitalSolutions not found' },
        { status: 404 }
      );
    }
    
    return NextResponse.json({ success: true, data: {} });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 400 }
    );
  }
}