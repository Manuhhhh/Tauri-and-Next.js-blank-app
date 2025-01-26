"use client";

import { useState } from "react";
import { invoke } from "@tauri-apps/api/core";

type Props = {
    closeWindow: () => void;
};

export default function Addwindow({ closeWindow }: Props) {
    const [addData, setAddData] = useState<AddBusiness>({
        title: "",
        shortDescription: "",
        longDescription: "",
        openingHours: "",
        openingTime: "",
        location: "",
        categories: [],
        image: "",
        contact: "",
        site: "",
        password: sessionStorage.getItem("pass") ?? "",
    });

    const putaddData = async () => {
        if (addData.title === "") {
            alert("El título es el único campo obligatorio");
            return
        }
        await invoke("add_eve", {
            data: addData,
        });
        closeWindow();
    };

    const handleCancel = () => {
        console.log("cancel");
        closeWindow();
    }

    return (
        <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col gap-4 items-center justify-center bg-white border p-4 rounded-md z-50 overflow-y-auto max-h-screen">
            <h1 className="text-center">Editar comercio</h1>
            <div className="grid grid-cols-2 gap-x-2 w-full">
                <div>
                    <p>Título</p>
                    <input
                        type="text"
                        className="w-full rounded-md p-2 outline-none border text-slate-600"
                        value={addData.title}
                        onChange={(e) =>
                            setAddData({ ...addData, title: e.target.value })
                        }
                    />
                </div>
                <div>
                    <p>Ubicación</p>
                    <input
                        type="text"
                        className="w-full rounded-md p-2 outline-none border text-slate-600"
                        value={addData.location}
                        onChange={(e) =>
                            setAddData({ ...addData, location: e.target.value })
                        }
                    />
                </div>
                <div>
                    <p>Contacto</p>
                    <input
                        type="text"
                        className="w-full rounded-md p-2 outline-none border text-slate-600"
                        value={addData.contact}
                        onChange={(e) =>
                            setAddData({ ...addData, contact: e.target.value })
                        }
                    />
                </div>
                <div>
                    <p>Sitio web</p>
                    <input
                        type="text"
                        className="w-full rounded-md p-2 outline-none border text-slate-600"
                        value={addData.site}
                        onChange={(e) => setAddData({ ...addData, site: e.target.value })}
                    />
                </div>
                <div>
                    <p>Horario de apertura</p>
                    <input
                        type="text"
                        className="w-full rounded-md p-2 outline-none border text-slate-600"
                        value={addData.openingHours}
                        onChange={(e) =>
                            setAddData({ ...addData, openingHours: e.target.value })
                        }
                    />
                </div>
                <div>
                    <p>Días de atención</p>
                    <input
                        type="text"
                        className="w-full rounded-md p-2 outline-none border text-slate-600"
                        value={addData.openingTime}
                        onChange={(e) =>
                            setAddData({ ...addData, openingTime: e.target.value })
                        }
                    />
                </div>
                <div className="col-span-2">
                    <p>Descripción corta</p>
                    <textarea
                        className="w-full rounded-md p-2 outline-none border h-16 text-slate-600 resize-none"
                        value={addData.shortDescription}
                        onChange={(e) =>
                            setAddData({ ...addData, shortDescription: e.target.value })
                        }
                    />
                </div>
                <div className="col-span-2">
                    <p>Descripción larga</p>
                    <textarea
                        className="w-full rounded-md p-2 outline-none border h-32 text-slate-600 resize-none"
                        value={addData.longDescription}
                        onChange={(e) =>
                            setAddData({ ...addData, longDescription: e.target.value })
                        }
                    />
                </div>
                <button
                    className="w-full rounded-md bg-blue-500 px-4 py-2 text-white"
                    onClick={handleCancel}
                >
                    Cancelar
                </button>
                <button
                    className="w-full rounded-md bg-blue-500 px-4 py-2 text-white"
                    onClick={putaddData}
                >
                    Guardar
                </button>
            </div>
        </div>
    );
}