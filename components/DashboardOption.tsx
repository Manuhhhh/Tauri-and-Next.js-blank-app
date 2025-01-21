import Image from "next/image";
import "./DashboardOption.css";

type Props = {
  title: string;
  description: string;
  icon: string;
  buttonText: string;
  color?: string;
  href?: string;
};

export default function DashboardOption({
  title,
  description,
  icon,
  buttonText,
  color,
  href,
}: Props) {
  return (
    <div
      className={`dashboard-option flex gap-4 flex-wrap p-8 rounded-2xl w-[600px] h-[400px] shadow-xl transition-all duration-300 ease-in-out ${color} bg-opacity-15`}
    >
      <div className="flex flex-col gap-4 w-full">
        <div className="flex gap-4">
          <Image
            src={icon}
            className={`${color} p-2 rounded-xl bg-opacity-25  0 h-14 w-14`}
            alt="Shop icon"
            width={16}
            height={16}
          />
          <h3 className="text-2xl font-semibold my-auto">{title}</h3>
        </div>
        <p className="text-xl text-slate-600">{description}</p>
        <a
          className={`${color} gap-1 w-fit rounded-md flex items-center justify-center py-2 px-4 text-white mt-auto`}
          href={href}
        >
          <span>{buttonText}</span>
          <Image
            src="/arrow-right.svg"
            alt="Arrow right"
            className="w-5 h-5"
            width={16}
            height={16}
          />
        </a>
      </div>
    </div>
  );
}
