"use client";

import { useApiData } from "@/hooks/useApiData";
import { BeanCard } from "@/components/bean/BeanCard";
import { AsyncDashboardContent } from "@/components/universal/AsyncDashboardContent";
import BeanModal from "@/components/bean/BeanModal";
import { BeanEmpty } from "@/components/bean/BeanEmpty";
import { BeanHeader } from "@/components/bean/BeanHeader";
import {
    BeanModalProvider,
    useBeanModal,
} from "@/contexts/BeanModalContext";
import { Bean } from "@/types/bean";
import { Masonry } from "react-plock";

function BeansPageContent() {
    const { data, error, loading, refetch } = useApiData("/beans");
    const { isOpen, editMode, bean, openModal, closeModal } = useBeanModal();
    const connectionError = error ? true : false;
    const emptyData = !!(data && Array.isArray(data) && data.length === 0);

    const allBeans: Bean[] = Array.isArray(data) ? data : [];
    const activeBeans = allBeans.filter((b) => !b.archived);
    const archivedBeans = allBeans.filter((b) => b.archived);

    return (
        <main className="flex flex-grow items-start justify-center">
            <div className="flex w-full max-w-7xl flex-grow flex-col items-start justify-center gap-8 p-8 pt-10">
                <BeanHeader
                    addModalOpen={() => openModal(false)}
                    connectionError={connectionError}
                    emptyData={emptyData}
                />
                <AsyncDashboardContent loading={loading} error={error}>
                    {/* No Bean Data Found */}
                    {emptyData && (
                        <BeanEmpty
                            addModalOpen={() => openModal(false)}
                            connectionError={connectionError}
                        />
                    )}
                    {/* Active Beans */}
                    {!emptyData && activeBeans.length > 0 && (
                        <div className="flex w-full flex-col gap-4">
                            <h2 className="text-shadow-[var(--shadowy-text)] text-lg font-semibold text-white opacity-80">
                                Active Beans
                            </h2>
                            <div className="flex w-full justify-center">
                                <Masonry
                                    items={activeBeans}
                                    config={{
                                        columns: [1, 2, 3],
                                        gap: [24, 24, 24],
                                        media: [768, 1024, 1025],
                                        useBalancedLayout: true,
                                    }}
                                    className="w-full"
                                    render={(item, idx) => (
                                        <BeanCard key={item.id} bean={item} />
                                    )}
                                />
                            </div>
                        </div>
                    )}
                    {/* Archived Beans */}
                    {!emptyData && archivedBeans.length > 0 && (
                        <div className="flex w-full flex-col gap-4">
                            <h2 className="text-shadow-[var(--shadowy-text)] text-lg font-semibold text-white opacity-80">
                                Archived Beans
                            </h2>
                            <div className="flex w-full justify-center">
                                <Masonry
                                    items={archivedBeans}
                                    config={{
                                        columns: [1, 2, 3],
                                        gap: [24, 24, 24],
                                        media: [768, 1024, 1025],
                                        useBalancedLayout: true,
                                    }}
                                    className="w-full"
                                    render={(item, idx) => (
                                        <BeanCard key={item.id} bean={item} />
                                    )}
                                />
                            </div>
                        </div>
                    )}
                </AsyncDashboardContent>
                <BeanModal
                    editMode={editMode}
                    open={isOpen}
                    onOpenChange={closeModal}
                    bean={bean}
                    rerenderOnSuccess={refetch}
                />
            </div>
        </main>
    );
}

export default function BeansPage() {
    return (
        <BeanModalProvider>
            <BeansPageContent />
        </BeanModalProvider>
    );
}
