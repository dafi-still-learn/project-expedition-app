import "./index.css";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.jsx";
import { AuthProvider } from "./auth/AuthContext.jsx";

// Terapkan tema yang disimpan di localStorage sebelum React render
const savedTheme = localStorage.getItem("theme") ?? "light";
if (savedTheme === "dark") {
  document.documentElement.setAttribute("data-theme", "dark");
}

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </AuthProvider>
  </StrictMode>,
);
