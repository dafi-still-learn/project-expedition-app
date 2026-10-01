function Pembayaran() {
  return (
    <>
      <section className="w-screen h-screen" id="Container-payment">
        <div className="w-full h-full" id="payment">
          <div
            className="grid gap-6 grid-rows-5 w-full h-full"
            id="pengiriman-card"
          >
            <div className="row-span-2">
              <div id="list-pengiriman">berisi filter payment</div>
            </div>
            <div className="row-span-3">
              <h1>berisi list payment</h1>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Pembayaran;
