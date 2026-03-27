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

export const logoutUser = async () => {
  try {
    const token = localStorage.getItem("accessToken");

    if (token) {
      await API.post(
        "/auth/logout",
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
    }
  } catch (err) {
    console.error("Logout API failed:", err);
  }

  // 🔥 Clear everything
  localStorage.removeItem("accessToken");
  localStorage.removeItem("refreshToken");
  localStorage.removeItem("user");
};

export const getAllUsers = async () => {
  const res = await API.get("/user/getAll");
  return res.data;
};