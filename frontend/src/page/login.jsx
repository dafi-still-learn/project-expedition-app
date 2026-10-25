// import { useState } from "react";
import "../index.css";
import { useNavigate } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import { LoginOperator } from "../api/AuthApi";
import { useAuth } from "../auth/AuthContext";
import { checkProfil } from "../services/dataProfil";

function Login() {
  const { token, login, setUsernameUser, role } = useAuth();
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

      // UDAH INI SUDAH BENAR UNTUK MENGHASILKAN DAN MENAMPILAKNA TOKEN DARI BACKEND
      console.log("ini adalah user_id dari user", result.data["user_id"]);
      console.log("ini dari login", result);
      console.log("ISI DARI ROLE", role);

      if (result.status === 200) {
        // BAGIAN YANG MENJALANKAN FITUR KHUSU ADMIN

        if (role === "ADMIN") {
          setUsernameUser(username);
          login(result.data["access_token"]);
        } else {
          const checkDataProfil = await checkProfil(result.data["user_id"]);

          console.log("ini isi dari check profil", checkDataProfil);
          // DATA TOKEN DARI USER DIKIRIM KE AUTH CONTEXT UNTUK DI PROSES PADA TAHAP SELAJUTNYA DI AUTHENTICATION DAN AUDHOTIZATION
          console.log(
            "ISI DATA DARI RESULT CHECK PROFIL",
            checkDataProfil.data,
          );
          if (checkDataProfil.data === true) {
            if (role === "OPERATOR") {
              setUsernameUser(username);
              login(result.data["access_token"]);

              navigate("/dashboard");

              console.log("user sudah memiliki profil");

              console.log(
                "hasil dari tokenisasi users",
                result.data["access_token"],
              );
            }
          }
          if (checkDataProfil.data === false) {
            setUsernameUser(username);
            login(result.data["access_token"]);

            navigate("/dashboard", {
              state: {
                user_id: result.data["user_id"],
                profilComplate: result.data.success,
              },
            });

            console.log("user belum memiliki profil");

            console.log(
              "hasil dari tokenisasi users",
              result.data["access_token"],
            );
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
