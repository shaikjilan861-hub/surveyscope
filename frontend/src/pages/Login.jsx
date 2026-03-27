import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { loginUser } from "../services/auth.service";

export default function Login() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
  const token = localStorage.getItem("accessToken");

  if (token) {
    navigate("/", { replace: true });
  }
}, []);

useEffect(() => {
  window.history.pushState(null, "", window.location.href);

  const handleBack = () => {
    window.history.pushState(null, "", window.location.href);
  };

  window.addEventListener("popstate", handleBack);

  return () => {
    window.removeEventListener("popstate", handleBack);
  };
}, []);
  const handleSubmit = async () => {
    try {
      setError("");
      setLoading(true);

      const res = await loginUser(form);

      localStorage.setItem("accessToken", res.accessToken || res.token);
      localStorage.setItem("user", JSON.stringify(res.user));

    
      navigate("/", { replace: true });
    } catch (err) {
      setError(
        err.response?.data?.message || "Invalid email or password"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.wrapper}>
      <div style={styles.card}>
        <h2 style={styles.title}>Welcome Back 👋</h2>

        {error && <div style={styles.error}>{error}</div>}

        <input
          style={styles.input}
          placeholder="Email"
          value={form.email}
          onChange={(e) =>
            setForm({ ...form, email: e.target.value })
          }
        />

        <input
          style={styles.input}
          type="password"
          placeholder="Password"
          value={form.password}
          onChange={(e) =>
            setForm({ ...form, password: e.target.value })
          }
        />

        <button style={styles.button} onClick={handleSubmit}>
          {loading ? "Logging in..." : "Login"}
        </button>

        {/* 🔥 REGISTER LINK */}
        <p style={styles.footer}>
          Not registered?{" "}
          <Link to="/register" style={styles.link}>
            Create account
          </Link>
        </p>
      </div>
    </div>
  );
}

const styles = {
  wrapper: {
    minHeight: "100vh", // ✅ FIX white gap
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "#c8d3df",
  },
  card: {
    background: "#fff",
    padding: "40px",
    borderRadius: "14px",
    width: "360px",
    boxShadow: "0 12px 30px rgba(0,0,0,0.12)",
  },
  title: {
    marginBottom: "20px",
    fontSize: "22px",
    fontWeight: "600",
    textAlign: "center",
    color: "#1e293b",
  },
  input: {
    width: "100%",
    padding: "12px",
    marginBottom: "14px",
    borderRadius: "8px",
    border: "1px solid #cbd5f5",
    outline: "none",
    fontSize: "14px",
  },
  button: {
    width: "100%",
    padding: "12px",
    background: "#2563eb",
    color: "#fff",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    fontWeight: "600",
    fontSize: "15px",
  },
  error: {
    background: "#fee2e2",
    color: "#b91c1c",
    padding: "10px",
    borderRadius: "6px",
    marginBottom: "14px",
    fontSize: "14px",
    textAlign: "center",
  },
  footer: {
    marginTop: "16px",
    textAlign: "center",
    fontSize: "14px",
    color: "#475569",
  },
  link: {
    color: "#2563eb",
    fontWeight: "500",
    textDecoration: "none",
  },
};