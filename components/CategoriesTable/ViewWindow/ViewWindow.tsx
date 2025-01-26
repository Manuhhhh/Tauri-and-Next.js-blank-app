type ViewWindowProps = {
    data: Category
    handleClose: () => void
}

export default function ViewWindow({ data, handleClose }: ViewWindowProps) {
    return (
        <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center">
            <div className="flex flex-col gap-4 items-center justify-center bg-white border p-4 rounded-md z-50 overflow-y-auto max-h-screen">
                <h1 className="text-center">Información de la categoría</h1>
                <div className="grid gap-x-2 w-full">
                    <div>
                        <p>Nombre de la categoría</p>
                        <p
                            className="w-full rounded-md p-2 outline-none border text-slate-600"
                        >{
                                data.name
                            }</p>
                    </div>
                    <div>
                        <p>Descripción</p>
                        <p
                            className="wrounded-md p-2 outline-none border min-h-20 w-96 text-slate-600">{data.description}</p>
                    </div>
                    <div>
                        <p>Tipo de categoría (Comercio/Actividad/Permanente)</p>
                        <p
                            className="wrounded-md p-2 outline-none border min-h-20 w-96 text-slate-600">{data.permanent ? "Categoría Permanente" : (data.type === "business" ? "Comercio Adherido" : "Actividad Turística")}</p>
                    </div>

                    <div className="w-full flex gap-2 mt-2">
                        <button
                            className="w-full rounded-md bg-blue-500 px-4 py-2 text-white"
                            onClick={handleClose}
                        >
                            Aceptar
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}