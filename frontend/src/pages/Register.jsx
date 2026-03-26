import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../services/auth.service";

export default function Register() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const styles = {
    container: {
      minHeight: "100vh",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      background: "#c8d3df",
    },
    form: {
      display: "flex",
      flexDirection: "column",
      gap: "14px",
      width: "340px",
      padding: "30px",
      background: "#ffffff",
      borderRadius: "12px",
      boxShadow: "0 10px 25px rgba(0,0,0,0.08)",
    },
    title: {
      textAlign: "center",
      marginBottom: "10px",
      color: "#1e293b",
    },
    input: {
      padding: "12px",
      border: "1px solid #cbd5f5",
      borderRadius: "8px",
      outline: "none",
      fontSize: "14px",
      transition: "0.2s",
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

  const handleSubmit = async (e) => {
    e.preventDefault();

    await registerUser(form);

    navigate("/login");
  };

  return (
    <div style={styles.container}>
      <form onSubmit={handleSubmit} style={styles.form}>
        <h2 style={styles.title}>Create Account</h2>

        <input
          style={styles.input}
          placeholder="Name"
          onChange={(e) =>
            setForm({ ...form, name: e.target.value })
          }
        />

        <input
          style={styles.input}
          placeholder="Email"
          onChange={(e) =>
            setForm({ ...form, email: e.target.value })
          }
        />

        <input
          style={styles.input}
          type="password"
          placeholder="Password"
          onChange={(e) =>
            setForm({ ...form, password: e.target.value })
          }
        />

        <button style={styles.button}>Register</button>
      </form>
    </div>
  );
}