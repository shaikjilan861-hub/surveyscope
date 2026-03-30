import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";

// Auth Pages
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";

// Workspace Pages
import AddMember from "./pages/workspace/AddMember";
import CreateWorkspace from "./pages/workspace/CreateWorkspace";
import WorkspaceDetails from "./pages/workspace/WorkspaceDetails";
import WorkspaceHome from "./pages/workspace/WorkspaceHome";
import WorkspaceList from "./pages/workspace/WorkspaceList";

// Survey Pages
import CreateSurvey from "./pages/survey/CreateSurvey";
import EditSurvey from "./pages/survey/EditSurvey";
import FormBuilder from "./pages/survey/FormBuilder";
import SurveyPage from "./pages/survey/SurveyPage";


//public
import PublicForm from "./pages/public/PublicForm";


//response
import ResponseDetailPage from "./pages/response/ResponseDetailPage";
import ResponsePage from "./pages/response/ResponsePage";


// Header
import AppHeader from "./components/AppHeader";

// ✅ THIS component is INSIDE Router
function Layout() {
  const location = useLocation();

  const hideHeaderRoutes = ["/", "/login", "/register"];
  const showHeader = !hideHeaderRoutes.includes(location.pathname);

  return (
    <>
      {showHeader && <AppHeader />}

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route path="/workspaces" element={<WorkspaceHome />} />
        <Route path="/workspaces/create" element={<CreateWorkspace />} />
        <Route path="/workspaces/list" element={<WorkspaceList />} />
        <Route path="/workspaces/:id" element={<WorkspaceDetails />} />
        <Route path="/workspaces/:id/add-member" element={<AddMember />} />

        <Route path="/workspaces/:id/create-survey" element={<CreateSurvey />} />
        <Route path="/workspaces/:id/surveys/:surveyId" element={<SurveyPage />} />
        <Route path="/workspaces/:id/surveys/:surveyId/edit" element={<EditSurvey />} />
        <Route path="/workspaces/:id/surveys/:surveyId/form" element={<FormBuilder />} />



        <Route path="/form/:slug" element={<PublicForm />} />
        <Route path="/workspaces/:id/surveys/:surveyId/responses" element={<ResponsePage />} />
        <Route path="/workspaces/:id/surveys/:surveyId/responses/:responseId" element={<ResponseDetailPage />} />


      </Routes>

    </>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Layout /> {/* ✅ Header is inside router now */}
    </BrowserRouter>
  );
}