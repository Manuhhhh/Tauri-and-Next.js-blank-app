"use client";
import { useState } from "react";
import { invoke } from "@tauri-apps/api/core";
import Image from "next/image";
import CategoriesSelector from "../CategoriesSelector/CategoriesSelector";
import './EditWindow.css';
import Selector from "@/components/Selector/Selector";
import SelectorOption from "@/components/Selector/SelectorOption/SelectorOption";

type Props = {
  data: Business;
  categories: Category[];
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

export default function EditWindow({ data, closeWindow, categories }: Props) {
  const [editData, setEditData] = useState<EditBusiness>({
    editId: data._id.toString(),
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
    zone: data.zone ?? "",
    email: data.email ?? "",
    password: sessionStorage.getItem("pass") ?? "",
  });
  const [selectedZone, setSelectedZone] = useState<[string, string]>(["", ""]);

  const [showCategoriesSelector, setShowCategoriesSelector] = useState<boolean>(false);
  const putEditData = async () => {
    if (editData.title === "") {
      alert("El título es el único campo obligatorio");
      return;
    }
    
    const data = { ...editData, zone: selectedZone[1] };

    await invoke("edit_bus", {
      data: data,
    });
    closeWindow();
  };

  const handleShowCategoriesSelector = () => {
    setShowCategoriesSelector(true);
  }

  const handleUpdateSelectedCategories = (categories: Category[]) => {
    setEditData({ ...editData, categories: categories.map(c => c._id) });
    setShowCategoriesSelector(false);
  }

  return (
    <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col gap-4 items-center justify-center bg-white border p-4 rounded-md z-50 overflow-y-auto max-h-screen">
      {showCategoriesSelector && <CategoriesSelector categories={categories} handleClose={handleUpdateSelectedCategories} previouslySelectedCategories={editData.categories} />}
      <h1 className="text-center">Editar comercio</h1>
      <div className="grid grid-cols-2 gap-x-2 w-full">
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
            value={editData.openingHours}
            onChange={(e) =>
              setEditData({ ...editData, openingHours: e.target.value })
            }
          />
        </div>
        <div>
          <p>Días de atención</p>
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
          <p>Zona</p>
          <Selector state={selectedZone} className="md:w-1/2 lg:w-auto w-full px-2 min-w-52">
            <SelectorOption
              setState={setSelectedZone}
              text={"Bahía San Blas"}
              value={"Bahía San Blas"}
              defaultSelected={data.zone === "Bahía San Blas"}
            />
            <SelectorOption
              setState={setSelectedZone}
              text={"Cardenal Cagliero"}
              value={"Cardenal Cagliero"}
              defaultSelected={data.zone === "Cardenal Cagliero"}
            />
            <SelectorOption
              setState={setSelectedZone}
              text={"Carmen de Patagones"}
              value={"Carmen de Patagones"}
              defaultSelected={data.zone === "Carmen de Patagones"}
            />
            <SelectorOption
              setState={setSelectedZone}
              text={"Juan A. Pradere"}
              value={"Juan A. Pradere"}
              defaultSelected={data.zone === "Juan A. Pradere"}
            />
            <SelectorOption
              setState={setSelectedZone}
              text={"José B. Casas"}
              value={"José B. Casas"}
              defaultSelected={data.zone === "José B. Casas"}
            />
            <SelectorOption
              setState={setSelectedZone}
              text={"Villa Balnearia 7 de Marzo"}
              value={"Villa Balnearia 7 de Marzo"}
              defaultSelected={data.zone === "Villa Balnearia 7 de Marzo"}
            />
            <SelectorOption
              setState={setSelectedZone}
              text={"Balneario Los Pocitos"}
              value={"Balneario Los Pocitos"}
              defaultSelected={data.zone === "Balneario Los Pocitos"}
            />
          </Selector>
        </div>
        <div>
          <p>Email</p>
          <input type="email" className="w-full rounded-md p-2 outline-none border text-slate-600" value={editData.email} onChange={(e) => setEditData({ ...editData, email: e.target.value })} />
        </div>
        <div className="col-span-2">
          <p>Imágen de portada (URL)</p>
          <input
            type="text"
            className="w-full rounded-md p-2 outline-none border text-slate-600 resize-none"
            value={editData.image}
            onChange={(e) =>
              setEditData({ ...editData, image: e.target.value })
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
        <div className="col-span-2">
          <p>Categorías</p>
          <div
            className="w-full rounded-md outline-none border h-28 text-slate-600 flex overflow-hidden mb-4"
          >
            <div className="w-full h-full border-r flex flex-wrap justify-center items-center">

              {editData.categories?.map(
                (category: string, index: number) => {
                  const categoryData = categories.find(c => c._id === category);
                  return (
                    <div
                      key={index}
                      className="w-fit h-fit border rounded-full px-4 py-2 border-r flex gap-2 justify-center items-center hover:opacity-65 "
                    >
                      <div className="w-6 h-6 flex justify-center items-center overflow-hidden svg-container" dangerouslySetInnerHTML={{ __html: categoryData?.svg_logo as TrustedHTML }}></div>
                      <p className="text-slate-600 text-sm font-bold">{categoryData?.name}</p>
                    </div>
                  )
                }
              )}
            </div>
            <div className="h-full w-20 flex justify-center items-center hover:opacity-65" onClick={handleShowCategoriesSelector}>
              <Image src="/select-categories.svg" alt="Categories Selector" className="w-10 h-10 opacity-40" width={10} height={10} />
            </div>
          </div>
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
