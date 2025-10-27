import { GrinderCard } from "./GrinderCard";
import { Grinder } from "@/types/grinder";

interface GrinderDisplayProps {
    grinders: Grinder[];
}

export default function GrinderDisplay({ grinders }: GrinderDisplayProps) {
    return (
        <div className="grid auto-rows-max grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {grinders.map((grinder) => (
                <GrinderCard key={grinder.id} grinder={grinder} />
            ))}
        </div>
    );
}
