import { useSauce } from "@/hooks/useSauce";
import { sauceFormSchema } from "@/schemas/SauceSchema";
import { Sauce, SauceVersion } from "@/types/sauce";
import { parseFormData } from "@/utils/formUtils";
import { useState, useEffect } from "react";
import { SauceFormFields } from "./SauceFormFields";

const newSauce: Sauce = {
    id: "",
    name: "",
    latestVersion: undefined,
    imageUrl: null,
};

interface SauceFormProps {
    editMode: boolean;
    sauce?: Sauce | undefined;
    onOpenChange: (open: boolean) => void;
    rerenderOnSuccess?: () => void;
    setIsSubmitting: (isSubmitting: boolean) => void;
}

export function SauceForm({
    editMode,
    sauce = newSauce,
    onOpenChange,
    rerenderOnSuccess,
    setIsSubmitting,
}: SauceFormProps) {
    const [imageFile, setImageFile] = useState<File | null>(null);
    const [imageCleared, setImageCleared] = useState(false);

    const { saveSauce } = useSauce(() => {
        onOpenChange(false);
        rerenderOnSuccess?.();
    });

    // Reset imageCleared when a new file is uploaded
    useEffect(() => {
        if (imageFile) {
            setImageCleared(false);
        }
    }, [imageFile]);

    const handleSubmit = async (data: Omit<Sauce, "id" | "imageUrl">) => {
        setIsSubmitting(true);
        try {
            await saveSauce(data, editMode, sauce, imageFile, imageCleared);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="flex-1 overflow-y-auto">
            <form
                id="sauce-form"
                onSubmit={async (e) => {
                    e.preventDefault();
                    const formData = new FormData(e.target as HTMLFormElement);
                    /* A little silly, but 1Password will try to autofill names, 
                    but the API expects the field to be called name... so to fix,
                    we copy the specific name into a generic one, then delete the old */
                    if (formData.has("sauceName")) {
                        formData.set(
                            "name",
                            formData.get("sauceName") as string,
                        );
                        formData.delete("sauceName");
                    }
                    const data = parseFormData(formData, sauceFormSchema);
                    await handleSubmit(data);
                }}
            >
                <SauceFormFields
                    sauce={sauce}
                    onImageChange={(file) => setImageFile(file)}
                    onImageClear={() => setImageCleared(true)}
                />
            </form>
        </div>
    );
}
