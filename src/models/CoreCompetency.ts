import mongoose, { Schema, Document } from "mongoose";

export interface ICoreCompetency extends Document {
  name: string;
  skillName: string;
  category: string;
  level: number;
  proficiencyLevel: number;
  description?: string;
  skillImage?: string;
}

const CoreCompetencySchema = new Schema<ICoreCompetency>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      maxlength: 100,
    },

    skillName: {
      type: String,
      required: true,
      trim: true,
      maxlength: 100,
    },

    category: {
      type: String,
      required: true,
      trim: true,
      maxlength: 50,
    },

    level: {
      type: Number,
      required: true,
      min: 0,
      max: 100,
    },

    proficiencyLevel: {
      type: Number,
      required: true,
      min: 0,
      max: 100,
    },

    description: {
      type: String,
      trim: true,
      maxlength: 500,
    },

    skillImage: {
      type: String,
      trim: true,
    },
  },
  {
    timestamps: false,
    versionKey: false,
  }
);

const CoreCompetency =
  mongoose.models.CoreCompetency ||
  mongoose.model<ICoreCompetency>("CoreCompetency", CoreCompetencySchema);

export default CoreCompetency;
