const db = require("../config/db");

// 🔍 Get published form by slug
const getFormBySlug = async (slug) => {
  return await db("forms")
    .where({ public_slug: slug, status: "published" })
    .first();
};

// 📥 Get questions by form
const getQuestionsByFormId = async (formId) => {
  return await db("questions")
    .where({ form_id: formId })
    .orderBy("order_index", "asc");
};

// 📥 Get options for questions
const getOptionsByQuestionIds = async (questionIds) => {
  if (!questionIds.length) return [];

  return await db("options").whereIn("question_id", questionIds);
};

module.exports = {
  getFormBySlug,
  getQuestionsByFormId,
  getOptionsByQuestionIds,
};