"use client";

import EventsTable from "@/components/EventsTable/EventTable";
import Image from "next/image";

export default function ManageEvents() {
  return (
    <div className="w-full m-0 h-full flex flex-col">
      <header className="flex items-center">
        <h1 className="text-4xl font-bold ml-4 w-fit py-2 bg-clip-text bg-gradient-to-r text-transparent from-blue-600 to-purple-600 text-center">
          Gestionar actividades y eventos
        </h1>
        <Image src={"/back.svg"} className="ml-auto w-10 h-10 hover:opacity-65 transition-all duration-200" alt="Back" width={32} height={32} onClick={() => {
          window.location.href = "/dashboard";
        }} />
      </header>
      <div className="w-full grow justify-center items-center">
        <EventsTable />
      </div>
    </div>
  );
}
