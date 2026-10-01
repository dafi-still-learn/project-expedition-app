import LeafletMap from "../services/openStreetMap";
function Lokasi() {
  return (
    <>
      <section className="w-screen h-screen" id="Container-location">
        <div className="w-full h-full" id="location">
          <div
            className="grid gap-6 grid-rows-5 w-full h-full"
            id="pengiriman-card"
          >
            <div className="row-span-2">
              <div id="list-pengiriman">berisi filter lokasi</div>
            </div>
            <div className="row-span-3">
              <LeafletMap />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Lokasi;
