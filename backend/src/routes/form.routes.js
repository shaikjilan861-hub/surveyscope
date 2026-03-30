const express = require("express");
const router = express.Router();

const auth = require("../middlewares/auth.middleware");
const FormController = require("../controllers/form.controller");
const authorizeRoles = require("../middlewares/role.middleware");
// 🔹 GET form (auto-create if not exists)
// GET /api/surveys/:surveyId/form
router.get(
  "/surveys/:surveyId/form",
  auth,authorizeRoles("admin"),
  FormController.getForm
);

// 🔹 CREATE form (manual)
// POST /api/surveys/:surveyId/form
// router.post(
//   "/surveys/:surveyId/form",
//   auth,
//   FormController.createForm
// );

// 🔥 PUBLISH form (generate public link)
// PUT /api/forms/:formId/publish
router.put(
  "/:formId/publish",
  auth,
  FormController.publishForm
);

module.exports = router;