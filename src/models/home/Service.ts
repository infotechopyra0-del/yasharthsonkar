import mongoose, { Schema, Document } from 'mongoose';

export interface IService extends Document {
  icon: string;
  title: string;
  description: string;
  features: string[];
  imageUrl?: string;
  imagePublicId?: string;
  createdAt: Date;
  updatedAt: Date;
}

const ServiceSchema = new Schema<IService>(
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

export default mongoose.models.Service || mongoose.model<IService>('Service', ServiceSchema);