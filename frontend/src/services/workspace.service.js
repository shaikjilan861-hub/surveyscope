import axios from "axios";

const API = "http://localhost:5000/api/workspaces";

const getAuthHeader = () => ({
  headers: {
    Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
  },
});

// ✅ Create workspace
export const createWorkspace = async (data) => {
  const res = await axios.post(API, data, getAuthHeader());
  return res.data;
};

// ✅ Get all workspaces
export const getWorkspaces = async () => {
  const res = await axios.get(API, getAuthHeader());
  return res.data; // 🔥 important
};

// ✅ Get single workspace
export const getWorkspaceById = async (workspaceId) => {
  const res = await axios.get(`${API}/${workspaceId}`, getAuthHeader());
  return res.data;
};

// ✅ Add member
export const addMember = async (workspaceId, data) => {
  const res = await axios.post(
    `${API}/${workspaceId}/members`,
    data,
    getAuthHeader()
  );
  return res.data;
};