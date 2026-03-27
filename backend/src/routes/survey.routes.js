const express = require("express");
const router = express.Router();
const surveyController = require("../controllers/survey.controller");
const auth = require("../middlewares/auth.middleware");
const authorizeRoles = require("../middlewares/role.middleware");

// workspace based
router.post("/:workspaceId", auth,authorizeRoles("admin"), surveyController.createSurvey);
router.get("/:workspaceId", auth, surveyController.getSurveys);

// survey based
router.get("/single/:surveyId", auth, surveyController.getSurvey);
router.put("/:surveyId", auth,authorizeRoles("admin"), surveyController.updateSurvey);
router.delete("/:surveyId", auth, authorizeRoles("admin"),surveyController.deleteSurvey);

module.exports = router;