"use client";

import { AsyncDashboardContent } from "@/components/universal/AsyncDashboardContent";
import { useApiData } from "@/hooks/useApiData";
import { BrewLedgerTable } from "@/components/brew/BrewLedgerTable";
import BrewViewModal from "@/components/brew/BrewViewModal";
import BrewEntryModal from "@/components/brew/BrewEntryModal";
import {
    BrewModalProvider,
    useBrewModal,
} from "@/contexts/BrewModalContext";
import { BrewEntry } from "@/types/brew";
import { Bean } from "@/types/bean";
import { Button } from "@/components/ui/shadcn-ui/button";

// TODO: Replace with real API data
const MOCK_BREW_ENTRIES: BrewEntry[] = [
    {
        id: "b1",
        datetime: "2025-07-15T08:30:00",
        beanId: "bean1",
        beanName: "Onyx — Ethiopia Yirgacheffe",
        grinderId: "g1",
        grinderName: "Niche Zero",
        grindSetting: "18",
        doseIn: 18.0,
        yieldOut: 36.5,
        timeTaken: 28,
        rating: "THUMBS_UP",
        madeAs: "ESPRESSO",
        milkType: null,
        waterTemp: 93,
        preInfusionTime: null,
        puckPrepNotes: null,
        waterType: null,
        basketType: "PRECISION_DOUBLE",
        sauceId: null,
        sauceName: null,
        tastingNotes: "Bright, floral, stone fruit finish",
        baristaCopilotComment: "Great extraction! Consider extending the shot by 2 seconds next time to pull out more sweetness.",
    },
    {
        id: "b2",
        datetime: "2025-07-14T09:15:00",
        beanId: "bean2",
        beanName: "B&W — Colombia Huila",
        grinderId: "g2",
        grinderName: "DF64",
        grindSetting: "5",
        doseIn: 18.2,
        yieldOut: 40.0,
        timeTaken: 31,
        rating: "THUMBS_UP",
        madeAs: "MILK_DRINK",
        milkType: "OAT",
        waterTemp: 94,
        preInfusionTime: 5,
        puckPrepNotes: null,
        waterType: null,
        basketType: "PRECISION_DOUBLE",
        sauceId: null,
        sauceName: null,
        tastingNotes: "Chocolate, caramel, great with oat milk",
        baristaCopilotComment: null,
    },
    {
        id: "b3",
        datetime: "2025-07-13T07:45:00",
        beanId: "bean3",
        beanName: "Stumptown — Brazil Santos",
        grinderId: "g1",
        grinderName: "Niche Zero",
        grindSetting: "20",
        doseIn: 17.5,
        yieldOut: 35.0,
        timeTaken: 26,
        rating: "NEUTRAL",
        madeAs: "ESPRESSO",
        milkType: null,
        waterTemp: 92,
        preInfusionTime: null,
        puckPrepNotes: null,
        waterType: null,
        basketType: "PRECISION_DOUBLE",
        sauceId: null,
        sauceName: null,
        tastingNotes: "A bit sour, under-extracted",
        baristaCopilotComment: "Try grinding finer or extending the extraction time. The shot ran 2 seconds short.",
    },
];

function BrewsPageContent() {
    const { data: beansData, error: beansError, loading: beansLoading } = useApiData("/beans");
    const { data: grindersData, error: grindersError, loading: grindersLoading } = useApiData("/grinders");
    const { data: saucesData, error: saucesError, loading: saucesLoading } = useApiData("/sauces");
    const { isOpen, mode, brew, openViewModal, openAddModal, closeModal } = useBrewModal();

    const activeBeans: Bean[] = Array.isArray(beansData)
        ? beansData.filter((b: Bean) => !b.archived)
        : [];
    const grinders: { id: string; name: string }[] = Array.isArray(grindersData)
        ? grindersData
        : [];
    const sauces: { id: string; name: string }[] = Array.isArray(saucesData)
        ? saucesData
        : [];

    return (
        <main className="flex flex-grow items-start justify-center">
            <div className="flex w-full max-w-7xl flex-grow flex-col items-start justify-center gap-8 p-8 pt-10">
                <div className="flex w-full select-none flex-wrap items-center justify-between">
                    <h1 className="text-shadow-[var(--shadowy-text)] text-center text-4xl font-semibold leading-[110%] text-white opacity-90 md:text-7xl">
                        Brew Ledger
                    </h1>
                    <Button
                        onClick={openAddModal}
                        variant="outline"
                        className="text-md mt-6 w-full select-none p-6 lg:mt-0 lg:w-auto"
                    >
                        Log Brew
                    </Button>
                </div>
                <p className="text-shadow-[var(--shadowy-text)] text-center text-xl font-medium tracking-wide text-white md:text-left">
                    Track every shot, log your parameters, and get
                    AI-powered insights to dial in the perfect extraction.
                </p>
                <AsyncDashboardContent loading={false} error={null}>
                    <BrewLedgerTable
                        entries={MOCK_BREW_ENTRIES}
                        onSelectEntry={openViewModal}
                    />
                </AsyncDashboardContent>

                {mode === "view" && (
                    <BrewViewModal
                        open={isOpen}
                        onOpenChange={closeModal}
                        brew={brew}
                    />
                )}
                {mode === "add" && (
                    <BrewEntryModal
                        open={isOpen}
                        onOpenChange={closeModal}
                        beans={activeBeans}
                        grinders={grinders}
                        sauces={sauces}
                    />
                )}
            </div>
        </main>
    );
}

export default function BrewsPage() {
    return (
        <BrewModalProvider>
            <BrewsPageContent />
        </BrewModalProvider>
    );
}
