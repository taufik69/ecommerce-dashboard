import axios from "axios";
import React from "react";

const BASE_URL = "http://localhost:5174/api";

export const createCategory = async (data) => {
  const response = await axios.post(`${BASE_URL}/categories/create-category`,data);
  return response.data;
};
