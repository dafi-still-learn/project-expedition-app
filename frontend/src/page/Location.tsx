import LeafletMap from "../services/PengirimanOpenStreetMap";
import PackageMapLocation from "../services/MapsForLocation";

// LOCATION DIGUNAKAN UNTUK MENAMPILKAN LOKASI DARI MITRA PADA EXPEDITION ATAU BISA DIGUNAKN UNTUK UNIT JUGAX
function Lokasi() {
  return (
    <>
      <section className="w-screen h-screen" id="Container-location">
        <div className="w-full h-full" id="location">
          <div
            className="grid gap-6 grid-rows-7 w-full h-full"
            id="pengiriman-card"
          >
            <div className="row-span-7">
              <PackageMapLocation />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Lokasi;
