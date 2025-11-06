import { toast } from "sonner";
import { useApiMutation } from "./useApiMutation";
import { Sauce } from "@/types/sauce";

export const useSauce = (onSuccess?: () => void) => {
    const { mutate } = useApiMutation();

    const saveSauce = async (
        data: Omit<Sauce, "id" | "imageUrl">,
        editMode: boolean,
        sauce: Sauce,
        imageFile: File | null,
        imageCleared: boolean,
    ) => {
        const hasSauceDataChanged = (
            newData: Omit<Sauce, "id" | "imageUrl">,
        ) => {
            if (!editMode) return true;
            if (imageCleared || imageFile) return true;
            return (
                newData.name !== sauce.name ||
                newData.latestVersion?.recipe !== sauce.latestVersion?.recipe
            );
        };
        if (!hasSauceDataChanged(data)) {
            onSuccess?.();
            return;
        }
        try {
            let sauceUuid = sauce.id;

            if (!editMode) {
                const newSauce = await mutate("/sauces", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ ...data, imageUrl: null }),
                });
                sauceUuid = newSauce.id;
            }

            let imageUrl = sauce.imageUrl;
            if (imageCleared) {
                imageUrl = "";
                await mutate(`/sauces/delete/img/${sauceUuid}`, {
                    method: "DELETE",
                });
            } else if (imageFile) {
                const formData = new FormData();
                formData.append("type", "sauce");
                formData.append("uuid", sauceUuid);
                formData.append("image", imageFile);
                const uploadResponse = await fetch("/api/upload", {
                    method: "POST",
                    body: formData,
                });
                if (uploadResponse.ok) {
                    const uploadResult = await uploadResponse.json();
                    imageUrl = uploadResult.url;
                } else {
                    throw new Error("Image upload failed");
                }
            }

            const sauceData = { ...data, id: sauceUuid, imageUrl };
            await mutate("/sauces", {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(sauceData),
            });

            toast.success(
                `Sauce ${editMode ? "edited" : "added"} successfully!`,
            );
            onSuccess?.();
        } catch (error) {
            console.error("API Error:", error);
            toast.error(`Failed to ${editMode ? "edit" : "add"} sauce!`);
            throw error;
        }
    };

    const deleteSauce = async (sauceId: string) => {
        try {
            await mutate(`/sauces/delete/${sauceId}`, {
                method: "DELETE",
            });
            toast.success("Sauce deleted successfully!");
            onSuccess?.();
        } catch (error) {
            toast.error("Failed to delete sauce!");
            throw error;
        }
    };

    return {
        saveSauce,
        deleteSauce,
    };
};
