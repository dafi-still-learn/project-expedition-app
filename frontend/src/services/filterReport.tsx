import { useEffect, useState } from "react";
import baseURL from "../api/Axios";
import { useAuth } from "../auth/AuthContext";
import React from "react";

export const FilterReport = ({
  filterData,
  setLoading,
}: any): React.JSX.Element => {
  const [topic, setTopic] = useState<string>("");
  const [waktu, setWaktu] = useState<string>("");
  const { token } = useAuth();

  console.log("isi dari topik ", topic);
  console.log("isi dari waktu ", waktu);

  const HandleReportFilter = async (e: React.FormEvent) => {
    try {
      e.preventDefault();

      const reponse = await baseURL.get(
        `/laporan/filter?topic=${topic}&waktu=${waktu}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      console.log("isi dari filter data report ", reponse);
      filterData(reponse.data);
    } catch (err) {
      console.log(
        "terjadi error pada pengambilan data berdasarkan filter di report backend!!",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div>
        <form
          action=""
          onSubmit={HandleReportFilter}
          className="flex flex-col gap-3 w-full h-full"
        >
          <h1>Filter Report</h1>
          <div className="flex flex-col gap-1" id="label-input">
            <h1>Topik</h1>
            <label htmlFor="">
              Paket
              <input
                type="radio"
                value="paket"
                onChange={(e) => setTopic(e.target.value)}
              />
            </label>

            <label htmlFor="">
              Pelanggan
              <input
                type="radio"
                value="pelanggan"
                onChange={(e) => setTopic(e.target.value)}
              />
            </label>

            <label htmlFor="">
              Omset
              <input
                type="radio"
                value="omset"
                onChange={(e) => setTopic(e.target.value)}
              />
            </label>

            <label htmlFor="">
              Unit operasional
              <input
                type="radio"
                value="unit_operasional"
                onChange={(e) => setTopic(e.target.value)}
              />
            </label>
          </div>

          <div>
            <h1>waktu</h1>

            <select name="" id="" onChange={(e) => setWaktu(e.target.value)}>
              <option value="3">3 hari</option>
              <option value="7">7 hari</option>
              <option value="14">14 hari</option>
              <option value="30">30 hari</option>
            </select>
          </div>

          <button
            type={"submit"}
            className="w-60 h-10 bg-red-200 cursor-pointer"
          >
            filter
          </button>
        </form>
      </div>
    </>
  );
};
