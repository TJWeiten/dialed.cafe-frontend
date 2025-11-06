"use client";

import { useApiData } from "@/hooks/useApiData";
import { SauceCard } from "@/components/sauce/SauceCard";
import { AsyncDashboardContent } from "@/components/universal/AsyncDashboardContent";
import SauceModal from "@/components/sauce/SauceModal";
import { SauceEmpty } from "@/components/sauce/SauceEmpty";
import { SauceHeader } from "@/components/sauce/SauceHeader";
import {
    SauceModalProvider,
    useSauceModal,
} from "@/contexts/SauceModalContext";
import { Masonry } from "react-plock";

function SaucesPageContent() {
    const { data, error, loading, refetch } = useApiData("/sauces");
    const { isOpen, editMode, sauce, openModal, closeModal } = useSauceModal();
    const connectionError = error ? true : false;
    const emptyData = !!(data && Array.isArray(data) && data.length === 0);

    return (
        <main className="flex flex-grow items-start justify-center">
            <div className="flex w-full max-w-7xl flex-grow flex-col items-start justify-center gap-8 p-8 pt-10">
                <SauceHeader
                    addModalOpen={() => openModal(false)}
                    connectionError={connectionError}
                    emptyData={emptyData}
                />
                <AsyncDashboardContent loading={loading} error={error}>
                    {/* No Sauce Data Found */}
                    {emptyData && (
                        <SauceEmpty
                            addModalOpen={() => openModal(false)}
                            connectionError={connectionError}
                        />
                    )}
                    {/* Sauce Data Found */}
                    {!emptyData && (
                        <div className="flex w-full justify-center">
                            <Masonry
                                items={data || []}
                                config={{
                                    columns: [1, 2, 3],
                                    gap: [24, 24, 24],
                                    media: [768, 1024, 1025],
                                    useBalancedLayout: true,
                                }}
                                className="w-full"
                                render={(item, idx) => (
                                    <SauceCard key={idx} sauce={item} />
                                )}
                            />
                        </div>
                    )}
                </AsyncDashboardContent>
                <SauceModal
                    editMode={editMode}
                    open={isOpen}
                    onOpenChange={closeModal}
                    sauce={sauce}
                    rerenderOnSuccess={refetch}
                />
            </div>
        </main>
    );
}

export default function SaucesPage() {
    return (
        <SauceModalProvider>
            <SaucesPageContent />
        </SauceModalProvider>
    );
}
