import { UserCircle } from "@boxicons/react";

function Navbar() {
  return (
    <>
      <div className="grid grid-cols-5">
        <div className="col-span-1" id="hero-navbar">
          <h1>selamat datang dafi🤑,</h1>
          <h1>selamat menikmati fitur</h1>
        </div>
        <div id="container-navbar" className="col-span-4">
          <div className="grid grid-cols-9">
            <button
              className="col-span-2 cursor-pointer flex justify-between w-full h-full"
              id="button-profil"
            >
              <UserCircle />
              <h1>Nur Fauzan Muhammad Khadafi</h1>
            </button>
            <ul className="flex col-span-7 justify-evenly">
              <li>profil</li>
              <li>about me</li>
              <li>services</li>
              <li>contact me</li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}

export default Navbar;
