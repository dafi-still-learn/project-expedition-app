function Pelanggan() {
  return (
    <>
      <section
        className="w-screen h-screen overflow-auto"
        id="Container-customer"
      >
        <div id="customer">
          <div
            className="grid gap-6 grid-rows-5 w-full h-full"
            id="pengiriman-card"
          >
            <div className="row-span-1">
              <div id="filter-customers" className="flex flex-col">
                <div>
                  <h1>filter customers</h1>
                </div>
                <div
                  className="grid grid-cols-2 gap-2 w-full h-full"
                  id="filter-customers"
                >
                  <div></div>
                  <div></div>
                  <div></div>
                  <div></div>
                  <div></div>
                </div>
              </div>
            </div>
            <div
              className="row-span-4 grid grid-cols-1 gap-2 overflow-auto"
              id="list-customers"
            >
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>

              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
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

export default Pelanggan;
