// import { useState } from "react";
import "../index.css";
import "../css/Login.css";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import baseURL from "../api/Axios";

function LupaPassword() {
  const [email, setEmail] = useState<string>("");
  const navigate = useNavigate();

  function handleLogin() {
    navigate("/login");
  }

  const handleEmail = async () => {
    const response = await baseURL.post("/", {
      email: email,
    });

    console.log(response);
    if (result === true) {
      navigate("/login");
    }
  };

  return (
    <>
      <div id="Container-login" className="w-screen h-screen">
        <form
          action=""
          onSubmit={(e) => {
            e.preventDefault();
            handleEmail;
          }}
          className="bg-amber-400 p-20 grid place-content-center grid-cols-1 gap-5 rounded-4xl"
          id="Form-login"
        >
          <h1>Masukkan email, untuk fix that</h1>
          <label htmlFor="email_user" className="flex flex-col">
            Email
            <input
              type="email"
              name="email_user"
              onChange={(e) => setEmail(e.target.value)}
            />
          </label>

          <button type="submit">kirim</button>
          <div className="flex place-content-center gap-20">
            <button onClick={handleLogin}>sudah punya akun</button>
          </div>
        </form>
      </div>
    </>
  );
}

export default LupaPassword;
