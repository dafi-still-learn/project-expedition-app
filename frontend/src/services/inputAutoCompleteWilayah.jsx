import { useState, useEffect, useRef } from "react";
import baseURL from "../api/Axios";

// UNTUK MENCARI WILAYAH BERDASARKAN INPUTAN USER DAN DATA YANG DITAMPILKNA DARI BACKEND
export const OnInputWilayah = ({ setName, setIdDaerah }) => {
  const [input, setInput] = useState("");
  const [wilayahList, setWilayahList] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);

  const timerRef = useRef(null);
  const wrapperRef = useRef(null);

  useEffect(() => {
    clearTimeout(timerRef.current);

    if (input.length < 2) {
      setWilayahList([]);
      setShowDropdown(false);
      return;
    }
    try {
      timerRef.current = setTimeout(async () => {
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

    return () => clearTimeout(timerRef.current);
  }, [input]);

  useEffect(() => {
    const handleMouseOut = (e) => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleMouseOut);

    return () => document.removeEventListener("mousedown", handleMouseOut);
  }, []);

  return (
    <div>
      <input
        type="text"
        className="input-wilayah"
        value={input}
        onChange={(e) => {
          const val = e.target.value;
          setInput(val);

          setIdDaerah("");
          setName("");
        }}
      />
      {showDropdown && wilayahList.length > 0 && (
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
