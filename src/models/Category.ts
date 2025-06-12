// src/models/Category.ts
import mongoose, { Document, Schema, Model } from 'mongoose';

// Define the interface for a Category document
export interface ICategory extends Document {
  name: string;
}

// Define the Category Schema
const CategorySchema: Schema<ICategory> = new Schema<ICategory>(
  {
    name: {
      type: String,
      required: [true, 'Category name is required'],
      unique: true, // Category names should be unique
      trim: true, // Remove whitespace from both ends of a string
    },
  },
  {
    timestamps: true, // Adds createdAt and updatedAt fields
  }
);

// Mongoose automatically pluralizes the model name for the collection name (e.g., 'Category' becomes 'categories')
const Category: Model<ICategory> =
  mongoose.models.Category || mongoose.model<ICategory>('Category', CategorySchema);

export default Category;