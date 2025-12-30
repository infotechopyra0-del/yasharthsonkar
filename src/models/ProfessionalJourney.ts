import mongoose, { Schema, Document } from 'mongoose';

export interface IProfessionalJourney extends Document {
  companyName: string;
  position: string;
  title: string;
  duration: string;
  description: string;
  startDate: string;
  endDate?: Date;
  isCurrent: boolean;
  location: string;
  createdAt: Date;
  updatedAt: Date;
}

const ProfessionalJourneySchema = new Schema<IProfessionalJourney>(
  {
    companyName: {
      type: String,
      required: [true, 'Company name is required'],
      trim: true,
      maxlength: [150, 'Company name cannot exceed 150 characters'],
    },
    position: {
      type: String,
      required: [true, 'Position is required'],
      trim: true,
      maxlength: [150, 'Position cannot exceed 150 characters'],
    },
    description: {
      type: String,
      required: [true, 'Description is required'],
      trim: true,
      maxlength: [1000, 'Description cannot exceed 1000 characters'],
    },
    startDate: {
      type: String,
      required: [true, 'Start date is required'],
    },
    endDate: {
      type: Date,
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