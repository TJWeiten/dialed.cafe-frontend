import { FormSchema } from "@/utils/formUtils";
import { Grinder } from "@/types/grinder";

export const grinderFormSchema: FormSchema<Omit<Grinder, "id" | "imageUrl">> = {
    name: (value) => (value as string) || "",
    burrType: (value) => (value as string) || "FLAT",
    stepless: (value) => value === "on",
    grindRange: (value) => (value as string) || "",
    notes: (value) => (value as string) || "",
};
