import { Route, Routes } from "react-router-dom";
import Login from "./components/auth/login/Login";
import Register from "./components/auth/register/Register";
import Dashboard from "./components/dashboard/Dashboard";
import Home from "./components/home/Home";
import Users from "./components/users/Users";
import Teams from "./components/teams/Teams";
import Tasks from "./components/tasks/Tasks";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/home" element={<Home />} />
        <Route path="/users" element={<Users />} />
        <Route path="/teams" element={<Teams />} />
        <Route path="/tasks" element={<Tasks />} />
        
      </Routes>
    </div>
  );
}

export default App;
