const express = require("express");
const router = express.Router();

const {getPublicForm,submitPublicForm} = require("../controllers/public.controller");

// 🔥 Public route (NO AUTH)

// GET form by slug
// GET /api/public/forms/:slug
router.get(
  "/forms/:slug",getPublicForm
);

// POST submit form response
// POST /api/public/forms/:slug
router.post(
  "/forms/:slug",submitPublicForm
);

module.exports = router;