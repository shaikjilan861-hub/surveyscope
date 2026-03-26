import { BrowserRouter, Route, Routes } from "react-router-dom";

// Auth Pages
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";

// Workspace Pages

import CreateWorkspace from "./pages/workspace/CreateWorkspace";
import WorkspaceDetails from "./pages/workspace/WorkspaceDetails";
import WorkspaceHome from "./pages/workspace/WorkspaceHome";
import WorkspaceList from "./pages/workspace/WorkspaceList";

import AddMember from "./pages/workspace/AddMember";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Auth Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Workspace Routes */}
       <Route path="/workspaces" element={<WorkspaceHome />} />
<Route path="/workspaces/create" element={<CreateWorkspace />} />
<Route path="/workspaces/list" element={<WorkspaceList />} />
<Route path="/workspaces/:id" element={<WorkspaceDetails />} />

<Route path="/workspaces/:id/add-member" element={<AddMember />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;