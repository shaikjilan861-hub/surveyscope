import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  addOption,
  createQuestion,
  deleteQuestion,
  getForm,
  publishForm,
  updateQuestion,
} from "../../services/form.service";
import "./FormBuilder.css";

export default function FormBuilder() {
const { surveyId } = useParams();

const [form, setForm] = useState(null);
const [loading, setLoading] = useState(true);

const [question, setQuestion] = useState("");
const [type, setType] = useState("short_text");
const [options, setOptions] = useState([""]);

const [editingId, setEditingId] = useState(null);

const [formLink, setFormLink] = useState("");
const [copied, setCopied] = useState(false);
const [successMessage, setSuccessMessage] = useState("");


const [ratingMax, setRatingMax] = useState(5);

const [isRequired, setIsRequired] = useState(false);


useEffect(() => {
if (surveyId) fetchForm();
}, [surveyId]);

const showSuccess = (msg) => {
setSuccessMessage(msg);
setTimeout(() => setSuccessMessage(""), 2000);
};

const fetchForm = async (showLoader = true) => {
  try {
    if (showLoader) setLoading(false);

    const res = await getForm(surveyId);
    const data = res?.data?.data || res?.data || res;
    setForm(data);

    if (data?.public_link || data?.link) {
      setFormLink(data.public_link || data.link);
    }
  } catch (err) {
    console.error(err);
    setForm(null);
  } finally {
    if (showLoader) setLoading(false);
  }
};

const handleSubmit = async () => {

if (!form) return alert("Form not loaded");
if (!question.trim()) return alert("Enter question");

try {
  const payload = {
    question_text: question,
    type,
     required: isRequired,
    rating_max: type === "rating" ? Number(ratingMax) : null,
    file_type: type === "image" ? "image" : null,
  };
console.log("PAYLOAD:", payload);
  let questionId;

  if (editingId) {
    await updateQuestion(editingId, payload);
    questionId = editingId;
    showSuccess("Question updated successfully!");
  } else {
    const res = await createQuestion(form.id, payload);

    questionId =
      res?.data?.id ||
      res?.data?.data?.id ||
      res?.id;

    if (!questionId) {
      console.error("Missing ID", res);
      return alert("Error creating question");
    }

    showSuccess("Question added successfully!");
  }

  // options
  if (!editingId && ["radio", "checkbox", "dropdown"].includes(type)) {
    for (let opt of options) {
      if (opt.trim()) {
        await addOption(questionId, { option_text: opt });
      }
    }
  }

  // reset
  setQuestion("");
  setOptions([""]);
  setEditingId(null);
  setRatingMax(5);
  setIsRequired(false);

  fetchForm();
} catch (err) {
  console.error(err);
}


};

const handleDelete = async (id) => {
if (!window.confirm("Delete this question?")) return;


try {
  await deleteQuestion(id);
  showSuccess("Question deleted successfully!");
  fetchForm();
} catch (err) {
  console.error(err);
}


};

const handleEdit = (q) => {
setQuestion(q.question_text);
setType(q.type);
setEditingId(q.id);


setOptions(
  q.options && q.options.length > 0
    ? q.options.map((o) => o.option_text)
    : [""]
);


setRatingMax(q.rating_max ?? 5);


};

const publish = async () => {
try {
const res = await publishForm(form.id);
const link = res.link || res.data?.link;
setFormLink(link);
showSuccess("Form created successfully!");
} catch (err) {
console.error(err);
}
};

const copyLink = () => {
navigator.clipboard.writeText(formLink);
setCopied(true);
setTimeout(() => setCopied(false), 2000);
};

if (loading) return <h3 style={{ textAlign: "center" }}>Loading...</h3>;
if (!form) return <h3 style={{ textAlign: "center" }}>No form</h3>;

return (
<> 

<div className="container">


    {successMessage && (
      <div className="success-msg">{successMessage}</div>
    )}

    {/* Builder */}
    <div className="card">
      <h2>{editingId ? "Edit Question" : "Add Question"}</h2>

      <input
        className="input"
        placeholder="Enter question"
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
      />

      <select
        className="select"
        value={type}
        onChange={(e) => setType(e.target.value)}
      >
        <option value="short_text">Short</option>
        <option value="long_text">Long</option>
        <option value="radio">MCQ</option>
        <option value="checkbox">Checkbox</option>
        <option value="dropdown">Dropdown</option>

        <option value="date">Date</option>
        <option value="time">Time</option>
        <option value="rating">Rating</option>
        <option value="email">Email</option>
        <option value="phone">Phone</option>
        <option value="image">Image Upload</option>
      </select>

      {/* OPTIONS */}
      {["radio", "checkbox", "dropdown"].includes(type) &&
        options.map((opt, i) => (
          <input
            key={i}
            className="input"
            value={opt}
            placeholder={`Option ${i + 1}`}
            onChange={(e) => {
              const arr = [...options];
              arr[i] = e.target.value;
              setOptions(arr);
            }}
          />
        ))}
<label style={{ display: "flex", alignItems: "center", gap: "6px" }}>
  <input
    type="checkbox"
    checked={isRequired}
    onChange={(e) => setIsRequired(e.target.checked)}
  />
  Required
</label>
      {["radio", "checkbox", "dropdown"].includes(type) && (
        <button
          className="btn secondary"
          onClick={() => setOptions([...options, ""])}
        >
          + Add Option
        </button>
      )}

     

      {/* RATING */}
      {type === "rating" && (
        <input
          className="input"
          type="number"
          value={ratingMax}
          onChange={(e) => setRatingMax(Number(e.target.value))}
        />
      )}

      <button className="btn primary" onClick={handleSubmit}>
       {editingId ? "Update" : "Add"}
      </button>
    </div>

    {/* Questions */}
    <div className="card">
      <h3>Questions</h3>

      {form.questions?.map((q) => (
        <div key={q.id} className="question">
          <strong>{q.question_text}</strong>
          <div style={{ fontSize: 12 }}>{q.type}</div>

          {q.options?.map((o) => (
            <div key={o.id}>- {o.option_text}</div>
          ))}

          {q.type === "linear" && (
            <div>{q.min_value} → {q.max_value}</div>
          )}

          {q.type === "rating" && (
            <div>⭐ {q.rating_max}</div>
          )}

          <div>
            <button className="btn edit" onClick={() => handleEdit(q)}>
              Edit
            </button>

            <button
              className="btn danger"
              onClick={() => handleDelete(q.id)}
            >
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>

    {/* Link */}
    <div className="card">
      <button className="btn success" onClick={publish}>
        Generate Form Link
      </button>

      {formLink && (
        <div className="link-box">
          <input className="link-input" value={formLink} readOnly />
          <button className="btn copy" onClick={copyLink}>
            {copied ? "Copied!" : "Copy"}
          </button>
        </div>
      )}
    </div>
  </div>
</>


);
}
