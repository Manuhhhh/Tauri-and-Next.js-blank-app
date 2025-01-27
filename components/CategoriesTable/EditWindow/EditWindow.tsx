"use client";
import { useState } from "react";
import { invoke } from "@tauri-apps/api/core";
import Selector from "@/components/Selector/Selector";
import SelectorOption from "@/components/Selector/SelectorOption/SelectorOption";
import Image from "next/image";

type Props = {
  data: Category;
  closeWindow: () => void;
};
// Business type:
//   editId: string;
//   title: string;
//   shortDescription?: string;
//   longDescription?: string;
//   openingHours?: string;
//   openingTime?: string;
//   location?: string;
//   categories?: string[];
//   image?: string;
//   contact?: string;
//   site?: string;
//   password?: string;

export default function EditWindow({ data, closeWindow }: Props) {
  const [type, setType] = useState<[string, string]>(["", ""]);
  const [editData, setEditData] = useState<EditCategory>({
    edit_id: data._id.toString(),
    name: data.name,
    description: data.description,
    svg_logo: data.svg_logo,
    type: data.type,
    password: sessionStorage.getItem("pass") as string
  });

  const handleSelectSVG = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.svg';

    input.onchange = async (event) => {
      const file = (event.target as HTMLInputElement)?.files?.[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
          const result = e.target?.result as string;
          setEditData({ ...editData, svg_logo: result })
        };
        reader.readAsText(file);
      }
    };

    input.click();
  }


  const putEditData = async () => {
    if (editData.name === "") {
      alert("El nombre es un campo obligatorio");
      return;
    }

    setEditData({ ...editData, type: type[1] as "business" | "event" });

    await invoke("edit_cat", {
      data: editData,
    });
    closeWindow();
  };
  return (
    <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col gap-4 items-center justify-center bg-white border p-4 rounded-md z-50 overflow-y-auto max-h-screen">
      <h1 className="text-center">Editar categoría</h1>
      <div className="grid gap-x-2 w-full">
        <div>
          <p>Nombre de la categoría</p>
          <input
            type="text"
            className="w-full rounded-md p-2 outline-none border text-slate-600"
            value={editData.name}
            onChange={(e) =>
              setEditData({ ...editData, name: e.target.value })
            }
          />
        </div>
        <div>
          <p>Descripción de la categoría</p>
          <input
            type="text"
            className="w-full rounded-md p-2 outline-none border text-slate-600"
            value={editData.description}
            onChange={(e) =>
              setEditData({ ...editData, description: e.target.value })
            }
          />
        </div>
        <div>
          <p>Tipo de categoría (Comercios / Actividades)</p>

          <Selector state={type} className="w-full">
            <SelectorOption setState={setType} value="business" text="Comercios" defaultSelected={data.type === "business"} />
            <SelectorOption setState={setType} value="event" text="Actividades" defaultSelected={data.type === "event"} />
          </Selector>
        </div>
        <div>
          <p>Logo de la categoría (Formato SVG)</p>
          <div className="border rounded-md flex">
            <textarea
              className="w-full h-20 outline-none text-slate-600 p-2 resize-none"
              value={editData.svg_logo}
              onChange={(e) => setEditData({ ...editData, svg_logo: e.target.value })}
            />
            <div className="h-full flex items-center border-l w-10 hover:opacity-80" onClick={handleSelectSVG}>
              <Image src="/upload.svg" className="w-10 h-20 p-2" alt="Subir SVG" width={16} height={16} />
            </div>
          </div>
        </div>
        <div className="flex gap-2 mt-2">
          <button
            className="w-full rounded-md bg-blue-500 px-4 py-2 text-white"
            onClick={closeWindow}
          >
            Cancelar
          </button>
          <button
            className="w-full rounded-md bg-blue-500 px-4 py-2 text-white"
            onClick={putEditData}
          >
            Guardar
          </button></div>
      </div>
    </div>
  );
}
