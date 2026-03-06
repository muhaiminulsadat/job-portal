"use server";

import {convertToObject} from "@/lib/utils";
import SavedJob from "@/models/saved_job.model";
import {success} from "better-auth";

export const saveAJob = async (userId, jobId, alreadySaved) => {
  try {
    if (alreadySaved) {
      const res = await SavedJob.findOneAndDelete({jobId});
      return {success: true, data: convertToObject(res)};
    } else {
      const res = await SavedJob.create({userId, jobId});
      return {success: true, data: convertToObject(res)};
    }
  } catch (err) {
    return {success: false, message: err.message};
  }
};

export const getSavedJobById = async (userId, jobId) => {
  try {
    const res = await SavedJob.findOne({jobId, userId});
    return {success: true, data: convertToObject(res)};
  } catch (err) {
    return {success: false, message: err.message};
  }
};

export const getAllSavedJobs = async (userId) => {
  try {
    const res = await SavedJob.find({userId}).populate({
      path: "jobId",
      populate: "companyId",
    });

    return {success: true, data: convertToObject(res)};
  } catch (err) {
    return {success: false, message: err.message};
  }
};
