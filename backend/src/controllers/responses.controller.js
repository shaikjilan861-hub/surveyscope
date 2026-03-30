const ResponsesModel = require("../models/responses.model");

exports.submitResponse = async (req, res) => {
  try {
    const { form_id, answers } = req.body;

    if (!form_id || !answers || !answers.length) {
      return res.status(400).json({
        message: "form_id and answers are required",
      });
    }

    // 1️⃣ Create response
    const response = await ResponsesModel.create({ form_id });

    // 2️⃣ Format answers
    const formattedAnswers = answers.map((a) => ({
      response_id: response.id,
      question_id: a.question_id,
      answer: String(a.answer),
    }));

    // 3️⃣ Insert answers
    await ResponsesModel.addAnswers(formattedAnswers);

    res.status(201).json({
      message: "Response submitted successfully ✅",
      response_id: response.id,
    });
  } catch (error) {
    console.error("Submit Error:", error);
    res.status(500).json({ message: "Error submitting response" });
  }
};

exports.getAllResponses = async (req, res) => {
  try {
    const responses = await ResponsesModel.getAll();
    res.json(responses);
  } catch (error) {
    res.status(500).json({ message: "Error fetching responses" });
  }
};

exports.getResponsesByForm = async (req, res) => {
  try {
    const { formId } = req.params; // actually surveyId coming

    // ✅ 1. Get form using survey_id
    const form = await require("../config/db")("forms")
      .where({ survey_id: formId })
      .first();

    if (!form) {
      return res.status(404).json({
        success: false,
        message: "Form not found",
      });
    }

    // ✅ 2. Use actual form.id (UUID)
    const data = await require("../config/db")("responses as r")
      .leftJoin("answers as a", "r.id", "a.response_id")
      .where("r.form_id", form.id) // ✅ UUID used here
      .select(
        "r.id as response_id",
        "a.question_id",
        "a.answer_text"
      );

    // ✅ 3. Group responses
    const grouped = {};

    data.forEach((row) => {
      if (!grouped[row.response_id]) {
        grouped[row.response_id] = {
          response_id: row.response_id,
          answers: [],
        };
      }

      grouped[row.response_id].answers.push({
        question_id: row.question_id,
        answer_text: row.answer_text,
      });
    });

    return res.status(200).json({
      success: true,
      data: Object.values(grouped),
    });

  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.getResponseById = async (req, res) => {
  try {
    const { responseId } = req.params;

    const data = await require("../config/db")("answers as a")
      .leftJoin("questions as q", "a.question_id", "q.id")
      .where("a.response_id", responseId)
      .select(
        "q.question_text",
        "a.answer_text"
      );

    return res.json({
      success: true,
      data,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};