import { Button } from "@/components/ui/shadcn-ui/button";
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/shadcn-ui/card";
import { Bean, RoastLevel } from "@/types/bean";
import { SquarePen } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { Spinner } from "../ui/shadcn-ui/spinner";
import { useBeanModal } from "@/contexts/BeanModalContext";
import { getPlaceholderImage } from "@/lib/PlaceholderPreview";

const ROAST_LEVEL_LABELS: Record<RoastLevel, string> = {
    LIGHT: "Light",
    MEDIUM_LIGHT: "Medium Light",
    MEDIUM: "Medium",
    MEDIUM_DARK: "Medium Dark",
    DARK: "Dark",
    UNKNOWN: "Unknown",
};

interface BeanCardProps {
    bean: Bean;
}

export function BeanCard({ bean }: BeanCardProps) {
    const { openModal } = useBeanModal();
    const [imageLoaded, setImageLoaded] = useState(false);
    const [imageLoadFailed, setImageLoadFailed] = useState(false);

    const imageOrPlaceholderUrl = bean.imageUrl
        ? bean.imageUrl
        : getPlaceholderImage(bean.id);

    const roastDateDisplay = bean.roastDate
        ? new Date(bean.roastDate).toLocaleDateString("en-US", {
              month: "short",
              day: "numeric",
              year: "numeric",
          })
        : null;

    return (
        <Card className="overflow-hidden border-white/15 py-0 pb-6">
            <div className="relative w-full">
                <Button
                    variant="ghost"
                    size="sm"
                    className={`absolute right-2 top-2 z-20 h-8 w-8 hover:text-white ${imageOrPlaceholderUrl ? "bg-black/50 text-white" : "text-neutral-200 hover:bg-black/70"}`}
                    onClick={() => openModal(true, bean)}
                >
                    <SquarePen />
                </Button>
                {imageOrPlaceholderUrl && (
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
                                src={`${imageOrPlaceholderUrl}`}
                                alt={`Photo of ${bean.name}`}
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
                    className={`z-10 ${imageOrPlaceholderUrl ? "absolute bottom-0 left-0 right-0 mb-3" : "mt-5"}`}
                >
                    <CardTitle className="select-none text-center text-2xl tracking-wide">
                        {bean.name}
                    </CardTitle>
                </CardHeader>
            </div>
            <CardContent className="select-none space-y-4">
                <div className="space-y-3">
                    <div className="flex items-center justify-between">
                        <span className="text-sm font-medium text-neutral-300">
                            Roaster
                        </span>
                        <span className="text-right text-sm font-semibold">
                            {bean.roaster}
                        </span>
                    </div>

                    <div className="flex items-center justify-between">
                        <span className="text-sm font-medium text-neutral-300">
                            Roast Level
                        </span>
                        <span className="text-right text-sm font-semibold">
                            {ROAST_LEVEL_LABELS[bean.roastLevel]}
                        </span>
                    </div>

                    {(bean.currentWeight !== null || bean.packageWeight) && (
                        <div className="flex items-center justify-between">
                            <span className="text-sm font-medium text-neutral-300">
                                Weight
                            </span>
                            <span className="text-right text-sm font-semibold">
                                {bean.currentWeight !== null
                                    ? `${bean.currentWeight}g`
                                    : "—"}
                                {" / "}
                                {bean.packageWeight ? `${bean.packageWeight}g` : "—"}
                            </span>
                        </div>
                    )}

                    {roastDateDisplay && (
                        <div className="flex items-center justify-between">
                            <span className="text-sm font-medium text-neutral-300">
                                Roast Date
                            </span>
                            <span className="text-right text-sm font-semibold">
                                {roastDateDisplay}
                            </span>
                        </div>
                    )}

                    {bean.decaf && (
                        <div className="flex justify-center">
                            <span className="inline-block rounded-full bg-amber-900/40 px-3 py-1 text-xs font-semibold text-amber-300 border border-amber-700/50">
                                Decaf
                            </span>
                        </div>
                    )}

                    {bean.notes && (
                        <div className="border-t border-neutral-700 pt-3">
                            <span className="mb-2 block text-sm font-medium text-neutral-300">
                                Notes
                            </span>
                            <p className="rounded-md bg-neutral-800 p-3 text-sm italic text-neutral-200">
                                "{bean.notes}"
                            </p>
                        </div>
                    )}
                </div>
            </CardContent>
        </Card>
    );
}
