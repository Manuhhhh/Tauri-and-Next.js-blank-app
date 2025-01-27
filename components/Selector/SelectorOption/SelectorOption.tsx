import { useEffect } from "react";
import "./SelectorOption.css";

type Props = {
    setState: React.Dispatch<React.SetStateAction<[string, string]>>;
    text: string;
    value: string;
    defaultSelected?: boolean;
};

export default function SelectorOption({ setState, text, value, defaultSelected }: Props) {
  useEffect(() => {
    if (defaultSelected) {
      setState([text, value]);
    }
  }, [defaultSelected, setState, text, value]);
  return (
    <div
      className="flex flex-col gap-2 px-4 py-2 rounded-md hover:bg-blue-500 selector-option-class hover:cursor-pointer" 
      onClick={() => setState([text, value])}
    >
      <p className="text-md text-slate-600 select-none">{text}</p>
    </div>
  );
}