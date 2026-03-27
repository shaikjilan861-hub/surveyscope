import axios from "axios";

const API = "http://localhost:5000/api/surveys";

const getAuthHeader = () => {
  const token = localStorage.getItem("accessToken"); // ⚠️ make sure this matches your app (token vs accessToken)
  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
};

// ✅ Get all surveys
export const getSurveys = async (workspaceId) => {
  const res = await axios.get(`${API}/${workspaceId}`, getAuthHeader());
  return res.data;
};

// ✅ Create survey
export const createSurvey = async (workspaceId, data) => {
  const res = await axios.post(
    `${API}/${workspaceId}`,
    data,
    getAuthHeader()
  );
  return res.data;
};

// ✅ Get single survey
export const getSurvey = async (surveyId) => {
  const res = await axios.get(
    `${API}/single/${surveyId}`,
    getAuthHeader()
  );
  return res.data;
};

// ✅ Update survey
export const updateSurvey = async (surveyId, data) => {
  const res = await axios.put(
    `${API}/${surveyId}`,
    data,
    getAuthHeader()
  );
  return res.data;
};

// ✅ Delete survey
export const deleteSurvey = async (surveyId) => {
  const res = await axios.delete(
    `${API}/${surveyId}`,
    getAuthHeader()
  );
  return res.data;
};