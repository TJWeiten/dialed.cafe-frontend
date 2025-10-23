"use client";

import { useEffect, useState } from "react";

import GrinderCard from "@/components/elements/GrinderCard";
import { AsyncDashboardContent } from "@/components/AsyncDashboardContent";
import { useApiData } from "@/hooks/useApiData";

export default function Grinders() {
    const { message, error, loading } = useApiData("/protected");
    const [grindersCount, setGrindersCount] = useState(0);
    useEffect(() => {
        setGrindersCount(3);
    }, []);
    return (
        <main className="flex flex-grow items-start justify-center">
            {/* Main Content */}
            <div className="flex w-full max-w-7xl flex-grow flex-col items-start justify-center gap-8 p-8 pt-10">
                <h1 className="text-shadow-[var(--shadowy-text)] text-center text-4xl font-semibold leading-[110%] text-white opacity-90 md:text-7xl">
                    Manage your grinders
                </h1>
                <p className="text-shadow-[var(--shadowy-text)] text-balance text-center text-xl font-medium tracking-wide text-white">
                    Here you can track your beans, log brews, and get AI-powered
                    advice to pull the perfect shot, every time.
                </p>
                <AsyncDashboardContent
                    loading={loading}
                    message={message}
                    error={error}
                >
                    {Array.from({ length: grindersCount }, (_, i) => (
                        <GrinderCard key={i} index={i} />
                    ))}
                </AsyncDashboardContent>
            </div>
        </main>
    );
}
