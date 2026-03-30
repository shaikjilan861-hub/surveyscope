import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getResponsesByForm } from "../../services/responses.service";

export default function ResponsesPage() {
  const { surveyId, id: workspaceId } = useParams();
  const navigate = useNavigate();

  const [responses, setResponses] = useState([]);
  const [loading, setLoading] = useState(true);

  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    if (user?.role !== "admin") return;
    fetchResponses();
  }, []);

  const fetchResponses = async () => {
    try {
      console.log("Form ID:", surveyId);
      const res = await getResponsesByForm(surveyId);
      setResponses(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (user?.role !== "admin") {
    return (
      <h3 style={styles.accessDenied}>
        🚫 Access Denied
      </h3>
    );
  }

  if (loading) return <h3 style={styles.loading}>Loading responses...</h3>;

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Responses</h2>

      {responses.length === 0 ? (
        <p style={styles.empty}>No responses yet</p>
      ) : (
        responses.map((r, index) => (
          <div
            key={r.response_id}
            onClick={() =>
              navigate(
                `/workspaces/${workspaceId}/surveys/${surveyId}/responses/${r.response_id}`
              )
            }
            style={styles.card}
            onMouseEnter={(e) =>
              (e.currentTarget.style.background = "#f9fafb")
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.background = "#fff")
            }
          >
            <h4 style={styles.responseTitle}>
              Response #{index + 1}
            </h4>

            {r.answers.slice(0, 2).map((ans) => (
              <p key={ans.question_id} style={styles.previewText}>
                <b>{ans.question_text}:</b>{" "}
                {ans.answer_text || "—"}
              </p>
            ))}

            <p style={styles.linkText}>
              👉 Click to view full response
            </p>
          </div>
        ))
      )}
    </div>
  );
}

const styles = {
  container: {
    maxWidth: "800px",
    margin: "40px auto",
    padding: "10px",
    fontFamily: "sans-serif",
  },
  title: {
    marginBottom: "20px",
    textAlign: "center",
  },
  card: {
    background: "#fff",
    padding: "15px",
    marginBottom: "15px",
    borderRadius: "12px",
    boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
    cursor: "pointer",
    transition: "0.2s",
  },
  responseTitle: {
    marginBottom: "10px",
  },
  previewText: {
    color: "#555",
    fontSize: "14px",
    marginBottom: "4px",
  },
  linkText: {
    marginTop: "10px",
    color: "#6366f1",
    fontWeight: "500",
  },
  empty: {
    textAlign: "center",
    color: "#777",
  },
  loading: {
    textAlign: "center",
    marginTop: "50px",
  },
  accessDenied: {
    textAlign: "center",
    marginTop: "50px",
    color: "red",
  },
};