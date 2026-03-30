const express = require("express");
const router = express.Router();

const auth = require("../middlewares/auth.middleware");
const OptionController = require("../controllers/option.controller");

// ➕ Create option
// POST /api/questions/:questionId/options
router.post(
  "/questions/:questionId/options",
  auth,
  OptionController.createOption
);

// 📥 Get options
// GET /api/questions/:questionId/options
router.get(
  "/questions/:questionId/options",
  auth,
  OptionController.getOptions
);

// ❌ Delete option
// DELETE /api/options/:id
router.delete(
  "/options/:id",
  auth,
  OptionController.deleteOption
);

module.exports = router;