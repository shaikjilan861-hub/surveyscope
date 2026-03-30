const db = require("../config/db");

// 🔍 Get form by survey_id
const getBySurveyId = async (surveyId) => {
  return await db("forms")
    .where({ survey_id: surveyId })
    .first();
};

// ➕ Create form
const create = async (data) => {
  const [form] = await db("forms")
    .insert(data)
    .returning("*");

  return form;
};

// 📦 Get full form (form + questions + options)
const getFullForm = async (formId) => {
  const form = await db("forms")
    .where({ id: formId })
    .first();

  if (!form) return null;

  const questions = await db("questions")
    .where({ form_id: formId })
    .orderBy("order_index", "asc");

  let options = [];
  if (questions.length > 0) {
    options = await db("options").whereIn(
      "question_id",
      questions.map((q) => q.id)
    );
  }

  const structuredQuestions = questions.map((q) => ({
    ...q,
    options: options.filter((o) => o.question_id === q.id),
  }));

  return {
    ...form,
    public_link: form.public_link || null, // ✅ IMPORTANT
    questions: structuredQuestions,
  };
};

module.exports = {
  getBySurveyId,
  create,
  getFullForm,
};