"use client";

import { useAuth } from "@clerk/nextjs";
import { useState, useEffect } from "react";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PlaceholderTable from "@/components/PlaceholderTable";
import { apiFetch } from "@/lib/API";
import { useRouter } from "next/navigation";

export default function Sauces() {
  const { getToken, isLoaded, userId } = useAuth();
  const [message, setMessage] = useState("");
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    // Clerk not entered loaded state...
    if (!isLoaded) {
      return;
    }
    // Clerk loaded, but no user. Redirect to sign-in?
    if (!userId) {
      router.push("/sign-in");
      return;
    }
    // Clerk loaded and user exists. Poke backend!
    const fetchData = async () => {
      try {
        const token = await getToken();
        if (!token) {
          console.warn("Could not get token even though user is loaded.");
          return;
        }
        const response = await apiFetch("/protected", {}, token);
        const data = await response;
        setMessage(data.message);
      } catch (error) {
        if (error instanceof Error) {
          console.error("API Call Failed:", error.message);
          setError(error.message);
        } else {
          console.error("API Call Failed:", error);
          setError(String(error));
        }
      }
    };
    fetchData();
  }, [isLoaded, userId, getToken, router]);

  return (
    <main className="flex flex-grow items-start justify-center">
      {/* Main Content */}
      <div className="flex w-full max-w-7xl flex-grow flex-col items-start justify-center gap-8 p-8 pt-10">
        <h1 className="text-center text-4xl leading-[110%] font-semibold text-white opacity-90 text-shadow-[var(--shadowy-text)] md:text-7xl">
          Create a delicious sauce
        </h1>
        <p className="text-center text-xl font-medium tracking-wide text-balance text-white text-shadow-[var(--shadowy-text)]">
          Here you can track your beans, log brews, and get AI-powered advice to
          pull the perfect shot, every time.
        </p>
        {/* Add more dashboard content here */}
        {message && (
          <div className="box-shadow-[var(--shadowy-text)] w-full rounded-md border-1 border-green-100/50 bg-green-800/50 p-4 text-center font-bold">
            <p className="text-green-100">{message}</p>
          </div>
        )}
        {message && <p>Sauceabalooza</p>}
        {error && (
          <div className="box-shadow-[var(--shadowy-text)] w-full rounded-md border-1 border-red-100/50 bg-red-800/50 p-4 text-center font-bold">
            <p className="text-red-100">{error}</p>
          </div>
        )}
      </div>
    </main>
  );
}
