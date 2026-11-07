import React from "react";

type onConfirm = {
  onConfirm: () => void;
  onConfirmPay: () => void;
};

export const ConfirmPay = ({
  onConfirm,
  onConfirmPay,
}: onConfirm): React.JSX.Element => {
  return (
    <>
      <div className="fixed w-100 grid grid-row-1 top-100 left-200">
        <h1>APAKAH DATA ANDA SUDAH BENAR</h1>
        <div className="flex gap-5 justify-center">
          <button className="cursor-pointer" onClick={onConfirmPay}>
            iya, sudah
          </button>
          <button className="cursor-pointer" onClick={onConfirm}>
            eh, belum
          </button>
        </div>
      </div>
    </>
  );
};
