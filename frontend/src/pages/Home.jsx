import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";

export default function Home() {
  return (
    <>
      <Navbar />

      {/* HERO */}
      <div style={styles.hero}>
        <div style={styles.heroContent}>
          <h1 style={styles.title}>
            Build Surveys Smarter 🚀
          </h1>

          <p style={styles.subtitle}>
            Create, manage, and analyze surveys with powerful workspace-based collaboration.
            Designed for teams who need speed, security, and insights.
          </p>

          <div style={styles.actions}>
            <Link to="/login" style={styles.primaryBtn}>
              Get Started
            </Link>
          
          </div>
        </div>

        {/* IMAGE */}
        <img
          src="https://images.unsplash.com/photo-1551288049-bebda4e38f71"
          alt="dashboard"
          style={styles.heroImage}
        />
      </div>

      {/* FEATURES */}
      <div style={styles.features}>
        <div style={styles.card}>
          <img
            src="https://images.unsplash.com/photo-1557804506-669a67965ba0"
            alt="workspace"
            style={styles.cardImg}
          />
          <h3>Workspaces</h3>
          <p>Organize surveys and manage teams with ease.</p>
        </div>

        <div style={styles.card}>
          <img
            src="https://images.unsplash.com/photo-1556155092-8707de31f9c4"
            alt="analytics"
            style={styles.cardImg}
          />
          <h3>Analytics</h3>
          <p>Visual insights to understand your audience better.</p>
        </div>

        <div style={styles.card}>
          <img
            src="https://images.unsplash.com/photo-1510511459019-5dda7724fd87"
            alt="security"
            style={styles.cardImg}
          />
          <h3>Secure</h3>
          <p>Role-based access keeps your data safe.</p>
        </div>
      </div>

      {/* FOOTER */}
      <div style={styles.footer}>
        © 2026 SurveyScope — Built for modern teams
      </div>
    </>
  );
}

const styles = {
  hero: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "60px 10%",
    background: "linear-gradient(135deg, #cad4f0, #615ae6)",
    color: "#f5eaea",
    minHeight: "80vh",
  },
  heroContent: {
    maxWidth: "500px",
  },
  title: {
    fontSize: "42px",
    fontWeight: "700",
    marginBottom: "20px",
    lineHeight: "1.2",
  },
  subtitle: {
    fontSize: "18px",
    marginBottom: "30px",
    lineHeight: "1.6",
    color: "#37383a",
  },
  actions: {
    display: "flex",
    gap: "15px",
  },
  primaryBtn: {
    padding: "12px 20px",
    background: "#fff",
    color: "#1e3a8a",
    borderRadius: "8px",
    textDecoration: "none",
    fontWeight: "600",
  },
  secondaryBtn: {
    padding: "12px 20px",
    border: "2px solid #fff",
    color: "#fff",
    borderRadius: "8px",
    textDecoration: "none",
    fontWeight: "600",
  },
  heroImage: {
    width: "420px",
    borderRadius: "12px",
    boxShadow: "0 15px 40px rgba(0,0,0,0.3)",
  },

  features: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
    gap: "25px",
    padding: "60px 10%",
    background: "#f1f5f9",
  },
  card: {
    background: "#fff",
    padding: "20px",
    borderRadius: "12px",
    boxShadow: "0 8px 20px rgba(0,0,0,0.08)",
    textAlign: "center",
    transition: "0.3s",
  },
  cardImg: {
    width: "100%",
    height: "160px",
    objectFit: "cover",
    borderRadius: "8px",
    marginBottom: "15px",
  },

  footer: {
    textAlign: "center",
    padding: "20px",
    background: "#0f172a",
    color: "#fff",
  },
};