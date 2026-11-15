"use client";

import { useMemo } from "react";
import { AsyncDashboardContent } from "@/components/universal/AsyncDashboardContent";
import { useApiData } from "@/hooks/useApiData";
import { BrewLedgerTable } from "@/components/brew/BrewLedgerTable";
import BrewViewModal from "@/components/brew/BrewViewModal";
import BrewEntryModal from "@/components/brew/BrewEntryModal";
import { BrewHeader } from "@/components/brew/BrewHeader";
import { BrewEmpty } from "@/components/brew/BrewEmpty";
import {
    BrewModalProvider,
    useBrewModal,
} from "@/contexts/BrewModalContext";
import { BrewEntry } from "@/types/brew";
import { Bean } from "@/types/bean";

// Maps backend Brew entity to frontend BrewEntry type
function mapBrewToEntry(brew: any): BrewEntry {
    return {
        id: brew.id,
        datetime: brew.brewDate,
        beanId: brew.bean?.id || "",
        beanName: brew.bean ? `${brew.bean.roaster} — ${brew.bean.name}` : "Unknown",
        grinderId: brew.grinder?.id || "",
        grinderName: brew.grinder?.name || "Unknown",
        grindSetting: brew.grindSetting || "",
        doseIn: brew.weightIn || 0,
        yieldOut: brew.weightOut || 0,
        timeTaken: brew.timePulled || 0,
        rating: brew.rating || null,
        madeAs: brew.madeAs || "ESPRESSO",
        milkType: brew.milkType || null,
        milkAmount: brew.milkAmount || null,
        waterTemp: brew.waterTemp || null,
        preInfusionTime: brew.preinfusionTime || null,
        puckPrepNotes: brew.puckPrepNotes || null,
        waterType: brew.waterType || null,
        basketType: brew.basketType || null,
        basketTypeOther: null,
        sauceId: brew.sauceVersion?.id || null,
        sauceName: brew.sauceVersion?.sauce?.name || null,
        tastingNotes: brew.tastingNotes || null,
        copilotNotes: brew.copilotNotes || null,
        baristaCopilotComment: brew.copilotComment || null,
    };
}

function BrewsPageContent() {
    const { data: beansData, error: beansError, loading: beansLoading } = useApiData("/beans");
    const { data: grindersData, error: grindersError, loading: grindersLoading } = useApiData("/grinders");
    const { data: saucesData, error: saucesError, loading: saucesLoading } = useApiData("/sauces");
    const { data: brewData, error: brewError, loading: brewLoading, refetch } = useApiData("/brews");

    const brewEntries: BrewEntry[] = useMemo(
        () => (Array.isArray(brewData) ? brewData.map(mapBrewToEntry) : []),
        [brewData],
    );

    const { isOpen, mode, brew, openViewModal, openAddModal, closeModal } = useBrewModal();

    const connectionError = brewError ? true : false;
    const emptyData = !!(brewData && Array.isArray(brewData) && brewData.length === 0);

    const activeBeans: Bean[] = Array.isArray(beansData)
        ? beansData.filter((b: Bean) => !b.archived)
        : [];
    const grinders: { id: string; name: string }[] = Array.isArray(grindersData)
        ? grindersData
        : [];
    const sauces: { id: string; name: string; latestVersionId?: string }[] =
        Array.isArray(saucesData)
            ? saucesData.map((s: any) => ({
                  id: s.id,
                  name: s.name,
                  latestVersionId: s.latestVersion?.id,
              }))
            : [];

    return (
        <main className="flex flex-grow items-start justify-center">
            <div className="flex w-full max-w-7xl flex-grow flex-col items-start justify-center gap-8 p-8 pt-10">
                <BrewHeader
                    addModalOpen={openAddModal}
                    connectionError={connectionError}
                    emptyData={emptyData}
                />
                <AsyncDashboardContent loading={brewLoading} error={brewError}>
                    {/* No Brew Data Found */}
                    {emptyData && (
                        <BrewEmpty
                            addModalOpen={openAddModal}
                            connectionError={connectionError}
                        />
                    )}
                    {/* Brew Data Found */}
                    {!emptyData && (
                        <BrewLedgerTable
                            entries={brewEntries}
                            onSelectEntry={openViewModal}
                        />
                    )}
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
                        rerenderOnSuccess={refetch}
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