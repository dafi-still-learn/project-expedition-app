import { useState } from "react";
import { Filter } from "@boxicons/react";
import ListDelivery from "../components/ListDelivery";
import DetailDelivery from "../components/DetailDelivery";

function Pengiriman() {
  const [name, setName] = useState("");
  const [date, setDate] = useState("");
  const [price, setPrice] = useState("");
  const [custumer, setCustumer] = useState("");
  const [quantity, setQuantity] = useState("");
  return (
    <>
      <section className="col-span-17" id="">
        <div className="w-full h-full" id="pengiriman">
          <div
            className="grid gap-6 grid-cols-5 w-full h-full"
            id="pengiriman-card"
          >
            <div className="col-span-2">
              <div
                className="flex justify-between bg-amber-200"
                id="grup-filter"
              >
                <h1>pengiriman</h1>
                <div>
                  <button className="cursor-pointer">
                    <Filter />
                  </button>
                </div>
              </div>
              <ListDelivery
                setName={setName}
                setDate={setDate}
                setPrice={setPrice}
                setCustumer={setCustumer}
                setQuantity={setQuantity}
              />
            </div>
            <DetailDelivery
              name={name}
              date={date}
              price={price}
              custumer={custumer}
              quantity={quantity}
            />
          </div>
        </div>
      </section>
    </>
  );
}

export default Pengiriman;
