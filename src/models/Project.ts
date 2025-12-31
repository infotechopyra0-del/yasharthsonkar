import mongoose, { Schema, Document } from 'mongoose';

export interface IProject extends Document {
  title: string;
  slug: string;
  description: string;
  projectImage: string;
  projectImagePublicId?: string;
  techStack: string;
  featured: boolean;
  published: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const ProjectSchema = new Schema<IProject>(
  {
    title: {
      type: String,
      required: [true, 'Project title is required'],
      trim: true,
      maxlength: [200, 'Title cannot exceed 200 characters']
    },
    slug: {
      type: String,
      required: [true, 'Slug is required'],
      unique: true,
      trim: true,
      lowercase: true
    },
    description: {
      type: String,
      required: [true, 'Description is required'],
      trim: true,
      maxlength: [2000, 'Description cannot exceed 2000 characters']
    },
    projectImage: {
      type: String,
      required: [true, 'Project image is required']
    },
    projectImagePublicId: {
      type: String,
      default: ''
    },
    techStack: {
      type: String,
      required: [true, 'Tech stack is required'],
      trim: true
    },
    featured: {
      type: Boolean,
      default: false
    },
    published: {
      type: Boolean,
      default: false
    },
  },
  {
    timestamps: true
  }
);

ProjectSchema.index({ category: 1 });
ProjectSchema.index({ published: 1 });
ProjectSchema.index({ featured: 1 });
ProjectSchema.index({ order: 1 });

export default mongoose.models.Project || mongoose.model<IProject>('Project', ProjectSchema);