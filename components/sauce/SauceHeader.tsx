import { Button } from "@/components/ui/shadcn-ui/button";

interface SauceHeaderProps {
    addModalOpen: () => void;
    connectionError?: boolean;
    emptyData: boolean;
}

export function SauceHeader({
    addModalOpen,
    connectionError,
    emptyData,
}: SauceHeaderProps) {
    return (
        <>
            <div className="flex w-full select-none flex-wrap items-center justify-between">
                <h1 className="text-shadow-[var(--shadowy-text)] text-center text-4xl font-semibold leading-[110%] text-white opacity-90 md:text-7xl">
                    Create a delicious sauce
                </h1>
                <Button
                    onClick={addModalOpen}
                    variant="outline"
                    className={`text-md mt-6 w-full select-none p-6 lg:mt-0 lg:w-auto ${emptyData ? "hidden" : ""}`}
                    disabled={connectionError}
                >
                    Add Sauce
                </Button>
            </div>
            <p className="text-shadow-[var(--shadowy-text)] text-center text-xl font-medium tracking-wide text-white md:text-left">
                Whether it be for your caramel macchiato, or a simple caffè
                mocha—keep track of your favorite ways to flavor your drinks.
            </p>
        </>
    );
}
