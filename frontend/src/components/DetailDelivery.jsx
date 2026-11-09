function DetailDelivery({
  id,
  nama,
  nama_paket,
  asal_paket,
  tujuan_paket,
  jumlah_paket,
  harga_paket,
}) {
  return (
    <>
      <div className="col-span-1">
        <div>
          <h1 className="text-xl font-bold">detail</h1>
        </div>
        <div>
          <ul>
            <li>paket: {id}</li>
            <li>nama: {nama}</li>
            <li>nama paket: {nama_paket}</li>
            <li>asal paket: {asal_paket}</li>
            <li>tujuan paket: {tujuan_paket}</li>
            <li>jumlah paket: {jumlah_paket}</li>
            <li>harga paket: {harga_paket}</li>
          </ul>
        </div>
      </div>
    </>
  );
}

export default DetailDelivery;
