import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {type: String},
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
      // not required because Google OAuth users won't have a password
    },
    role: {
      type: String,
      enum: ["seeker", "recruiter"],
      default: "seeker",
    },
    companyName: {
      type: String,
      // only filled if role is employer
      default: null,
    },
    avatar: {
      type: String,
      default: null,
    },
  },
  {
    timestamps: true, // adds createdAt and updatedAt automatically
    collection: "user",
  },
);

const User = mongoose.models.User || mongoose.model("User", userSchema);

export default User;
