import LeafletMap from "../services/openStreetMap";
function Lacak_paket() {
  return (
    <>
      <section className="w-screen h-screen" id="Container-track-packet">
        <div className="w-full h-full" id="track-packet">
          <div
            className="grid gap-6 grid-rows-5 w-full h-full"
            id="pengiriman-card"
          >
            <div className="grid row-span-4">
              <div id="list-pengiriman">
                <LeafletMap />
              </div>
            </div>
            <div className="row-span-1 grid grid-cols-2 gap-2" id="form-paket">
              <form
                action=""
                className="border-r-black grid gap-2"
                id="form-packetan"
              >
                <label htmlFor="enter_id" className="flex flex-col gap-2">
                  masukkan nomor paket
                  <input type="text" name="enter_id" />
                </label>
                <button type="submit" id="btn-paket">
                  kirim
                </button>
              </form>
              <div>
                <h1>hasil pencarian</h1>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Lacak_paket;
