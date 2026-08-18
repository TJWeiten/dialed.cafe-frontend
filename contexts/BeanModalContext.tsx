"use client";

import { createContext, useContext, useState, ReactNode } from "react";
import { Bean } from "@/types/bean";

const BeanModalContext = createContext<BeanModalContextType | undefined>(
    undefined,
);

interface BeanModalContextType {
    isOpen: boolean;
    editMode: boolean;
    bean?: Bean;
    duplicateBean?: Bean;
    openModal: (editMode: boolean, bean?: Bean) => void;
    openDuplicateModal: (bean: Bean) => void;
    closeModal: () => void;
}

export function BeanModalProvider({ children }: { children: ReactNode }) {
    const [isOpen, setIsOpen] = useState(false);
    const [editMode, setEditMode] = useState(false);
    const [bean, setBean] = useState<Bean | undefined>();
    const [duplicateBean, setDuplicateBean] = useState<Bean | undefined>();

    const openModal = (editMode: boolean, bean?: Bean) => {
        setEditMode(editMode);
        setBean(bean);
        setDuplicateBean(undefined);
        setIsOpen(true);
    };

    const openDuplicateModal = (bean: Bean) => {
        setDuplicateBean(bean);
        setBean(undefined);
        setEditMode(false);
        setIsOpen(true);
    };

    const closeModal = () => {
        setIsOpen(false);
        setEditMode(false);
        setBean(undefined);
        setDuplicateBean(undefined);
    };

    return (
        <BeanModalContext.Provider
            value={{
                isOpen,
                editMode,
                bean,
                duplicateBean,
                openModal,
                openDuplicateModal,
                closeModal,
            }}
        >
            {children}
        </BeanModalContext.Provider>
    );
}

export function useBeanModal() {
    const context = useContext(BeanModalContext);
    if (!context) {
        throw new Error("useBeanModal must be used within BeanModalProvider");
    }
    return context;
}
