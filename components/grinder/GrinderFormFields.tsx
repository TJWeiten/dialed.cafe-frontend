import { Grinder } from "@/types/grinder";
import {
    Field,
    FieldContent,
    FieldDescription,
    FieldError,
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

interface GrinderFormFieldsProps {
    grinder: Grinder;
    onImageChange: (file: File | null) => void;
    onImageClear: () => void;
}

export function GrinderFormFields({
    grinder,
    onImageChange,
    onImageClear,
}: GrinderFormFieldsProps) {
    return (
        <div className="px-6 py-4">
            <FieldSet>
                <FieldGroup>
                    <Field className="mt-2">
                        <ImageUploadField
                            imageUrl={grinder.imageUrl}
                            onImageChange={onImageChange}
                            onImageClear={onImageClear}
                        />
                        <p
                            aria-live="polite"
                            role="region"
                            className="text-muted-foreground mt-2 text-center text-xs"
                        >
                            Add a photo of the grinder for quick recognition.
                            <br />
                            We recommend an aspect ratio close to a square!
                        </p>
                    </Field>

                    <Field>
                        <FieldLabel htmlFor="name">
                            Grinder Name <span className="text-red-500">*</span>
                        </FieldLabel>
                        <Input
                            id="name"
                            name="name"
                            defaultValue={grinder.name}
                            placeholder="Enter grinder name"
                            maxLength={50}
                            required
                        />
                        <FieldDescription>
                            The name or model of your grinder
                        </FieldDescription>
                    </Field>

                    <Field>
                        <FieldLabel htmlFor="burrType">
                            Burr Type <span className="text-red-500">*</span>
                        </FieldLabel>
                        <Select
                            name="burrType"
                            defaultValue={grinder.burrType}
                            required
                        >
                            <SelectTrigger>
                                <SelectValue placeholder="Select burr type" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="FLAT">Flat</SelectItem>
                                <SelectItem value="CONICAL">Conical</SelectItem>
                                <SelectItem value="UNKNOWN">Unknown</SelectItem>
                            </SelectContent>
                        </Select>
                        <FieldDescription>
                            Choose the broad type of burrs your machine has
                        </FieldDescription>
                    </Field>

                    <Field orientation="horizontal">
                        <Switch
                            id="isStepless"
                            name="isStepless"
                            defaultChecked={grinder.stepless}
                        />
                        <FieldContent>
                            <FieldLabel htmlFor="isStepless">
                                Stepless Adjustment{" "}
                                <span className="text-red-500">*</span>
                            </FieldLabel>
                            <FieldDescription>
                                Enable if your grinder has stepless (continuous)
                                adjustment
                            </FieldDescription>
                        </FieldContent>
                    </Field>

                    <Field>
                        <FieldLabel htmlFor="grindRange">
                            Grind Range <span className="text-red-500">*</span>
                        </FieldLabel>
                        <Input
                            id="grindRange"
                            name="grindRange"
                            defaultValue={grinder.grindRange || ""}
                            placeholder="e.g., 1-10"
                            maxLength={30}
                            required
                        />
                        <FieldDescription>
                            The range of grind sizes your grinder has on its
                            dial (and ideally its range for <b>espresso</b>)
                        </FieldDescription>
                    </Field>

                    <Field>
                        <FieldLabel htmlFor="notes">Notes</FieldLabel>
                        <Textarea
                            id="notes"
                            name="notes"
                            defaultValue={grinder.notes || ""}
                            placeholder="Any additional notes about this grinder..."
                            rows={4}
                            maxLength={500}
                        />
                        <FieldDescription>
                            <i>Optional:</i> Notes about your grinder's
                            performance, quirks, branded burrs, or settings—this
                            will all be fed into your <b>barista co-pilot</b> to
                            help them make informed decisions
                        </FieldDescription>
                    </Field>
                </FieldGroup>
            </FieldSet>
        </div>
    );
}
