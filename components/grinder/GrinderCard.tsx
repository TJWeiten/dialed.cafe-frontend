import { Button } from "@/components/ui/shadcn-ui/button";
import {
    Card,
    CardAction,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/shadcn-ui/card";
import { Input } from "@/components/ui/shadcn-ui/input";
import { Label } from "@/components/ui/shadcn-ui/label";
import { Grinder } from "@/types/grinder";
import { SquarePen } from "lucide-react";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import GrinderModal from "./GrinderModal";
import { Spinner } from "../ui/shadcn-ui/spinner";
import { useApiData } from "@/hooks/useApiData";
import { useGrinderModal } from "@/contexts/GrinderModalContext";

interface GrinderCardProps {
    grinder: Grinder;
}

export function GrinderCard({ grinder }: GrinderCardProps) {
    const { openModal } = useGrinderModal();
    const [imageLoaded, setImageLoaded] = useState(false);
    const [imageLoadFailed, setImageLoadFailed] = useState(false);
    return (
        <Card className="w-[31%] overflow-hidden border-white/15 py-0 pb-6">
            <div className="relative w-full">
                <Button
                    variant="ghost"
                    size="sm"
                    className={`absolute right-2 top-2 z-20 h-8 w-8 hover:text-white ${grinder.imageUrl ? "bg-black/50 text-white" : "text-neutral-400 hover:bg-black/70"}`}
                    onClick={() => openModal(true, grinder)}
                >
                    <SquarePen />
                </Button>
                {grinder.imageUrl && (
                    <>
                        {!imageLoaded && !imageLoadFailed && (
                            <div className="flex aspect-square h-auto w-full animate-pulse items-center justify-center bg-neutral-800 object-cover">
                                <Spinner className="size-10 -translate-y-4" />
                            </div>
                        )}
                        {imageLoaded && imageLoadFailed && (
                            <div className="flex aspect-square h-auto w-full items-center justify-center bg-neutral-800 object-cover">
                                <span className="h-8 w-8 -translate-y-4 animate-pulse rounded-full border border-red-300 bg-red-700 text-center text-xl font-black text-red-300 shadow-[0_0_10px_rgba(239,68,68,0.8),0_0_20px_rgba(239,68,68,0.4),0_0_30px_rgba(239,68,68,0.2)]">
                                    !
                                </span>
                            </div>
                        )}
                        {!imageLoadFailed && (
                            <Image
                                src={`${grinder.imageUrl}`}
                                alt={`Photo of ${grinder.name}`}
                                width={350}
                                height={0}
                                className={`h-auto w-full ${imageLoaded ? "aspect-square object-cover opacity-100" : "opacity-0"}`}
                                onLoad={() => {
                                    setImageLoaded(true);
                                    setImageLoadFailed(false);
                                }}
                                onError={() => {
                                    setImageLoaded(true);
                                    setImageLoadFailed(true);
                                }}
                            />
                        )}
                        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[var(--card)] to-95%"></div>
                    </>
                )}
                <CardHeader
                    className={`z-10 ${grinder.imageUrl ? "absolute bottom-0 left-0 right-0 mb-5" : "mt-5"}`}
                >
                    <CardTitle className="select-none text-center text-2xl tracking-wide">
                        {grinder.name}
                    </CardTitle>
                </CardHeader>
            </div>
            <CardContent className="select-none space-y-4">
                <div className="space-y-3">
                    <div className="flex items-center justify-between">
                        <span className="text-sm font-medium text-neutral-300">
                            Burr Type
                        </span>
                        <span className="text-sm font-semibold capitalize">
                            {grinder.burrType.toLowerCase()}
                        </span>
                    </div>

                    <div className="flex items-center justify-between">
                        <span className="text-sm font-medium text-neutral-300">
                            Dial
                        </span>
                        <span className="text-sm font-semibold">
                            {grinder.stepless ? "Stepless" : "Stepped"}
                        </span>
                    </div>

                    {grinder.grindRange && (
                        <div className="flex items-center justify-between">
                            <span className="text-sm font-medium text-neutral-300">
                                Grind Range
                            </span>
                            <span className="text-sm font-semibold">
                                {grinder.grindRange}
                            </span>
                        </div>
                    )}

                    {grinder.notes && (
                        <div className="border-t border-neutral-700 pt-3">
                            <span className="mb-2 block text-sm font-medium text-neutral-300">
                                Notes
                            </span>
                            <p className="rounded-md bg-neutral-800 p-3 text-sm italic text-neutral-200">
                                "{grinder.notes}"
                            </p>
                        </div>
                    )}
                </div>
            </CardContent>
        </Card>
    );
}
