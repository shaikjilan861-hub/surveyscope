const db = require("../config/db");
const surveyModel = require("../models/survey.model");
const workspaceModel = require("../models/workspace.model");

// 🔧 Helper → validate numeric ID
const isValidId = (id) => !isNaN(id);

// ✅ Create Survey
const createSurvey = async (req, res) => {
  const trx = await db.transaction();

  try {
    const userId = req.user.userId;
    const { workspaceId } = req.params;
    const { title, description } = req.body;

    if (!title) {
      await trx.rollback();
      return res.status(400).json({ message: "Title required" });
    }

    const workspace = await workspaceModel.getWorkspaceById(
      workspaceId,
      userId
    );

    if (!workspace) {
      await trx.rollback();
      return res.status(403).json({ message: "Access denied" });
    }

    const survey = await surveyModel.createSurvey(trx, {
      workspace_id: workspaceId,
      title,
      description,
      created_by: userId,
    });

    await trx.commit();

    res.status(201).json(survey);
  } catch (err) {
    await trx.rollback();
    console.error(err);
    res.status(500).json({ message: "Error creating survey" });
  }
};

// ✅ Get all surveys
const getSurveys = async (req, res) => {
  try {
    const userId = req.user.userId;
    const { workspaceId } = req.params;

    const workspace = await workspaceModel.getWorkspaceById(
      workspaceId,
      userId
    );

    if (!workspace) {
      return res.status(403).json({ message: "Access denied" });
    }

    const surveys = await surveyModel.getSurveysByWorkspace(workspaceId);

    res.json(surveys);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error fetching surveys" });
  }
};

// ✅ Get single survey
const getSurvey = async (req, res) => {
  try {
    const userId = req.user.userId;
    const { surveyId } = req.params;

    // 🔥 FIX: validate ID
    if (!isValidId(surveyId)) {
      return res.status(400).json({
        message: "Invalid survey ID (must be number)",
      });
    }

    const survey = await surveyModel.getSurveyById(Number(surveyId));

    if (!survey) {
      return res.status(404).json({ message: "Survey not found" });
    }

    const workspace = await workspaceModel.getWorkspaceById(
      survey.workspace_id,
      userId
    );

    if (!workspace) {
      return res.status(403).json({ message: "Access denied" });
    }

    res.json(survey);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error fetching survey" });
  }
};

// ✅ Update survey
const updateSurvey = async (req, res) => {
  try {
    const userId = req.user.userId;
    const { surveyId } = req.params;
    const { title, description } = req.body;

    // 🔥 FIX: validate ID
    if (!isValidId(surveyId)) {
      return res.status(400).json({
        message: "Invalid survey ID (must be number)",
      });
    }

    const survey = await surveyModel.getSurveyById(Number(surveyId));

    if (!survey) {
      return res.status(404).json({ message: "Survey not found" });
    }

    const workspace = await workspaceModel.getWorkspaceById(
      survey.workspace_id,
      userId
    );

    if (!workspace) {
      return res.status(403).json({ message: "Access denied" });
    }

    const updated = await surveyModel.updateSurvey(Number(surveyId), {
      title,
      description,
    });

    res.json(updated);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error updating survey" });
  }
};

// ✅ Delete survey (OWNER only)
const deleteSurvey = async (req, res) => {
  const trx = await db.transaction();

  try {
    const userId = req.user.userId;
    const { surveyId } = req.params;

    // 🔥 FIX: validate ID
    if (!isValidId(surveyId)) {
      await trx.rollback();
      return res.status(400).json({
        message: "Invalid survey ID (must be number)",
      });
    }

    const survey = await surveyModel.getSurveyById(Number(surveyId));

    if (!survey) {
      await trx.rollback();
      return res.status(404).json({ message: "Survey not found" });
    }

    const workspace = await workspaceModel.getWorkspaceById(
      survey.workspace_id,
      userId
    );

    if (!workspace || workspace.role !== "OWNER") {
      await trx.rollback();
      return res.status(403).json({
        message: "Only owner can delete survey",
      });
    }

    await surveyModel.deleteSurvey(Number(surveyId));

    await trx.commit();

    res.json({ message: "Survey deleted" });
  } catch (err) {
    await trx.rollback();
    console.error(err);
    res.status(500).json({ message: "Error deleting survey" });
  }
};

module.exports = {
  createSurvey,
  getSurveys,
  getSurvey,
  updateSurvey,
  deleteSurvey,
};