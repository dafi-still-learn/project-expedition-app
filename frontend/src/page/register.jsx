// import { useState } from "react";
import "../index.css";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { sendRegister } from "../services/sendRegister";

function Login() {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();
  function handleLogin() {
    navigate("/login");
  }

  const handleRegister = async (e) => {
    e.preventDefault();

    const result = await sendRegister(email, username, password);

    console.log("EMAIL USER REGISTER", email);
    console.log("USERNAME USER REGISTER", username);
    console.log("PASSWORD USER REGISTER", password);

    if (result) {
      navigate("/login");
    }
  };

  return (
    <>
      <div id="Container-register" className="w-screen h-screen">
        <form
          action=""
          onSubmit={handleRegister}
          className="p-20 grid place-content-center grid-cols-1 gap-5 rounded-4xl"
          id="Form-register"
        >
          <h1>Daftar akun</h1>
          <label htmlFor="email_user" className="flex flex-col">
            Email
            <input
              type="email"
              name="email_user"
              onChange={(e) => setEmail(e.target.value)}
            />
          </label>
          <label htmlFor="username_user" className="flex flex-col">
            Username
            <input
              type="text"
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
          <button type="submit">daftar</button>
          <div className="flex place-content-center gap-20">
            <button onClick={handleLogin}>sudah punya akun</button>
          </div>
        </form>
      </div>
    </>
  );
}

export default Login;
