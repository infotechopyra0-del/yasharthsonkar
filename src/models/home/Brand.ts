import mongoose, { Schema, Document } from 'mongoose';

export interface IBrand extends Document {
  name: string;
  tagline: string;
  description: string;
  logoUrl?: string;
  logoPublicId?: string;
  tags: string[];
  createdAt: Date;
  updatedAt: Date;
}

const BrandSchema = new Schema<IBrand>(
  {
    name: { type: String, required: true },
    tagline: { type: String, required: true },
    description: { type: String, required: true },
    logoUrl: { type: String },
    logoPublicId: { type: String },
    tags: [{ type: String, required: true }],
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.Brand || mongoose.model<IBrand>('Brand', BrandSchema);
