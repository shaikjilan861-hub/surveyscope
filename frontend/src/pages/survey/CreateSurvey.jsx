import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { createSurvey } from "../../services/survey.service";

export default function CreateSurvey() {
  const { id } = useParams(); // workspaceId
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleCreate = async () => {
    if (!title) return;

    try {
      await createSurvey(id, { title, description });

      // ✅ go back to workspace
      navigate(`/workspaces/${id}`);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.title}>Create Survey</h2>

        <input
          style={styles.input}
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <textarea
          style={styles.textarea}
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <button style={styles.button} onClick={handleCreate}>
          Create
        </button>
      </div>
    </div>
  );
}

const styles = {
  container: {
    minHeight: "80vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    background: "#f1f5f9",
  },

  card: {
    background: "#fff",
    padding: "30px",
    borderRadius: "12px",
    width: "400px",
    boxShadow: "0 10px 30px rgba(0,0,0,0.1)",
    display: "flex",
    flexDirection: "column",
    gap: "15px",
  },

  title: {
    fontSize: "22px",
    fontWeight: "700",
    textAlign: "center",
    color: "#0f172a",
  },

  input: {
    padding: "10px",
    borderRadius: "6px",
    border: "1px solid #cbd5f5",
    fontSize: "14px",
    outline: "none",
  },

  textarea: {
    padding: "10px",
    borderRadius: "6px",
    border: "1px solid #cbd5f5",
    fontSize: "14px",
    minHeight: "90px",
    resize: "none",
    outline: "none",
  },

  button: {
    marginTop: "10px",
    padding: "10px",
    background: "#2563eb",
    color: "#fff",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
    fontWeight: "600",
    boxShadow: "0 4px 12px rgba(37, 99, 235, 0.3)",
    transition: "0.2s",
  },
};