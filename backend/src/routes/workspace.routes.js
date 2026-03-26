const express = require("express");
const router = express.Router();

const workspaceController = require("../controllers/workspace.controller");
const authMiddleware = require("../middlewares/auth.middleware");

router.use(authMiddleware);

// create workspace
router.post("/", workspaceController.createWorkspace);

// get all
router.get("/", workspaceController.getWorkspaces);

// get one
router.get("/:id", workspaceController.getWorkspace);

// add member
router.post("/:id/members", workspaceController.addMember);

module.exports = router;