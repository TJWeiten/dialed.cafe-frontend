import { FormSchema } from "@/utils/formUtils";
import { Rating, MadeAs, BasketType } from "@/types/brew";

export interface BrewFormData {
    datetime: string;
    beanId: string;
    grinderId: string;
    grindSetting: string;
    doseIn: number;
    yieldOut: number;
    timeTaken: number;
    madeAs: MadeAs;
    milkType: string | null;
    milkAmount: number | null;
    rating: Rating | null;
    waterTemp: number | null;
    preInfusionTime: number | null;
    waterType: string | null;
    basketType: BasketType | null;
    puckPrepNotes: string | null;
    sauceId: string | null;
    tastingNotes: string | null;
    copilotNotes: string | null;
}

const parseNumber = (value: FormDataEntryValue | null): number | null => {
    const str = value as string;
    if (!str || str === "") return null;
    const num = Number(str);
    return isNaN(num) ? null : num;
};

const parseRequiredNumber = (value: FormDataEntryValue | null): number => {
    const num = parseNumber(value);
    return num ?? 0;
};

const parseString = (value: FormDataEntryValue | null): string =>
    (value as string) || "";

const parseNullableString = (value: FormDataEntryValue | null): string | null =>
    (value as string) || null;

export const brewFormSchema: FormSchema<BrewFormData> = {
    datetime: parseString,
    beanId: parseString,
    grinderId: parseString,
    grindSetting: parseString,
    doseIn: parseRequiredNumber,
    yieldOut: parseRequiredNumber,
    timeTaken: parseRequiredNumber,
    madeAs: (value) => ((value as string) || "ESPRESSO") as MadeAs,
    milkType: parseNullableString,
    milkAmount: parseNumber,
    rating: (value) => (value as string || null) as Rating | null,
    waterTemp: parseNumber,
    preInfusionTime: parseNumber,
    waterType: parseNullableString,
    basketType: (value) => (value as string || null) as BasketType | null,
    puckPrepNotes: parseNullableString,
    sauceId: parseNullableString,
    tastingNotes: parseNullableString,
    copilotNotes: parseNullableString,
};