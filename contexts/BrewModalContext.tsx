"use client";

import { createContext, useContext, useState, ReactNode } from "react";
import { BrewEntry } from "@/types/brew";

const BrewModalContext = createContext<BrewModalContextType | undefined>(
    undefined,
);

interface BrewModalContextType {
    isOpen: boolean;
    mode: "view" | "add";
    brew?: BrewEntry;
    openViewModal: (brew: BrewEntry) => void;
    openAddModal: () => void;
    closeModal: () => void;
    copilotBrewId: string | null;
    openCopilotModal: (brewId: string) => void;
    closeCopilotModal: () => void;
}

export function BrewModalProvider({ children }: { children: ReactNode }) {
    const [isOpen, setIsOpen] = useState(false);
    const [mode, setMode] = useState<"view" | "add">("view");
    const [brew, setBrew] = useState<BrewEntry | undefined>();
    const [copilotBrewId, setCopilotBrewId] = useState<string | null>(null);

    const openViewModal = (brew: BrewEntry) => {
        setMode("view");
        setBrew(brew);
        setIsOpen(true);
    };

    const openAddModal = () => {
        setMode("add");
        setBrew(undefined);
        setIsOpen(true);
    };

    const closeModal = () => {
        setIsOpen(false);
        setMode("view");
        setBrew(undefined);
    };

    const openCopilotModal = (brewId: string) => {
        setCopilotBrewId(brewId);
    };

    const closeCopilotModal = () => {
        setCopilotBrewId(null);
    };

    return (
        <BrewModalContext.Provider
            value={{
                isOpen,
                mode,
                brew,
                openViewModal,
                openAddModal,
                closeModal,
                copilotBrewId,
                openCopilotModal,
                closeCopilotModal,
            }}
        >
            {children}
        </BrewModalContext.Provider>
    );
}

export function useBrewModal() {
    const context = useContext(BrewModalContext);
    if (!context) {
        throw new Error("useBrewModal must be used within BrewModalProvider");
    }
    return context;
}
