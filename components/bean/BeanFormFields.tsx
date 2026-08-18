import { Bean, RoastLevel, Process } from "@/types/bean";
import {
    Field,
    FieldContent,
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
import { Switch } from "@/components/ui/shadcn-ui/switch";
import ImageUploadField from "@/components/ui/coss-origin/ImageUploadField";
import { Calendar } from "@/components/ui/calendar";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/shadcn-ui/popover";
import { Button } from "@/components/ui/shadcn-ui/button";
import { CalendarIcon } from "lucide-react";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { FieldError } from "@/components/ui/shadcn-ui/field";

interface BeanFormFieldsProps {
    bean: Bean;
    onImageChange: (file: File | null) => void;
    onImageClear: () => void;
}

export function BeanFormFields({
    bean,
    onImageChange,
    onImageClear,
}: BeanFormFieldsProps) {
    const [roastDate, setRoastDate] = useState<Date | undefined>(
        bean?.roastDate ? new Date(bean.roastDate) : undefined
    );
    const [currentWeight, setCurrentWeight] = useState<string>(
        bean?.currentWeight?.toString() || ""
    );
    const [packageWeight, setPackageWeight] = useState<string>(
        bean?.packageWeight?.toString() || ""
    );
    const [weightError, setWeightError] = useState<string | null>(null);

    // Validate weight whenever either changes
    useEffect(() => {
        const current = currentWeight ? parseFloat(currentWeight) : null;
        const pkg = packageWeight ? parseFloat(packageWeight) : null;
        if (current !== null && pkg !== null && current > pkg) {
            setWeightError("Current weight cannot exceed package weight");
        } else {
            setWeightError(null);
        }
    }, [currentWeight, packageWeight]);

    return (
        <div className="px-6 py-4">
            <FieldSet>
                <FieldGroup>
                    <Field className="mt-2">
                        <ImageUploadField
                            imageUrl={bean.imageUrl}
                            onImageChange={onImageChange}
                            onImageClear={onImageClear}
                        />
                        <p
                            aria-live="polite"
                            role="region"
                            className="text-muted-foreground mt-2 text-center text-xs"
                        >
                            Add a photo of the bean bag for quick recognition.
                            <br />
                            We recommend an aspect ratio close to a square!
                        </p>
                    </Field>

                    <Field>
                        <FieldLabel htmlFor="beanName">
                            Bean Name <span className="text-red-500">*</span>
                        </FieldLabel>
                        <Input
                            id="beanName"
                            name="beanName"
                            placeholder="e.g., Ethiopia Yirgacheffe"
                            defaultValue={bean?.name || ""}
                            required
                        />
                    </Field>

                    <Field>
                        <FieldLabel htmlFor="bean_roaster">
                            Roaster <span className="text-red-500">*</span>
                        </FieldLabel>
                        <Input
                            name="roaster"
                            id="bean_roaster"
                            placeholder="e.g., Onyx, Black & White"
                            defaultValue={bean?.roaster || ""}
                            required
                        />
                    </Field>

                    <Field>
                        <FieldLabel htmlFor="roastLevel">
                            Roast Level <span className="text-red-500">*</span>
                        </FieldLabel>
                        <Select
                            name="roastLevel"
                            defaultValue={bean?.roastLevel || "MEDIUM"}
                            required
                        >
                            <SelectTrigger>
                                <SelectValue placeholder="Select roast level" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="LIGHT">Light</SelectItem>
                                <SelectItem value="MEDIUM_LIGHT">
                                    Medium Light
                                </SelectItem>
                                <SelectItem value="MEDIUM">Medium</SelectItem>
                                <SelectItem value="MEDIUM_DARK">
                                    Medium Dark
                                </SelectItem>
                                <SelectItem value="DARK">Dark</SelectItem>
                            </SelectContent>
                        </Select>
                    </Field>

                    <Field>
                        <FieldLabel htmlFor="packageWeight">
                            Package Weight (g)
                        </FieldLabel>
                        <Input
                            name="packageWeight"
                            id="packageWeight"
                            type="number"
                            min="0"
                            step="1"
                            placeholder="e.g., 340"
                            defaultValue={bean?.packageWeight ?? ""}
                            onChange={(e) => setPackageWeight(e.target.value)}
                        />
                        <FieldDescription>
                            The total weight of the bag when purchased
                        </FieldDescription>
                    </Field>

                    <Field>
                        <FieldLabel htmlFor="currentWeight">
                            Current Weight (g)
                        </FieldLabel>
                        <Input
                            name="currentWeight"
                            id="currentWeight"
                            type="number"
                            min="0"
                            step="1"
                            placeholder="e.g., 200"
                            defaultValue={bean?.currentWeight ?? ""}
                            onChange={(e) => setCurrentWeight(e.target.value)}
                            className={weightError ? "border-red-500 focus-visible:ring-red-500" : ""}
                        />
                        <FieldDescription>
                            <i>Optional:</i> How much is left in the bag
                        </FieldDescription>
                        {weightError && (
                            <p className="text-sm text-red-500 mt-1">{weightError}</p>
                        )}
                    </Field>

                    <Field>
                        <FieldLabel>Roast Date</FieldLabel>
                        <Popover>
                            <PopoverTrigger asChild>
                                <Button
                                    variant="outline"
                                    className={cn(
                                        "w-full justify-start text-left font-normal",
                                        !roastDate && "text-muted-foreground"
                                    )}
                                >
                                    <CalendarIcon className="mr-2 size-4" />
                                    {roastDate
                                        ? roastDate.toLocaleDateString("en-US", {
                                              month: "long",
                                              day: "numeric",
                                              year: "numeric",
                                          })
                                        : "Pick a date"}
                                </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-auto p-0" align="start">
                                <Calendar
                                    mode="single"
                                    selected={roastDate}
                                    onSelect={(date) => {
                                        setRoastDate(date);
                                        // Update hidden input value for form submission
                                        const hiddenInput = document.querySelector(
                                            'input[name="roastDate"]'
                                        ) as HTMLInputElement;
                                        if (hiddenInput) {
                                            hiddenInput.value = date
                                                ? date.toISOString().split("T")[0]
                                                : "";
                                        }
                                    }}
                                />
                            </PopoverContent>
                        </Popover>
                        <input
                            type="hidden"
                            name="roastDate"
                            value={roastDate ? roastDate.toISOString().split("T")[0] : ""}
                        />
                        <FieldDescription>
                            <i>Optional:</i> When the beans were roasted
                        </FieldDescription>
                    </Field>

                    <Field orientation="horizontal">
                        <Switch
                            id="isDecaf"
                            name="decaf"
                            defaultChecked={bean?.decaf || false}
                        />
                        <FieldContent>
                            <FieldLabel htmlFor="isDecaf">Decaf?</FieldLabel>
                            <FieldDescription>
                                Enable if these are decaffeinated beans
                            </FieldDescription>
                        </FieldContent>
                    </Field>

                    <Field>
                        <FieldLabel htmlFor="process">
                            Process <span className="text-red-500">*</span>
                        </FieldLabel>
                        <Select
                            name="process"
                            defaultValue={bean?.process || "WASHED"}
                            required
                        >
                            <SelectTrigger>
                                <SelectValue placeholder="Select process" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="WASHED">Washed</SelectItem>
                                <SelectItem value="NATURAL">Natural</SelectItem>
                                <SelectItem value="HONEY">Honey</SelectItem>
                                <SelectItem value="ANAEROBIC">
                                    Anaerobic
                                </SelectItem>
                                <SelectItem value="WET_HULLED">
                                    Wet Hulled
                                </SelectItem>
                                <SelectItem value="CARBONIC_MACERATION">
                                    Carbonic Maceration
                                </SelectItem>
                                <SelectItem value="OTHER">Other</SelectItem>
                                <SelectItem value="UNKNOWN">Unknown</SelectItem>
                            </SelectContent>
                        </Select>
                        <FieldDescription>
                            The processing method used on the beans
                        </FieldDescription>
                    </Field>

                    <Field>
                        <FieldLabel htmlFor="descriptors">
                            Descriptors
                        </FieldLabel>
                        <Input
                            name="descriptors"
                            id="descriptors"
                            placeholder="e.g., floral, stone fruit, chocolate"
                            defaultValue={bean?.descriptors || ""}
                        />
                        <FieldDescription>
                            <i>Optional:</i> Flavor notes and descriptors —
                            helps your barista co-pilot make better
                            recommendations
                        </FieldDescription>
                    </Field>

                    <Field>
                        <FieldLabel htmlFor="bean_notes">Notes</FieldLabel>
                        <Textarea
                            name="notes"
                            id="bean_notes"
                            placeholder="Any additional notes about this bean..."
                            rows={4}
                            maxLength={500}
                            defaultValue={bean?.notes || ""}
                        />
                        <FieldDescription>
                            <i>Optional:</i> Your tasting notes, brew
                            parameters, or anything else worth remembering —
                            this will be fed into your{" "}
                            <b>barista co-pilot</b>
                        </FieldDescription>
                    </Field>
                </FieldGroup>
            </FieldSet>
        </div>
    );
}
