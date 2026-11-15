import { useBrew } from "@/hooks/useBrew";
import { brewFormSchema } from "@/schemas/BrewSchema";
import { parseFormData } from "@/utils/formUtils";
import { Bean } from "@/types/bean";
import { BrewFormFields } from "./BrewFormFields";

interface BrewFormProps {
    onOpenChange: (open: boolean) => void;
    rerenderOnSuccess?: () => void;
    onBrewSaved?: (brewId: string) => void;
    setIsSubmitting: (isSubmitting: boolean) => void;
    beans: Bean[];
    grinders: { id: string; name: string }[];
    sauces: { id: string; name: string; latestVersionId?: string }[];
}

export function BrewForm({
    onOpenChange,
    rerenderOnSuccess,
    onBrewSaved,
    setIsSubmitting,
    beans,
    grinders,
    sauces,
}: BrewFormProps) {
    const { saveBrew } = useBrew((brewId) => {
        onOpenChange(false);
        rerenderOnSuccess?.();
        if (brewId) onBrewSaved?.(brewId);
    });

    return (
        <div className="flex-1 min-h-0 overflow-y-auto">
            <form
                id="brew-form"
                onSubmit={async (e) => {
                    e.preventDefault();
                    setIsSubmitting(true);
                    try {
                        const formData = new FormData(
                            e.target as HTMLFormElement,
                        );
                        const data = parseFormData(formData, brewFormSchema);
                        await saveBrew(data);
                    } finally {
                        setIsSubmitting(false);
                    }
                }}
            >
                <BrewFormFields
                    beans={beans}
                    grinders={grinders}
                    sauces={sauces}
                />
            </form>
        </div>
    );
}