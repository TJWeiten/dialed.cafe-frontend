import { parseFormData, type FormSchema } from "@/utils/formUtils";

export const useFormSubmission = <T extends Record<string, any>>(
    schema: FormSchema<T>,
    onSubmit: (data: T) => Promise<void>,
) => {
    const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.target as HTMLFormElement);
        const data = parseFormData(formData, schema);
        await onSubmit(data);
    };

    return { handleFormSubmit };
};
