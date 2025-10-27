import { useState } from "react";
import { useAuth } from "@clerk/nextjs";
import { apiFetch } from "@/lib/API";

export function useApiMutation() {
    const { getToken } = useAuth();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const mutate = async (endpoint: string, options: RequestInit = {}) => {
        try {
            setLoading(true);
            setError(null);
            const token = await getToken();
            if (!token) throw new Error("No auth token available");

            const response = await apiFetch(endpoint, options, token);
            return response;
        } catch (error) {
            const errorMessage =
                error instanceof Error ? error.message : String(error);
            setError(errorMessage);
            throw error;
        } finally {
            setLoading(false);
        }
    };

    return { mutate, loading, error };
}
