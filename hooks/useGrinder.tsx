import { toast } from "sonner";
import { useApiMutation } from "./useApiMutation";
import { Grinder } from "@/types/grinder";

export const useGrinder = (onSuccess?: () => void) => {
    const { mutate } = useApiMutation();

    const saveGrinder = async (
        data: Omit<Grinder, "id" | "imageUrl">,
        editMode: boolean,
        grinder: Grinder,
        imageFile: File | null,
        imageCleared: boolean,
    ) => {
        const hasGrinderDataChanged = (
            newData: Omit<Grinder, "id" | "imageUrl">,
        ) => {
            if (!editMode) return true;
            if (imageCleared || imageFile) return true;
            return (
                newData.name !== grinder.name ||
                newData.burrType !== grinder.burrType ||
                newData.stepless !== grinder.stepless ||
                newData.grindRange !== grinder.grindRange ||
                newData.notes !== grinder.notes
            );
        };
        if (!hasGrinderDataChanged(data)) {
            onSuccess?.();
            return;
        }
        try {
            let grinderUuid = grinder.id;

            if (!editMode) {
                const newGrinder = await mutate("/grinders", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ ...data, imageUrl: null }),
                });
                grinderUuid = newGrinder.id;
            }

            let imageUrl = grinder.imageUrl;
            if (imageCleared) {
                imageUrl = "";
                await mutate(`/grinders/delete/img/${grinderUuid}`, {
                    method: "DELETE",
                });
            } else if (imageFile) {
                const formData = new FormData();
                formData.append("type", "grinder");
                formData.append("uuid", grinderUuid);
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

            const grinderData = { ...data, id: grinderUuid, imageUrl };
            await mutate("/grinders", {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(grinderData),
            });

            toast.success(
                `Grinder ${editMode ? "edited" : "added"} successfully!`,
            );
            onSuccess?.();
        } catch (error) {
            console.error("API Error:", error);
            toast.error(`Failed to ${editMode ? "edit" : "add"} grinder!`);
            throw error;
        }
    };

    const deleteGrinder = async (grinderId: string) => {
        try {
            await mutate(`/grinders/delete/${grinderId}`, {
                method: "DELETE",
            });
            toast.success("Grinder deleted successfully!");
            onSuccess?.();
        } catch (error) {
            toast.error("Failed to delete grinder!");
            throw error;
        }
    };

    return {
        saveGrinder,
        deleteGrinder,
    };
};
