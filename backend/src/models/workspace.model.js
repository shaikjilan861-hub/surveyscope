const db = require("../config/db");

// ✅ Create Workspace
const createWorkspace = async (userId, name) => {
  const trx = await db.transaction();

  try {
    // 1. Create workspace
    const [workspace] = await trx("workspaces")
      .insert({
        name,
        owner_id: userId,
      })
      .returning("*");

    // 2. Add creator as OWNER
    await trx("workspace_members").insert({
      user_id: userId,
      workspace_id: workspace.id,
      role: "OWNER",
    });

    await trx.commit();

    return workspace;
  } catch (error) {
    await trx.rollback();
    throw error;
  }
};

// ✅ Get all workspaces of a user
const getUserWorkspaces = async (userId) => {
  return db("workspace_members as wm")
    .join("workspaces as w", "wm.workspace_id", "w.id")
    .select(
      "w.id",
      "w.name",
      "w.owner_id",
      "w.created_at",
      "wm.role"
    )
    .where("wm.user_id", userId);
};

// ✅ Get single workspace (with role)
const getWorkspaceById = async (workspaceId, userId) => {
  return db("workspace_members as wm")
    .join("workspaces as w", "wm.workspace_id", "w.id")
    .select("w.*", "wm.role")
    .where({
      "wm.workspace_id": workspaceId,
      "wm.user_id": userId,
    })
    .first();
};

// ✅ Add member
const addMember = async (workspaceId, userId, role) => {
  return db("workspace_members").insert({
    workspace_id: workspaceId,
    user_id: userId,
    role,
  });
};

module.exports = {
  createWorkspace,
  getUserWorkspaces,
  getWorkspaceById,
  addMember,
};