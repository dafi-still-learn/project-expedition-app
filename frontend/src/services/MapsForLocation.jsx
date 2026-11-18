// SEBUAH KOMPONEN YANG DIGUNAKAN UNTUK MENANDAKAN MARK DI PETA DARI ASAL DAN TUJUAN
import { memo, useEffect, useRef, useState } from "react";
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
// import "leaflet-routing-machine";
// import "leaflet-routing-machine/dist/leaflet-routing-machine.css";

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

const mitraIcons = new L.Icon({
  iconUrl:
    "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-green.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

// const redIcon = new L.Icon({
//   iconUrl:
//     "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-red.png",
//   shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
//   iconSize: [25, 41],
//   iconAnchor: [12, 41],
// });

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

export default memo(function PackageMapLocation({ lokasiAsal, lokasiTujuan }) {
  //   const [mode, setMode] = useState("origin");
  const [origin, setOrigin] = useState(null);
  const [destination, setDestination] = useState(null);
  //   const [saving, setSaving] = useState(false);
  const mapRef = useRef(null);
  const routeControlRef = useRef(null);

  const setMapRef = useRef((el) => {
    mapRef.current = el;
  }).current;

  useEffect(() => {
    const asalValid =
      Array.isArray(lokasiAsal) &&
      lokasiAsal.length >= 2 &&
      Number.isFinite(lokasiAsal[0]) &&
      Number.isFinite(lokasiAsal[1]);
    const tujuanValid =
      Array.isArray(lokasiTujuan) &&
      lokasiTujuan.length >= 2 &&
      Number.isFinite(lokasiTujuan[0]) &&
      Number.isFinite(lokasiTujuan[1]);

    const nextOrigin = asalValid ? lokasiAsal : null;
    const nextDestination = tujuanValid ? lokasiTujuan : null;

    setOrigin((prev) =>
      prev &&
      nextOrigin &&
      prev[0] === nextOrigin[0] &&
      prev[1] === nextOrigin[1]
        ? prev
        : nextOrigin,
    );
    setDestination((prev) =>
      prev &&
      nextDestination &&
      prev[0] === nextDestination[0] &&
      prev[1] === nextDestination[1]
        ? prev
        : nextDestination,
    );
  }, [lokasiAsal, lokasiTujuan]);

  useEffect(() => {
    const origLat = origin?.[0];
    const origLng = origin?.[1];
    const destLat = destination?.[0];
    const destLng = destination?.[1];

    if (
      !Number.isFinite(origLat) ||
      !Number.isFinite(origLng) ||
      !Number.isFinite(destLat) ||
      !Number.isFinite(destLng) ||
      !mapRef.current
    )
      return;

    if (routeControlRef.current) {
      mapRef.current.removeControl(routeControlRef.current);
      routeControlRef.current = null;
    }

    const rc = L.Routing.control({
      waypoints: [L.latLng(origLat, origLng), L.latLng(destLat, destLng)],
      routeWhileDragging: false,
      showAlternatives: false,
      show: true,
      lineOptions: {
        styles: [{ color: "blue", opacity: 0.6, weight: 6 }],
      },
    }).addTo(mapRef.current);

    routeControlRef.current = rc;

    return () => {
      if (routeControlRef.current && mapRef.current) {
        mapRef.current.removeControl(routeControlRef.current);
        routeControlRef.current = null;
      }
    };
  }, [origin?.[0], origin?.[1], destination?.[0], destination?.[1]]);

  //   const handleSave = async () => {
  //     if (!origin || !destination) {
  //       console.log("tentuka daerah asal dan tujuan terlebih dahulu");
  //       return;
  //     }
  //     setSaving(true);

  //     try {
  //       const res = await baseURL.get(
  //         "/wilayah/jarak_paket",
  //         {
  //           origin: { lat: origin[0], lng: origin[1] },
  //           destination: { lat: destination[0], lng: destination[1] },
  //         },
  //         {
  //           withCredentials: true,
  //         },
  //       );

  //       console.log("Response", res);
  //     } catch (err) {
  //       console.log("terjadi error saat mengirim lokasi", err);
  //     } finally {
  //       setSaving(false);
  //     }
  //   };
  return (
    <>
      {/* <div>
        <button
          onClick={() => setMode("origin")}
          style={{
            fontWeight: mode === "origin" ? "bold" : "normal",
            marginRight: 8,
            cursor: "pointer",
          }}
        >
          tentukan asal
        </button>

        <button
          onClick={() => setMode("destination")}
          style={{
            fontWeight: mode === "destination" ? "bold" : "normal",
            cursor: "pointer",
            border: "2px solid red",
          }}
        >
          tentukan tujuan
        </button>
      </div> */}

      {/* INFO KOORDINAT */}
      {/* <div>
        <div>
          Asal:
          {origin ? `${origin[0].toFixed(6)}, ${origin[1].toFixed(6)}` : "-"}
        </div>

        <div>
          Tujuan:
          {destination
            ? `${destination[0].toFixed(6)}, ${destination[1].toFixed(6)}`
            : "-"}
        </div>
      </div> */}

      {/* INFO PETA */}
      <MapContainer
        ref={setMapRef}
        center={[-2.5, 118]}
        zoom={5}
        style={{ height: "100%", width: "100%" }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {/* <ClickHandler
          mode={mode}
          setOrigin={setOrigin}
          setDestination={setDestination}
        /> */}

        {/* POSITION BERISI LATITUDE DAN LONGITUDE BERBENTUK ARRAY ATAU DICT */}

        {/* <Marker position={}>

        </Marker> */}

        {/* {lokasiAsal && (
          <Marker position={lokasiAsal} icon={greenIcon}>
            <Popup>Asal Paket</Popup>
          </Marker>
        )}

        {lokasiTujuan && (
          <Marker position={lokasiTujuan} icon={redIcon}>
            <Popup>tujuan paket</Popup>
          </Marker>
        )}
        {lokasiAsal && lokasiTujuan && (
          <Polyline
            positions={[lokasiAsal, lokasiTujuan]}
            color="blue"
            dashArray="5,10"
          />
        )} */}

        {/* <button onClick={handleSave} disabled={saving} style={{ marginTop: 8 }}>
          {saving ? "Menyimpan..." : "Simpan Paket"} save
        </button> */}
      </MapContainer>
    </>
  );
});
