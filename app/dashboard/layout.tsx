"use client";

import { useAuth } from "@clerk/nextjs";
import Navbar from "@/components/Navbar";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const { isLoaded, userId } = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (isLoaded && !userId) router.push("/sign-in");
    }, [isLoaded, userId, router]);

    return (
        <div className="flex w-full flex-grow flex-col">
            <Navbar />
            {/* Page Content */}
            {children}
        </div>
    );
}
