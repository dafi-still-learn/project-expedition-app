import { UserCircle, Bell } from "@boxicons/react";

function Navbar() {
  return (
    <>
      <div className="w-full h-full">
        <div id="container-navbar">
          <div className="flex justify-between">
            <button
              className="cursor-pointer flex gap-2 w-full h-full col-span-1"
              id="button-profil"
            >
              <UserCircle />
              <h1>Hai, selamat datang Dafi</h1>
            </button>
            <div className="col-span-1">
              <button className="cursor-pointer">
                <Bell />
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Navbar;
