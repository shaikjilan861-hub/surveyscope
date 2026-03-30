const knex = require("../config/db");

const ResponsesModel = {
  // create response
  create: async (data) => {
    const [response] = await knex("responses")
      .insert(data)
      .returning("*");
    return response;
  },

  // insert multiple answers
  addAnswers: async (answers) => {
    return await knex("response_answers").insert(answers);
  },

  // get all responses
  getAll: async () => {
    return await knex("responses").select("*");
  },

  // get responses by form_id
  getByFormId: async (form_id) => {
    return await knex("responses").where({ form_id });
  },

  // 🔥 get responses WITH answers (JOIN)
  getResponsesWithAnswers: async (form_id) => {
    return await knex("responses as r")
      .leftJoin("response_answers as ra", "r.id", "ra.response_id")
      .select(
        "r.id as response_id",
        "r.form_id",
        "r.submitted_at",
        "ra.question_id",
        "ra.answer"
      )
      .where("r.form_id", form_id);
  },
};

module.exports = ResponsesModel;