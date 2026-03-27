import { useNavigate } from "react-router-dom";

export default function AppHeader() {
  const navigate = useNavigate();

  return (
    <div
      style={{
        height: "60px",
        display: "flex",
        alignItems: "center",
        padding: "0 30px",
        background: "#ffffff",
        borderBottom: "1px solid #e2e8f0",
        fontWeight: "700",
        fontSize: "20px",
        color: "#2563eb",
        cursor: "pointer",
      }}
      onClick={() => navigate("/")}
    >
      SurveyScope
    </div>
  );
}