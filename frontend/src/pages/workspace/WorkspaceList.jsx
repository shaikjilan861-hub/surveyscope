import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getWorkspaces } from "../../services/workspace.service";

export default function WorkspaceList() {
  const [workspaces, setWorkspaces] = useState([]);
  const navigate = useNavigate();

  const fetchWorkspaces = async () => {
    try {
      const res = await getWorkspaces();

      let ws = [];

      if (Array.isArray(res)) ws = res;
      else if (Array.isArray(res.data)) ws = res.data;
      else if (Array.isArray(res.workspaces)) ws = res.workspaces;
      else if (Array.isArray(res.data?.workspaces)) ws = res.data.workspaces;

      setWorkspaces(ws);
    } catch (err) {
      console.error(err);
      setWorkspaces([]);
    }
  };

  useEffect(() => {
    fetchWorkspaces();
  }, []);

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Workspaces</h2>

      {workspaces.length === 0 ? (
        <p style={styles.empty}>No workspaces found</p>
      ) : (
        <div style={styles.grid}>
          {workspaces.map((ws) => (
            <div key={ws.id} style={styles.card}>
              <h3 style={styles.name}>{ws.name}</h3>

              {/* ✅ Show Role */}
              <p style={styles.role}>Role: {ws.role}</p>

              <div style={styles.actions}>
                <button
                  style={styles.openBtn}
                  onClick={() => navigate(`/workspaces/${ws.id}`)}
                >
                  Open
                </button>

                {/* ✅ Only OWNER can see */}
                {ws.role === "OWNER" && (
                  <button
                    style={styles.memberBtn}
                    onClick={() =>
                      navigate(`/workspaces/${ws.id}/add-member`)
                    }
                  >
                    Add Member
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

const styles = {
  container: {
    padding: "50px 60px",
    backgroundColor: "#f1f5f9",
    minHeight: "100vh",
  },
  title: {
    fontSize: "30px",
    fontWeight: "700",
    marginBottom: "30px",
    color: "#0f172a",
    letterSpacing: "0.5px",
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
    gap: "24px",
  },
  card: {
    background: "#ffffff",
    padding: "22px",
    borderRadius: "14px",
    boxShadow: "0 8px 20px rgba(0,0,0,0.06)",
    transition: "all 0.25s ease",
    cursor: "pointer",
    border: "1px solid #e2e8f0",
  },
  name: {
    fontSize: "19px",
    fontWeight: "600",
    marginBottom: "8px",
    color: "#1e293b",
  },
  role: {
    fontSize: "13px",
    color: "#64748b",
    marginBottom: "14px",
  },
  actions: {
    display: "flex",
    gap: "12px",
  },
  openBtn: {
    flex: 1,
    padding: "10px",
    border: "none",
    borderRadius: "8px",
    background: "#2563eb",
    color: "#fff",
    fontWeight: "600",
    fontSize: "14px",
    cursor: "pointer",
  },
  memberBtn: {
    flex: 1,
    padding: "10px",
    border: "none",
    borderRadius: "8px",
    background: "#22c55e",
    color: "#fff",
    fontWeight: "600",
    fontSize: "14px",
    cursor: "pointer",
  },
  empty: {
    color: "#64748b",
    fontSize: "16px",
    textAlign: "center",
    marginTop: "40px",
  },
};