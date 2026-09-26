import FormDelivery from "../components/FormMakePacket";

function Buat_pengiriman() {
  return (
    <>
      <section className="col-span-17 grid" id="Container-make-delivery">
        <div className="" id="make-delivery">
          <div
            className="grid gap-6 grid-cols-5 w-full h-full"
            id="make-delivery-card"
          >
            <div className="col-span-3 grid">
              <div className="grid grid-rows-13">
                <h1 className="row-span-1">form packet</h1>
                <FormDelivery />
              </div>
            </div>
            <div className="col-span-2">
              <h1>detail packet</h1>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Buat_pengiriman;
