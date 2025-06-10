// src/app/api/test-db/route.ts
import { NextResponse } from 'next/server';
import dbConnect from '../../../lib/dbConnect'; // Path from src/app/api to src/lib
import User from '../../../models/User';       // Path from src/app/api to src/models

export async function GET() {
  try {
    await dbConnect(); // Connect to the database

    // Try to create a dummy user to test the connection and model
    const userCount = await User.countDocuments();
    let testUser;

    if (userCount === 0) {
      testUser = await User.create({
        username: 'testuser',
        email: 'test@example.com',
        password_hash: 'hashedpassword123', // In a real app, this would be a proper hash
      });
      console.log('Created test user:', testUser.username);
    } else {
      testUser = await User.findOne({});
      console.log('Found existing user:', testUser?.username);
    }

    return NextResponse.json(
      {
        message: 'Database connection and User model test successful!',
        user: testUser ? { username: testUser.username, email: testUser.email } : null,
        dbStatus: 'Connected',
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.error('Database connection or User model test failed:', error);
    return NextResponse.json(
      {
        message: 'Database connection or User model test failed.',
        error: error.message,
      },
      { status: 500 }
    );
  }
}