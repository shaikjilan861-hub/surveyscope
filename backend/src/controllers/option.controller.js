const db = require("../config/db");
const OptionModel = require("../models/option.model");

// ➕ Create option
const createOption = async (req, res) => {
  try {
    const { questionId } = req.params;
    const { option_text, order_index } = req.body;

    // check question exists
    const question = await db("questions")
      .where({ id: questionId })
      .first();

    if (!question) {
      return res.status(404).json({
        success: false,
        message: "Question not found",
      });
    }

    const option = await OptionModel.create({
      question_id: questionId,
      option_text,
      order_index: order_index || 0,
    });

    return res.status(201).json({
      success: true,
      data: option,
    });
  } catch (error) {
    console.error("Create Option Error:", error);

    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

// 📥 Get options
const getOptions = async (req, res) => {
  try {
    const { questionId } = req.params;

    const options = await OptionModel.getByQuestionId(questionId);

    return res.status(200).json({
      success: true,
      data: options,
    });
  } catch (error) {
    console.error("Get Options Error:", error);

    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

// ❌ Delete option
const deleteOption = async (req, res) => {
  try {
    const { id } = req.params;

    await OptionModel.remove(id);

    return res.status(200).json({
      success: true,
      message: "Option deleted",
    });
  } catch (error) {
    console.error("Delete Option Error:", error);

    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

module.exports = {
  createOption,
  getOptions,
  deleteOption,
};