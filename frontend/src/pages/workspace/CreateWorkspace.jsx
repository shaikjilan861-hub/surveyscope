import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createWorkspace } from "../../services/workspace.service";

export default function CreateWorkspace() {
  const [name, setName] = useState("");
  const navigate = useNavigate();

  const styles = {
    container: {
      minHeight: "100vh",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      background: "#f1f5f9",
    },
    card: {
      background: "#ffffff",
      padding: "30px",
      borderRadius: "12px",
      width: "350px",
      boxShadow: "0 10px 25px rgba(0,0,0,0.08)",
      display: "flex",
      flexDirection: "column",
      gap: "15px",
    },
    title: {
      fontSize: "22px",
      fontWeight: "600",
      textAlign: "center",
      color: "#1e293b",
      marginBottom: "10px",
    },
    input: {
      padding: "12px",
      border: "1px solid #cbd5f5",
      borderRadius: "8px",
      outline: "none",
      fontSize: "14px",
    },
    button: {
      padding: "12px",
      background: "#2563eb",
      color: "#fff",
      border: "none",
      borderRadius: "8px",
      cursor: "pointer",
      fontWeight: "600",
      fontSize: "15px",
    },
  };

  const handleCreate = async () => {
    if (!name) return;

    await createWorkspace({ name });

    navigate("/workspaces/list");
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.title}>Create Workspace</h2>

        <input
          style={styles.input}
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Workspace name"
        />

        <button style={styles.button} onClick={handleCreate}>
          Create
        </button>
      </div>
    </div>
  );
}