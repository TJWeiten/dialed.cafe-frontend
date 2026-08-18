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
                        />
                        <FieldDescription>
                            <i>Optional:</i> How much is left in the bag
                        </FieldDescription>
                    </Field>

                    <Field>
                        <FieldLabel htmlFor="roastDate">Roast Date</FieldLabel>
                        <Input
                            name="roastDate"
                            id="roastDate"
                            type="date"
                            defaultValue={bean?.roastDate || ""}
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
