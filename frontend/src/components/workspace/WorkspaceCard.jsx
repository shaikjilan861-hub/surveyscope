import { addMember } from "../../services/workspace.service";

export default function WorkspaceCard({ ws }) {
  const styles = {
    card: {
      border: "1px solid #ddd",
      padding: "15px",
      marginTop: "10px",
      borderRadius: "8px",
    },
    title: {
      fontSize: "18px",
      fontWeight: "600",
    },
    role: {
      color: "#555",
    },
    button: {
      marginTop: "10px",
      padding: "6px 10px",
      background: "#1890ff",
      color: "#fff",
      border: "none",
      cursor: "pointer",
      borderRadius: "4px",
    },
  };

  const handleAddMember = async () => {
    const user_id = prompt("Enter User ID");
    if (!user_id) return;

    await addMember(ws.id, {
      user_id,
      role: "VIEWER",
    });

    alert("Member added");
  };

  return (
    <div style={styles.card}>
      <div style={styles.title}>{ws.name}</div>
      <div style={styles.role}>Role: {ws.role}</div>

      {/* Temporary button for testing */}
      <button style={styles.button} onClick={handleAddMember}>
        Add Member
      </button>
    </div>
  );
}