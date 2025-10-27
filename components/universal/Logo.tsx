"use client";
import FuzzyText from "@/components/ui/shadcn-io/fuzzy-text";

export default function Logo() {
  return (
    <div className="mt-24 flex w-full items-center justify-center overflow-x-hidden">
      <h1 className="relative leading-none font-bold tracking-[2em] italic">
        <span className="block text-[12rem] text-black opacity-20 select-none">
          <FuzzyText
            fontSize="clamp(12rem, 12vw, 12rem)"
            fontWeight={900}
            color="#000"
            baseIntensity={0.5}
          >
            DIALED
          </FuzzyText>
        </span>
      </h1>
    </div>
  );
}
