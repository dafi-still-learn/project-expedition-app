// import { useState } from "react";
import "../index.css";
import { useNavigate } from "react-router-dom";
import { sendEmail } from "../services/sendEmail";
import { useState } from "react";

function LupaPassword() {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  function handleLogin() {
    navigate("/login");
  }

  const handleEmail = async (e) => {
    e.preventDefault();

    const result = await sendEmail(email);

    console.log("USERNAME USER", email);

    if (result === true) {
      navigate("/login");
    }
  };

  return (
    <>
      <div id="Container-login" className="w-screen h-screen">
        <form
          action=""
          onSubmit={handleEmail}
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
