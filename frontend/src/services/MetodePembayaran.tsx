import React from "react";

type ConfirmPembayaranProps = {
  onConfirmPembayaran: () => void;
};

export const HandlePembayaran = ({
  onConfirmPembayaran,
}: ConfirmPembayaranProps): React.JSX.Element => {
  return (
    <>
      <div className="fixed w-100 grid grid-row-1 top-100 left-200">
        <h1>PILIH METODE PEMBAYARAN</h1>

        <button onClick={onConfirmPembayaran}>simpan & bayar</button>
      </div>
    </>
  );
};
