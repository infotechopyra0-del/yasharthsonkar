import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import {authOptions} from '@/lib/auth';
import connectDB from '@/lib/mongodb';
import ProfessionalJourney from '@/models/ProfessionalJourney';

export async function GET(request: NextRequest) {
  try {
    await connectDB();
    const professionalJourney = await ProfessionalJourney.find().sort({ startDate: -1, createdAt: -1 });
    return NextResponse.json(professionalJourney, { status: 200 });
  } catch (error: any) {
    console.error('GET Error:', error);
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to fetch professional journey' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    await connectDB();
    const rawData = await request.json();

    console.log('Received data:', rawData);

    const data = {
      companyName: rawData.companyName,
      position: rawData.position,
      description: rawData.description,
      startDate: rawData.startDate,
      endDate: rawData.endDate || null,
      isCurrent: rawData.isCurrent || false,
      location: rawData.location,
    };

    // Validate required fields
    const required = ['companyName', 'position', 'description', 'startDate', 'location'];
    const missing: string[] = [];
    
    for (const key of required) {
      if (!data[key as keyof typeof data]) {
        missing.push(key);
      }
    }

    if (missing.length > 0) {
      console.error('Missing fields:', missing);
      console.error('Data received:', data);
      return NextResponse.json(
        { 
          success: false, 
          error: 'Missing required fields', 
          missing,
          receivedData: rawData
        },
        { status: 400 }
      );
    }

    // Create the document
    const professionalJourney = await ProfessionalJourney.create(data);

    return NextResponse.json(
      { success: true, data: professionalJourney },
      { status: 201 }
    );
  } catch (error: any) {
    console.error('POST Error:', error);
    console.error('Error details:', error.errors); // Mongoose validation errors
    
    // Handle Mongoose validation errors specifically
    if (error.name === 'ValidationError') {
      const validationErrors = Object.keys(error.errors).map(key => ({
        field: key,
        message: error.errors[key].message
      }));
      
      return NextResponse.json(
        { 
          success: false, 
          error: 'Validation failed',
          validationErrors 
        },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { 
        success: false, 
        error: error.message || 'Failed to create professional journey',
        details: error.toString()
      },
      { status: 500 }
    );
  }
}