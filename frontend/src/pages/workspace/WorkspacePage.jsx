import { useEffect, useState } from "react";
import WorkspaceCard from "../../components/workspace/WorkspaceCard";
import {
  createWorkspace,
  getWorkspaces,
} from "../../services/workspace.service";

export default function WorkspacePage() {
  const [workspaces, setWorkspaces] = useState([]);
  const [name, setName] = useState("");

  const styles = {
    container: {
      padding: "30px",
    },
    title: {
      fontSize: "24px",
      fontWeight: "bold",
      marginBottom: "20px",
    },
    input: {
      padding: "10px",
      marginRight: "10px",
    },
    button: {
      padding: "10px",
      background: "green",
      color: "#fff",
      border: "none",
      cursor: "pointer",
    },
  };

  // ✅ fetch workspaces (FIXED)
  const fetchWorkspaces = async () => {
    try {
      const res = await getWorkspaces();

      console.log("API RESPONSE:", res);

      // 🔥 HANDLE ALL POSSIBLE RESPONSE STRUCTURES
      let ws = [];

      if (Array.isArray(res)) {
        ws = res;
      } else if (Array.isArray(res.data)) {
        ws = res.data;
      } else if (Array.isArray(res.workspaces)) {
        ws = res.workspaces;
      } else if (Array.isArray(res.data?.workspaces)) {
        ws = res.data.workspaces;
      }

      setWorkspaces(ws);
    } catch (err) {
      console.error(err);
      setWorkspaces([]); // prevent crash
    }
  };

  useEffect(() => {
    fetchWorkspaces();
  }, []);

  // ✅ create workspace
  const handleCreate = async () => {
    try {
      if (!name) return;

      await createWorkspace({ name });

      setName("");
      fetchWorkspaces();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Workspaces</h2>

      <input
        style={styles.input}
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Workspace name"
      />

      <button style={styles.button} onClick={handleCreate}>
        Create
      </button>

      {/* ✅ SAFE RENDER */}
      {Array.isArray(workspaces) && workspaces.length > 0 ? (
        workspaces.map((ws) => (
          <WorkspaceCard key={ws.id} ws={ws} />
        ))
      ) : (
        <p>No workspaces found</p>
      )}
    </div>
  );
}