function DetailDelivery({ name, date, price, custumer, quantity }) {
  return (
    <>
      <div className="col-span-3">
        <div>
          <h1 className="text-xl font-bold">detail</h1>
        </div>
        <div>
          <ul>
            <li>{name}</li>
            <li>{date}</li>
            <li>{price}</li>
            <li>{custumer}</li>
            <li>{quantity}</li>
          </ul>
        </div>
      </div>
    </>
  );
}

export default DetailDelivery;
