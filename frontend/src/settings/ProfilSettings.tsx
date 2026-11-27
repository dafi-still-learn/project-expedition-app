// BERESI KOMPONEN UNTUK MENGGAMBARKAN FITUR DARI PENGELOLAAN PROFIL, FOTO, NAMA, EMAIL,

import { JSX } from "react";
import React from "react";

export const ProfilPage = (): React.JSX.Element => {
  return (
    <>
      <div className="w-full h-full row-span-9 grid grid-rows">
        <div className="flex flex-col gap-8">
          <div>
            <h1>nama</h1>
          </div>
          <div>
            <h1>panggilan</h1>
          </div>
          <div>
            <h1>tanggal lahir</h1>
          </div>
          <div>
            <h1>nomor hp</h1>
          </div>
          <div>
            <h1>alamat</h1>
          </div>
          <div>
            <h1>penempatan</h1>
          </div>
          <div>
            <h1>jabatan</h1>
          </div>
        </div>
        <div>
          <button>edit profil</button>
        </div>
      </div>
    </>
  );
};
