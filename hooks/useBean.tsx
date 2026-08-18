import { toast } from "sonner";
import { useApiMutation } from "./useApiMutation";
import { Bean } from "@/types/bean";

export const useBean = (onSuccess?: () => void) => {
    const { mutate } = useApiMutation();

    const saveBean = async (
        data: Omit<Bean, "id" | "imageUrl" | "archived">,
        editMode: boolean,
        bean: Bean,
        imageFile: File | null,
        imageCleared: boolean,
    ) => {
        const hasBeanDataChanged = (
            newData: Omit<Bean, "id" | "imageUrl" | "archived">,
        ) => {
            if (!editMode) return true;
            if (imageCleared || imageFile) return true;
            return (
                newData.name !== bean.name ||
                newData.roaster !== bean.roaster ||
                newData.roastLevel !== bean.roastLevel ||
                newData.packageWeight !== bean.packageWeight ||
                newData.currentWeight !== bean.currentWeight ||
                newData.decaf !== bean.decaf ||
                newData.process !== bean.process ||
                newData.descriptors !== bean.descriptors ||
                newData.notes !== bean.notes ||
                newData.roastDate !== bean.roastDate
            );
        };
        if (!hasBeanDataChanged(data)) {
            onSuccess?.();
            return;
        }
        try {
            let beanUuid = bean.id;

            if (!editMode) {
                const newBean = await mutate("/beans", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ ...data, imageUrl: null, archived: false }),
                });
                beanUuid = newBean.id;
            }

            let imageUrl = bean.imageUrl;
            if (imageCleared) {
                imageUrl = "";
                await mutate(`/beans/delete/img/${beanUuid}`, {
                    method: "DELETE",
                });
            } else if (imageFile) {
                const formData = new FormData();
                formData.append("type", "bean");
                formData.append("uuid", beanUuid);
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

            const beanData = { ...data, id: beanUuid, imageUrl, archived: bean.archived };
            await mutate("/beans", {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(beanData),
            });

            toast.success(
                `Bean ${editMode ? "edited" : "added"} successfully!`,
            );
            onSuccess?.();
        } catch (error) {
            console.error("API Error:", error);
            toast.error(`Failed to ${editMode ? "edit" : "add"} bean!`);
            throw error;
        }
    };

    const archiveBean = async (beanId: string) => {
        try {
            await mutate(`/beans/archive/${beanId}`, {
                method: "PUT",
            });
            toast.success("Bean archived successfully!");
            onSuccess?.();
        } catch (error) {
            toast.error("Failed to archive bean!");
            throw error;
        }
    };

    const deleteBean = async (beanId: string) => {
        try {
            await mutate(`/beans/delete/${beanId}`, {
                method: "DELETE",
            });
            toast.success("Bean deleted successfully!");
            onSuccess?.();
        } catch (error) {
            toast.error("Failed to delete bean!");
            throw error;
        }
    };

    return {
        saveBean,
        archiveBean,
        deleteBean,
    };
};
