import { Button } from "@/components/ui/shadcn-ui/button";

interface GrinderHeaderProps {
    addModalOpen: () => void;
    connectionError?: boolean;
    emptyData: boolean;
}

export function GrinderHeader({
    addModalOpen,
    connectionError,
    emptyData,
}: GrinderHeaderProps) {
    return (
        <>
            <div className="flex w-full select-none flex-wrap items-center justify-between">
                <h1 className="text-shadow-[var(--shadowy-text)] text-center text-4xl font-semibold leading-[110%] text-white opacity-90 md:text-7xl">
                    Manage your grinders
                </h1>
                <Button
                    onClick={addModalOpen}
                    variant="outline"
                    className={`text-md mt-6 w-full select-none p-6 lg:mt-0 lg:w-auto ${emptyData ? "hidden" : ""}`}
                    disabled={connectionError}
                >
                    Add Grinder
                </Button>
            </div>
            <p className="text-shadow-[var(--shadowy-text)] text-balance text-center text-xl font-medium tracking-wide text-white">
                Stepped or stepless, flat or conical—let's be honest, there's
                always space to buy another grinder.
            </p>
        </>
    );
}
