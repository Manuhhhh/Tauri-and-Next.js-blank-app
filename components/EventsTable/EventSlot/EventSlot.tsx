import Image from "next/image";

type Props = {
  data: DbEvent;
  onDelete?: (id: string) => void;
  onEdit?: (data: DbEvent) => void;
};

export default function EventSlot({ data, onDelete, onEdit }: Props) {
  console.log(data);
  return (
    <div className="flex w-full rounded-xl shadow-xl px-12 py-6 bg-slate-50 border border-slate-300">
      <div className="mr-4 w-20 min-w-20 h-16 rounded-xl shadow-xl bg-slate-50 border">
        <Image
          src={data.image ? data.image : "/shop.svg"}
          alt="Business image"
          className={`w-full h-full rounded-xl ${data.image ? "object-cover" : "p-2"}`}
          width={400}
          height={400}
        />
      </div>
      <div className="flex flex-col gap-2 w-full">
        <h3 className="text-xl font-semibold">{data.title}</h3>
        <p className="text-sm text-slate-600">{data.location ? data.location : ""}</p>
      </div>
      <div className="flex justify-center items-center gap-3">
        <button className="w-fit text-nowrap text-white bg-blue-500 px-4 py-2 rounded-xl hover:bg-blue-600 transition-all duration-200" onClick={() => onEdit && onEdit(data)}>Editar</button>
        <button className="w-fit text-nowrap text-white bg-blue-500 px-4 py-2 rounded-xl hover:bg-blue-600 transition-all duration-200" onClick={() => onDelete && onDelete(data._id)}>Eliminar</button>
      </div>
    </div>
  );
}
