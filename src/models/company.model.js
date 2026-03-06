import mongoose from "mongoose";

const companySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    logo: {
      type: String,
      required: false,
      default: null,
    },
  },
  {
    timestamps: true, // auto adds createdAt and updatedAt
  },
);

const Company =
  mongoose.models.Company || mongoose.model("Company", companySchema);

export default Company;
