const db = require("../config/db");
const FormModel = require("../models/form.model");
const { v4: uuidv4 } = require("uuid");

// 🔹 CREATE FORM
// const createForm = async (req, res) => {
//   try {
//     const { surveyId } = req.params;
//     const { title, description } = req.body;

//     if (!surveyId || isNaN(Number(surveyId))) {
//       return res.status(400).json({
//         success: false,
//         message: "Invalid survey ID",
//       });
//     }

//     const surveyIdNum = Number(surveyId);

//     const survey = await db("surveys")
//       .where({ id: surveyIdNum, is_deleted: false })
//       .first();

//     if (!survey) {
//       return res.status(404).json({
//         success: false,
//         message: "Survey not found",
//       });
//     }

//     let existingForm = await FormModel.getBySurveyId(surveyIdNum);

//     if (existingForm) {
//       return res.status(400).json({
//         success: false,
//         message: "Form already exists for this survey",
//         data: existingForm,
//       });
//     }

//     let form;
//     try {
//       form = await FormModel.create({
//         survey_id: surveyIdNum,
//         title: title || survey.title,
//         description: description || survey.description,
//         status: "draft", // ✅ default
//       });
//     } catch (err) {
//       if (err.code === "23505") {
//         form = await FormModel.getBySurveyId(surveyIdNum);
//       } else {
//         throw err;
//       }
//     }

//     return res.status(201).json({
//       success: true,
//       data: form,
//     });
//   } catch (error) {
//     console.error("Create Form Error:", error);

//     return res.status(500).json({
//       success: false,
//       message: "Internal server error",
//     });
//   }
// };

// 🔹 GET FORM (auto-create)
const getForm = async (req, res) => {
  try {
    const { surveyId } = req.params;

    if (!surveyId || isNaN(Number(surveyId))) {
      return res.status(400).json({
        success: false,
        message: "Invalid survey ID",
      });
    }

    const surveyIdNum = Number(surveyId);

    const survey = await db("surveys")
      .where({ id: surveyIdNum, is_deleted: false })
      .first();

    if (!survey) {
      return res.status(404).json({
        success: false,
        message: "Survey not found",
      });
    }

    let form = await FormModel.getBySurveyId(surveyIdNum);

    if (!form) {
      try {
        form = await FormModel.create({
          survey_id: surveyIdNum,
          title: survey.title,
          description: survey.description,
          status: "draft",
        });
      } catch (err) {
        if (err.code === "23505") {
          form = await FormModel.getBySurveyId(surveyIdNum);
        } else {
          throw err;
        }
      }
    }

    const fullForm = await FormModel.getFullForm(form.id);

    return res.status(200).json({
      success: true,
      data: fullForm,
    });
  } catch (error) {
    console.error("Form Error:", error);

    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

// 🔹 PUBLISH FORM (🔥 NEW)
const publishForm = async (req, res) => {
  try {
    const { formId } = req.params;

    if (!formId) {
      return res.status(400).json({
        success: false,
        message: "Form ID required",
      });
    }

    // 1. check form
    const form = await db("forms")
      .where({ id: formId })
      .first();

    if (!form) {
      return res.status(404).json({
        success: false,
        message: "Form not found",
      });
    }

    // 2. generate slug (if not exists)
    let slug = form.public_slug;
    if (!slug) {
      slug = uuidv4();
    }

    // ✅ 3. CREATE LINK
    const link = `http://localhost:5173/form/${slug}`;

    // ✅ 4. SAVE LINK + STATUS
    await db("forms")
      .where({ id: formId })
      .update({
        status: "published",
        public_slug: slug,
        public_link: link, // 🔥 THIS IS THE FIX
        updated_at: db.fn.now(),
      });

    return res.status(200).json({
      success: true,
      message: "Form published successfully",
      link,
    });
  } catch (error) {
    console.error("Publish Form Error:", error);

    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

module.exports = {
  getForm,
  publishForm, // ✅ added
};