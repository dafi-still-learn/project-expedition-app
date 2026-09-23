import Sidebar from "../components/sidebar";
function Lokasi() {
  return (
    <>
      <section
        className="grid grid-cols-20 w-screen h-screen"
        id="Container-pengiriman"
      >
        <Sidebar></Sidebar>
        <div
          className="col-span-17 flex flex-col gap-5 bg-indigo-400"
          id="pengiriman"
        >
          <div
            className="grid gap-6 grid-cols-5 grid-rows-1 w-full h-full"
            id="pengiriman-card"
          >
            <div className="col-span-2">
              <div>
                <h1>pengiriman</h1>
              </div>
              <div id="list-pengiriman">
                <ul>
                  <li>
                    <button>
                      <h1>paket 1</h1>
                      <h1>23 september 2025</h1>
                      <h1>Rp.350.000.00</h1>
                      <h1>andrea setyawan</h1>
                      <h1>2 Qty</h1>
                    </button>
                  </li>
                  <li>
                    <button>
                      <h1>paket 1</h1>
                      <h1>23 september 2025</h1>
                      <h1></h1>
                      <h1>Rp.500.000.00</h1>
                      <h1>iqbal fauzan</h1>
                      <h1>4 Qty</h1>
                    </button>
                  </li>
                  <li>
                    <button>
                      <h1>paket 1</h1>
                      <h1>23 september 2025</h1>
                      <h1>Rp.300.000.00</h1>
                      <h1>dinda pangestu</h1>
                      <h1>2 Qty</h1>
                    </button>
                  </li>
                  <li>
                    <button>
                      <h1>paket 1</h1>
                      <h1>23 september 2025</h1>
                      <h1>Rp.600.000.00</h1>
                      <h1>tikia ardiasyah</h1>
                      <h1>5 Qty</h1>
                    </button>
                  </li>
                  <li>
                    <button>
                      <h1>paket 1</h1>
                      <h1>23 september 2025</h1>
                      <h1>Rp, 550.000.00</h1>
                      <h1>Kelvin</h1>
                      <h1>5 Qty</h1>
                    </button>
                  </li>
                  <li>
                    <button>
                      <h1>paket 1</h1>
                      <h1>23 september 2025</h1>
                      <h1>Rp.480.000.00</h1>
                      <h1>jennie sihombing</h1>
                      <h1>4 Qty</h1>
                    </button>
                  </li>
                </ul>
              </div>
            </div>
            <div className="col-span-3">
              <h1>detail</h1>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Lokasi;
