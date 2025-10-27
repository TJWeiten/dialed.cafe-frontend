"use client";

import { useEffect, useRef, useState } from "react";

import { Button } from "@/components/ui/shadcn-ui/button";
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/shadcn-ui/dialog";

import { Grinder } from "@/types/grinder";
import { GrinderForm } from "./GrinderForm";
import { GrinderDestructionAlert } from "./GrinderDestructionAlert";
import { Spinner } from "../ui/shadcn-ui/spinner";

interface GrinderModalProps {
    editMode: boolean;
    open: boolean;
    onOpenChange: (open: boolean) => void;
    grinder?: Grinder | undefined;
    rerenderOnSuccess?: () => void;
}

export default function GrinderModal({
    editMode = false,
    open,
    onOpenChange,
    grinder,
    rerenderOnSuccess,
}: GrinderModalProps) {
    const [isSubmitting, setIsSubmitting] = useState(false);

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent
                className="flex flex-col gap-0 p-0 sm:max-h-[min(980px,90vh)] sm:max-w-2xl [&>button:last-child]:top-3.5"
                onOpenAutoFocus={(e) => e.preventDefault()}
                onCloseAutoFocus={(e) => e.preventDefault()}
            >
                <DialogHeader className="contents space-y-0 text-left">
                    <DialogTitle className="border-b px-6 py-4 text-base">
                        {editMode ? "Edit Grinder" : "Add Grinder"}
                    </DialogTitle>
                    <DialogDescription className="sr-only">
                        {editMode
                            ? "Edit the details of your grinder including name, burr type, and settings"
                            : "Add a new grinder to your collection (we won't ask how much you spent)"}
                    </DialogDescription>
                </DialogHeader>

                <GrinderForm
                    editMode={editMode}
                    grinder={grinder}
                    onOpenChange={onOpenChange}
                    rerenderOnSuccess={rerenderOnSuccess}
                    setIsSubmitting={setIsSubmitting}
                />

                <DialogFooter className="border-t px-6 py-4 sm:items-center">
                    {editMode && (
                        <GrinderDestructionAlert
                            grinder={grinder}
                            isSubmitting={isSubmitting}
                            setIsSubmitting={setIsSubmitting}
                            onOpenChange={onOpenChange}
                            rerenderOnSuccess={rerenderOnSuccess}
                        />
                    )}
                    <Button
                        type="submit"
                        form="grinder-form"
                        disabled={isSubmitting}
                        className="w-32"
                    >
                        {isSubmitting ? (
                            <Spinner />
                        ) : editMode ? (
                            "Save Changes"
                        ) : (
                            "Add Grinder"
                        )}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
