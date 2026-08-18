import { useBean } from "@/hooks/useBean";
import { beanFormSchema } from "@/schemas/BeanSchema";
import { Bean } from "@/types/bean";
import { parseFormData } from "@/utils/formUtils";
import { toast } from "sonner";
import { useState, useEffect } from "react";
import { BeanFormFields } from "./BeanFormFields";

const newBean: Bean = {
    id: "",
    name: "",
    roaster: "",
    roastLevel: "MEDIUM",
    packageWeight: null,
    currentWeight: null,
    decaf: false,
    process: "WASHED",
    descriptors: null,
    notes: null,
    imageUrl: null,
    archived: false,
    roastDate: null,
};

interface BeanFormProps {
    editMode: boolean;
    bean?: Bean | undefined;
    onOpenChange: (open: boolean) => void;
    rerenderOnSuccess?: () => void;
    setIsSubmitting: (isSubmitting: boolean) => void;
}

export function BeanForm({
    editMode,
    bean = newBean,
    onOpenChange,
    rerenderOnSuccess,
    setIsSubmitting,
}: BeanFormProps) {
    const [imageFile, setImageFile] = useState<File | null>(null);
    const [imageCleared, setImageCleared] = useState(false);

    const { saveBean } = useBean(() => {
        onOpenChange(false);
        rerenderOnSuccess?.();
    });

    // Reset imageCleared when a new file is uploaded
    useEffect(() => {
        if (imageFile) {
            setImageCleared(false);
        }
    }, [imageFile]);

    const handleSubmit = async (
        data: Omit<Bean, "id" | "imageUrl" | "archived">,
    ) => {
        setIsSubmitting(true);
        try {
            await saveBean(data, editMode, bean, imageFile, imageCleared);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="flex-1 min-h-0 overflow-y-auto">
            <form
                id="bean-form"
                onSubmit={async (e) => {
                    e.preventDefault();
                    const formData = new FormData(e.target as HTMLFormElement);
                    if (formData.has("beanName")) {
                        formData.set(
                            "name",
                            formData.get("beanName") as string,
                        );
                        formData.delete("beanName");
                    }
                    const data = parseFormData(formData, beanFormSchema);
                    // Validate current weight does not exceed package weight
                    if (
                        data.currentWeight !== null &&
                        data.packageWeight !== null &&
                        data.currentWeight > data.packageWeight
                    ) {
                        toast.error("Current weight cannot be greater than package weight");
                        setIsSubmitting(false);
                        return;
                    }
                    await handleSubmit(data);
                }}
            >
                <BeanFormFields
                    bean={bean}
                    onImageChange={(file) => setImageFile(file)}
                    onImageClear={() => setImageCleared(true)}
                />
            </form>
        </div>
    );
}
