"use server";

import connectDB from "@/lib/db";
import {convertToObject} from "@/lib/utils";
import Job from "@/models/job.model";
import {success} from "better-auth";
import {error} from "better-auth/api";
import {AwardIcon} from "lucide-react";

export const createPost = async (data) => {
  try {
    const res = await Job.create(data);
    return {success: true, data: convertToObject(res)};
  } catch (error) {
    return {success: false, message: error.message};
  }
};

export const getAllJobs = async () => {
  try {
    const res = await Job.find({}).sort({createdAt: -1});
    return {success: true, data: convertToObject(res)};
  } catch (err) {
    return {success: false, message: err.message};
  }
};

// export const getFilteredJob = async (location, companyId, searchQuery) => {
//   try {
//     let {data: query} = await getAllJobs();

//     if (location) {
//       query = query.filter((q) => {
//         q.location === location;
//       });
//     }

//     if (companyId) {
//       query = query.filter((q) => {
//         q.companyId === companyId;
//       });
//     }

//     if (searchQuery) {
//       query = query.filter((q) => {
//         q.title.includes(searchQuery);
//       });
//     }

//     return {success: true, data: convertToObject(query)};
//   } catch (error) {
//     return {success: false, message: error.message};
//   }
// };

export const getFilteredJob = async ({location, companyId, searchQuery}) => {
  try {
    await connectDB();
    const filter = {};

    if (location) {
      filter.location = location;
    }

    if (companyId) {
      filter.companyId = companyId;
    }

    if (searchQuery) {
      filter.title = {$regex: searchQuery, $options: "i"};
    }

    const res = await Job.find(filter)
      .populate("companyId")
      .sort({createdAt: -1});

    return {success: true, data: convertToObject(res)};
  } catch (error) {
    return {success: false, message: error.message};
  }
};

export const getJobDetails = async (id) => {
  try {
    const res = await Job.findById(id)
      .populate("companyId")
      .populate("applications");

    return {success: true, data: convertToObject(res)};
  } catch (err) {
    return {success: false, message: err.message};
  }
};

export const updateJobStatus = async (jobId, isOpen, recruiterId) => {
  try {
    await connectDB();

    if (!jobId) return {success: false, message: "Job ID is required"};

    const job = await Job.findById(jobId);
    if (!job) return {success: false, message: "Job not found"};

    if (job.recruiterId !== recruiterId) {
      return {
        success: false,
        message: "Unauthorized — you did not post this job",
      };
    }

    const updated = await Job.findByIdAndUpdate(jobId, {isOpen}, {new: true});

    return {success: true, data: convertToObject(updated)};
  } catch (error) {
    return {success: false, message: error.message};
  }
};
