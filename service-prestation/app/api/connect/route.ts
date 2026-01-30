import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongo/dbConnect';
import mongoose from 'mongoose';

export async function GET() {
  try {
    await dbConnect();
    
    return NextResponse.json({ 
      message: "Successfully connected to MongoDB via Mongoose!",
      database: mongoose.connection.name
    });
  } catch (e) {
    console.error('Database connection error:', e);
    return NextResponse.json({ 
      message: "Unable to connect to database", 
      error: e instanceof Error ? e.message : 'Unknown error' 
    }, { status: 500 });
  }
}
