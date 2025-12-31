import mongoose, { Schema, Document } from 'mongoose';

export interface IDigitalSolutions extends Document {
  icon: string;
  title: string;
  description: string;
  features: string[];
  imageUrl?: string;
  imagePublicId?: string;
  createdAt: Date;
  updatedAt: Date;
}

const DigitalSolutionsSchema = new Schema<IDigitalSolutions>(
  {
    icon: { type: String, required: true },
    title: { type: String, required: true },
    description: { type: String, required: true },
    features: [{ type: String, required: true }],
    imageUrl: { type: String },
    imagePublicId: { type: String },
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.DigitalSolutions || mongoose.model<IDigitalSolutions>('DigitalSolutions', DigitalSolutionsSchema);