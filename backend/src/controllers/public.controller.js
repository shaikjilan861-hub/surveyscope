const PublicModel = require("../models/public.model");
const ResponsesModel = require("../models/responses.model");

//
// ✅ GET PUBLIC FORM
//
const getPublicForm = async (req, res) => {
  try {
    const { slug } = req.params;

    const form = await PublicModel.getFormBySlug(slug);

    if (!form) {
      return res.status(404).json({
        success: false,
        message: "Form not found",
      });
    }

    const questions = await PublicModel.getQuestionsByFormId(form.id);

    const options = await PublicModel.getOptionsByQuestionIds(
      questions.map((q) => q.id)
    );

    const structuredQuestions = questions.map((q) => ({
      ...q,
      options: options.filter((o) => o.question_id === q.id),
    }));

    return res.status(200).json({
      success: true,
      data: {
        id: form.id,
        title: form.title,
        description: form.description,
        questions: structuredQuestions,
      },
    });
  } catch (error) {
    console.error("🔥 Public Form Error:", error);

    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

//
// ✅ SUBMIT PUBLIC FORM
//
const submitPublicForm = async (req, res) => {
  try {
    const { slug } = req.params;
    const { answers } = req.body;

    console.log("📥 Incoming:", { slug, answers });

    // ✅ 1. Get form
    const form = await PublicModel.getFormBySlug(slug);

    if (!form) {
      return res.status(404).json({
        success: false,
        message: "Form not found",
      });
    }

    // ✅ 2. Create response (parent)
    const [response] = await require("../config/db")("responses")
      .insert({
        form_id: form.id,
      })
      .returning("*");

    console.log("🧾 Response Created:", response);

    // ✅ 3. Prepare answers (child)
    const formattedAnswers = answers.map((ans) => ({
      response_id: response.id,
      question_id: ans.question_id,
      answer_text: ans.answer_text || null,
      selected_option_id: ans.option_id || null,
      selected_option_ids: null, // for checkbox (future)
    }));

    console.log("💾 Saving Answers:", formattedAnswers);

    // ✅ 4. Insert into answers table
    await require("../config/db")("answers").insert(formattedAnswers);

    return res.status(201).json({
      success: true,
      message: "Response submitted successfully",
    });

  } catch (error) {
    console.error("🔥 Submit Error:", error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
module.exports = {
  getPublicForm,
  submitPublicForm,
};