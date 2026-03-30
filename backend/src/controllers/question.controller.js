const db = require("../config/db");
const QuestionModel = require("../models/question.model");

// ➕ Create Question
const createQuestion = async (req, res) => {
  try {
    const { formId } = req.params;
    const { question_text, type, required, order_index } = req.body;

    // validate form
    const form = await db("forms")
      .where({ id: formId })
      .first();

    if (!form) {
      return res.status(404).json({
        success: false,
        message: "Form not found",
      });
    }

    const question = await QuestionModel.create({
      form_id: formId,
      question_text,
      type,
      required: required || false,
      order_index: order_index || 0,
    });

    return res.status(201).json({
      success: true,
      data: question,
    });
  } catch (error) {
    console.error("Create Question Error:", error);

    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

// 📥 Get Questions
const getQuestions = async (req, res) => {
  try {
    const { formId } = req.params;

    const questions = await QuestionModel.getByFormId(formId);

    return res.status(200).json({
      success: true,
      data: questions,
    });
  } catch (error) {
    console.error("Get Questions Error:", error);

    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

// ✏️ Update Question
const updateQuestion = async (req, res) => {
  try {
    const { id } = req.params;

    const updated = await QuestionModel.update(id, req.body);

    return res.status(200).json({
      success: true,
      data: updated,
    });
  } catch (error) {
    console.error("Update Question Error:", error);

    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

// ❌ Delete Question
const deleteQuestion = async (req, res) => {
  try {
    const { id } = req.params;

    await QuestionModel.remove(id);

    return res.status(200).json({
      success: true,
      message: "Question deleted",
    });
  } catch (error) {
    console.error("Delete Question Error:", error);

    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

module.exports = {
  createQuestion,
  getQuestions,
  updateQuestion,
  deleteQuestion,
};