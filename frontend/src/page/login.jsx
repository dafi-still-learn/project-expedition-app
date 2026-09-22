// import { useState } from "react";
import "../index.css";
import { useNavigate } from "react-router-dom";
import { sendLogin } from "../services/sendLogin";
import { useState } from "react";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  function handleRegister() {
    navigate("/register");
  }
  function handleForget() {
    navigate("/lupa_password");
  }

  const handleLogin = async (e) => {
    e.preventDefault();

    const result = await sendLogin(username, password);

    console.log("USERNAME USER", username);
    console.log("PASSWORD USER", password);

    if (result === true) {
      navigate("/dashboard");
    }
  };

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
