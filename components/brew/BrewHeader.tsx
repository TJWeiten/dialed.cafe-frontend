import { Button } from "@/components/ui/shadcn-ui/button";

interface BrewHeaderProps {
    addModalOpen: () => void;
    connectionError?: boolean;
    emptyData: boolean;
}

export function BrewHeader({
    addModalOpen,
    connectionError,
    emptyData,
}: BrewHeaderProps) {
    return (
        <>
            <div className="flex w-full select-none flex-wrap items-center justify-between">
                <h1 className="text-shadow-[var(--shadowy-text)] text-center text-4xl font-semibold leading-[110%] text-white opacity-90 md:text-7xl">
                    Brew Ledger
                </h1>
                <Button
                    onClick={addModalOpen}
                    variant="outline"
                    className={`text-md mt-6 w-full select-none p-6 lg:mt-0 lg:w-auto ${emptyData ? "hidden" : ""}`}
                    disabled={connectionError}
                >
                    Log Brew
                </Button>
            </div>
            <p className="text-shadow-[var(--shadowy-text)] text-center text-xl font-medium tracking-wide text-white md:text-left">
                Track every shot, log your parameters, and get AI-powered
                insights to dial in the perfect extraction.
            </p>
        </>
    );
}
