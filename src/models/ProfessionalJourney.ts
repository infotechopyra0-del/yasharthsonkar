import mongoose, { Schema, Document } from 'mongoose';

export interface IProfessionalJourney extends Document {
  institutionName: string;
  position: string;
  title: string;
  duration: string;
  description: string;
  technologies: string[];
  startDate: string;
  isCurrent: boolean;
  location: string;
  createdAt: Date;
  updatedAt: Date;
}

const ProfessionalJourneySchema = new Schema<IProfessionalJourney>(
  {
    institutionName: {
      type: String,
      required: [true, 'Institution is required'],
      trim: true,
      maxlength: [150, 'Institution cannot exceed 150 characters'],
    },
    position: {
      type: String,
      required: [true, 'Position is required'],
      trim: true,
      maxlength: [150, 'Position cannot exceed 150 characters'],
    },
    title: {
      type: String,
      required: [true, 'Title is required'],
      trim: true,
      maxlength: [150, 'Title cannot exceed 150 characters'],
    },
    duration: {
      type: String,
      required: [true, 'Duration is required'],
      trim: true,
      maxlength: [50, 'Duration cannot exceed 50 characters'],
    },
    description: {
      type: String,
      required: [true, 'Description is required'],
      trim: true,
      maxlength: [1000, 'Description cannot exceed 1000 characters'],
    },
    technologies: {
      type: [String],
      required: [true, 'At least one technology/skill is required'],
      validate: {
        validator: function(arr: string[]) {
          return arr && arr.length > 0;
        },
        message: 'At least one technology is required',
      },
    },
    startDate: {
      type: String,
      required: [true, 'Start date is required'],
    },
    isCurrent: {
      type: Boolean,
      default: false,
    },
    location: {
      type: String,
      required: [true, 'Location is required'],
      trim: true,
      maxlength: [100, 'Location cannot exceed 100 characters'],
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// Indexes
ProfessionalJourneySchema.index({ startDate: -1 });
ProfessionalJourneySchema.index({ isCurrent: 1 });

const ProfessionalJourney = mongoose.models.ProfessionalJourney || 
  mongoose.model<IProfessionalJourney>('ProfessionalJourney', ProfessionalJourneySchema);

export default ProfessionalJourney;