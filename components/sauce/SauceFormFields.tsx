import { Sauce, SauceVersion } from "@/types/sauce";
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
import ImageUploadField from "@/components/ui/coss-origin/ImageUploadField";

interface SauceFormFieldsProps {
    sauce: Sauce;
    onImageChange: (file: File | null) => void;
    onImageClear: () => void;
}

export function SauceFormFields({
    sauce,
    onImageChange,
    onImageClear,
}: SauceFormFieldsProps) {
    return (
        <div className="px-6 py-4">
            <FieldSet>
                <FieldGroup>
                    <Field className="mt-2">
                        <ImageUploadField
                            imageUrl={sauce.imageUrl}
                            onImageChange={onImageChange}
                            onImageClear={onImageClear}
                        />
                        <p
                            aria-live="polite"
                            role="region"
                            className="text-muted-foreground mt-2 text-center text-xs"
                        >
                            Add a photo of the sauce for quick recognition.
                            <br />
                            We recommend an aspect ratio close to a square!
                        </p>
                    </Field>

                    <Field>
                        <FieldLabel htmlFor="sauce_name">
                            Sauce Name <span className="text-red-500">*</span>
                        </FieldLabel>
                        <Input
                            name="name"
                            id="sauce_name"
                            placeholder="Enter sauce name"
                            defaultValue={sauce?.name || ""}
                            required
                        />
                    </Field>

                    <Field>
                        <FieldLabel htmlFor="recipe">
                            Recipe / Ingredients <span className="text-red-500">*</span>
                        </FieldLabel>
                        <Textarea
                            name="recipe"
                            id="recipe"
                            placeholder="Enter your sauce recipe..."
                            rows={8}
                            defaultValue={sauce?.latestVersion?.recipe || ""}
                            className="resize-none"
                            maxLength={5096}
                            required
                        />
                        <FieldDescription>
                            You can be as descriptive as you want! <br />
                            <br /> All of this information will be passed to
                            your barista co-pilot, so if you want them to have a
                            greater understanding of the intermingling of
                            flavors you enjoy or be able to make more pointed
                            recommendations, the more detail you provide, the
                            better!
                        </FieldDescription>
                    </Field>
                </FieldGroup>
            </FieldSet>
        </div>
    );
}
