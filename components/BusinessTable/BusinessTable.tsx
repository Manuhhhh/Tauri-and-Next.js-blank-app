"use client";
import Selector from "../Selector/Selector";
import Image from "next/image";
import { invoke } from "@tauri-apps/api/core";
import { useState, useEffect } from "react";
import BusinessSlot from "./BusinessSlot/BusinessSlot";
import SelectorOption from "../Selector/SelectorOption/SelectorOption";
import DeleteWindow from "./DeleteWindow/DeleteWindow";
import EditWindow from "./EditWindow/EditWindow";

export default function BusinessTable() {
  const [businesses, setBusinesses] = useState<Business[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<[string, string]>([
    "Todos",
    "",
  ]);
  const [actualPage, setActualPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [search, setSearch] = useState<string>("");
  const [showDeleteWarning, setShowDeleteWarning] = useState<boolean>(false);
  const [deleteId, setDeleteId] = useState<string>("");
  const [updateList, setUpdateList] = useState<boolean>(false);
  const [editData, setEditData] = useState<Business>({
    _id: "",
    title: "",
  });
  const [showEditWindow, setShowEditWindow] = useState<boolean>(false);

  const handleDelete = (id: string) => {
    setShowDeleteWarning(true);
    setDeleteId(id);
  };

  const handleEdit = (data: Business) => {
    setEditData(data);
    setShowEditWindow(true);
  };

  const 
  handleDeleteTrue = async () => {
    await invoke("delete_bus", {
      id: deleteId,
    });

    setShowDeleteWarning(false);
    setUpdateList(true);
  };

  const handlePreviousPage = () => {
    if (actualPage > 1) {
      setActualPage(actualPage - 1);
    }
  };

  const handleNextPage = () => {
    if (actualPage < totalPages) {
      setActualPage(actualPage + 1);
    }
  };

  const handleCloseWindow = () => {
    setShowEditWindow(false);
  };

  useEffect(() => {
    async function fetchBusinesses() {
      const result = (await invoke("fetch_shops", {
        page: actualPage - 1,
        search: search,
        category: selectedCategory[1],
      })) as ResponseBusiness;
      setBusinesses(result.businessList);
      setTotalPages(result.pagesCount);
    }
    if (updateList) {
      setUpdateList(false);
    }
    fetchBusinesses();
  }, [actualPage, search, selectedCategory, updateList]);

  return (
    <div className="h-full flex flex-col">
      {showDeleteWarning && (
        <DeleteWindow
          onDeleteFalse={setShowDeleteWarning}
          onDeleteTrue={handleDeleteTrue}
        />
      )}

      {showEditWindow && (
        <EditWindow
          data={editData}
          closeWindow={handleCloseWindow}
        />
      )}
      <div className="flex w-full gap-4 py-4 px-4 justify-between items-center">
        <div className="w-full flex h-fit relative">
          <Image
            src="/magnifying-glass.svg"
            alt="Shop icon"
            className="absolute top-0 left-2 w-10 h-10 rounded-md p-2"
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
        <div>
          <Selector state={selectedCategory}>
            <SelectorOption
              setState={setSelectedCategory}
              text="Todos"
              value=""
            />
          </Selector>
        </div>
      </div>
      <div className="w-full grow flex flex-col gap-2 px-4">
        {businesses.map((business: Business, index: number) => {
          return (
            <BusinessSlot
              key={index}
              data={business}
              onDelete={handleDelete}
              onEdit={handleEdit}
            />
          );
        })}
      </div>
      <div className="w-full flex gap-2 justify-center items-center pb-2">
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
    </div>
  );
}
