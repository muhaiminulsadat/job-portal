"use server";

import connectDB from "@/lib/db";
import Application from "@/models/application.model";
import {convertToObject} from "@/lib/utils";
import Job from "@/models/job.model";

// ── Apply to a Job ───────────────────────────────────────────────────
export const applyToJob = async (data) => {
  try {
    await connectDB();

    // server side validation
    if (!data.jobId) return {success: false, message: "Job ID is required"};
    if (!data.candidateId)
      return {success: false, message: "Candidate ID is required"};
    if (!data.name?.trim())
      return {success: false, message: "Name is required"};
    if (!data.resume?.trim())
      return {success: false, message: "Resume URL is required"};
    if (!data.skills?.trim())
      return {success: false, message: "Skills are required"};
    if (!data.experience?.trim())
      return {success: false, message: "Experience is required"};
    if (!data.education?.trim())
      return {success: false, message: "Education is required"};

    // check if already applied
    const existing = await Application.findOne({
      jobId: data.jobId,
      candidateId: data.candidateId,
    });

    if (existing) {
      return {success: false, message: "You have already applied to this job"};
    }

    const res = await Application.create(data);
    const res2 = await Job.findByIdAndUpdate(data.jobId, {
      $push: {
        applications: res._id,
      },
    });
    return {success: true, data: convertToObject(res)};
  } catch (error) {
    return {success: false, message: error.message};
  }
};

// ── Get All Applications for a Job (for recruiters) ──────────────────
export const getApplicationsByJobId = async (jobId) => {
  try {
    await connectDB();

    if (!jobId) return {success: false, message: "Job ID is required"};

    const res = await Application.find({jobId}).sort({createdAt: -1});
    return {success: true, data: convertToObject(res)};
  } catch (error) {
    return {success: false, message: error.message};
  }
};

// ── Get All Applications by a Candidate ─────────────────────────────
export const getApplicationsByCandidateId = async (candidateId) => {
  try {
    await connectDB();

    if (!candidateId)
      return {success: false, message: "Candidate ID is required"};

    const res = await Application.find({candidateId})
      .populate("jobId") // get full job details
      .sort({createdAt: -1});

    return {success: true, data: convertToObject(res)};
  } catch (error) {
    return {success: false, message: error.message};
  }
};

// ── Update Application Status (for recruiters) ───────────────────────
export const updateApplicationStatus = async (applicationId, status) => {
  try {
    await connectDB();

    const validStatuses = ["applied", "interviewing", "hired", "rejected"];
    if (!validStatuses.includes(status)) {
      return {success: false, message: "Invalid status"};
    }

    const res = await Application.findByIdAndUpdate(
      applicationId,
      {status},
      {new: true}, // returns updated document
    );

    if (!res) return {success: false, message: "Application not found"};

    return {success: true, data: convertToObject(res)};
  } catch (error) {
    return {success: false, message: error.message};
  }
};

// ── Delete Application (candidate withdraws) ─────────────────────────
export const deleteApplication = async (applicationId) => {
  try {
    await connectDB();

    const res = await Application.findByIdAndDelete(applicationId);
    if (!res) return {success: false, message: "Application not found"};

    return {success: true, message: "Application withdrawn successfully"};
  } catch (error) {
    return {success: false, message: error.message};
  }
};

export const checkIfApplied = async (candidateId, jobId) => {
  try {
    await connectDB();

    const res = await Application.findOne({candidateId, jobId});
    return {success: true, hasApplied: !!res}; // ✅ true if found, false if not
  } catch (error) {
    return {success: false, message: error.message};
  }
};
