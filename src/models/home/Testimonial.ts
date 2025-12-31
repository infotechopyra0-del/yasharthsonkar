import mongoose, { Schema, Document } from 'mongoose';

export interface ITestimonial extends Document {
  metric: string;
  label: string;
  description: string;
  createdAt: Date;
  updatedAt: Date;
}

const TestimonialSchema = new Schema<ITestimonial>(
  {
    metric: { type: String, required: true },
    label: { type: String, required: true },
    description: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.Testimonial || mongoose.model<ITestimonial>('Testimonial', TestimonialSchema);