"use client";

import { useAuth } from "@clerk/nextjs";
import Navbar from "@/components/universal/Navbar";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { Toaster } from "@/components/ui/shadcn-ui/sonner";

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
            <Toaster />
        </div>
    );
}
