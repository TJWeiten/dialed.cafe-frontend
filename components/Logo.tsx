import Image from "next/image";

export default function Logo() {
  return (
    <div className="mt-24 flex w-full items-center justify-center overflow-x-hidden">
      <h1 className="relative leading-none font-bold tracking-[2em] italic">
        <span className="block text-[12rem] text-black opacity-20 select-none">
          DIALED
        </span>
      </h1>
    </div>
  );
}
