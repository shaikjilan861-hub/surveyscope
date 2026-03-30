import { useNavigate, useParams } from "react-router-dom";

export default function SurveyPage() {
  const navigate = useNavigate();
  const { id, surveyId } = useParams();

  const user = JSON.parse(localStorage.getItem("user"));
  const role = user?.role;

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Survey Dashboard</h2>

      <div style={styles.buttonGroup}>

        {/* ✅ Only Admin sees Form */}
        {role === "admin" && (
          <button
            style={styles.button}
            onClick={() =>
              navigate(`/workspaces/${id}/surveys/${surveyId}/form`)
            }
          >
            Form
          </button>
        )}

        {/* ✅ Only Admin sees Responses */}
        {role === "admin" && (
          <button
            style={styles.button}
            onClick={() =>
              navigate(`/workspaces/${id}/surveys/${surveyId}/responses`)
            }
          >
            Responses
          </button>
        )}

        {/* Common button */}
        <button
          style={styles.buttonSecondary}
          onClick={() =>
            navigate(`/workspaces/${id}/surveys/${surveyId}/analytics`)
          }
        >
          Analytics
        </button>
      </div>
    </div>
  );
}

const styles = {
  container: {
    maxWidth: "600px",
    margin: "50px auto",
    padding: "20px",
    textAlign: "center",
    fontFamily: "sans-serif",
  },
  title: {
    marginBottom: "25px",
  },
  buttonGroup: {
    display: "flex",
    justifyContent: "center",
    gap: "12px",
    flexWrap: "wrap",
  },
  button: {
    padding: "10px 18px",
    borderRadius: "8px",
    border: "none",
    background: "#6366f1",
    color: "#fff",
    cursor: "pointer",
    fontSize: "14px",
    transition: "0.2s",
  },
  buttonSecondary: {
    padding: "10px 18px",
    borderRadius: "8px",
    border: "1px solid #6366f1",
     background: "#6366f1",
    color: "#fff",
    cursor: "pointer",
    fontSize: "14px",
    transition: "0.2s",
  },
};