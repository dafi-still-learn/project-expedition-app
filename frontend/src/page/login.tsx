// import { useState } from "react";

import { useNavigate } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import { LoginOperator } from "../api/AuthApi";
import { useAuth } from "../auth/AuthContext";
import { checkProfil } from "../services/dataProfil";

function Login() {
  const { token, role, login } = useAuth();
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const navigate = useNavigate();
  const hasNavigate = useRef(false);

  useEffect(() => {
    if (token && role && !hasNavigate.current) {
      hasNavigate.current = true;
      navigate("/dashboard", { replace: true });
    }
  }, [token, role, navigate]);

  const handleLogin = async () => {
    if (username == "" || password == "") {
      console.log("isi dengan benar");
    }
    try {
      const result = await LoginOperator(username, password);

      // UDAH INI SUDAH BENAR UNTUK MENGHASILKAN DAN MENAMPILAKNA TOKEN DARI BACKEND

      if (result?.status === 200) {
        // BAGIAN YANG MENJALANKAN FITUR KHUSU ADMIN

        const checkDataProfil = await checkProfil(result?.data.user_id);
        if (role === "ADMIN") {
          localStorage.setItem("username", username);
          login(result.data.access_token);
          navigate("/dashboard");
          if (checkDataProfil === true) {
            navigate("/dashboard");

            console.log("user sudah memiliki profil");
          }
          if (checkDataProfil === false) {
            localStorage.setItem("username", username);
            localStorage.setItem("profilComplete", "true");
            localStorage.setItem("userId", result.data["user_id"]);
            localStorage.setItem("emailUser", result.data["email_user"]);

            navigate("/dashboard");
          }
        } else {
          // DATA TOKEN DARI USER DIKIRIM KE AUTH CONTEXT UNTUK DI PROSES PADA TAHAP SELAJUTNYA DI AUTHENTICATION DAN AUDHOTIZATION
          localStorage.setItem("username", username);
          login(result.data.access_token);
          if (checkDataProfil === true) {
            navigate("/dashboard");

            console.log("user sudah memiliki profil");
          }
          if (checkDataProfil === false) {
            localStorage.setItem("username", username);
            localStorage.setItem("profilComplete", "true");
            localStorage.setItem("userId", result.data["user_id"]);
            localStorage.setItem("emailUser", result.data["email_user"]);

            navigate("/dashboard");
          }
        }
      }
    } catch (err) {
      console.log("terjadi error", err);
    }
  };

  function handleRegister() {
    navigate("/register");
  }
  function handleForget() {
    navigate("/lupa_password");
  }

  return (
    <>
      <div id="Container-login" className="w-screen h-screen">
        <form
          action=""
          onSubmit={(e) => {
            e.preventDefault();
            handleLogin();
          }}
          className="bg-amber-400 p-20 grid place-content-center grid-cols-1 gap-5 rounded-4xl"
          id="Form-login"
        >
          <h1>Selamat Datang,nikmati berbagai fitur</h1>
          <label htmlFor="username_user" className="flex flex-col">
            Username
            <input
              type="username"
              name="username_user"
              onChange={(e) => setUsername(e.target.value)}
            />
          </label>
          <label htmlFor="password_user" className="flex flex-col">
            Password
            <input
              type="password"
              name="password_user"
              onChange={(e) => setPassword(e.target.value)}
            />
          </label>
          <button type="submit">masuk</button>
          <div className="flex place-content-center gap-20">
            <button onClick={handleRegister}>daftar</button>
            <button onClick={handleForget}>lupa password</button>
          </div>
        </form>
      </div>
    </>
  );
}

export default Login;
