import "./App.css";
import { Routes, Route } from "react-router-dom";
import Login from "./page/login";
import LupaPassword from "./page/lupa_password";
import Register from "./page/register";
import { Navigate } from "react-router-dom";
import ExpeditionPage from "./api/api_expedition";
import Dashboard from "./page/dashboard";
function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Navigate to={<Login />} replace />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/lupa_password" element={<LupaPassword />} />

        {/* BAGIAN PAGE PAGE FITUR APP */}
        <Route path="/" element={<ExpeditionPage />}>
          <Route path="dashboard" element={<Dashboard />} />
        </Route>
      </Routes>
    </>
  );
}
export default App;
