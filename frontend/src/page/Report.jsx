import DiagramMultiLineFinansial from "../components/DiagramMultiLinFinansial";

function Laporan() {
  return (
    <>
      <section
        className="w-screen h-screeno overflow-auto"
        id="Container-report"
      >
        <div className="w-full h-full" id="report">
          <div
            className="grid gap-6 grid-rows-5 w-full h-full"
            id="pengiriman-card"
          >
            <div className="row-span-1">
              <div id="list-pengiriman">berisi laporan</div>
            </div>
            <div
              className="row-span-4 grid grid-cols-2 gap-2 overflow-auto"
              id="list-report"
            >
              <div>
                <DiagramMultiLineFinansial />
              </div>
              <div>
                <DiagramMultiLineFinansial />
              </div>
              <div>
                <DiagramMultiLineFinansial />
              </div>
              <div>
                <DiagramMultiLineFinansial />
              </div>
              <div>
                <DiagramMultiLineFinansial />
              </div>
              <div>
                <DiagramMultiLineFinansial />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Laporan;
