function Kurir() {
  const courir_standby = [
    {
      id: 1,
      nama: "adi",
      jalur: "darat",
      domisili_sekarang: "jakarta",
      status: "aktif",
    },
    {
      id: 2,
      nama: "dimas",
      jalur: "laut",
      domisili_sekarang: "surabaya",
      status: "tidak aktif",
    },
    {
      id: 3,
      nama: "dafi",
      jalur: "udara",
      domisili_sekarang: "pontianak",
      status: "aktif",
    },
    {
      id: 4,
      nama: "kino",
      jalur: "darat",
      domisili_sekarang: "solo",
      status: "aktif",
    },
    {
      id: 5,
      nama: "rahmat",
      jalur: "darat",
      domisili_sekarang: "bandung",
      status: "aktif",
    },
    {
      id: 6,
      nama: "fauzan",
      jalur: "laut",
      domisili_sekarang: "makassar",
      status: "aktif",
    },
    {
      id: 7,
      nama: "agung",
      jalur: "udara",
      domisili_sekarang: "padang",
      status: "tidak aktif",
    },
  ];
  return (
    <>
      <section className="w-screen h-screen" id="Container-courir">
        <div className="w-full h-full" id="courir">
          <div
            className="grid gap-6 grid-rows-5 w-full h-full"
            id="pengiriman-card"
          >
            <div className="row-span-1">
              <div id="list-pengiriman">
                berisi filter kurir darat/laut/udara
              </div>
            </div>
            <div
              className="row-span-4 grid gap-1 grid-rows-12"
              id="list-courir"
            >
              {courir_standby.map((item) => {
                return (
                  <ul className="row-span-1 grid grid-cols-12">
                    <li className="col-span-3">{item.nama}</li>
                    <li className="col-span-3">{item.jalur}</li>
                    <li className="col-span-3">{item.domisili_sekarang}</li>
                    <li className="col-span-3 font-bold">{item.status}</li>
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

export default Kurir;
