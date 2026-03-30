import axios from "axios";

const API = "http://localhost:5000/api";

// 🔹 Common auth header
const getAuthHeader = () => {
  const token = localStorage.getItem("accessToken"); // ✅ same as your survey service
  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
};

// ✅ Get form (auto-create if not exists)
export const getForm = async (surveyId) => {
  const res = await axios.get(
    `${API}/forms/surveys/${surveyId}/form`,
    getAuthHeader()
  );
  return res.data;
};

// ✅ Create question
// ================= QUESTIONS =================
//

// ✅ Create question (FIXED ROUTE)
export const createQuestion = async (formId, data) => {
  const res = await axios.post(
    `${API}/questions/forms/${formId}/questions`, // 🔥 FIXED
    data,
    getAuthHeader()
  );
  return res.data;
};

// ✅ Get questions
export const getQuestions = async (formId) => {
  const res = await axios.get(
    `${API}/questions/forms/${formId}/questions`,
    getAuthHeader()
  );
  return res.data;
};

// ✅ Update question
export const updateQuestion = async (id, data) => {
  const res = await axios.put(
    `${API}/questions/${id}`,
    data,
    getAuthHeader()
  );
  return res.data;
};

// ✅ Delete question
export const deleteQuestion = async (id) => {
  const res = await axios.delete(
    `${API}/questions/${id}`,
    getAuthHeader()
  );
  return res.data;
};

//

// ✅ Add option
export const addOption = async (questionId, data) => {
  const res = await axios.post(
    `${API}/options/questions/${questionId}/options`,
    data,
    getAuthHeader()
  );
  return res.data;
};

// ✅ Publish form
export const publishForm = async (formId) => {
  const res = await axios.put(
    `${API}/forms/${formId}/publish`,
    {},
    getAuthHeader()
  );
  return res.data;
};