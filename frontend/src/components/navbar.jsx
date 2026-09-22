function Navbar() {
  return (
    <>
      <div id="container-navbar">
        <div className="grid grid-cols-7">
          <button className="col-span-1">foto ptofil</button>
          <ul className="flex col-span-6 justify-evenly">
            <li>profil</li>
            <li>about me</li>
            <li>services</li>
            <li>contact me</li>
          </ul>
        </div>
      </div>
    </>
  );
}

export default Navbar;
