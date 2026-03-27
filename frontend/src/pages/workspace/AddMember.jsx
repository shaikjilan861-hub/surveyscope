import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getAllUsers } from "../../services/auth.service";
import { addMember } from "../../services/workspace.service";

export default function AddMember() {
  const [users, setUsers] = useState([]); // 🔥 store users
  const [userId, setUserId] = useState("");
  const [role, setRole] = useState("VIEWER");

  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    fetchUsers(); // 🔥 call
  }, []);

  const fetchUsers = async () => {
    try {


      const data = await getAllUsers();
      setUsers(data.users || data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleAdd = async () => {
    try {
      if (!userId || !role) return;

      await addMember(id, {
        user_id: userId,
        role,
      });

      navigate(`/workspaces/${id}`);
    } catch (err) {
      console.error(err);
    }
  };

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
      width: "360px",
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
    select: {
      padding: "12px",
      border: "1px solid #cbd5f5",
      borderRadius: "8px",
      outline: "none",
      fontSize: "14px",
      background: "#fff",
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

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.title}>Add Member</h2>

        {/* 🔥 USER DROPDOWN */}
        <select
          style={styles.select}
          value={userId}
          onChange={(e) => setUserId(e.target.value)}
        >
          <option value="">Select User</option>

          {users.map((u) => (
            <option key={u.id} value={u.id}>
              {u.name}
            </option>
          ))}
        </select>

        {/* 🔥 ROLE DROPDOWN */}
        <select
          style={styles.select}
          value={role}
          onChange={(e) => setRole(e.target.value)}
        >
          <option value="VIEWER">VIEWER</option>
          <option value="OWNER">OWNER</option>
        </select>

        <button style={styles.button} onClick={handleAdd}>
          Add Member
        </button>
      </div>
    </div>
  );
}