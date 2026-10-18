// import { useState } from "react";
import "../index.css";
import { useNavigate } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import { LoginOperator } from "../api/AuthApi";
import { useAuth } from "../auth/AuthContext";

function Login() {
  const { setToken, token } = useAuth();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();
  const hasNavigate = useRef(false);

  useEffect(() => {
    if (token && !hasNavigate.current) {
      hasNavigate.current = true;
      navigate("/dashboard", { replace: true });
    }
  }, [token, navigate]);

  const handleLogin = async (e) => {
    e.preventDefault();

    if (username == "" || password == "") {
      alert("isi dengan benar");
      return;
    }
    try {
      const result = await LoginOperator(username, password);

      console.log("USERNAME USER", username);
      console.log("PASSWORD USER", password);
      console.log("RESULT LOGIN", result);

      // UDAH INI SUDAH BENAR UNTUK MENGHASILKAN DAN MENAMPILAKNA TOKEN DARI BACKEND
      if (result.status === 200) {
        navigate("/dashboard");
        console.log("hasil dari tokenisasi users", result.data["access_token"]);
        setToken(result.data["access_token"]);
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
          onSubmit={handleLogin}
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
