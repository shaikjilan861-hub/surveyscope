const express = require("express");
const router = express.Router();
const auth = require("../middlewares/auth.middleware");
const authorizeRoles = require("../middlewares/role.middleware");
const {
  getAllResponses,
  getResponsesByForm,
  getResponseById
} = require("../controllers/responses.controller");


// get all responses
router.get("/", auth,authorizeRoles("admin"),getAllResponses);

// get responses with answers by form
router.get("/form/:formId", auth,authorizeRoles("admin"),getResponsesByForm);

router.get("/:responseId",auth,authorizeRoles("admin"), getResponseById);

module.exports = router;