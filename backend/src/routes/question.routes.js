const express = require("express");
const router = express.Router();

const auth = require("../middlewares/auth.middleware");
const QuestionController = require("../controllers/question.controller");

// ➕ Create question
// POST /api/forms/:formId/questions
router.post(
  "/forms/:formId/questions",
  auth,
  QuestionController.createQuestion
);

// 📥 Get questions
// GET /api/forms/:formId/questions
router.get(
  "/forms/:formId/questions",
  auth,
  QuestionController.getQuestions
);

// ✏️ Update question
// PUT /api/questions/:id
router.put(
  "/:id",
  auth,
  QuestionController.updateQuestion
);

// ❌ Delete question
// DELETE /api/questions/:id
router.delete(
  "/:id",
  auth,
  QuestionController.deleteQuestion
);

module.exports = router;