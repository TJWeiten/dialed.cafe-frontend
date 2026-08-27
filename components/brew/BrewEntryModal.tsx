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

import { Spinner } from "../ui/shadcn-ui/spinner";
import { ThumbsUp, Minus, ThumbsDown } from "lucide-react";
import {
    Field,
    FieldDescription,
    FieldGroup,
    FieldLabel,
    FieldSet,
} from "@/components/ui/shadcn-ui/field";
import { Input } from "@/components/ui/shadcn-ui/input";
import { Textarea } from "@/components/ui/shadcn-ui/textarea";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/shadcn-ui/select";
import { cn } from "@/lib/utils";
import { Bean } from "@/types/bean";

interface BrewEntryModalProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    beans: Bean[];
    grinders: { id: string; name: string }[];
    sauces: { id: string; name: string }[];
}

export default function BrewEntryModal({
    open,
    onOpenChange,
    beans,
    grinders,
    sauces,
}: BrewEntryModalProps) {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [rating, setRating] = useState<"THUMBS_UP" | "NEUTRAL" | "THUMBS_DOWN" | null>(null);
    const [madeAs, setMadeAs] = useState<string>("ESPRESSO");
    const [showOptional, setShowOptional] = useState(false);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsSubmitting(true);
        try {
            const formData = new FormData(e.currentTarget);
            const data = Object.fromEntries(formData.entries());
            // TODO: Call create API
            console.log("Brew entry data:", { ...data, rating, madeAs });
            onOpenChange(false);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="flex flex-col gap-0 overflow-hidden border-0 p-0 sm:max-h-[min(980px,90vh)] sm:max-w-2xl [&>button:last-child]:top-3.5">
                <DialogHeader className="contents space-y-0 text-left">
                    <DialogTitle className="border-b px-6 py-4 text-base">
                        Log Brew
                    </DialogTitle>
                    <DialogDescription className="sr-only">
                        Add a new brew entry to your ledger
                    </DialogDescription>
                </DialogHeader>

                <div className="flex-1 min-h-0 overflow-y-auto">
                    <form id="brew-form" onSubmit={handleSubmit}>
                        <div className="px-6 py-4">
                            <FieldSet>
                                <FieldGroup>
                                    {/* Datetime */}
                                    <Field>
                                        <FieldLabel htmlFor="brewDatetime">
                                            Date & Time <span className="text-red-500">*</span>
                                        </FieldLabel>
                                        <div className="flex gap-2">
                                            <Input
                                                name="datetime"
                                                id="brewDatetime"
                                                type="datetime-local"
                                                defaultValue={new Date().toISOString().slice(0, 16)}
                                                required
                                                className="flex-1"
                                            />
                                            <Button
                                                type="button"
                                                variant="outline"
                                                size="sm"
                                                onClick={() => {
                                                    const input = document.getElementById("brewDatetime") as HTMLInputElement;
                                                    if (input) {
                                                        input.value = new Date().toISOString().slice(0, 16);
                                                    }
                                                }}
                                            >
                                                Now
                                            </Button>
                                        </div>
                                    </Field>

                                    {/* Bean Selector */}
                                    <Field>
                                        <FieldLabel htmlFor="brewBean">
                                            Bean <span className="text-red-500">*</span>
                                        </FieldLabel>
                                        <Select name="beanId" required>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select a bean" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {beans.map((bean) => (
                                                    <SelectItem key={bean.id} value={bean.id}>
                                                        {bean.roaster} — {bean.name}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                    </Field>

                                    {/* Grinder Selector */}
                                    <Field>
                                        <FieldLabel htmlFor="brewGrinder">
                                            Grinder <span className="text-red-500">*</span>
                                        </FieldLabel>
                                        <Select name="grinderId" required>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select a grinder" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {grinders.map((grinder) => (
                                                    <SelectItem key={grinder.id} value={grinder.id}>
                                                        {grinder.name}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                    </Field>

                                    {/* Grind Setting */}
                                    <Field>
                                        <FieldLabel htmlFor="brewGrind">
                                            Grind Setting <span className="text-red-500">*</span>
                                        </FieldLabel>
                                        <Input
                                            name="grindSetting"
                                            id="brewGrind"
                                            placeholder="e.g., 18"
                                            required
                                        />
                                    </Field>

                                    {/* Dose / Yield / Time */}
                                    <div className="grid grid-cols-3 gap-4">
                                        <Field>
                                            <FieldLabel htmlFor="brewDose">
                                                Dose (g) <span className="text-red-500">*</span>
                                            </FieldLabel>
                                            <Input
                                                name="doseIn"
                                                id="brewDose"
                                                type="number"
                                                min="0"
                                                step="0.1"
                                                placeholder="18"
                                                required
                                            />
                                        </Field>
                                        <Field>
                                            <FieldLabel htmlFor="brewYield">
                                                Yield (g) <span className="text-red-500">*</span>
                                            </FieldLabel>
                                            <Input
                                                name="yieldOut"
                                                id="brewYield"
                                                type="number"
                                                min="0"
                                                step="0.1"
                                                placeholder="36"
                                                required
                                            />
                                        </Field>
                                        <Field>
                                            <FieldLabel htmlFor="brewTime">
                                                Time (s) <span className="text-red-500">*</span>
                                            </FieldLabel>
                                            <Input
                                                name="timeTaken"
                                                id="brewTime"
                                                type="number"
                                                min="0"
                                                step="1"
                                                placeholder="28"
                                                required
                                            />
                                        </Field>
                                    </div>

                                    {/* Made As */}
                                    <Field>
                                        <FieldLabel>
                                            Made As <span className="text-red-500">*</span>
                                        </FieldLabel>
                                        <Select name="madeAs" value={madeAs} onValueChange={setMadeAs} required>
                                            <SelectTrigger>
                                                <SelectValue />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="ESPRESSO">Espresso</SelectItem>
                                                <SelectItem value="MILK_DRINK">Milk Drink</SelectItem>
                                                <SelectItem value="AMERICANO">Americano</SelectItem>
                                                <SelectItem value="OTHER">Other</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </Field>

                                    {/* Milk Type (conditional) */}
                                    {madeAs === "MILK_DRINK" && (
                                        <>
                                            <Field>
                                                <FieldLabel htmlFor="brewMilk">Milk Type</FieldLabel>
                                                <Select name="milkType">
                                                    <SelectTrigger>
                                                        <SelectValue placeholder="Select milk type" />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        <SelectItem value="WHOLE">Whole</SelectItem>
                                                        <SelectItem value="OAT">Oat</SelectItem>
                                                        <SelectItem value="ALMOND">Almond</SelectItem>
                                                        <SelectItem value="SOY">Soy</SelectItem>
                                                        <SelectItem value="COCONUT">Coconut</SelectItem>
                                                        <SelectItem value="OTHER">Other</SelectItem>
                                                    </SelectContent>
                                                </Select>
                                            </Field>
                                            <Field>
                                                <FieldLabel htmlFor="brewMilkAmount">Milk Amount (ml)</FieldLabel>
                                                <Input
                                                    name="milkAmount"
                                                    id="brewMilkAmount"
                                                    type="number"
                                                    min="0"
                                                    placeholder="e.g., 180"
                                                />
                                            </Field>
                                        </>
                                    )}

                                    {/* Rating */}
                                    <Field>
                                        <FieldLabel>Rating</FieldLabel>
                                        <div className="flex gap-2">
                                            {([
                                                { value: "THUMBS_UP" as const, icon: ThumbsUp, label: "Good", activeColor: "bg-green-900/50 border-green-500 text-green-400" },
                                                { value: "NEUTRAL" as const, icon: Minus, label: "Neutral", activeColor: "bg-yellow-900/50 border-yellow-500 text-yellow-400" },
                                                { value: "THUMBS_DOWN" as const, icon: ThumbsDown, label: "Bad", activeColor: "bg-red-900/50 border-red-500 text-red-400" },
                                            ]).map(({ value, icon: Icon, label, activeColor }) => (
                                                <Button
                                                    key={value}
                                                    type="button"
                                                    variant="outline"
                                                    size="sm"
                                                    className={cn(
                                                        "flex-1",
                                                        rating === value
                                                            ? activeColor
                                                            : "text-muted-foreground"
                                                    )}
                                                    onClick={() => setRating(rating === value ? null : value)}
                                                >
                                                    <Icon className="mr-1 size-4" />
                                                    {label}
                                                </Button>
                                            ))}
                                        </div>
                                    </Field>

                                    {/* Toggle optional fields */}
                                    <Button
                                        type="button"
                                        variant="ghost"
                                        size="sm"
                                        className="text-muted-foreground"
                                        onClick={() => setShowOptional(!showOptional)}
                                    >
                                        {showOptional ? "Hide" : "Show"} optional fields
                                    </Button>

                                    {/* Optional fields */}
                                    {showOptional && (
                                        <>
                                            <div className="grid grid-cols-2 gap-4">
                                                <Field>
                                                    <FieldLabel htmlFor="brewWaterTemp">Water Temp (°C)</FieldLabel>
                                                    <Input
                                                        name="waterTemp"
                                                        id="brewWaterTemp"
                                                        type="number"
                                                        min="0"
                                                        placeholder="93"
                                                    />
                                                </Field>
                                                <Field>
                                                    <FieldLabel htmlFor="brewPreInfusion">Pre-Infusion (s)</FieldLabel>
                                                    <Input
                                                        name="preInfusionTime"
                                                        id="brewPreInfusion"
                                                        type="number"
                                                        min="0"
                                                        placeholder="5"
                                                    />
                                                </Field>
                                            </div>
                                            <div className="grid grid-cols-2 gap-4">
                                                <Field>
                                                    <FieldLabel htmlFor="brewWaterType">Water Type</FieldLabel>
                                                    <Input
                                                        name="waterType"
                                                        id="brewWaterType"
                                                        placeholder="e.g., Third Wave"
                                                    />
                                                </Field>
                                                <Field>
                                                    <FieldLabel htmlFor="brewBasketType">Basket</FieldLabel>
                                                    <Select name="basketType">
                                                        <SelectTrigger>
                                                            <SelectValue placeholder="Select basket type" />
                                                        </SelectTrigger>
                                                        <SelectContent>
                                                            <SelectItem value="STANDARD_DOUBLE">Standard Double</SelectItem>
                                                            <SelectItem value="STANDARD_SINGLE">Standard Single</SelectItem>
                                                            <SelectItem value="PRECISION_DOUBLE">Precision Double</SelectItem>
                                                            <SelectItem value="PRECISION_SINGLE">Precision Single</SelectItem>
                                                            <SelectItem value="PRECISION_TRIPLE">Precision Triple</SelectItem>
                                                            <SelectItem value="DOUBLE_WALLED_SINGLE">Double Walled Single</SelectItem>
                                                            <SelectItem value="DOUBLE_WALLED_DOUBLE">Double Walled Double</SelectItem>
                                                            <SelectItem value="OTHER">Other</SelectItem>
                                                        </SelectContent>
                                                    </Select>
                                                </Field>
                                            </div>
                                            <Field>
                                                <FieldLabel htmlFor="brewPuckPrep">Puck Prep Notes</FieldLabel>
                                                <Textarea
                                                    name="puckPrepNotes"
                                                    id="brewPuckPrep"
                                                    placeholder="e.g., WDT, distribution, tamping pressure..."
                                                    rows={2}
                                                />
                                            </Field>
                                            <Field>
                                                <FieldLabel htmlFor="brewSauce">Sauce / Syrup</FieldLabel>
                                                <Select name="sauceId">
                                                    <SelectTrigger>
                                                        <SelectValue placeholder="Select a sauce (optional)" />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        {sauces.map((sauce) => (
                                                            <SelectItem key={sauce.id} value={sauce.id}>
                                                                {sauce.name}
                                                            </SelectItem>
                                                        ))}
                                                    </SelectContent>
                                                </Select>
                                            </Field>
                                            <Field>
                                                <FieldLabel htmlFor="brewTastingNotes">Tasting Notes</FieldLabel>
                                                <Textarea
                                                    name="tastingNotes"
                                                    id="brewTastingNotes"
                                                    placeholder="How did it taste?"
                                                    rows={3}
                                                />
                                            </Field>
                                        </>
                                    )}
                                </FieldGroup>
                            </FieldSet>
                        </div>
                    </form>
                </div>

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
