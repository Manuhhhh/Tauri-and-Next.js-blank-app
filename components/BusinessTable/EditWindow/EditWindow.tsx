"use client";
import { useState } from "react";
import { invoke } from "@tauri-apps/api/core";

type Props = {
  data: Business;
  closeWindow: () => void;
};

//   _id: ObjectId;
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

export default function EditWindow({ data, closeWindow }: Props) {
  const [editData, setEditData] = useState<Business>({
    _id: data._id,
    title: data.title,
    shortDescription: data.shortDescription ?? "",
    longDescription: data.longDescription ?? "",
    openingHours: data.openingHours ?? "",
    openingTime: data.openingTime ?? "",
    location: data.location ?? "",
    categories: data.categories ?? [],
    image: data.image ?? "",
    contact: data.contact ?? "",
    site: data.site ?? "",
  });

  const putEditData = async () => {
    await invoke("edit_bus", {
      data: editData,
    });
    closeWindow();
  };
  return (
    <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col gap-4 items-center justify-center bg-white border p-4 rounded-md">
      <h1 className="text-center">Editar comercio</h1>
      <div className="grid grid-cols-2 w-full">
        <div>
          <p>Título</p>
          <input
            type="text"
            className="w-full rounded-md p-2 outline-none border text-slate-600"
            value={editData.title}
            onChange={(e) =>
              setEditData({ ...editData, title: e.target.value })
            }
          />
        </div>
        <div>
          <p>Ubicación</p>
          <input
            type="text"
            className="w-full rounded-md p-2 outline-none border text-slate-600"
            value={editData.location}
            onChange={(e) =>
              setEditData({ ...editData, location: e.target.value })
            }
          />
        </div>
        <div>
          <p>Contacto</p>
          <input
            type="text"
            className="w-full rounded-md p-2 outline-none border text-slate-600"
            value={editData.contact}
            onChange={(e) =>
              setEditData({ ...editData, contact: e.target.value })
            }
          />
        </div>
        <div>
          <p>Sitio web</p>
          <input
            type="text"
            className="w-full rounded-md p-2 outline-none border text-slate-600"
            value={editData.site}
            onChange={(e) => setEditData({ ...editData, site: e.target.value })}
          />
        </div>
        <div>
          <p>Horario de apertura</p>
          <input
            type="text"
            className="w-full rounded-md p-2 outline-none border text-slate-600"
            value={editData.openingTime}
            onChange={(e) =>
              setEditData({ ...editData, openingTime: e.target.value })
            }
          />
        </div>
        <div>
          <p>Días de atención</p>
          <input
            type="text"
            className="w-full rounded-md p-2 outline-none border text-slate-600"
            value={editData.openingHours}
            onChange={(e) =>
              setEditData({ ...editData, openingHours: e.target.value })
            }
          />
        </div>
        <div className="col-span-2">
          <p>Descripción corta</p>
          <textarea
            className="w-full rounded-md p-2 outline-none border h-16 text-slate-600 resize-none"
            value={editData.shortDescription}
            onChange={(e) =>
              setEditData({ ...editData, shortDescription: e.target.value })
            }
          />
        </div>
        <div className="col-span-2">
          <p>Descripción larga</p>
          <textarea
            className="w-full rounded-md p-2 outline-none border h-32 text-slate-600 resize-none"
            value={editData.longDescription}
            onChange={(e) =>
              setEditData({ ...editData, longDescription: e.target.value })
            }
          />
        </div>
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
        </button>
      </div>
    </div>
  );
}
