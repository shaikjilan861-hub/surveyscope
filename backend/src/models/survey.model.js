const db = require("../config/db");

// ✅ Create Survey
const createSurvey = async (trx, { workspace_id, title, description, created_by }) => {
  const [survey] = await trx("surveys")
    .insert({
      workspace_id,
      title,
      description,
      created_by,
    })
    .returning("*");

  return survey;
};

// ✅ Get all surveys in workspace
const getSurveysByWorkspace = async (workspaceId) => {
  return db("surveys")
    .select("*")
    .where({
      workspace_id: workspaceId,
      is_deleted: false,
    })
    .orderBy("created_at", "desc");
};

// ✅ Get single survey
const getSurveyById = async (surveyId) => {
  return db("surveys")
    .where({
      id: surveyId,
      is_deleted: false,
    })
    .first();
};

// ✅ Update survey
const updateSurvey = async (surveyId, { title, description }) => {
  const [updated] = await db("surveys")
    .where({
      id: surveyId,
      is_deleted: false,
    })
    .update({
      title,
      description,
      updated_at: db.fn.now(),
    })
    .returning("*");

  return updated;
};

// ✅ Soft delete survey
const deleteSurvey = async (surveyId) => {
  return db("surveys")
    .where({ id: surveyId })
    .update({
      is_deleted: true,
      updated_at: db.fn.now(),
    });
};

module.exports = {
  createSurvey,
  getSurveysByWorkspace,
  getSurveyById,
  updateSurvey,
  deleteSurvey,
};