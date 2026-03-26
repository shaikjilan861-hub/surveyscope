import { useParams } from "react-router-dom";

export default function WorkspaceDetails() {
  const { id } = useParams();

  return (
    <div style={{ padding: "40px" }}>
      <h2>Workspace Details</h2>
      <p>Workspace ID: {id}</p>

      {/* later: members, surveys */}
    </div>
  );
}