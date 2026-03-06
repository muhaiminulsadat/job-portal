import mongoose from "mongoose";

const jobSchema = new mongoose.Schema(
  {
    recruiterId: {
      type: String,
      required: true,
    },
    companyId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Company",
      required: true,
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
    location: {
      type: String,
      required: true,
      trim: true,
    },
    requirements: {
      type: String,
    },
    isOpen: {
      type: Boolean,
      default: true,
    },
    applications: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Application",
        default: [],
      },
    ],
  },
  {
    timestamps: true,
  },
);

const Job = mongoose.models.Job || mongoose.model("Job", jobSchema);

export default Job;
