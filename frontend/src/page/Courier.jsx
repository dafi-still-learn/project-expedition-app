function Kurir() {
  return (
    <>
      <section className="col-span-17" id="Container-pengiriman">
        <div className="w-full h-full" id="pengiriman">
          <div
            className="grid gap-6 grid-rows-5 w-full h-full"
            id="pengiriman-card"
          >
            <div className="row-span-2">
              <div id="list-pengiriman">
                berisi filter kurir darat/laut/udara
              </div>
            </div>
            <div className="row-span-3">
              <h1>
                berisi list kurir, seperti jam keberangaktan kapal, pesawat,
                truk, motor
              </h1>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Kurir;
