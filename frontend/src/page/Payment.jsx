function Pembayaran() {
  const listCustomer = [
    {
      id: 1,
      name: "paket 1",
      date: "23 september 2025",
      price: "Rp.350.000.00",
      custumer: "andrea setyawan",
      quantity: "2 Qty",
    },
    {
      id: 2,
      name: "paket 2",
      date: "23 september 2025",
      price: "Rp.500.000.00",
      custumer: "iqbal fauzan",
      quantity: "4 Qty",
    },
    {
      id: 3,
      name: "paket 3",
      date: "23 september 2025",
      price: "Rp.300.000.00",
      custumer: "dinda pangestu",
      quantity: "2 Qty",
    },
    {
      id: 4,
      name: "paket 4",
      date: "23 september 2025",
      price: "Rp.600.000.00",
      custumer: "tikia ardiasyah",
      quantity: "5 Qty",
    },
    {
      id: 5,
      name: "paket 5",
      date: "23 september 2025",
      price: "Rp, 550.000.00",
      custumer: "Kelvin hutapeaw",
      quantity: "5 Qty",
    },
    {
      id: 6,
      name: "paket 6",
      date: "23 september 2025",
      price: "Rp.480.000.00",
      custumer: "jennie sihombing",
      quantity: "4 Qty",
    },
  ];
  return (
    <>
      <section className="w-screen h-screen" id="Container-payment">
        <div className="w-full h-full" id="payment">
          <div
            className="grid gap-6 grid-rows-5 w-full h-full overflow-auto"
            id="payment-card"
          >
            <div className="row-span-1" id="filter-payment">
              <div>berisi filter payment</div>
            </div>
            <div
              className="row-span-4 grid gap-1 grid-rows-12 overflow-y-auto"
              id="payment-item"
            >
              {listCustomer.map((item) => {
                return (
                  <ul className="grid grid-cols-12 gap-2 row-span-1">
                    <li className="col-span-1">{item.name}</li>
                    <li className="col-span-3">{item.date}</li>
                    <li className="col-span-4">{item.price}</li>
                    <li className="col-span-2">{item.custumer}</li>
                    <li className="col-span-2">{item.quantity}</li>
                  </ul>
                );
              })}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Pembayaran;
