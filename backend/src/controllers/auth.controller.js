const bcrypt = require("bcrypt");
const {
  findUserByEmail,
  createUser,
} = require("../models/user.model");
const {
  generateAccessToken,
  generateRefreshToken,
} =require("../utils/token");

const register = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    // 🔹 validation
    if (!name || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // 🔹 check user exists
    const existingUser = await findUserByEmail(email);

    if (existingUser) {
      return res.status(400).json({ message: "Email already exists" });
    }

    // 🔹 hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // 🔹 create user
    const user = await createUser({
      name,
      email,
      password: hashedPassword,
      role,
    });

    res.status(201).json({
      message: "User registered successfully",
      user,
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // 🔹 validation
    if (!email || !password) {
      return res.status(400).json({ message: "Email and password required" });
    }

    // 🔹 check user
    const user = await findUserByEmail(email);

    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // 🔹 compare password
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // 🔥 generate tokens
    const accessToken = generateAccessToken(user);
    const refreshToken = generateRefreshToken(user);

    res.json({
      message: "Login successful",
      accessToken,
      refreshToken,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};
// controllers/auth.controller.js

const logout = async (req, res) => {
  try {
    // nothing to do in backend (JWT is stateless)
    res.json({ message: "Logged out successfully" });
  } catch (err) {
    res.status(500).json({ message: "Logout failed" });
  }
};



module.exports = { register,login ,logout};