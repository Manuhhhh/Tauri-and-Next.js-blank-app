import DashboardOption from "@/components/DashboardOption";

export default function Dashboard() {
  return (
    <div className="h-full w-full flex flex-col">
      <header>
        <h1 className="text-4xl font-bold w-fit mx-auto bg-clip-text mt-2 bg-gradient-to-r text-transparent from-blue-600 to-purple-600 text-center">
          Panel de administración CCP
        </h1>
      </header>
      <main className="w-full flex flex-col pt-5 mt-5 items-center grow overflow-auto">
        <div className="flex flex-wrap gap-4 justify-center items-center">
          <DashboardOption
            title="Gestionar comercios adheridos"
            description="Administre los comercios participantes y sus datos."
            icon="/shop.svg"
            buttonText="Gestionar comercios"
            color="bg-[#2563eb]"
            href="/business"
          />
          <DashboardOption
            title="Administrar actividades y eventos"
            description="Gestione las actividades y eventos programados en la plataforma."
            icon="/calendar.svg"
            buttonText="Administrar actividades"
            color="bg-[#16a34a]"
            href="/activities"
          />
          <DashboardOption
            title="Gestionar categorías"
            description="Organice y gestione las categorías de tus productos."
            icon="/categories.svg"
            buttonText="Administrar categorías"
            color="bg-[#c21d1d]"
            href="/categories"
          />
        </div>
      </main>
    </div>
  );
}
