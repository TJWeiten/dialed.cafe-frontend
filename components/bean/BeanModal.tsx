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
import { BeanForm } from "./BeanForm";
import { BeanDestructionAlert } from "./BeanDestructionAlert";
import { Spinner } from "../ui/shadcn-ui/spinner";

interface BeanModalProps {
    editMode: boolean;
    open: boolean;
    onOpenChange: (open: boolean) => void;
    bean?: Bean | undefined;
    rerenderOnSuccess?: () => void;
}

export default function BeanModal({
    editMode = false,
    open,
    onOpenChange,
    bean,
    rerenderOnSuccess,
}: BeanModalProps) {
    const [isSubmitting, setIsSubmitting] = useState(false);

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent
                className="flex flex-col gap-0 overflow-hidden p-0 sm:max-h-[min(980px,90vh)] sm:max-w-2xl [&>button:last-child]:top-3.5"
                onOpenAutoFocus={(e) => e.preventDefault()}
                onCloseAutoFocus={(e) => e.preventDefault()}
            >
                <DialogHeader className="contents space-y-0 text-left">
                    <DialogTitle className="border-b px-6 py-4 text-base">
                        {editMode ? "Edit Bean" : "Add Bean"}
                    </DialogTitle>
                    <DialogDescription className="sr-only">
                        {editMode
                            ? "Edit the details of your bean including name, roast level, and process"
                            : "Add a new bean to your collection"}
                    </DialogDescription>
                </DialogHeader>

                <BeanForm
                    editMode={editMode}
                    bean={bean}
                    onOpenChange={onOpenChange}
                    rerenderOnSuccess={rerenderOnSuccess}
                    setIsSubmitting={setIsSubmitting}
                />

                <DialogFooter className="border-t px-6 py-4 sm:items-center">
                    {editMode && (
                        <BeanDestructionAlert
                            bean={bean}
                            isSubmitting={isSubmitting}
                            setIsSubmitting={setIsSubmitting}
                            onOpenChange={onOpenChange}
                            rerenderOnSuccess={rerenderOnSuccess}
                        />
                    )}
                    <Button
                        type="submit"
                        form="bean-form"
                        disabled={isSubmitting}
                        className="w-32"
                    >
                        {isSubmitting ? (
                            <Spinner />
                        ) : editMode ? (
                            "Save Changes"
                        ) : (
                            "Add Bean"
                        )}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
