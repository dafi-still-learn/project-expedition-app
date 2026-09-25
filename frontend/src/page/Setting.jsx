function Setting({ onClose }) {
  console.log("ISI DARI ON CLOSE", onClose);

  return (
    <>
      <div className="fixed inset-0 bg-black/50 items-center justify-center flex">
        <div
          className="grid grid-cols-3 gap-3 bg-amber-300"
          id="container-setting"
        >
          <div className="grid grid-cols-1 gap-3 grid-rows-13 col-span-1 justify-between">
            <ul className="row-span-12 shadow-lg">
              <li>
                <button>Profil</button>
              </li>
              <li>
                <button>Privacy</button>
              </li>
              <li>
                <button>Data</button>
              </li>
              <li>
                <button>Penampilan</button>
              </li>
              <li>
                <button>Source</button>
              </li>
              <li>
                <button>Diagram</button>
              </li>
            </ul>
            <button
              onClick={onClose}
              className="row-span-1 cursor-pointer"
              id="btn-setting"
            >
              simpan
            </button>
          </div>
          <div className="col-span-2 shadow-lg" id="setting-detail">
            <h1>detail Pengaturan</h1>
          </div>
        </div>
      </div>
    </>
  );
}

export default Setting;
