import { useNavigate } from "react-router-dom";

export default function WorkspaceHome() {
  const navigate = useNavigate();

  const styles = {
    container: {
      minHeight: "100vh",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      background: "#f1f5f9",
    },
    title: {
      fontSize: "28px",
      fontWeight: "700",
      marginBottom: "30px",
      color: "#1e293b",
    },
    buttonContainer: {
      display: "flex",
      gap: "20px",
    },
    primaryBtn: {
      padding: "12px 22px",
      background: "#2563eb",
      color: "#fff",
      border: "none",
      borderRadius: "8px",
      cursor: "pointer",
      fontWeight: "600",
      fontSize: "15px",
      boxShadow: "0 6px 15px rgba(37,99,235,0.3)",
    },
    secondaryBtn: {
      padding: "12px 22px",
      background: "#ffffff",
      color: "#2563eb",
      border: "1px solid #2563eb",
      borderRadius: "8px",
      cursor: "pointer",
      fontWeight: "600",
      fontSize: "15px",
      boxShadow: "0 4px 10px rgba(0,0,0,0.05)",
    },
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Workspace</h2>

      <div style={styles.buttonContainer}>
        <button
          style={styles.primaryBtn}
          onClick={() => navigate("/workspaces/create")}
        >
          Create Workspace
        </button>

        <button
          style={styles.secondaryBtn}
          onClick={() => navigate("/workspaces/list")}
        >
          Show Workspaces
        </button>
      </div>
    </div>
  );
}