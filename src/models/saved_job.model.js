import mongoose from "mongoose";

const savedJobSchema = new mongoose.Schema(
  {
    userId: {
      type: String, // Better Auth stores IDs as strings
      required: true,
    },
    jobId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Job",
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

const SavedJob =
  mongoose.models.SavedJob || mongoose.model("SavedJob", savedJobSchema);

export default SavedJob;
      