function Setting({ onClose }) {
  console.log("ISI DARI ON CLOSE", onClose);

  return (
    <>
      <div className="fixed inset-0 bg-black/50 items-center justify-center flex">
        <div className="flex bg-amber-300" id="container-setting">
          <div className="grid grid-cols-1 place-content-center">
            <ul>
              <li>
                <button>btn 1</button>
              </li>
              <li>
                <button>btn 1</button>
              </li>
              <li>
                <button>btn 1</button>
              </li>
              <li>
                <button>btn 1</button>
              </li>
              <li>
                <button>btn 1</button>
              </li>
              <li>
                <button>btn 1</button>
              </li>
            </ul>
            <button onClick={onClose}>simpan</button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Setting;
