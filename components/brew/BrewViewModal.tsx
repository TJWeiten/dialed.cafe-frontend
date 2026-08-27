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

import { BrewEntry } from "@/types/brew";
import { Spinner } from "../ui/shadcn-ui/spinner";
import { ThumbsUp, Minus, ThumbsDown, MessageSquare } from "lucide-react";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/shadcn-ui/alert-dialog";

interface BrewViewModalProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    brew?: BrewEntry;
    rerenderOnSuccess?: () => void;
}

function RatingDisplay({ rating }: { rating: BrewEntry["rating"] }) {
    if (rating === "THUMBS_UP") return <ThumbsUp className="size-5 text-green-400" />;
    if (rating === "NEUTRAL") return <Minus className="size-5 text-yellow-400" />;
    if (rating === "THUMBS_DOWN") return <ThumbsDown className="size-5 text-red-400" />;
    return <span className="text-muted-foreground">—</span>;
}

function DataRow({ label, value }: { label: string; value: React.ReactNode }) {
    return (
        <div className="flex items-center justify-between py-1.5">
            <span className="text-sm text-muted-foreground">{label}</span>
        <span className={`text-sm font-medium ${value ? '' : 'text-muted-foreground'}`}>{value ?? "—"}</span>
        </div>
    );
}

export default function BrewViewModal({
    open,
    onOpenChange,
    brew,
    rerenderOnSuccess,
}: BrewViewModalProps) {
    const [isSubmitting, setIsSubmitting] = useState(false);

    if (!brew) return null;

    const date = new Date(brew.datetime);
    const dateStr = date.toLocaleDateString("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric",
    });
    const timeStr = date.toLocaleTimeString("en-US", {
        hour: "numeric",
        minute: "2-digit",
        hour12: true,
    });

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="flex flex-col gap-0 overflow-hidden border-0 p-0 sm:max-h-[min(980px,90vh)] sm:max-w-lg [&>button:last-child]:top-3.5">
                <DialogHeader className="contents space-y-0 text-left">
                    <DialogTitle className="border-b px-6 py-4 text-base">
                        Brew Entry
                    </DialogTitle>
                    <DialogDescription className="sr-only">
                        Details of this brew entry
                    </DialogDescription>
                </DialogHeader>

                <div className="flex-1 min-h-0 overflow-y-auto px-6 py-4 space-y-4">
                    {/* Core info */}
                    <div className="space-y-0 divide-y divide-border">
                        <DataRow label="Date" value={`${dateStr} at ${timeStr}`} />
                        <DataRow label="Bean" value={brew.beanName} />
                        <DataRow label="Made As" value={brew.madeAs.replace(/_/g, " ").toLowerCase().replace(/\b\w/g, (c) => c.toUpperCase())} />
                        <DataRow label="Grinder" value={brew.grinderName} />
                        <DataRow label="Grind Setting" value={brew.grindSetting} />
                        <DataRow label="Dose (In)" value={`${brew.doseIn}g`} />
                        <DataRow label="Yield (Out)" value={`${brew.yieldOut}g`} />
                        <DataRow label="Ratio" value={(brew.yieldOut/brew.doseIn).toFixed(2)} />
                        <DataRow label="Time" value={`${brew.timeTaken}s`} />
                        <DataRow label="Rating" value={<RatingDisplay rating={brew.rating} />} />
                    </div>

                    {/* Optional fields */}
                    {(brew.milkType || brew.milkAmount || brew.waterTemp || brew.preInfusionTime ||
                      brew.waterType || brew.basketType || brew.puckPrepNotes ||
                      brew.sauceName || brew.tastingNotes) && (
                        <div className="space-y-0 divide-y divide-border">
                            {brew.milkType && <DataRow label="Milk Type" value={brew.milkType} />}
                            {brew.milkAmount && <DataRow label="Milk Amount" value={`${brew.milkAmount}ml`} />}
                            {brew.waterTemp && <DataRow label="Water Temp" value={`${brew.waterTemp}°C`} />}
                            {brew.preInfusionTime && <DataRow label="Pre-Infusion" value={`${brew.preInfusionTime}s`} />}
                            {brew.waterType && <DataRow label="Water Type" value={brew.waterType} />}
                            {brew.basketType && (
                                <DataRow
                                    label="Basket"
                                    value={brew.basketType === "OTHER"
                                        ? brew.basketTypeOther
                                        : brew.basketType.replace(/_/g, " ").toLowerCase().replace(/\b\w/g, (c) => c.toUpperCase())}
                                />
                            )}
                            {brew.puckPrepNotes && (
                                <DataRow label="Puck Prep" value={<span className="text-right max-w-[60%] italic">{brew.puckPrepNotes}</span>} />
                            )}
                            {brew.sauceName && (
                                <DataRow label="Sauce/Syrup" value={brew.sauceName} />
                            )}
                            {brew.tastingNotes && (
                                <DataRow label="Tasting Notes" value={<span className="text-right max-w-[60%] italic">{brew.tastingNotes}</span>} />
                            )}
                        </div>
                    )}

                    {/* Barista Copilot Comment */}
                    {brew.baristaCopilotComment && (
                        <div className="rounded-md bg-neutral-800 p-4">
                            <div className="mb-2 flex items-center gap-2 text-sm font-medium text-neutral-300">
                                <MessageSquare className="size-4" />
                                Barista Co-Pilot Comment
                            </div>
                            <p className="text-sm italic text-neutral-200">
                                "{brew.baristaCopilotComment}"
                            </p>
                        </div>
                    )}
                </div>

                <DialogFooter className="border-t px-6 py-4 sm:items-center">
                    <AlertDialog>
                        <AlertDialogTrigger asChild>
                            <Button
                                type="button"
                                variant="outline"
                                disabled={isSubmitting}
                                className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                            >
                                Delete
                            </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                            <AlertDialogHeader>
                                <AlertDialogTitle>Delete Brew Entry</AlertDialogTitle>
                                <AlertDialogDescription>
                                    Are you sure you want to delete this brew entry? This action cannot be undone.
                                </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                <AlertDialogAction
                                    onClick={async () => {
                                        setIsSubmitting(true);
                                        // TODO: Call delete API
                                        onOpenChange(false);
                                        rerenderOnSuccess?.();
                                        setIsSubmitting(false);
                                    }}
                                    className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                                >
                                    {isSubmitting ? <Spinner /> : "Yes, delete it"}
                                </AlertDialogAction>
                            </AlertDialogFooter>
                        </AlertDialogContent>
                    </AlertDialog>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
