// src/models/User.ts
import mongoose from 'mongoose';

// Define the interface for the User document
export interface User {
  username: string;
  email: string;
  password_hash: string; // Storing hashed password
  createdAt: Date;
  updatedAt: Date;
}

// Define the Mongoose Schema for User
const UserSchema = new mongoose.Schema<User>(
  {
    username: {
      type: String,
      required: [true, 'Please provide a username.'],
      unique: true,
      trim: true,
      minlength: [3, 'Username must be at least 3 characters long.'],
    },
    email: {
      type: String,
      required: [true, 'Please provide an email.'],
      unique: true,
      trim: true,
      lowercase: true,
      match: [/.+@.+\..+/, 'Please enter a valid email address.'],
    },
    password_hash: {
      type: String,
      required: [true, 'Please provide a password.'],
    },
  },
  {
    timestamps: true, // This automatically adds createdAt and updatedAt fields
  }
);

// Mongoose.models is a plain object, containing a key for each defined model.
// Mongoose.model() checks if the model exists before creating it.
// This is important in Next.js development mode, where modules can be reloaded.
const User = mongoose.models.User || mongoose.model<User>('User', UserSchema);

export default User;