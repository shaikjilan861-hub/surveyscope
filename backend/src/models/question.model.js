const db = require("../config/db");


// ➕ Create question
const create = async (data) => {
  const [question] = await db("questions")
    .insert(data)
    .returning("*");

  return question;
};

// 📥 Get questions by form
const getByFormId = async (formId) => {
  return await db("questions")
    .where({ form_id: formId })
    .orderBy("order_index", "asc");
};

// ✏️ Update question
const update = async (id, data) => {
  const [question] = await db("questions")
    .where({ id })
    .update(data)
    .returning("*");

  return question;
};

// ❌ Delete question
const remove = async (id) => {
  return await db("questions")
    .where({ id })
    .del();
};

module.exports = {
  create,
  getByFormId,
  update,
  remove,
};