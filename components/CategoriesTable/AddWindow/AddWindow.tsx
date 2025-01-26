"use client";

import { useEffect, useState } from "react";
import Selector from "@/components/Selector/Selector";
import SelectorOption from "@/components/Selector/SelectorOption/SelectorOption";
import Image from "next/image";
import { invoke } from "@tauri-apps/api/core";

type Props = {
    closeWindow: () => void;
};

export default function Addwindow({ closeWindow }: Props) {
    const [addData, setAddData] = useState<AddCategory>({
        name: "",
        category_type: "",
        description: "",
        svg_logo: "",
    });

    const [type, setType] = useState<[string, string]>(["", ""]);

    useEffect(() => {
        setAddData({ ...addData, category_type: type[1] as "business" | "event" | "" });
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [type]);


    const putAddData = async () => {
        if (addData.name === "") {
            alert("El nombre de la categoría es obligatorio");
            return
        }

        if (addData.category_type === "") {
            alert("El tipo de la categoría es obligatoria");
            return
        }

        const data = addData;
        const password = sessionStorage.getItem("pass") as string
        data.category_type = type[1] as "business" | "event";
        data.password = password;
        
        invoke("add_cat", { data, password })

        closeWindow();
    };

    const handleCancel = () => {
        closeWindow();
    }

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
                    setAddData({ ...addData, svg_logo: result })
                };
                reader.readAsText(file);
            }
        };

        input.click();
    }

    return (
        <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col gap-4 items-center justify-center bg-white border p-4 rounded-md z-50 overflow-y-auto max-h-screen">
            <h1 className="text-center">Añadir categoría</h1>
            <div className="grid gap-x-2 w-full">
                <div>
                    <p>Nombre de la categoría</p>
                    <input
                        type="text"
                        className="w-full rounded-md p-2 outline-none border text-slate-600"
                        value={addData.name}
                        onChange={(e) =>
                            setAddData({ ...addData, name: e.target.value })
                        }
                    />
                </div>
                <div>
                    <p>Descripción</p>
                    <input
                        type="text"
                        className="w-full rounded-md p-2 outline-none border text-slate-600"
                        value={addData.description}
                        onChange={(e) =>
                            setAddData({ ...addData, description: e.target.value })
                        }
                    />
                </div>
                <div>
                    <p>Tipo de categoría (Comercios / Actividades)</p>

                    <Selector state={type} className="w-full">
                        <SelectorOption setState={setType} value="business" text="Comercios" />
                        <SelectorOption setState={setType} value="event" text="Actividades" />
                    </Selector>
                </div>
                <div>
                    <p>Logo de la categoría (Formato SVG)</p>
                    <div className="border rounded-md flex">
                        <textarea
                            className="w-full h-20 outline-none text-slate-600 p-2 resize-none"
                            value={addData.svg_logo}
                            onChange={(e) => setAddData({ ...addData, svg_logo: e.target.value })}
                        />
                        <div className="h-full flex items-center border-l w-10 hover:opacity-80" onClick={handleSelectSVG}>
                            <Image src="/upload.svg" className="w-10 h-20 p-2" alt="Subir SVG" width={16} height={16} />
                        </div>
                        </div>
                </div>
                <div className="w-full flex gap-2 mt-2">
                    <button
                        className="w-full rounded-md bg-blue-500 px-4 py-2 text-white"
                        onClick={handleCancel}
                    >
                        Cancelar
                    </button>
                    <button
                        className="w-full rounded-md bg-blue-500 px-4 py-2 text-white"
                        onClick={putAddData}
                    >
                        Guardar
                    </button></div>
            </div>
        </div>
    );
}