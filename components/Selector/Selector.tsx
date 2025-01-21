import { useState } from "react";

type Props = {
    children: React.ReactNode;
    state: [string, string];
};


export default function Selector({ children, state }: Props) {
  const [show, setShow] = useState(false);
  return (<div className="flex flex-col gap-2 px-4 w-56 h-10 border rounded-md relative hover:bg-slate-200 cursor-pointer" onClick={() => setShow(!show)}>
    <p className="text-nowrap text-ellipsis h-fit my-auto">{state[0] === "" ? "Seleccionar categoría" : state}</p>
    <div className={`absolute left-0 top-[100%] w-full flex-col border ${show ? "flex" : "hidden"} bg-slate-50`} >
      {children}
    </div>
  </div>);
}