function Kurir() {
  return (
    <>
      <section className="w-screen h-screen" id="Container-courir">
        <div className="w-full h-full" id="courir">
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
