"use client";

import { useAuth } from "@clerk/nextjs";
import { useState, useEffect } from "react";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { apiFetch } from "@/lib/API";
import { useRouter } from "next/navigation";

export default function Dashboard() {
  const { getToken } = useAuth();
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const tokenPromise = getToken();
        const timeoutPromise = new Promise((_, reject) =>
          setTimeout(() => reject(new Error("Token timeout")), 5000),
        );
        const token = (await Promise.race([tokenPromise, timeoutPromise])) as
          | string
          | null;
        // May want to consider revising? \/
        if (!token) {
          console.warn("No auth token...user not logged in?");
          router.push("/sign-in");
          return;
        }
        const response = await apiFetch("/auth", {}, token);
        const data = await response.json();
        setMessage(data.message);
        if (data.message) {
          router.push("/dashboard");
        }
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
        setError("Authentication failed. Redirecting to sign in...");
        setTimeout(() => router.push("/sign-in"), 2000);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [getToken, router]);

  if (loading) {
    return (
      <main className="flex flex-grow items-center justify-center">
        <div className="text-center">
          <div className="mx-auto mb-4 h-8 w-8 animate-spin rounded-full border-b-2 border-white"></div>
          <p className="text-white">Verifying authentication...</p>
        </div>
      </main>
    );
  }

  return (
    <main className="flex flex-grow items-start justify-center">
      <div className="flex w-full max-w-3xl flex-grow flex-col items-start justify-center gap-8 p-8 pt-10">
        {error && (
          <div className="w-full rounded-md border border-red-100/50 bg-red-800/50 p-4 text-center font-bold">
            <p className="text-red-100">{error}</p>
          </div>
        )}
        {message && (
          <div className="w-full rounded-md border border-green-100/50 bg-green-800/50 p-4 text-center font-bold shadow-[var(--shadowy-text)]">
            <p className="text-green-100">{message}</p>
          </div>
        )}
      </div>
    </main>
  );
}
