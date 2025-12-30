import mongoose from 'mongoose';

const GallerySchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Title is required'],
    trim: true
  },
  category: {
    type: String,
    required: [true, 'Category is required'],
    enum: ['projects', 'events', 'team', 'workspace'],
    default: 'projects'
  },
  image: {
    type: String,
    required: [true, 'Image URL is required']
  },
  imagePublicId: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: [true, 'Description is required'],
    trim: true
  },
  likes: {
    type: Number,
    default: 0,
    min: 0
  },
  views: {
    type: Number,
    default: 0,
    min: 0
  }
}, { 
  timestamps: true 
});

// Index for faster queries
GallerySchema.index({ category: 1, createdAt: -1 });

export default mongoose.models.Gallery || mongoose.model('Gallery', GallerySchema);