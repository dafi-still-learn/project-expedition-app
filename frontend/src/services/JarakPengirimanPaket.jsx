// SEBUAH KOMPONEN YANG DIGUNAKAN UNTUK MENANDAKAN MARK DI PETA DARI ASAL DAN TUJUAN

import { useState } from "react";
import baseURL from "../api/Axios";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  Polyline,
  useMapEvents,
} from "react-leaflet";

import L from "leaflet";
import "leaflet/dist/leaflet.css";

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

const greenIcon = new L.Icon({
  iconUrl:
    "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-green.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

const redIcon = new L.Icon({
  iconUrl:
    "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-red.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

function ClickHandler({ mode, setOrigin, setDestination }) {
  useMapEvents({
    click(e) {
      const { lat, lng } = e.latlng;
      if (mode === "origin") setOrigin([lat, lng]);
      else setDestination([lat, lng]);
    },
  });
  return null;
}

export default function PackageMap() {
  const [mode, setMode] = useState("origin");
  const [origin, setOrigin] = useState(null);
  const [destination, setDestination] = useState(null);
  const [saving, setSaving] = useState(false);

  const handleSave = async () => {
    if (!origin || !destination) {
      alert("tentuka daerah asal dan tujuan terlebih dahulu");
      return;
    }
    setSaving(true);

    try {
      const res = await baseURL.post(
        "/packages",
        {
          origin: { lat: origin[0], lng: origin[1] },
          destination: { lat: destination[0], lng: destination[1] },
        },
        {
          withCredentials: true,
        },
      );

      console.log("Response", res);
    } catch (err) {
      console.log("terjadi error saat mengirim lokasi", err);
    } finally {
      setSaving(false);
    }
  };

  return (
    <>
      <div>
        <button
          onClick={() => setMode("origin")}
          style={{
            fontWeight: mode === "origin" ? "bold" : "normal",
            marginRight: 8,
          }}
        >
          tentukan asal
        </button>

        <button
          onClick={() => setMode("destination")}
          style={{ fontWeight: mode === "destinantion" ? "bold" : "normal" }}
          tentukan
          tujuan
        ></button>
      </div>

      {/* INFO KOORDINAT */}
      <div>
        <div>
          Asal:
          {origin ? "${origin[0].toFixed(6)}, ${origin[1].toFixed(6)}" : "-"}
        </div>

        <div>
          Tujuan:
          {destination
            ? `${destination[0].toFixed(6)}, ${destination[1].toFixed(6)}`
            : "-"}
        </div>
      </div>

      {/* INFO PETA */}
      <MapContainer
        center={[-2.5, 118]}
        zoom={5}
        style={{ height: "500px", width: "100%" }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <ClickHandler
          mode={mode}
          setOrigin={setOrigin}
          setDestination={setDestination}
        />

        {origin && (
          <Marker position={origin} icon={greenIcon}>
            <Popup>Asal Paket</Popup>
          </Marker>
        )}

        {destination && (
          <Marker position={destination} icon={redIcon}>
            <Popup>tujuan paket</Popup>
          </Marker>
        )}

        {origin && destination && (
          <Polyline
            positions={[origin, destination]}
            color="blue"
            dashArray="5,10"
          />
        )}

        <button onClick={handleSave} disabled={saving} style={{ marginTop: 8 }}>
          {saving ? "Menyimpan..." : "Simpan Paket"}
        </button>
      </MapContainer>
    </>
  );
}
