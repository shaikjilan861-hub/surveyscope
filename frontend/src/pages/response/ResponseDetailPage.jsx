import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getResponseById } from "../../services/responses.service";

export default function ResponseDetailPage() {
  const { responseId } = useParams();

  const [data, setData] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const res = await getResponseById(responseId);
      setData(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Response Details</h2>

      {data.map((item, i) => (
        <div key={i} style={styles.card}>
          <p style={styles.question}>
            {item.question_text}
          </p>
          <p style={styles.answer}>
            {item.answer_text || "—"}
          </p>
        </div>
      ))}
    </div>
  );
}

const styles = {
  container: {
    maxWidth: "700px",
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
  },
  question: {
    fontWeight: "bold",
    marginBottom: "6px",
    color: "#333",
  },
  answer: {
    color: "#555",
    fontSize: "15px",
  },
};