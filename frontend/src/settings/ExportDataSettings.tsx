// BERISI REQUEST KE BACKEND UNTUK MENGEMBAILIKAN DATA YANG DIBUTUHKAN, MISALNYA PAKET, PELANGGAN, PEMBYARAN UNTUK DIGUNAKAN SECARA FISIK LAPORAN

import React from "react";

export const ExportData = (): React.JSX.Element => {
  return (
    <>
      <div className="w-full h-full row-span-9">
        <form action="" className="grid gap-3">
          <div className="grid gap-6">
            <label htmlFor="">
              paket
              <input type="radio" />
            </label>
            <label htmlFor="">
              pelanggan
              <input type="radio" />
            </label>
            <label htmlFor="">
              kurir
              <input type="radio" />
            </label>
            <label htmlFor="">
              pembayaran
              <input type="radio" />
            </label>
          </div>

          <select name="" id="">
            <option value="">CSV</option>
            <option value="">Excel</option>
          </select>
          <button type="submit">kirim</button>
        </form>
      </div>
    </>
  );
};
