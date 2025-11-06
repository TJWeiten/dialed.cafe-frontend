import { SauceCard } from "./SauceCard";
import { Sauce } from "@/types/sauce";
import { SauceVersion } from "@/types/sauceVersion";

interface SauceDisplayProps {
    sauces: Sauce[];
}

export default function SauceDisplay({ sauces }: SauceDisplayProps) {
    return (
        <div className="grid auto-rows-max grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {sauces.map((sauce) => (
                <SauceCard key={sauce.id} sauce={sauce} />
            ))}
        </div>
    );
}
