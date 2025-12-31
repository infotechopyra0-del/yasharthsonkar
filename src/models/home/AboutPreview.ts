import mongoose, { Schema, Document } from 'mongoose';

export interface IAboutPreview extends Document {
  title: string;
  description: string;
  detailedDescription: string;
  buttonText: string;
  buttonLink: string;
  imageUrl?: string;
  imagePublicId?: string;
  features: Array<{
    icon: string;
    title: string;
    description: string;
  }>;
  createdAt: Date;
  updatedAt: Date;
}

const AboutPreviewSchema = new Schema<IAboutPreview>(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    detailedDescription: { type: String, required: true },
    buttonText: { type: String, required: true },
    buttonLink: { type: String, required: true },
    imageUrl: { type: String },
    imagePublicId: { type: String },
    features: [
      {
        icon: { type: String, required: true },
        title: { type: String, required: true },
        description: { type: String, required: true },
      },
    ],
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.AboutPreview || mongoose.model<IAboutPreview>('AboutPreview', AboutPreviewSchema);