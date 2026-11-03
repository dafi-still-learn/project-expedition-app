import { useState, useEffect } from "react";
import baseURL from "../api/Axios";
let timer;

// UNTUK MENCARI WILAYAH BERDASARKAN INPUTAN USER DAN DATA YANG DITAMPILKNA DARI BACKEND
export const OnInputWilayah = ({ setName, setIdDaerah }) => {
  clearTimeout(timer);

  const [input, setInput] = useState("");
  const [wilayahList, setWilayahList] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);

  useEffect(() => {
    const fetchWilayah = async () => {
      try {
        if (input.length < 2) {
          setWilayahList([]);
          setShowDropdown(false);
          return;
        }

        timer = setTimeout(async () => {
          const response = await baseURL.get(`/wilayah/search?q=${input}`);
          const data = response.data;

          console.log("ini data wilayah dari response ", data);
          setWilayahList(data.data);
          setShowDropdown(true);

          console.log("isi dari response data wilayah", data);
        }, 500);
      } catch (error) {
        console.error("Error fetching wilayah:", error);
      }
    };

    fetchWilayah();
    return () => clearTimeout(timer);
  }, [input]);

  return (
    <div>
      <input
        id="input-wilayah"
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
      {showDropdown && (
        <ul className="dropdown-wilayah">
          {wilayahList.map((wilayah) => (
            <li
              key={wilayah.id_wilayah}
              onClick={() => {
                setInput(wilayah.nama_wilayah);
                setName(wilayah.nama_wilayah);
                setIdDaerah(wilayah.kode_wilayah);
                setShowDropdown(false);
              }}
            >
              {wilayah.nama_wilayah}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
