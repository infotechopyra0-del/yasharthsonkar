import mongoose from 'mongoose';

const ContactInfoSchema = new mongoose.Schema({
  type: {
    type: String,
    required: true,
    enum: ['email', 'phone', 'location', 'whatsapp']
  },
  label: {
    type: String,
    required: true
  },
  value: {
    type: String,
    required: true
  }
}, { timestamps: true });

export default mongoose.models.ContactInfo || mongoose.model('ContactInfo', ContactInfoSchema);