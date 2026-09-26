function ListDelivery({
  setName,
  setDate,
  setPrice,
  setCustumer,
  setQuantity,
}) {
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
      <div id="list-pengiriman">
        {listCustomer.map((item) => {
          return (
            <>
              <ul className="grid gap-5 w-ful h-full">
                <li className="grid gap-4">
                  <button
                    onClick={() => {
                      setName(item.name);
                      setDate(item.date);
                      setPrice(item.price);
                      setCustumer(item.custumer);
                      setQuantity(item.quantity);
                    }}
                  >
                    <h1>{item.name}</h1>
                    <h1>{item.date}</h1>
                    <h1>{item.price}</h1>
                    <h1>{item.custumer}</h1>
                    <h1>{item.quantity}</h1>
                  </button>
                </li>
              </ul>
            </>
          );
        })}
      </div>
    </>
  );
}

export default ListDelivery;
