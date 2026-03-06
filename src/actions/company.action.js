"use server";

import {convertToObject} from "@/lib/utils";
import Company from "@/models/company.model";

export const addCompany = async (formData) => {
  try {
    const data = await Company.create(formData);
    return {success: true, data: convertToObject(data)};
  } catch (error) {
    if (error.code === 11000) {
      return {success: false, message: "Company already exists"};
    }
    return {success: false, message: error.message};
  }
};

export const getAllCompanies = async () => {
  try {
    const data = await Company.find({});
    return {success: true, data: convertToObject(data)};
  } catch (error) {
    return {success: false, message: error.message};
  }
};
