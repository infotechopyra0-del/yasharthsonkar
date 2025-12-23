import { NextResponse } from 'next/server';
import crypto from 'crypto';

export async function POST() {
  try {
    if (!process.env.CLOUDINARY_API_SECRET || !process.env.CLOUDINARY_API_KEY) {
      return NextResponse.json({ error: 'Cloudinary keys not configured' }, { status: 500 });
    }

    const timestamp = Math.floor(Date.now() / 1000);
    const toSign = `timestamp=${timestamp}`;
    const signature = crypto.createHash('sha1').update(toSign + process.env.CLOUDINARY_API_SECRET).digest('hex');

    return NextResponse.json({ signature, timestamp, apiKey: process.env.CLOUDINARY_API_KEY });
  } catch (err) {
    console.error('Error creating Cloudinary signature:', err);
    return NextResponse.json({ error: 'Failed to create signature' }, { status: 500 });
  }
}
