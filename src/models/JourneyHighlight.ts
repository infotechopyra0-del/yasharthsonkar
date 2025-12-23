import mongoose, { Schema, Document } from 'mongoose';

export interface IJourneyHighlight extends Document {
  id: number;
  period: string;
  title: string;
  description: string;
  tags: string[];
}

const JourneyHighlightSchema = new Schema<IJourneyHighlight>({
  id: {
    type: Number,
    required: true,
  },
  period: {
    type: String,
    required: true,
    trim: true,
  },
  title: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    required: true,
  },
  tags: {
    type: [String],
    required: true,
  },
});

const JourneyHighlight =
  mongoose.models.JourneyHighlight ||
  mongoose.model<IJourneyHighlight>('JourneyHighlight', JourneyHighlightSchema);

export default JourneyHighlight;
