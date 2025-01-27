"use client";
import Selector from "../Selector/Selector";
import Image from "next/image";
import { invoke } from "@tauri-apps/api/core";
import { useState, useEffect } from "react";
import BusinessSlot from "./EventSlot/EventSlot";
import SelectorOption from "../Selector/SelectorOption/SelectorOption";
import DeleteWindow from "./DeleteWindow/DeleteWindow";
import EditWindow from "./EditWindow/EditWindow";
import Addwindow from "./AddWindow/AddWindow";
import { HOST } from "@/config";

export default function EventsTable() {
  const [events, setEvents] = useState<DbEvent[]>([]);
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
  const [editData, setEditData] = useState<DbEvent>({
    _id: "",
    title: "",
  });
  const [showEditWindow, setShowEditWindow] = useState<boolean>(false);
  const [categories, setCategories] = useState<Category[]>([]);
  const [showAddWindow, setShowAddWindow] = useState<boolean>(false);

  const handleDelete = (id: string) => {
    setShowDeleteWarning(true);
    setDeleteId(id);
  };

  const handleEdit = (data: DbEvent) => {
    setEditData(data);
    setShowEditWindow(true);
  };

  const
    handleDeleteTrue = async () => {
      await invoke("delete_eve", {
        id: deleteId,
        password: sessionStorage.getItem("pass") ?? "",
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
    setUpdateList(true);
    setShowEditWindow(false);
  };

  useEffect(() => {
    async function fetchEvents() {
      const result = (await invoke("fetch_activities", {
        page: actualPage - 1,
        search: search,
        category: selectedCategory[1],
      })) as ResponseEvents;
      setEvents(result.eventList);
      setTotalPages(result.pagesCount);
    }

    async function fetchCategories() {
          const result = await fetch(`${HOST}/api/categories?filter=events`);
          const data = await result.json();
          const categories = data.categoriesList as Category[];
          setCategories(categories);
        };

    if (updateList) {
      setUpdateList(false);
    }
    fetchEvents();
    fetchCategories();
  }, [actualPage, search, selectedCategory, updateList]);

  const handleCloseAddWindow = () => {
    setShowAddWindow(false);
    setUpdateList(true);
  };

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
          categories={categories}
        />
      )}

      {showAddWindow && (
        <Addwindow
          closeWindow={handleCloseAddWindow}
          categories={categories}
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
        {events.map((event: DbEvent, index: number) => {
          return (
            <BusinessSlot
              key={index}
              data={event}
              onDelete={handleDelete}
              onEdit={handleEdit}
            />
          );
        })}
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
