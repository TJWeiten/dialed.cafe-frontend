import { toast } from "sonner";
import { useApiMutation } from "./useApiMutation";
import { BrewFormData } from "@/schemas/BrewSchema";

export const useBrew = (onSuccess?: (brewId?: string) => void) => {
    const { mutate } = useApiMutation();

    const saveBrew = async (data: BrewFormData) => {
        try {
            // Convert local datetime-local value to UTC ISO string
            const localDatetime = data.datetime;
            let brewDate: string;
            if (localDatetime) {
                brewDate = new Date(localDatetime).toISOString();
            } else {
                brewDate = new Date().toISOString();
            }

            // Map frontend form data to backend Brew entity shape
            const brewPayload = {
                brewDate,
                bean: { id: data.beanId },
                grinder: { id: data.grinderId },
                grindSetting: data.grindSetting,
                weightIn: data.doseIn,
                weightOut: data.yieldOut,
                timePulled: data.timeTaken,
                madeAs: data.madeAs,
                milkType: data.milkType,
                milkAmount: data.milkAmount,
                rating: data.rating,
                waterTemp: data.waterTemp,
                preinfusionTime: data.preInfusionTime,
                waterType: data.waterType,
                basketType: data.basketType,
                puckPrepNotes: data.puckPrepNotes,
                sauceVersion: data.sauceId ? { id: data.sauceId } : null,
                tastingNotes: data.tastingNotes,
                copilotNotes: data.copilotNotes,
            };

            const newBrew = await mutate("/brews", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(brewPayload),
            });

            toast.success("Brew logged successfully!");
            onSuccess?.(newBrew?.id);
        } catch (error) {
            console.error("API Error:", error);
            toast.error("Failed to log brew!");
            throw error;
        }
    };

    const deleteBrew = async (brewId: string) => {
        try {
            await mutate(`/brews/delete/${brewId}`, {
                method: "DELETE",
            });
            toast.success("Brew deleted successfully!");
            onSuccess?.();
        } catch (error) {
            toast.error("Failed to delete brew!");
            throw error;
        }
    };

    return {
        saveBrew,
        deleteBrew,
    };
};