import mongoose, { Schema, Document } from "mongoose";

export interface ICoreCompetency extends Document {
  skillName: string;
  description?: string;
  skillImage?: string;
}

const CoreCompetencySchema = new Schema<ICoreCompetency>(
  {
    skillName: {
      type: String,
      required: true,
      trim: true,
      maxlength: 100,
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
  ((): any => {
    // In development with HMR, a previous model may be registered with an old schema.
    // Delete any existing model to ensure the current schema is used.
    try {
      if (mongoose.models && mongoose.models.CoreCompetency) {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        delete mongoose.models.CoreCompetency;
      }
    } catch (e) {
      // ignore
    }

    return mongoose.models.CoreCompetency || mongoose.model<ICoreCompetency>('CoreCompetency', CoreCompetencySchema);
  })();

export default CoreCompetency;
