"use client";

import { createContext, useContext, useState, ReactNode } from "react";
import { Sauce, SauceVersion } from "@/types/sauce";

const SauceModalContext = createContext<SauceModalContextType | undefined>(
    undefined,
);

interface SauceModalContextType {
    isOpen: boolean;
    editMode: boolean;
    sauce?: Sauce;
    openModal: (editMode: boolean, sauce?: Sauce) => void;
    closeModal: () => void;
}

export function SauceModalProvider({ children }: { children: ReactNode }) {
    const [isOpen, setIsOpen] = useState(false);
    const [editMode, setEditMode] = useState(false);
    const [sauce, setSauce] = useState<Sauce | undefined>();

    const openModal = (editMode: boolean, sauce?: Sauce) => {
        setEditMode(editMode);
        setSauce(sauce);
        setIsOpen(true);
    };

    const closeModal = () => {
        setIsOpen(false);
        setEditMode(false);
        setSauce(undefined);
    };

    return (
        <SauceModalContext.Provider
            value={{
                isOpen,
                editMode,
                sauce,
                openModal,
                closeModal,
            }}
        >
            {children}
        </SauceModalContext.Provider>
    );
}

export function useSauceModal() {
    const context = useContext(SauceModalContext);
    if (!context) {
        throw new Error("useSauceModal must be used within SauceModalProvider");
    }
    return context;
}
