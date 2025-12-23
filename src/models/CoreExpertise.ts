import mongoose, { Schema, Document } from 'mongoose';

export interface ICoreExpertise extends Document {
  title: string;
  description: string;
  image: string;
  imagePublicId: string;
}

const CoreExpertiseSchema = new Schema<ICoreExpertise>({
  title: {
    type: String,
    required: true,
    trim: true,
    maxlength: 100,
  },
  description: {
    type: String,
    required: true,
    maxlength: 500,
  },
  image: {
    type: String,
    required: true,
    trim: true,
  },
   imagePublicId:{
    type: String,
    required: true,
    trim: true,
   }
});

const CoreExpertise =
  mongoose.models.CoreExpertise ||
  mongoose.model<ICoreExpertise>('CoreExpertise', CoreExpertiseSchema);

export default CoreExpertise;
