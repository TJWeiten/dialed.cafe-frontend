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

import { Sauce } from "@/types/sauce";
import { SauceForm } from "./SauceForm";
import { SauceDestructionAlert } from "./SauceDestructionAlert";
import { Spinner } from "../ui/shadcn-ui/spinner";

interface SauceModalProps {
    editMode: boolean;
    open: boolean;
    onOpenChange: (open: boolean) => void;
    sauce?: Sauce | undefined;
    rerenderOnSuccess?: () => void;
}

export default function SauceModal({
    editMode = false,
    open,
    onOpenChange,
    sauce,
    rerenderOnSuccess,
}: SauceModalProps) {
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
                        {editMode ? "Edit Sauce" : "Add Sauce"}
                    </DialogTitle>
                    <DialogDescription className="sr-only">
                        {editMode
                            ? "Edit the details of your sauce including name and recipe (or ingredient list)"
                            : "Add a new sauce to your collection"}
                    </DialogDescription>
                </DialogHeader>

                <SauceForm
                    editMode={editMode}
                    sauce={sauce}
                    onOpenChange={onOpenChange}
                    rerenderOnSuccess={rerenderOnSuccess}
                    setIsSubmitting={setIsSubmitting}
                />

                <DialogFooter className="border-t px-6 py-4 sm:items-center">
                    {editMode && (
                        <SauceDestructionAlert
                            sauce={sauce}
                            isSubmitting={isSubmitting}
                            setIsSubmitting={setIsSubmitting}
                            onOpenChange={onOpenChange}
                            rerenderOnSuccess={rerenderOnSuccess}
                        />
                    )}
                    <Button
                        type="submit"
                        form="sauce-form"
                        disabled={isSubmitting}
                        className="w-32"
                    >
                        {isSubmitting ? (
                            <Spinner />
                        ) : editMode ? (
                            "Save Changes"
                        ) : (
                            "Add Sauce"
                        )}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
