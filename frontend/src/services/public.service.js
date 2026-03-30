import axios from "axios";

const API = "http://localhost:5000/api";

//
// ✅ GET: Fetch public form by slug
//
export const getPublicForm = async (slug) => {
  const res = await axios.get(`${API}/public/forms/${slug}`);
  return res.data;
};

//
// ✅ POST: Submit form response
//
export const submitPublicForm = async (slug, payload) => {
  const res = await axios.post(
    `${API}/public/forms/${slug}`,
    payload
  );
  return res.data;
};