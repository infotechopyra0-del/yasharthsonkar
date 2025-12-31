import mongoose, { Schema, Document } from 'mongoose';

export interface IBlog extends Document {
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  featuredImage: string;
  featuredImagePublicId?: string;
  category: string;
  tags: string[];
  author: {
    name: string;
    avatar?: string;
  };
  readTime: number;
  publishDate: Date;
  isPublished: boolean;
  isFeatured: boolean;
  metaTitle?: string;
  metaDescription?: string;
  createdAt: Date;
  updatedAt: Date;
}

const BlogSchema: Schema = new Schema(
  {
    title: {
      type: String,
      required: [true, 'Blog title is required'],
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
    excerpt: {
      type: String,
      required: [true, 'Excerpt is required'],
      trim: true,
      maxlength: [500, 'Excerpt cannot exceed 500 characters']
    },
    content: {
      type: String,
      required: [true, 'Content is required']
    },
    featuredImage: {
      type: String,
      required: [true, 'Featured image is required']
    },
    featuredImagePublicId: {
      type: String,
      default: ''
    },
    category: {
      type: String,
      required: [true, 'Category is required'],
      enum: [
        'Technology',
        'Development',
        'Resources',
        'Marketing',
        'AI & Machine Learning',
        'Other'
      ]
    },
    tags: {
      type: [String],
      default: []
    },
    author: {
      name: {
        type: String,
        required: true,
        default: 'Admin'
      },
      avatar: {
        type: String,
        default: ''
      }
    },
    readTime: {
      type: Number,
      required: true,
      min: [1, 'Read time must be at least 1 minute']
    },
    publishDate: {
      type: Date,
      default: Date.now
    },
    isPublished: {
      type: Boolean,
      default: false
    },
    isFeatured: {
      type: Boolean,
      default: false
    },
    metaTitle: {
      type: String,
      trim: true,
      maxlength: [60, 'Meta title cannot exceed 60 characters']
    },
    metaDescription: {
      type: String,
      trim: true,
      maxlength: [160, 'Meta description cannot exceed 160 characters']
    }
  },
  {
    timestamps: true
  }
);

(BlogSchema as any).pre('save', function (this: IBlog & Document) {
  if (this.isModified('title') && !this.slug) {
    this.slug = (this.title as string)
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '');
  }
});

BlogSchema.index({ category: 1 });
BlogSchema.index({ isPublished: 1 });
BlogSchema.index({ publishDate: -1 });

export default mongoose.models.Blog || mongoose.model<IBlog>('Blog', BlogSchema);