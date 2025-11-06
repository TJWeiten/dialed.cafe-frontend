import { FormSchema } from "@/utils/formUtils";
import { Sauce, SauceVersion } from "@/types/sauce";

// This is the same as omitting its uuid and imageUrl, but merging
export interface SauceFormData {
    name: string;
    recipe: string;
}

export const sauceFormSchema: FormSchema<SauceFormData> = {
    name: (value) => (value as string) || "",
    recipe: (value) => (value as string) || "",
};
