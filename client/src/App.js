import { Route, Routes } from "react-router-dom";
import PrivateRoutes from "./PrivateRoutes";
import Layout from "./pages/Layout";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import 'semantic-ui-css/semantic.min.css';
import Dashboard from "./pages/dashboard/Dashboard";
import Reports from "./pages/reports/Reports";
import Projects from "./pages/projects/Projects";
import Teams from "./pages/teams/Teams";
import ViewProject from "./pages/projects/ViewProject";
import ViewTeam from "./pages/teams/ViewTeam";




function App() {
  return (

    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route element={<PrivateRoutes />} >

        <Route element={<Layout />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/reports" element={<Reports />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/teams" element={<Teams />} />
          <Route path="/viewProject/:id" element={<ViewProject />} />
          <Route path="/viewTeam/:id" element={<ViewTeam />} />
          {/* 
          <Route path="/tasks" element={<Tasks />} />
          
          <Route path="/account" element={<User />} />
           */}
        </Route>
      </Route>


    </Routes>

  );
}

export default App;
