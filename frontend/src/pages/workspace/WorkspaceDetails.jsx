import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import deleteIconImg from "../../assets/delete.png";
import {
  deleteSurvey,
  getSurveys,
} from "../../services/survey.service";

export default function WorkspacePage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [surveys, setSurveys] = useState([]);
  const [deleteId, setDeleteId] = useState(null);

  const user = JSON.parse(localStorage.getItem("user"));
  const role = user?.role;

  useEffect(() => {
    fetchSurveys();
  }, [id]);

  const fetchSurveys = async () => {
    try {
      const data = await getSurveys(id);
      setSurveys(data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (surveyId) => {
    try {
      await deleteSurvey(surveyId);
      fetchSurveys();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div style={styles.container}>
      {/* Header */}
      <div style={styles.header}>
        <h2 style={styles.title}>Workspace Surveys</h2>

        {role?.toLowerCase() === "admin" && (
          <button
            style={styles.createBtn}
            onClick={() => navigate(`/workspaces/${id}/create-survey`)}
          >
            + Create Survey
          </button>
        )}
      </div>

      {/* Empty */}
      {surveys.length === 0 && (
        <div style={styles.empty}>No surveys available</div>
      )}

      {/* Grid */}
      <div style={styles.grid}>
        {surveys.map((s) => (
          <div key={s.id} style={styles.card}>
            {/* Top */}
            <div style={styles.cardHeader}>
              <h3 style={styles.cardTitle}>{s.title}</h3>

              {/* ✅ Delete only ADMIN */}
              {role?.toLowerCase() === "admin" && (
                <img
                  src={deleteIconImg}
                  alt="delete"
                  style={styles.deleteIcon}
                  onMouseEnter={(e) => {
                    e.target.style.transform = "scale(1.2)";
                    e.target.style.opacity = "0.7";
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.transform = "scale(1)";
                    e.target.style.opacity = "1";
                  }}
                  onClick={() => setDeleteId(s.id)}
                  title="Delete"
                />
              )}
            </div>

            {/* Description */}
            <p style={styles.description}>
              {s.description || "No description provided"}
            </p>

            {/* Actions */}
            <div style={styles.actions}>
              <button
                style={styles.openBtn}
                onClick={() =>
                  navigate(`/workspaces/${id}/surveys/${s.id}`)
                }
              >
                Open
              </button>

              {/* ✅ Edit only ADMIN */}
              {role?.toLowerCase() === "admin" && (
                <button
                  style={styles.editBtn}
                  onClick={() =>
                    navigate(`/workspaces/${id}/surveys/${s.id}/edit`)
                  }
                >
                  Edit
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      {deleteId && (
        <div style={styles.modalOverlay}>
          <div style={styles.modal}>
            <h3>Delete Survey?</h3>
            <p>This action cannot be undone.</p>

            <div style={styles.modalActions}>
              <button
                style={styles.cancelBtn}
                onClick={() => setDeleteId(null)}
              >
                Cancel
              </button>

              <button
                style={styles.confirmDeleteBtn}
                onClick={async () => {
                  await handleDelete(deleteId);
                  setDeleteId(null);
                }}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

const styles = {
  container: {
    padding: "40px",
    maxWidth: "1200px",
    margin: "0 auto",
  },

  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "30px",
  },

  title: {
    fontSize: "26px",
    fontWeight: "700",
    color: "#0f172a",
  },

  createBtn: {
    background: "#2563eb",
    color: "#fff",
    padding: "10px 18px",
    borderRadius: "8px",
    border: "none",
    cursor: "pointer",
    fontWeight: "600",
    boxShadow: "0 4px 12px rgba(37, 99, 235, 0.3)",
    transition: "0.2s",
  },

  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
    gap: "20px",
  },

  card: {
    background: "#f8f3ec",
    borderRadius: "12px",
    padding: "20px",
    boxShadow: "0 8px 20px rgba(0,0,0,0.08)",
    transition: "0.3s",
  },

  cardHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "10px",
  },

  cardTitle: {
    fontSize: "18px",
    fontWeight: "600",
    color: "#0f172a",
  },

  deleteIcon: {
    width: "20px",
    height: "20px",
    cursor: "pointer",
    transition: "0.2s",
  },

  description: {
    fontSize: "14px",
    color: "#475569",
    marginBottom: "15px",
    minHeight: "40px",
  },

  actions: {
    display: "flex",
    gap: "10px",
  },

  openBtn: {
    flex: 1,
    padding: "8px",
    background: "#22c55e",
    color: "#fff",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
    transition: "0.2s",
  },

  editBtn: {
    flex: 1,
    padding: "8px",
    background: "#f59e0b",
    color: "#fff",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
    transition: "0.2s",
  },

  empty: {
    textAlign: "center",
    marginTop: "50px",
    color: "#64748b",
    fontSize: "16px",
  },

  modalOverlay: {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    background: "rgba(0,0,0,0.4)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 2000,
  },

  modal: {
    background: "#fff",
    padding: "25px",
    borderRadius: "10px",
    width: "300px",
    textAlign: "center",
    boxShadow: "0 10px 30px rgba(0,0,0,0.2)",
  },

  modalActions: {
    display: "flex",
    justifyContent: "space-between",
    marginTop: "20px",
  },

  cancelBtn: {
    padding: "8px 15px",
    background: "#e2e8f0",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
  },

  confirmDeleteBtn: {
    padding: "8px 15px",
    background: "#ef4444",
    color: "#fff",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
  },
};