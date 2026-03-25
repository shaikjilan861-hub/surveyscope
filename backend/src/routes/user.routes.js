const express = require("express");
const {
  getUsers,
  deleteUser,
} = require("../controllers/user.controller");

const authMiddleware = require("../middlewares/auth.middleware");
const authorizeRoles = require("../middlewares/role.middleware");

const router = express.Router();

// 🔹 Get all users (any logged-in user OR restrict if needed)
router.get("/getAll", authMiddleware, getUsers);

// 🔹 Delete user (ADMIN ONLY 🔥)
router.delete(
  "/delete/:id",
  authMiddleware,
  authorizeRoles("admin"),
  deleteUser
);

module.exports = router;