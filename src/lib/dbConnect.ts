// src/lib/dbConnect.ts
declare global {
  namespace NodeJS {
    interface Global {
      mongoose: {
        conn: import('mongoose').Mongoose | null;
        promise: Promise<import('mongoose').Mongoose> | null;
      };
    }
  }
}

import mongoose from 'mongoose';
import Category from '../models/Category'; // Import your Category model

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error(
    'Please define the MONGODB_URI environment variable inside .env.local'
  );
}

let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

async function dbConnect() {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
    };

    cached.promise = mongoose.connect(MONGODB_URI!, opts).then((mongoose) => {
      return mongoose;
    });
  }
  cached.conn = await cached.promise;

  // --- NEW LOGIC: Ensure default "General" category exists ---
  try {
    const defaultCategoryName = "General";
    const existingCategory = await Category.findOne({ name: defaultCategoryName });

    if (!existingCategory) {
      const newCategory = new Category({ name: defaultCategoryName });
      await newCategory.save();
      console.log(`Default category "${defaultCategoryName}" created successfully.`);
    } else {
      console.log(`Default category "${defaultCategoryName}" already exists.`);
    }
  } catch (error) {
    console.error("Error ensuring default category:", error);
    // You might want to throw the error or handle it more gracefully
    // depending on whether a missing default category should halt startup.
  }
  // --- END NEW LOGIC ---

  return cached.conn;
}

export default dbConnect;