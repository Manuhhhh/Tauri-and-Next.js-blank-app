"use client";

import { useState } from "react";
import Selector from "@/components/Selector/Selector";
import SelectorOption from "@/components/Selector/SelectorOption/SelectorOption";

type Props = {
    closeWindow: () => void;
};

export default function Addwindow({ closeWindow }: Props) {
    const [addData, setAddData] = useState<AddCategory>({
        name: "",
        description: "",
        type: "business",
        svg_logo: "",
    });

    const [type, setType] = useState<[string, string]>(["", ""]);

    const putaddData = async () => {
        if (addData.name === "") {
            alert("El nombre de la categoría es obligatorio");
            return
        }
        closeWindow();
    };

    const handleCancel = () => {
        closeWindow();
    }

    return (
        <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col gap-4 items-center justify-center bg-white border p-4 rounded-md z-50 overflow-y-auto max-h-screen">
            <h1 className="text-center">Editar comercio</h1>
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
                    <input
                        type="text"
                        className="w-full rounded-md p-2 outline-none border text-slate-600"
                        value={addData.svg_logo}
                        onChange={(e) => setAddData({ ...addData, svg_logo: e.target.value })}
                    />
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
                        onClick={putaddData}
                    >
                        Guardar
                    </button></div>
            </div>
        </div>
    );
}