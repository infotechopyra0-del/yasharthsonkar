import mongoose, { Schema, Document } from 'mongoose';

export interface IService extends Document {
  name: string;
  description: string;
  serviceImage?: string;
  serviceImagePublicId?: string;
  gradientStartColor?: string;
  gradientEndColor?: string;
  features?: string[];
  createdAt: Date;
  updatedAt: Date;
}

const ServiceSchema: Schema = new Schema(
  {
    name: {
      type: String,
      required: [true, 'Service name is required'],
      trim: true
    },
    description: {
      type: String,
      required: [true, 'Service description is required'],
      trim: true
    },
    serviceImage: {
      type: String,
      default: ''
    },
    serviceImagePublicId: {
      type: String,
      default: ''
    },
    gradientStartColor: {
      type: String,
      default: '#1A1A1A'
    },
    gradientEndColor: {
      type: String,
      default: '#B7AEA3'
    },
    features: {
      type: [String],
      default: []
    }
  },
  {
    timestamps: true
  }
);

export default mongoose.models.Service || mongoose.model<IService>('Service', ServiceSchema);