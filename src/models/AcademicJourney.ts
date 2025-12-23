import mongoose, { Schema, Document } from 'mongoose';

export interface IAcademicJourney extends Document {
  title: string;
  startDate: Date;
  endDate?: Date;
  isCurrent: boolean;
  location: string;
  description: string;
  technologies: string[];
  institutionName: string;
  createdAt: Date;
  updatedAt: Date;
}

const AcademicJourneySchema = new Schema<IAcademicJourney>(
  {
    title: {
      type: String,
      required: [true, 'Title is required'],
      trim: true,
      maxlength: [150, 'Title cannot exceed 150 characters'],
    },
    institutionName: {
      type: String,
      required: true,
      trim: true,
      maxlength: 150,
    },
    startDate: {
      type: Date,
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
    description: {
      type: String,
      required: [true, 'Description is required'],
      maxlength: [1000, 'Description cannot exceed 1000 characters'],
    },
  },
  {
    timestamps: true,
  }
);

// Indexes for better query performance
AcademicJourneySchema.index({ startDate: -1 });
AcademicJourneySchema.index({ order: 1 });
AcademicJourneySchema.index({ isActive: 1 });

// Virtual for formatted duration (compute from startDate/endDate)
AcademicJourneySchema.virtual('formattedDuration').get(function(this: IAcademicJourney) {
  const startYear = this.startDate ? new Date(this.startDate).getFullYear() : undefined;
  const endYear = this.endDate ? new Date(this.endDate).getFullYear() : undefined;

  if (this.isCurrent && startYear) {
    return `${startYear} - Present`;
  }

  if (startYear && endYear) {
    return `${startYear} - ${endYear}`;
  }

  if (startYear) return `${startYear}`;

  return '';
});

const AcademicJourney = mongoose.models.AcademicJourney || 
  mongoose.model<IAcademicJourney>('AcademicJourney', AcademicJourneySchema);

export default AcademicJourney;