import { LocaleChanger } from "@/features";
import Image from "next/image";

export const Header = () => {
  return (
    <header className="w-full h-16 bg-[#500002] flex items-center justify-between px-10 py-2">
      <Image src={"/logo.svg"} alt="logo" width={60} height={55} />
      <LocaleChanger />
    </header>
  );
};
