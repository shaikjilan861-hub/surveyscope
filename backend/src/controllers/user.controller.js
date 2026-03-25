const {
  getAllUsers,
  deleteUserById,
} = require("../models/user.model");

// 🔹 GET ALL USERS (Admin only)
const getUsers = async (req, res) => {
  try {
    const users = await getAllUsers();

    res.status(200).json({
      message: "Users fetched successfully",
      count: users.length,
      users,
    });

  } catch (error) {
    console.error("GET USERS ERROR:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// 🔹 DELETE USER (Admin only)
const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;

    // 🔥 Prevent admin deleting themselves
    if (req.user.userId === id) {
      return res.status(400).json({
        message: "You cannot delete your own account",
      });
    }

    const deleted = await deleteUserById(id);

    if (!deleted) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    res.status(200).json({
      message: "User deleted successfully",
    });

  } catch (error) {
    console.error("DELETE USER ERROR:", error);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = {
  getUsers,
  deleteUser,
};