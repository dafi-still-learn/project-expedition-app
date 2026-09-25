function Lacak_paket() {
  return (
    <>
      <section className="col-span-17" id="Container-pengiriman">
        <div className="w-full h-full" id="pengiriman">
          <div
            className="grid gap-6 grid-rows-5 w-full h-full"
            id="pengiriman-card"
          >
            <div className="grid row-span-4">
              <div id="list-pengiriman">
                <h1>berisi peta</h1>
              </div>
            </div>
            <div className="row-span-1">
              <h1>detail</h1>
              <form action="">
                <label htmlFor="enter_id">
                  masukkan nomor paket
                  <input type="text" name="enter_id" />
                </label>
                <button type="submit">kirim</button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Lacak_paket;
