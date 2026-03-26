import API from "../api/axios";

// 🔹 login
export const loginUser = async (data) => {
  const res = await API.post("/auth/login", data);

  // store tokens
  localStorage.setItem("accessToken", res.data.accessToken);
  localStorage.setItem("refreshToken", res.data.refreshToken);
  localStorage.setItem("user", JSON.stringify(res.data.user));

  return res.data;
};

// 🔹 register
export const registerUser = async (data) => {
  const res = await API.post("/auth/register", data);
  return res.data;
};

