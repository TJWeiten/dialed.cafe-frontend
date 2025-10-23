import { useState, useEffect } from "react";
import { useAuth } from "@clerk/nextjs";
import { apiFetch } from "@/lib/API";

export function useApiData(endpoint: string) {
    const { getToken } = useAuth();
    const [message, setMessage] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setError(null);

                const token = await getToken();
                if (!token) {
                    console.warn(
                        "Could not get token even though user is loaded.",
                    );
                    return;
                }
                const data = await apiFetch(endpoint, {}, token);
                setMessage(data.message);
            } catch (error) {
                if (error instanceof Error) {
                    console.error("API Call Failed:", error.message);
                    setError(error.message);
                } else {
                    console.error("API Call Failed:", error);
                    setError(String(error));
                }
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, [endpoint, getToken]);

    return { message, error, loading };
}
