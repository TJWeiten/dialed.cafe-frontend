import { useGrinder } from "@/hooks/useGrinder";
import { grinderFormSchema } from "@/schemas/GrinderSchema";
import { Grinder } from "@/types/grinder";
import { parseFormData } from "@/utils/formUtils";
import { useState, useEffect } from "react";
import { GrinderFormFields } from "./GrinderFormFields";

const newGrinder: Grinder = {
    id: "",
    name: "",
    burrType: "FLAT",
    stepless: false,
    grindRange: "",
    notes: "",
    imageUrl: "",
};

interface GrinderFormProps {
    editMode: boolean;
    grinder?: Grinder | undefined;
    onOpenChange: (open: boolean) => void;
    rerenderOnSuccess?: () => void;
    setIsSubmitting: (isSubmitting: boolean) => void;
}

export function GrinderForm({
    editMode,
    grinder = newGrinder,
    onOpenChange,
    rerenderOnSuccess,
    setIsSubmitting,
}: GrinderFormProps) {
    const [imageFile, setImageFile] = useState<File | null>(null);
    const [imageCleared, setImageCleared] = useState(false);

    const { saveGrinder } = useGrinder(() => {
        onOpenChange(false);
        rerenderOnSuccess?.();
    });

    // Reset imageCleared when a new file is uploaded
    useEffect(() => {
        if (imageFile) {
            setImageCleared(false);
        }
    }, [imageFile]);

    const handleSubmit = async (data: Omit<Grinder, "id" | "imageUrl">) => {
        setIsSubmitting(true);
        await saveGrinder(data, editMode, grinder, imageFile, imageCleared);
        setIsSubmitting(false);
    };

    return (
        <div className="flex-1 overflow-y-auto">
            <form
                id="grinder-form"
                onSubmit={async (e) => {
                    e.preventDefault();
                    const formData = new FormData(e.target as HTMLFormElement);
                    /* A little silly, but 1Password will try to autofill names, 
                    but the API expects the field to be called name... so to fix,
                    we copy the specific name into a generic one, then delete the old */
                    if (formData.has("grinderName")) {
                        formData.set(
                            "name",
                            formData.get("grinderName") as string,
                        );
                        formData.delete("grinderName");
                    }
                    const data = parseFormData(formData, grinderFormSchema);
                    await handleSubmit(data);
                }}
            >
                <GrinderFormFields
                    grinder={grinder}
                    onImageChange={(file) => setImageFile(file)}
                    onImageClear={() => setImageCleared(true)}
                />
            </form>
        </div>
    );
}
