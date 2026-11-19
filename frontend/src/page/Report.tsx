import { DiagramLine } from "../components/DiagramLine";
import { FilterReport } from "../services/filterReport";
import { useState } from "react";
import { DiagramLineReport } from "../services/DiagramLineReport";

type filterReportProps = {
  jumlah: [];
  waktu: [];
};

function Laporan() {
  const [filterData, setFilterData] = useState<filterReportProps | null>(null); //berisi filter data
  const [loading, setLoading] = useState<boolean>(false);

  // const formattedLabels =
  //   filterData.waktu.map((tanggal) => {
  //     return new Date(tanggal).toLocaleDateString("id-ID", {
  //       day: "numeric",
  //       month: "short",
  //       year: "numeric",
  //     });
  //   }) ?? [];

  console.log("ini isi dari filter data ", filterData);
  if (loading) {
    return (
      <>
        <h1>masih mencari data...</h1>
      </>
    );
  }

  return (
    <>
      <section
        className="w-screen h-screen overflow-auto"
        id="Container-report"
      >
        <div className="w-full h-full" id="report">
          <div
            className="grid gap-6 grid-rows-9 w-full h-full"
            id="pengiriman-card"
          >
            <div className="row-span-4">
              <FilterReport
                filterData={setFilterData}
                setLoading={setLoading}
              />
            </div>
            <div className="row-span-5 grid grid-cols-2 gap-4 overflow-auto">
              {filterData &&
              "jumlah" in filterData &&
              filterData.jumlah.length > 0 ? (
                <DiagramLine
                  data={filterData.jumlah}
                  labels={filterData.waktu.map((item) =>
                    new Date(item).toLocaleDateString("id-ID"),
                  )}
                />
              ) : (
                <DiagramLineReport />
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Laporan;
