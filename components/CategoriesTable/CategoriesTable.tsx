"use client";
import Image from "next/image";
import { useState } from "react";
import { useEffect } from "react";
import Addwindow from "./AddWindow/AddWindow";
import { HOST } from "@/config";
import './CategoriesTable.css';
import ViewWindow from "./ViewWindow/ViewWindow";
import DeleteWindow from "./DeleteWindow/DeleteWindow";
import { invoke } from "@tauri-apps/api/core";

export default function CategoriesTable() {
    const [search, setSearch] = useState<string>("");
    const [actualPage, setActualPage] = useState<number>(1);
    const [totalPages, setTotalPages] = useState<number>(1);
    const [categories, setCategories] = useState<Category[]>([]);
    const [updateTable, setUpdateTable] = useState<boolean>(false);
    const [showAddWindow, setShowAddWindow] = useState<boolean>(false);
    const [showViewWindow, setShowViewWindow] = useState<boolean>(false);
    const [showDeleteWindow, setShowDeleteWindow] = useState<boolean>(false);

    const [deleteId, setDeleteId] = useState<string>("");

    const [windowData, setWindowData] = useState<Category | null>(null);

    const handlePreviousPage = () => {
        if (actualPage > 1) {
            setActualPage(actualPage - 1);
        }
    }

    const handleNextPage = () => {
        if (actualPage < totalPages) {
            setActualPage(actualPage + 1);
        }
    }

    const handleDeleteTrue = () => {
        setShowDeleteWindow(false);
        setUpdateTable(true);

        invoke("delete_cat", { data: { category_id: deleteId, password: sessionStorage.getItem("pass") } });
    }

    useEffect(() => {
        fetch(`${HOST}/api/categories?search=${search}&page=${actualPage}`)
            .then((res) => res.json())
            .then((data) => {
                setCategories(data.categoriesList);
                setTotalPages(data.pagesCount);
            });

        if (updateTable) {
            setUpdateTable(false);
        }
    }, [search, actualPage, updateTable]);

    const handleView = (data: Category) => {
        setWindowData(data);
        setShowViewWindow(true);
    };

    const handleCloseView = () => {
        setShowViewWindow(false);
    }

    return (<div className="h-full flex flex-col">
        {
            showAddWindow && <Addwindow closeWindow={() => {
                setShowAddWindow(false)
                setUpdateTable(true)
            }} />
        }
        {
            showViewWindow && <ViewWindow data={windowData as Category} handleClose={handleCloseView} />
        }
        {
            showDeleteWindow && <DeleteWindow onDeleteFalse={() => setShowDeleteWindow(false)} onDeleteTrue={handleDeleteTrue} />
        }
        <div className="w-full flex h-fit relative px-10">
            <Image
                src="/magnifying-glass.svg"
                alt="Shop icon"
                className="absolute top-0 left-12 w-10 h-10 rounded-md p-2"
                width={16}
                height={16}
            />
            <input
                type="text"
                className="w-full h-10 rounded-md pl-10 text-md outline-none border text-slate-600"
                value={search}
                onChange={(e) => {
                    setSearch(e.target.value);
                    setActualPage(1);
                }}
            />
        </div>
        <div className="w-full flex grow flex-col items-center mt-12                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     ">
            {
                categories.map((category) => {
                    const htmlSVG = { __html: category.svg_logo as TrustedHTML };
                    return (
                        <div key={category._id.toString()} className={`w-full flex gap-2 items-center border-b border-slate-200 p-4 ${category.permanent ? 'bg-blue-600 bg-opacity-10' : ''}`}>
                            <div dangerouslySetInnerHTML={htmlSVG} className="w-10 h-10 svg-container">

                            </div>
                            <p className="text-lg">{category.name}</p>

                            <span className="mx-auto"></span>
                            {
                                category.permanent ? (
                                    <div className="flex gap-2">
                                        <button className="category-slot-button" onClick={() => { handleView(category) }}>Ver</button>
                                    </div>) : (
                                    <div className="flex gap-2">
                                        <button className="category-slot-button">Editar</button>
                                        <button className="category-slot-button" onClick={() => {
                                            setDeleteId(category._id.toString());
                                            setShowDeleteWindow(true);
                                        }}>Eliminar</button>
                                    </div>
                                )
                            }
                        </div>
                    );
                })
            }
        </div>
        <div className="w-full flex justify-center items-center pb-2 relative">
            <div className="flex gap-2 items-center">
                <button className="rounded-md bg-blue-500 px-4 py-2 text-white">
                    <Image
                        src="/left-arrow.svg"
                        className="w-6 h-6"
                        alt="Previous"
                        width={16}
                        height={16}
                        onClick={handlePreviousPage}
                    />
                </button>
                <p className="text-center text-xl text-slate-600">
                    Página {actualPage} de {totalPages}
                </p>
                <button className="rounded-md bg-blue-500 px-4 py-2 text-white">
                    <Image
                        src="/right-arrow.svg"
                        className="w-6 h-6"
                        alt="Next"
                        width={16}
                        height={16}
                        onClick={handleNextPage}
                    />
                </button>
            </div>
            <div className="absolute right-4 h-full top-0 flex items-center justify-center">
                <button className="rounded-md bg-blue-500 px-4 py-2 text-white" onClick={() => setShowAddWindow(true)}>
                    <Image
                        src="/plus.svg"
                        className="w-6 h-6"
                        alt="Add"
                        width={16}
                        height={16}
                    />
                </button>
            </div>
        </div>
    </div>
    );
}