"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

const ActiveLink = ({ title, destination, onClick }) => {
  const path = usePathname();
  const active = path === destination;


  return (
    <Link href={destination} onClick={onClick} className="group">
      <span
        className={`
          text-white font-bold px-5 pb-1 z-[-12]
          border-b-2 border-transparent 
          transition-all duration-300
          hover:border-green-300 hover:scale-105
          text-[16px]
          ${active ? "border-sky-300 scale-105" : ""}
        `}
      >
        {title}
      </span>
       
    </Link>
  );
};

export default ActiveLink;