import React, { useState, useEffect } from "react";
import "../css/Setting.css";

function Setting({ onClose }: any) {
  // Ambil tema dari localStorage, default ke "light"
  const [theme, setTheme] = useState<"light" | "dark">(
    () => localStorage.getItem("theme") ?? "light"
  );

  // Update document attribute dan localStorage ketika tema berubah
  useEffect(() => {
    if (theme === "light") {
      document.documentElement.removeAttribute("data-theme");
    } else {
      document.documentElement.setAttribute("data-theme", "dark");
    }
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  const save = () => {
    // Simpan tema ke localStorage (sudah di handle di useEffect)
    onClose();
  };

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
            <div className="grid grid-cols-2 gap-3 mt-5">
              <div>
                <h2 className="text-sm font-medium mb-1">Tema</h2>
                <button
                  onClick={toggleTheme}
                  className="w-full py-2 px-3 rounded bg-amber-300 text-black hover:bg-amber-400"
                >
                  {theme === "light" ? "Dark Mode" : "Light Mode"}
                </button>
              </div>
              <div className="text-sm text-gray-600">
                <p>Ganti tema untuk mengubah tampilan seluruh aplikasi.</p>
                <p className="mt-1">Dark mode akan mengubah warna latar belakang, teks, dan elemen lain untuk kontras lebih baik di lingkungan yang redup.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Setting;