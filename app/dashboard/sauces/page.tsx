"use client";

import { AsyncDashboardContent } from "@/components/universal/AsyncDashboardContent";
import { useApiData } from "@/hooks/useApiData";

export default function SaucesPage() {
    const { data, error, loading } = useApiData("/protected");
    return (
        <main className="flex flex-grow items-start justify-center">
            {/* Main Content */}
            <div className="flex w-full max-w-7xl flex-grow flex-col items-start justify-center gap-8 p-8 pt-10">
                <h1 className="text-shadow-[var(--shadowy-text)] text-center text-4xl font-semibold leading-[110%] text-white opacity-90 md:text-7xl">
                    Create a delicious sauce
                </h1>
                <p className="text-shadow-[var(--shadowy-text)] text-balance text-center text-xl font-medium tracking-wide text-white">
                    Here you can track your beans, log brews, and get AI-powered
                    advice to pull the perfect shot, every time.
                </p>
                <AsyncDashboardContent
                    loading={loading}
                    message={data ? (data as any).message : null}
                    error={error}
                >
                    <p className="text-shadow-[var(--shadowy-text)] text-center font-bold">
                        Sauceapalooza
                    </p>
                </AsyncDashboardContent>
            </div>
        </main>
    );
}
