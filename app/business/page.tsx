import BusinessTable from "@/components/BusinessTable/BusinessTable";

export default function ManageBusiness() {
  return (
    <div className="w-full m-0 h-full flex flex-col">
      <header>
        <h1 className="text-4xl font-bold w-fit mx-auto py-2 bg-clip-text bg-gradient-to-r text-transparent from-blue-600 to-purple-600 text-center">
          Gestionar comercios
        </h1>
      </header>
      <div className="w-full grow justify-center items-center">
        <BusinessTable />
      </div>
    </div>
  );
}
