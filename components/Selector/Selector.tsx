import { useState } from "react";

type Props = {
    children?: React.ReactNode;
    state: [string, string];
    className?: string;
    placeholder?: string;
};


export default function Selector({ children, state, className, placeholder }: Props) {
  const [show, setShow] = useState(false);
  return (<div className={`flex flex-col gap-2 px-4 w-56 h-10 border rounded-md relative hover:bg-slate-200 cursor-pointer ${className}`} onClick={() => setShow(!show)}>
    <p className="text-nowrap text-ellipsis h-fit my-auto">{state[0] === "" ? (placeholder ? placeholder : "Seleccionar...") : state[0]}</p>
    <div className={`absolute left-0 top-[100%] w-full flex-col border ${show ? "flex" : "hidden"} bg-slate-50`} >
      {children}
    </div>
  </div>);
}