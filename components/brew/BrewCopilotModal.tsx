"use client";

import { useEffect, useRef, useState } from "react";
import { useAuth } from "@clerk/nextjs";
import { fetchEventSource } from "@microsoft/fetch-event-source";

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/shadcn-ui/dialog";
import { Spinner } from "../ui/shadcn-ui/spinner";
import { MessageSquare } from "lucide-react";

interface BrewCopilotModalProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    brewId: string;
    /** When true, forces a fresh OpenRouter call even if feedback is cached. */
    regenerate?: boolean;
    /** Called once the stream finishes so the parent can refetch data. */
    onComplete?: () => void;
}

export default function BrewCopilotModal({
    open,
    onOpenChange,
    brewId,
    regenerate = false,
    onComplete,
}: BrewCopilotModalProps) {
    const { getToken } = useAuth();
    const [feedback, setFeedback] = useState("");
    const [isStreaming, setIsStreaming] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const controllerRef = useRef<AbortController | null>(null);

    useEffect(() => {
            if (!open || !brewId) return;

            let cancelled = false;
            const controller = new AbortController();
            controllerRef.current = controller;
            setFeedback("");
            setError(null);
            setIsStreaming(true);

            (async () => {
                const token = await getToken();
                if (cancelled) return; // Prevent starting a stale stream after Strict Mode cleanup

                const base = process.env.NEXT_PUBLIC_API_URL || "";
                const url = `${base}/brews/${brewId}/copilot/stream?regenerate=${regenerate}`;

                try {
                    await fetchEventSource(url, {
                        headers: {
                            Authorization: `Bearer ${token}`,
                            Accept: "text/event-stream",
                        },
                        signal: controller.signal,
                        openWhenHidden: true,
                        async onopen(res) {
                            if (res.ok && res.headers.get("content-type")?.includes("text/event-stream")) {
                                return;
                            }
                            throw new Error(`Unexpected response: ${res.status}`);
                        },
                        onmessage(event) {
                            if (cancelled) return; // Ignore late events from an aborted stream

                            if (event.event === "done") {
                                setIsStreaming(false);
                                onComplete?.();
                                return;
                            }
                            if (event.event === "error") {
                                setError(event.data || "Stream error");
                                setIsStreaming(false);
                                return;
                            }
                            if (!event.data || event.data === "[DONE]") return;

                            const { content } = JSON.parse(event.data);
                            setFeedback((prev) => prev + content);
                        },
                        onclose() {
                            if (!cancelled) setIsStreaming(false);
                        },
                        onerror(err) {
                            if (!cancelled) {
                                setError(err instanceof Error ? err.message : String(err));
                                setIsStreaming(false);
                            }
                            throw err;
                        },
                    });
                } catch (err) {
                    if (cancelled || (err instanceof DOMException && err.name === "AbortError")) return;
                    setError(err instanceof Error ? err.message : String(err));
                    setIsStreaming(false);
                }
            })();

            return () => {
                cancelled = true;
                controller.abort();
            };
            // eslint-disable-next-line react-hooks/exhaustive-deps
        }, [open, brewId, regenerate, getToken, onComplete]);

    // Auto-scroll to bottom as feedback streams in
    const scrollRef = useRef<HTMLDivElement>(null);
    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [feedback]);

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent
                className="flex flex-col gap-0 overflow-hidden border-0 p-0 sm:max-h-[min(980px,90vh)] sm:max-w-lg [&>button:last-child]:top-3.5"
                onOpenAutoFocus={(e) => e.preventDefault()}
                onCloseAutoFocus={(e) => {
                    e.preventDefault();
                    controllerRef.current?.abort();
                }}
            >
                <DialogHeader className="contents space-y-0 text-left">
                    <DialogTitle className="border-b px-6 py-4 text-base">
                        Barista Co-Pilot
                    </DialogTitle>
                    <DialogDescription className="sr-only">
                        AI feedback on your brew
                    </DialogDescription>
                </DialogHeader>

                <div
                    ref={scrollRef}
                    className="flex-1 min-h-0 overflow-y-auto px-6 py-4"
                >
                    {error && (
                        <div className="rounded-md bg-red-900/30 p-4 text-sm text-red-300">
                            {error}
                        </div>
                    )}

                    {!error && !feedback && isStreaming && (
                        <div className="flex items-center gap-3 py-8 text-muted-foreground">
                            <Spinner className="size-5" />
                            <span className="text-sm">
                                Your barista co-pilot is thinking…
                            </span>
                        </div>
                    )}

                    {!error && feedback && (
                        <div className="rounded-md bg-neutral-800 p-4">
                            <div className="mb-2 flex items-center gap-2 text-sm font-medium text-neutral-300">
                                <MessageSquare className="size-4" />
                                Barista Co-Pilot
                                {isStreaming && (
                                    <span className="ml-1 inline-block size-2 animate-pulse rounded-full bg-green-400" />
                                )}
                            </div>
                            <p className="whitespace-pre-wrap text-sm leading-relaxed text-neutral-200">
                                {feedback}
                            </p>
                        </div>
                    )}

                    {!error && !feedback && !isStreaming && (
                        <div className="py-8 text-center text-sm text-muted-foreground">
                            No feedback available for this brew.
                        </div>
                    )}
                </div>
            </DialogContent>
        </Dialog>
    );
}
