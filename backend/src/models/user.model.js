const db = require("../config/db");

// 🔹 find user by email
const findUserByEmail = async (email) => {
  return await db("users").where({ email }).first();
};

// 🔹 create user
const createUser = async ({ name, email, password, role }) => {
  const data = { name, email, password };

  if (role) {
    data.role = role;
  }

  const [user] = await db("users")
    .insert(data)
    .returning(["id", "name", "email", "role", "verified_at"]);

  return user;
};

// 🔹 get all users
const getAllUsers = async () => {
  return await db("users").select(
    "id",
    "name",
    "email",
    "role",
    "verified_at",
    "created_at"
  );
};

// 🔹 delete user
const deleteUserById = async (id) => {
  return await db("users")
    .where({ id })
    .del();
};

module.exports = {
  findUserByEmail,
  createUser,
  getAllUsers,
  deleteUserById,
};