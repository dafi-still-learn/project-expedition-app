// BERISI TENTANG TAMPILAN, TAMPILAN KESELURUHAN, TAMPILAN PETA, TAMPILAN DIAGRAM, TAMPILAN FONT

import React from "react";
import { useState, useEffect } from "react";

export const Theme = (): React.JSX.Element => {
  const [theme, setTheme] = useState<"light" | "dark">(
    () => localStorage.getItem("theme") ?? "light",
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
  return (
    <>
      <div className="grid grid-cols-2 gap-7 mt-5 w-full h-full row-span-9">
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
          <p className="mt-1">
            Dark mode akan mengubah warna latar belakang, teks, dan elemen lain
            untuk kontras lebih baik di lingkungan yang redup.
          </p>
        </div>
      </div>
    </>
  );
};
