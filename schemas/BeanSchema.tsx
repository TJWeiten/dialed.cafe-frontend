import { FormSchema } from "@/utils/formUtils";
import { Bean, RoastLevel, Process } from "@/types/bean";

export interface BeanFormData {
    name: string;
    roaster: string;
    roastLevel: RoastLevel;
    packageWeight: number | null;
    currentWeight: number | null;
    decaf: boolean;
    process: Process;
    descriptors: string | null;
    notes: string | null;
    roastDate: string | null;
}

export const beanFormSchema: FormSchema<BeanFormData> = {
    name: (value) => (value as string) || "",
    roaster: (value) => (value as string) || "",
    roastLevel: (value) => ((value as string) || "MEDIUM") as RoastLevel,
    packageWeight: (value) => {
        const str = value as string;
        if (!str || str === "") return null;
        const num = Number(str);
        return isNaN(num) ? null : num;
    },
    currentWeight: (value) => {
        const str = value as string;
        if (!str || str === "") return null;
        const num = Number(str);
        return isNaN(num) ? null : num;
    },
    decaf: (value) => value === "on",
    process: (value) => ((value as string) || "WASHED") as Process,
    descriptors: (value) => (value as string) || null,
    notes: (value) => (value as string) || null,
    roastDate: (value) => (value as string) || null,
};
