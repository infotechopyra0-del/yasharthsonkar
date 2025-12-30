import mongoose from 'mongoose';

const SocialLinkSchema = new mongoose.Schema({
  platform: {
    type: String,
    required: true,
    enum: ['github', 'linkedin', 'instagram', 'twitter', 'facebook']
  },
  url: {
    type: String,
    required: true
  }
}, { timestamps: true });

export default mongoose.models.SocialLink || mongoose.model('SocialLink', SocialLinkSchema);