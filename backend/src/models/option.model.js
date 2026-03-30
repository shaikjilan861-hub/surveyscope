const db = require("../config/db");

// ➕ create option
const create = async (data) => {
  const [option] = await db("options")
    .insert(data)
    .returning("*");

  return option;
};

// 📥 get options by question
const getByQuestionId = async (questionId) => {
  return await db("options")
    .where({ question_id: questionId })
    .orderBy("order_index", "asc");
};

// ❌ delete option
const remove = async (id) => {
  return await db("options")
    .where({ id })
    .del();
};

module.exports = {
  create,
  getByQuestionId,
  remove,
};