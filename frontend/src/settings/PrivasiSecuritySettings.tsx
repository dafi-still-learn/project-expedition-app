import React from "react";

// BAGIAN UNTUK BERTUGAS UNTUK AUTHENTICATION, VERIFICATION EMAIL, AKUN, PASSWORD
export const PrivacySecurity = (): React.JSX.Element => {
  return (
    <>
      <div className="w-full h-full row-span-9 grid gap-6">
        <div>
          <h1>verifikasi akun</h1>
          <h1>masukkan email sekarang: </h1>
          <form action="">
            <input type="text" />
            <button type="submit">kirim</button>
          </form>
        </div>

        <div>
          <h1>ganti username</h1>
          <h1>masukkan username sekarang: </h1>
          <form action="">
            <input type="text" />
            <button type="submit">kirim</button>
          </form>
        </div>

        <div>
          <h1>ganti password</h1>
          <h1>masukkan username atau email sekarang: </h1>
          <form action="">
            <input type="text" />
            <button type="submit">kirim</button>
          </form>
        </div>
      </div>
    </>
  );
};
