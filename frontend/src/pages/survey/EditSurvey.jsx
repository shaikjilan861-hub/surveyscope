import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  getSurvey,
  updateSurvey,
} from "../../services/survey.service";

export default function EditSurvey() {
  const { surveyId, id } = useParams();
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    fetchSurvey();
  }, []);

  const fetchSurvey = async () => {
    const data = await getSurvey(surveyId);
    setTitle(data.title);
    setDescription(data.description);
  };

  const handleUpdate = async () => {
    await updateSurvey(surveyId, { title, description });
    navigate(`/workspaces/${id}`);
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.title}>Edit Survey</h2>

        <input
          style={styles.input}
          value={title}
          placeholder="Enter survey title"
          onChange={(e) => setTitle(e.target.value)}
        />

        <textarea
          style={styles.textarea}
          value={description}
          placeholder="Enter description"
          onChange={(e) => setDescription(e.target.value)}
        />

        <button style={styles.button} onClick={handleUpdate}>
          Update Survey
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
    color: "#0f172a",
    textAlign: "center",
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
    minHeight: "80px",
    resize: "none",
    outline: "none",
  },

  button: {
    marginTop: "10px",
    padding: "10px",
    background: "#22c55e",
    color: "#fff",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
    fontWeight: "600",
    boxShadow: "0 4px 12px rgba(34, 197, 94, 0.3)",
  },
};