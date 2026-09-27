import LeafletMap from "../services/openStreetMap";
function Lokasi() {
  return (
    <>
      <section className="col-span-17" id="Container-pengiriman">
        <div className="w-full h-full" id="pengiriman">
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
