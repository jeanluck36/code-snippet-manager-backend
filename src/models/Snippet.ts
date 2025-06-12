// src/models/Snippet.ts
import mongoose, { Document, Schema, Model, Types } from 'mongoose';
import { ICategory } from './Category'; // Import the Category interface

// Define the interface for a Snippet document
export interface ISnippet extends Document {
  name: string; // <-- ADDED THIS PROPERTY
  category: Types.ObjectId | ICategory; // Reference to the Category model
  description: string;
  code_snippet: string;
  language?: string; // e.g., 'javascript', 'python', 'html', 'css'
  tags?: string[]; // Array of strings for tags
}

// Define the Snippet Schema
const SnippetSchema: Schema<ISnippet> = new Schema<ISnippet>(
  {
    name: { // <-- ADDED THIS FIELD TO THE SCHEMA
      type: String,
      required: [true, 'Snippet name is required'],
      unique: false, // Snippet names do NOT have to be unique (e.g., two snippets called 'Hello World')
      trim: true,
    },
    category: {
      type: Schema.Types.ObjectId,
      ref: 'Category', // This tells Mongoose to reference the 'Category' model
      required: [true, 'Category is required for the snippet'],
    },
    description: {
      type: String,
      required: [true, 'Description is required'],
      trim: true,
    },
    code_snippet: {
      type: String,
      required: [true, 'Code snippet is required'],
    },
    language: {
      type: String,
      trim: true,
      // You might want to add an enum here later for allowed languages
    },
    tags: {
      type: [String], // Array of strings
      default: [], // Default to an empty array if no tags are provided
    },
  },
  {
    timestamps: true, // Adds createdAt and updatedAt fields
  }
);

const Snippet: Model<ISnippet> =
  mongoose.models.Snippet || mongoose.model<ISnippet>('Snippet', SnippetSchema);

export default Snippet; 
     
