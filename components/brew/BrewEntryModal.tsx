"use client";

import { useState } from "react";

import { Button } from "@/components/ui/shadcn-ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/shadcn-ui/dialog";

import { Bean } from "@/types/bean";
import { BrewForm } from "./BrewForm";
import { Spinner } from "../ui/shadcn-ui/spinner";

interface BrewEntryModalProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    beans: Bean[];
    grinders: { id: string; name: string }[];
    sauces: { id: string; name: string; latestVersionId?: string }[];
    rerenderOnSuccess?: () => void;
    onBrewSaved?: (brewId: string) => void;
}

export default function BrewEntryModal({
    open,
    onOpenChange,
    beans,
    grinders,
    sauces,
    rerenderOnSuccess,
    onBrewSaved,
}: BrewEntryModalProps) {
    const [isSubmitting, setIsSubmitting] = useState(false);

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent
                className="flex flex-col gap-0 overflow-hidden border-0 p-0 sm:max-h-[min(980px,90vh)] sm:max-w-2xl [&>button:last-child]:top-3.5"
                onOpenAutoFocus={(e) => e.preventDefault()}
                onCloseAutoFocus={(e) => e.preventDefault()}
            >
                <DialogHeader className="contents space-y-0 text-left">
                    <DialogTitle className="border-b px-6 py-4 text-base">
                        Log Brew
                    </DialogTitle>
                    <DialogDescription className="sr-only">
                        Add a new brew entry to your ledger
                    </DialogDescription>
                </DialogHeader>

                <BrewForm
                    onOpenChange={onOpenChange}
                    rerenderOnSuccess={rerenderOnSuccess}
                    onBrewSaved={onBrewSaved}
                    setIsSubmitting={setIsSubmitting}
                    beans={beans}
                    grinders={grinders}
                    sauces={sauces}
                />

                <DialogFooter className="border-t px-6 py-4 sm:items-center">
                    <Button
                        type="submit"
                        form="brew-form"
                        disabled={isSubmitting}
                        className="w-32"
                    >
                        {isSubmitting ? <Spinner /> : "Save Brew"}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}