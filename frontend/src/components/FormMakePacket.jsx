function FormDelivery() {
  return (
    <>
      <div id="container-form-packet" className="row-span-12">
        <form
          action=""
          className="grid grid-rows-13 gap-2 w-full h-full"
          id="form-packet"
        >
          <div className="row-span-9 flex flex-col gap-3">
            <label htmlFor="packet-name">
              nama paket
              <input
                type="text"
                name="packet-name"
                id=""
                placeholder="enter name packet"
              />
            </label>
            <label htmlFor="packet-jumlah">
              jumlah paket
              <input
                type="text"
                name="packet-jumlah"
                id=""
                placeholder="enter berat packet"
              />
            </label>
            <label htmlFor="packet-jenis">
              jenis paket
              <input
                type="text"
                name="packet-jenis"
                id=""
                placeholder="enter jenis packet"
              />
            </label>
            <label htmlFor="packet-asal">
              asal paket
              <input
                type="text"
                name="packet-asal"
                id=""
                placeholder="enter asal packet"
              />
            </label>
            <label htmlFor="packet-tujuan">
              tujuan paket
              <input
                type="text"
                name="packet-tujuan"
                id=""
                placeholder="enter tujuan packet"
              />
            </label>
            <label htmlFor="packet-berat">
              berat paket
              <input
                type="text"
                name="packet-berat"
                id=""
                placeholder="enter name packet"
              />
            </label>
            <label htmlFor="packet-name">
              packet name
              <input
                type="text"
                name="packet-name"
                id=""
                placeholder="enter name packet"
              />
            </label>
          </div>
          <div className="row-span-3">
            <label htmlFor="price">
              price
              <input type="text" name="price" />
            </label>
            <label htmlFor="metode">
              metode payment
              <input type="text" name="methode" />
            </label>
          </div>
          <button type="submit" className="row-span-1">
            pay
          </button>
        </form>
      </div>
    </>
  );
}
export default FormDelivery;
