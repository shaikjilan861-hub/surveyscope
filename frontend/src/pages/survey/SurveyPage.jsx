import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getSurvey } from "../../services/survey.service";

export default function SurveyPage() {
  const { surveyId } = useParams();
  const [survey, setSurvey] = useState(null);

  useEffect(() => {
    fetchSurvey();
  }, []);

  const fetchSurvey = async () => {
    const data = await getSurvey(surveyId);
    setSurvey(data);
  };

  if (!survey) return <p>Loading...</p>;

  return (
    <div style={{ padding: "30px" }}>
      <h2>{survey.title}</h2>
      <p>{survey.description}</p>

      {/* Next: questions */}
      <p>Form coming...</p>
    </div>
  );
}