import FormDelivery from "../components/FormMakePacket";
import { useState } from "react";

function Buat_pengiriman() {
  const [data, setData] = useState([]);

  console.log(data);
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
                <FormDelivery setData={setData} />
              </div>
            </div>
            <div className="col-span-2">
              <h1>detail packet</h1>
              {data &&
                data.map((item) => {
                  return (
                    <>
                      <div key={item.name}>
                        <h1>{item.name}</h1>
                        <h1>{item.jenis}</h1>
                        <h1>{item.jumlah}</h1>
                        <h1>{item.asal}</h1>
                        <h1>{item.tujuan}</h1>
                        <h1>{item.berat}</h1>
                        <h1>{item.mitra}</h1>
                      </div>
                    </>
                  );
                })}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Buat_pengiriman;
