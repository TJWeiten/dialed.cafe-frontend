"use client";

import { createContext, useContext, useState, ReactNode } from "react";
import { Grinder } from "@/types/grinder";

const GrinderModalContext = createContext<GrinderModalContextType | undefined>(
    undefined,
);

interface GrinderModalContextType {
    isOpen: boolean;
    editMode: boolean;
    grinder?: Grinder;
    openModal: (editMode: boolean, grinder?: Grinder) => void;
    closeModal: () => void;
}

export function GrinderModalProvider({ children }: { children: ReactNode }) {
    const [isOpen, setIsOpen] = useState(false);
    const [editMode, setEditMode] = useState(false);
    const [grinder, setGrinder] = useState<Grinder | undefined>();

    const openModal = (editMode: boolean, grinder?: Grinder) => {
        setEditMode(editMode);
        setGrinder(grinder);
        setIsOpen(true);
    };

    const closeModal = () => {
        setIsOpen(false);
        setEditMode(false);
        setGrinder(undefined);
    };

    return (
        <GrinderModalContext.Provider
            value={{
                isOpen,
                editMode,
                grinder,
                openModal,
                closeModal,
            }}
        >
            {children}
        </GrinderModalContext.Provider>
    );
}

export function useGrinderModal() {
    const context = useContext(GrinderModalContext);
    if (!context) {
        throw new Error(
            "useGrinderModal must be used within GrinderModalProvider",
        );
    }
    return context;
}
