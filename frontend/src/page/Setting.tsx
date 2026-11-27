import React, { useState, useEffect } from "react";

import "../css/Setting.css";
import { ProfilPage } from "../settings/ProfilSettings";
import { PrivacySecurity } from "../settings/PrivasiSecuritySettings";
import { ExportData } from "../settings/ExportDataSettings";
import { Theme } from "../settings/ThemeSettings";
import { DataDiagram } from "../settings/DataDiagramSettings";

function Setting({ onClose }: any) {
  const [openEditProfil, setOpenEditProfil] = useState<boolean>(false);
  const [openPrivacy, setOpenPrivacy] = useState<boolean>(false);
  const [openDataExport, setOpenDataExport] = useState<boolean>(false);
  const [openTheme, setOpenTheme] = useState<boolean>(false);
  const [openSourceDiagram, setOpenSourceDiagram] = useState<boolean>(false);

  const save = () => {
    // Simpan tema ke localStorage (sudah di handle di useEffect)
    onClose();
  };

  return (
    <>
      <div className="fixed inset-0 bg-black/50 items-center justify-center flex">
        <div
          className="grid grid-cols-3 gap-3 bg-amber-300"
          id="container-setting"
        >
          <div className="grid grid-cols-1 gap-3 grid-rows-13 col-span-1 justify-between">
            <ul className="row-span-12 shadow-lg">
              <li>
                <button
                  onClick={() => {
                    (setOpenEditProfil(true),
                      setOpenPrivacy(false),
                      setOpenDataExport(false),
                      setOpenTheme(false),
                      setOpenSourceDiagram(false));
                  }}
                >
                  Profil
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    (setOpenPrivacy(true),
                      setOpenEditProfil(false),
                      setOpenDataExport(false),
                      setOpenTheme(false),
                      setOpenSourceDiagram(false));
                  }}
                >
                  Privacy & Security
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    (setOpenDataExport(true),
                      setOpenPrivacy(false),
                      setOpenEditProfil(false),
                      setOpenTheme(false),
                      setOpenSourceDiagram(false));
                  }}
                >
                  Data Export
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    (setOpenTheme(true),
                      setOpenPrivacy(false),
                      setOpenEditProfil(false),
                      setOpenDataExport(false),
                      setOpenSourceDiagram(false));
                  }}
                >
                  Theme
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    (setOpenSourceDiagram(true),
                      setOpenPrivacy(false),
                      setOpenEditProfil(false),
                      setOpenDataExport(false),
                      setOpenTheme(false));
                  }}
                >
                  Source Digram
                </button>
              </li>
            </ul>
            <button
              onClick={onClose}
              className="row-span-1 cursor-pointer"
              id="btn-setting"
            >
              simpan
            </button>
          </div>
          <div
            className="col-span-2 shadow-lg w-full h-full grid grid-rows-10"
            id="setting-detail"
          >
            <h1 className="row-span-1">detail Pengaturan</h1>
            {openEditProfil && <ProfilPage />}
            {openPrivacy && <PrivacySecurity />}
            {openDataExport && <ExportData />}
            {openTheme && <Theme />}
            {openSourceDiagram && <DataDiagram />}
          </div>
        </div>
      </div>
    </>
  );
}

export default Setting;
