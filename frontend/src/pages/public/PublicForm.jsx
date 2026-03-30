import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getPublicForm, submitPublicForm } from "../../services/public.service";

export default function PublicForm() {
  const { slug } = useParams();

  const [form, setForm] = useState(null);
  const [loading, setLoading] = useState(true);
  const [answers, setAnswers] = useState({});

  useEffect(() => {
    fetchForm();
  }, [slug]);

  const fetchForm = async () => {
    try {
      const res = await getPublicForm(slug);
      setForm(res.data);
    } catch (err) {
      console.error(err);
      setForm(null);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (qId, value) => {
    setAnswers((prev) => ({
      ...prev,
      [qId]: value,
    }));
  };

  const handleCheckbox = (qId, value, checked) => {
    const prev = answers[qId] || [];
    if (checked) {
      handleChange(qId, [...prev, value]);
    } else {
      handleChange(
        qId,
        prev.filter((v) => v !== value)
      );
    }
  };

  // ✅ FIXED SUBMIT FUNCTION
  const handleSubmit = async () => {
   
    for (let q of form.questions) {
      const value = answers[q.id];

      if (q.required) {
        if (
          value === undefined ||
          value === "" ||
          (Array.isArray(value) && value.length === 0)
        ) {
          alert(`❌ ${q.question_text} is required`);
          return;
        }
      }

      if (q.type === "email" && value) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
        if (!emailRegex.test(value)) {
          alert(`❌ Invalid email`);
          return;
        }
      }

      if (q.type === "phone" && value) {
        const phoneRegex = /^[6-9]\d{9}$/;
        if (!phoneRegex.test(value)) {
          alert(`❌ Invalid mobile number`);
          return;
        }
      }
    }

    try {
      // 🔥 Convert answers → array
      const formattedAnswers = Object.keys(answers).map((qId) => ({
        question_id: qId,
        answer_text: Array.isArray(answers[qId])
          ? answers[qId].join(",")
          : answers[qId],
        option_id: null,
      }));

      const payload = {
        answers: formattedAnswers,
      };

      console.log("🚀 Sending payload:", payload);

      // ✅ API CALL
     await submitPublicForm(slug, payload);

      alert("✅ Form submitted successfully!");

      // optional reset
      setAnswers({});
    } catch (err) {
      console.error(err);
      alert("❌ Failed to submit form");
    }
  };

  if (loading) return <h3 style={{ textAlign: "center" }}>Loading...</h3>;
  if (!form) return <h3 style={{ textAlign: "center" }}>Form not found</h3>;

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.title}>{form.title}</h2>
        <p style={styles.desc}>{form.description}</p>
      </div>

      {form.questions.map((q) => (
        <div key={q.id} style={styles.card}>
          <p style={styles.question}>
            {q.question_text}
            {q.required && <span style={{ color: "red" }}> *</span>}
          </p>

          {q.type === "short_text" && (
            <input
              style={styles.input}
              type="text"
              value={answers[q.id] || ""}
              onChange={(e) => handleChange(q.id, e.target.value)}
            />
          )}

          {q.type === "long_text" && (
            <textarea
              style={styles.input}
               value={answers[q.id] || ""}
              onChange={(e) => handleChange(q.id, e.target.value)}
            />
          )}

          {q.type === "date" && (
            <input
              style={styles.input}
              type="date"
               value={answers[q.id] || ""}
              onChange={(e) => handleChange(q.id, e.target.value)}
            />
          )}

          {q.type === "time" && (
            <input
              style={styles.input}
              type="time"
               value={answers[q.id] || ""}
              onChange={(e) => handleChange(q.id, e.target.value)}
            />
          )}

          {q.type === "email" && (
            <input
              style={styles.input}
              type="email"
              placeholder="Enter email"
               value={answers[q.id] || ""}
              onChange={(e) => handleChange(q.id, e.target.value)}
            />
          )}

          {q.type === "phone" && (
            <input
              style={styles.input}
              type="tel"
              placeholder="Enter mobile number"
              maxLength={10}
               value={answers[q.id] || ""}
              onChange={(e) => handleChange(q.id, e.target.value)}
            />
          )}

          {q.type === "radio" &&
            q.options.map((o) => (
              <label key={o.id} style={styles.option}>
                <input
                  type="radio"
                  name={q.id}
                 checked={answers[q.id] === o.option_text}
                  
                  onChange={(e) =>
                    handleChange(q.id, e.target.value)
                  }
                />
                {o.option_text}
              </label>
            ))}

          {q.type === "checkbox" &&
            q.options.map((o) => (
              <label key={o.id} style={styles.option}>
                <input
                  type="checkbox"
                  checked={answers[q.id] === o.option_text}
                  onChange={(e) =>
                    handleCheckbox(
                      q.id,
                      o.option_text,
                      e.target.checked
                    )
                  }
                />
                {o.option_text}
              </label>
            ))}

          {q.type === "dropdown" && (
            <select
              style={styles.input}
              onChange={(e) => handleChange(q.id, e.target.value)}
            >
              <option value="">Select</option>
              {q.options.map((o) => (
                <option key={o.id} value={answers[q.id] || ""}>
                  {o.option_text}
                </option>
              ))}
            </select>
          )}

          {q.type === "rating" && (
            <div>
              {Array.from({ length: Number(q.rating_max) || 5 }).map((_, i) => {
                const value = i + 1;
                const selected = answers[q.id] || 0;

                return (
                  <span
                    key={i}
                    style={{
                      fontSize: "26px",
                      cursor: "pointer",
                      marginRight: "5px",
                      color: value <= selected ? "gold" : "#ccc",
                    }}
                    onClick={() => handleChange(q.id, value)}
                  >
                    ★
                  </span>
                );
              })}
            </div>
          )}
        </div>
      ))}

      <button style={styles.submitBtn} onClick={handleSubmit}>
        Submit
      </button>
    </div>
  );
}

const styles = {
  container: {
    maxWidth: "700px",
    margin: "40px auto",
    fontFamily: "sans-serif",
  },
  card: {
    background: "#fff",
    padding: "20px",
    marginBottom: "15px",
    borderRadius: "12px",
    boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
  },
  title: {
    marginBottom: "5px",
  },
  desc: {
    color: "#555",
  },
  question: {
    fontWeight: "bold",
    marginBottom: "10px",
  },
  input: {
    width: "100%",
    padding: "10px",
    borderRadius: "8px",
    border: "1px solid #ddd",
  },
  option: {
    display: "block",
    marginBottom: "6px",
  },
  submitBtn: {
    width: "100%",
    padding: "12px",
    background: "#6366f1",
    color: "#fff",
    border: "none",
    borderRadius: "10px",
    fontSize: "16px",
    cursor: "pointer",
  },
};

