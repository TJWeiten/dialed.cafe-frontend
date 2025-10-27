import { useState, useEffect, useCallback } from "react";
import { useAuth } from "@clerk/nextjs";
import { apiFetch } from "@/lib/API";

export function useApiData(endpoint: string) {
    const { getToken } = useAuth();
    const [data, setData] = useState<any[] | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(true);

    const fetchData = useCallback(
        async (isRefetch: boolean) => {
            try {
                setError(null);
                if (!isRefetch) setLoading(true);
                const token = await getToken();
                if (!token) {
                    console.warn(
                        "Could not get token even though user is loaded.",
                    );
                    return;
                }
                const response = await apiFetch(endpoint, {}, token);
                setData(response);
            } catch (error) {
                const errorMessage =
                    error instanceof Error ? error.message : String(error);
                setError(errorMessage);
                throw error;
            } finally {
                setLoading(false);
            }
        },
        [endpoint, getToken],
    );

    useEffect(() => {
        fetchData(false);
    }, [fetchData]);

    const refetch = useCallback(() => {
        return fetchData(true);
    }, [fetchData]);

    return { data, error, loading, refetch };
}
