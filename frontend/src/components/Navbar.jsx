import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Navbar() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const u = localStorage.getItem("user");
    if (u) setUser(JSON.parse(u));
  }, []);

  const handleLogout = async () => {
  try {
    const token = localStorage.getItem("accessToken");
 if (!token) {
    navigate("/login", { replace: true });
  }
    if (token) {
      await fetch("http://localhost:5000/api/auth/logout", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    }
  } catch (err) {
    console.error("Logout failed:", err);
  }

  // ✅ Clear ALL auth data
  localStorage.removeItem("accessToken");
  localStorage.removeItem("refreshToken");
  localStorage.removeItem("user");

  setUser(null);
  navigate("/login", { replace: true });
};

  return (
    <nav style={styles.nav}>
      {/* LEFT */}
      <div style={styles.left}>
        <span style={styles.logo}>SurveyScope</span>
      </div>

      {/* RIGHT */}
      <div style={styles.right}>
        {!user ? (
          <>
            <Link to="/" style={styles.link}>Home</Link>
            <Link to="/login" style={styles.link}>Login</Link>
            
          </>
        ) : (
          <>
            <Link to="/workspaces" style={styles.link}>
              Workspaces
            </Link>

            <span style={styles.user}>Hi, {user.name}</span>

            <button style={styles.logoutBtn} onClick={handleLogout}>
              Logout
            </button>
          </>
        )}
      </div>
    </nav>
  );
}

const styles = {
  nav: {
    height: "70px", // ✅ increased height
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "0 40px",
    background: "#cdd0f3", // ✅ removed dark blue
    borderBottom: "1px solid #e2e8f0",
    boxShadow: "0 2px 10px rgba(0,0,0,0.05)",
    position: "sticky",
    top: 0,
    zIndex: 1000,
  },
  left: {
    display: "flex",
    alignItems: "center",
  },
  logo: {
    fontSize: "20px",
    fontWeight: "700",
    color: "#2563eb",
  },
  right: {
    display: "flex",
    alignItems: "center",
    gap: "35px",
  },
  link: {
    textDecoration: "none",
   fontWeight: "600",
    color: "#0f172a",
  },
  primaryBtn: {
    padding: "8px 14px",
    background: "#2563eb",
    color: "#fff",
    borderRadius: "6px",
    textDecoration: "none",
    fontWeight: "500",
  },
  logoutBtn: {
    padding: "8px 14px",
    background: "#ef4444",
    color: "#fff",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
  },
  user: {
    fontWeight: "600",
    color: "#0f172a",
  },
};