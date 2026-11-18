import { useEffect, useState } from "react";
import baseURL from "../api/Axios";
import { useAuth } from "../auth/AuthContext";

type filterReportProps = {
  waktu_tanggal: string;
  jumlah: string | number;
};

export default const filterReport = () => {
  const [filter, setFilter] = useState<filterReportProps[]>([]); //BERISI DATA FILTER BERDASARKAN FORMAT YANG SUDAH DITENTUKAN
  const [loading, setLoading] = useState<boolean>(true);
  const { token } = useAuth();

  useEffect(() => {
    const HandleReportFilter = async () => {
      try {
        const reponse = await baseURL.get(
          `/laporan/filter?topic=${topic}&waktu=${waktu}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );

        console.log("isi dari filter data report ", reponse);
        setFilter(Array.isArray(reponse.data) ? reponse.data : []);
      } catch (err) {
        console.log(
          "terjadi error pada pengambilan data berdasarkan filter di report backend!!",
        );
      } finally {
        setLoading(false);
      }

      if (token) {
        HandleReportFilter();
      }
    };
  }, [token]);

 //   MENGEMBAILIKAN KOMPONEN BERDASARKAN NILAI YANG DIDAPAT DARI BACKEND
  return (
    <>
        <div className="row-span-1">
            <div id="list-pengiriman">
                filter laporan
                <form
                  action=""
                  className="flex flex-col gap-3"
                  onSubmit={(e) => {
                    e.preventDefault();
                  }}
                >
                  <h1>topic laporan</h1>
                  <div>
                    <div>
                      <label htmlFor="">
                        pemasukkan
                        <input
                          type="radio"
                          value={"pemasukkan"}
                          onChange={(e) => setTopic(e.target.value)}
                        />
                      </label>
                      <label htmlFor="">
                        pelanggan
                        <input
                          type="radio"
                          value={"pelanggan"}
                          onChange={(e) => setTopic(e.target.value)}
                        />
                      </label>
                      <label htmlFor="">
                        paket
                        <input
                          type="radio"
                          value={"paket"}
                          onChange={(e) => setTopic(e.target.value)}
                        />
                      </label>
                      <label htmlFor="">
                        unit operasional
                        <input
                          type="radio"
                          value={"unit_operasional"}
                          onChange={(e) => setTopic(e.target.value)}
                        />
                      </label>
                    </div>
                    <div>
                      <label htmlFor="">
                        1 hari
                        <input
                          type="radio"
                          value={"1hari"}
                          onChange={(e) => setWaktu(e.target.value)}
                        />
                      </label>
                      <label htmlFor="">
                        3 hari
                        <input
                          type="radio"
                          value={"3hari"}
                          onChange={(e) => setWaktu(e.target.value)}
                        />
                      </label>
                      <label htmlFor="">
                        7 hari
                        <input
                          type="radio"
                          value={"7hari"}
                          onChange={(e) => setWaktu(e.target.value)}
                        />
                      </label>
                      <label htmlFor="">
                        r" / 14 hari
                        <input
                          type="radio"
                          value={"14hari"}
                          onChange={(e) => setWaktu(e.target.value)}
                        />
                      </label>
                      <label htmlFor="">
                        30 hari
                        <input
                          type="radio"
                          value={"30hari"}
                          onChange={(e) => setWaktu(e.target.value)}
                        />
                      </label>
                      <label htmlFor="">
                        60 hari
                        <input
                          type="radio"
                          value={"60hari"}
                          onChange={(e) => setWaktu(e.target.value)}
                        />
                      </label>
                      <label htmlFor="">
                        120 hari
                        <input
                          type="radio"
                          value={"120hari"}
                          onChange={(e) => setWaktu(e.target.value)}
                        />
                      </label>
                      <label htmlFor="">
                        360 hari
                        <input
                          type="radio"
                          value={"360hari"}
                          onChange={(e) => setWaktu(e.target.value)}
                        />
                      </label>
                    </div>
                  </div>
                  <button type="submit" className="cursor-pointer">
                    filter
                  </button>
                </form>
                {/* <button onClick={filterReport}>filter report</button> */}
              </div>
    </>
  )
};
