const workspaceModel = require("../models/workspace.model");

const createWorkspace = async (req, res) => {
  try {
    const userId = req.user.userId;
    console.log("USER:", req.user);
    const { name } = req.body;

    if (!name) {
      return res.status(400).json({ message: "Workspace name is required" });
    }

    const workspace = await workspaceModel.createWorkspace(userId, name);

    res.status(201).json({
      message: "Workspace created successfully",
      data: workspace,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Something went wrong" });
  }
};

const getWorkspaces = async (req, res) => {
  try {
    const userId = req.user.userId;

    const workspaces = await workspaceModel.getUserWorkspaces(userId);

    res.json({
      data: workspaces,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Something went wrong" });
  }
};

const getWorkspace = async (req, res) => {
  try {
    const userId = req.user.userId;
    
    const { id } = req.params;
    

    const workspace = await workspaceModel.getWorkspaceById(id, userId);

    if (!workspace) {
      return res.status(404).json({ message: "Workspace not found" });
    }

    res.json({ data: workspace });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Something went wrong" });
  }
};

const addMember = async (req, res) => {
  try {
    const currentUserId = req.user.userId;
    const { id: workspaceId } = req.params;
    const { user_id, role } = req.body;

    if (!user_id || !role) {
      return res.status(400).json({ message: "user_id and role required" });
    }

    // ✅ 1. Get workspace with role
    const workspace = await workspaceModel.getWorkspaceById(
      workspaceId,
      currentUserId
    );

    if (!workspace) {
      return res.status(404).json({ message: "Workspace not found" });
    }

    // ✅ 2. ONLY OWNER can add members
    if (workspace.role !== "OWNER") {
      return res.status(403).json({
        message: "Only workspace owner can add members",
      });
    }

    // ✅ 3. Add member (no extra restrictions needed now)
    await workspaceModel.addMember(workspaceId, user_id, role);

    res.json({ message: "Member added successfully" });
  } catch (error) {
    console.error(error);

    if (error.code === "23505") {
      return res.status(400).json({ message: "User already in workspace" });
    }

    res.status(500).json({ message: "Something went wrong" });
  }
};

module.exports = {
  createWorkspace,
  getWorkspaces,
  getWorkspace,
  addMember,
};