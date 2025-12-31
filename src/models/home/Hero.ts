import mongoose, { Schema, Document } from 'mongoose';

export interface IHero extends Document {
  title: string;
  subtitle: string;
  description: string;
  primaryButtonText: string;
  primaryButtonLink: string;
  secondaryButtonText: string;
  secondaryButtonLink: string;
  image1Url?: string;
  image1PublicId?: string;
  image2Url?: string;
  image2PublicId?: string;
  stats: Array<{
    value: string;
    label: string;
  }>;
  createdAt: Date;
  updatedAt: Date;
}

const HeroSchema = new Schema<IHero>(
  {
    title: { type: String, required: true },
    subtitle: { type: String, required: true },
    description: { type: String, required: true },
    primaryButtonText: { type: String, required: true },
    primaryButtonLink: { type: String, required: true },
    secondaryButtonText: { type: String, required: true },
    secondaryButtonLink: { type: String, required: true },
    image1Url: { type: String },
    image1PublicId: { type: String },
    image2Url: { type: String },
    image2PublicId: { type: String },
    stats: [
      {
        value: { type: String, required: true },
        label: { type: String, required: true },
      },
    ],
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.Hero || mongoose.model<IHero>('Hero', HeroSchema);