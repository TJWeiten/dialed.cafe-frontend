"use client";

import { useApiData } from "@/hooks/useApiData";
import { GrinderCard } from "@/components/grinder/GrinderCard";
import { AsyncDashboardContent } from "@/components/universal/AsyncDashboardContent";
import GrinderModal from "@/components/grinder/GrinderModal";
import { GrinderEmpty } from "@/components/grinder/GrinderEmpty";
import { GrinderHeader } from "@/components/grinder/GrinderHeader";
import {
    GrinderModalProvider,
    useGrinderModal,
} from "@/contexts/GrinderModalContext";

function GrindersPageContent() {
    const { data, error, loading, refetch } = useApiData("/grinders");
    const { isOpen, editMode, grinder, openModal, closeModal } =
        useGrinderModal();
    const connectionError = error ? true : false;
    const emptyData = data && Array.isArray(data) && data.length === 0;

    return (
        <main className="flex flex-grow items-start justify-center">
            <div className="flex w-full max-w-7xl flex-grow flex-col items-start justify-center gap-8 p-8 pt-10">
                <GrinderHeader
                    addModalOpen={() => openModal(false)}
                    connectionError={connectionError}
                />
                <AsyncDashboardContent loading={loading} error={error}>
                    {/* No Grinder Data Found */}
                    {emptyData && (
                        <GrinderEmpty
                            addModalOpen={() => openModal(false)}
                            connectionError={connectionError}
                        />
                    )}
                    {/* Grinder Data Found */}
                    {!emptyData && (
                        <div className="flex w-full flex-wrap justify-around gap-8">
                            {data?.map((grinder) => (
                                <GrinderCard
                                    key={grinder.id}
                                    grinder={grinder}
                                />
                            ))}
                        </div>
                    )}
                </AsyncDashboardContent>
                <GrinderModal
                    editMode={editMode}
                    open={isOpen}
                    onOpenChange={closeModal}
                    grinder={grinder}
                    rerenderOnSuccess={refetch}
                />
            </div>
        </main>
    );
}

export default function GrindersPage() {
    return (
        <GrinderModalProvider>
            <GrindersPageContent />
        </GrinderModalProvider>
    );
}
