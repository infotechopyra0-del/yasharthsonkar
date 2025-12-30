import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Admin from '@/models/Admin';
import jwt from 'jsonwebtoken';

export async function POST(request: NextRequest) {
  try {
    await dbConnect();
    
    const { email, password } = await request.json();

    if (!email || !password) {
      return NextResponse.json(
        { 
          success: false, 
          message: 'Email and password are required' 
        },
        { status: 400 }
      );
    }

    const admin = await Admin.findOne({ email: email.toLowerCase() });

    if (!admin) {
      return NextResponse.json(
        { 
          success: false, 
          message: 'Invalid credentials',
          redirect: '/'
        },
        { status: 401 }
      );
    }

    if (!admin.isActive) {
      return NextResponse.json(
        { 
          success: false, 
          message: 'Account is deactivated',
          redirect: '/'
        },
        { status: 403 }
      );
    }

    const isPasswordValid = await admin.comparePassword(password);

    if (!isPasswordValid) {
      return NextResponse.json(
        { 
          success: false, 
          message: 'Invalid credentials',
          redirect: '/'
        },
        { status: 401 }
      );
    }

    admin.lastLogin = new Date();
    await admin.save();

    const token = jwt.sign(
      { 
        id: admin._id, 
        email: admin.email,
        role: admin.role 
      },
      process.env.JWT_SECRET || 'your-secret-key',
      { expiresIn: '7d' }
    );

    const response = NextResponse.json(
      {
        success: true,
        message: 'Login successful! Welcome back! 🎉',
        redirect: '/admin/dashboard',
        admin: {
          email: admin.email,
          role: admin.role
        }
      },
      { status: 200 }
    );

    response.cookies.set('admin-token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 60 * 60 * 24 * 7,
      path: '/'
    });

    return response;

  } catch (error) {
    return NextResponse.json(
      { 
        success: false, 
        message: 'Internal server error',
        redirect: '/'
      },
      { status: 500 }
    );
  }
}