function Laporan() {
  return (
    <>
      <section className="w-screen h-screen" id="Container-report">
        <div className="w-full h-full" id="report">
          <div
            className="grid gap-6 grid-rows-5 w-full h-full"
            id="pengiriman-card"
          >
            <div className="row-span-2">
              <div id="list-pengiriman">berisi laporan</div>
            </div>
            <div className="row-span-3 grid grid-cols-2">
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Laporan;
