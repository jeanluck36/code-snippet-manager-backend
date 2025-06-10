// src/types/global.d.ts
import { Mongoose } from 'mongoose';

declare global {
  // Use 'var' to declare a global variable property
  var mongoose: {
    conn: Mongoose | null;
    promise: Promise<Mongoose> | null;
  };
}

export {}; // Ensure this is still here to treat it as a module