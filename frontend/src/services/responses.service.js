// src/services/responses.service.js

import axios from "axios";

const API = "http://localhost:5000/api";

const getAuthHeader = () => {
  const token = localStorage.getItem("accessToken"); // ⚠️ make sure this matches your app (token vs accessToken)
  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
};
//
// ✅ GET all responses
//
export const getAllResponses = async () => {
  const res = await axios.get(`${API}/responses`, getAuthHeader());
  return res.data;
};

//
// ✅ GET responses by form
//
export const getResponsesByForm = async (formId) => {
  const res = await axios.get(`${API}/responses/form/${formId}`,getAuthHeader());
  return res.data;
};

export const getResponseById = async (responseId) => {
  const res = await axios.get(`${API}/responses/${responseId}`,getAuthHeader());
  return res.data;
};