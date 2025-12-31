import mongoose, { Schema, Document } from 'mongoose';

export interface ICTA extends Document {
  title: string;
  description: string;
  primaryButtonText: string;
  primaryButtonLink: string;
  secondaryButtonText: string;
  secondaryButtonLink: string;
  email: string;
  phone: string;
  createdAt: Date;
  updatedAt: Date;
}

const CTASchema = new Schema<ICTA>(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    primaryButtonText: { type: String, required: true },
    primaryButtonLink: { type: String, required: true },
    secondaryButtonText: { type: String, required: true },
    secondaryButtonLink: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.CTA || mongoose.model<ICTA>('CTA', CTASchema);