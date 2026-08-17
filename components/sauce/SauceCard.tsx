import { Button } from "@/components/ui/shadcn-ui/button";
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/shadcn-ui/card";
import { Sauce, SauceVersion } from "@/types/sauce";
import { SquarePen } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { Spinner } from "../ui/shadcn-ui/spinner";
import { useSauceModal } from "@/contexts/SauceModalContext";
import DOMPurify from "dompurify";
import { getPlaceholderImage } from "@/lib/PlaceholderPreview";

interface SauceCardProps {
    sauce: Sauce;
}

export function SauceCard({ sauce }: SauceCardProps) {
    const { openModal } = useSauceModal();
    const [imageLoaded, setImageLoaded] = useState(false);
    const [imageLoadFailed, setImageLoadFailed] = useState(false);

    const sauceRecipeHtml =
        sauce.latestVersion?.recipe.replace(/\n/g, "<br>") ||
        "Whoops, something went wrong!";
    // SANITIZE because we will be using dangerouslySetInnerHTML below!
    const cleanedSauceRecipeHtml = DOMPurify.sanitize(sauceRecipeHtml, {
        ALLOWED_TAGS: ["br"],
    });

    const imageOrPlaceholderUrl = sauce.imageUrl
        ? sauce.imageUrl
        : getPlaceholderImage(sauce.id);

    return (
        <Card className="overflow-hidden border-white/15 py-0 pb-6">
            <div className="relative w-full">
                <Button
                    variant="ghost"
                    size="sm"
                    className={`absolute right-2 top-2 z-20 h-8 w-8 hover:text-white ${imageOrPlaceholderUrl ? "bg-black/50 text-white" : "text-neutral-200 hover:bg-black/70"}`}
                    onClick={() => openModal(true, sauce)}
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
                                alt={`Photo of ${sauce.name}`}
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
                        {sauce.name}
                    </CardTitle>
                </CardHeader>
            </div>
            <CardContent className="select-none space-y-4">
                <div className="space-y-3">
                    {cleanedSauceRecipeHtml && (
                        <div className="-mt-6">
                            <span className="mb-2 block text-sm font-medium text-neutral-300">
                                Recipe / Ingredients
                            </span>
                            <p
                                className="rounded-md bg-neutral-800 p-3 text-sm italic text-neutral-200"
                                dangerouslySetInnerHTML={{
                                    __html: cleanedSauceRecipeHtml,
                                }}
                            />
                        </div>
                    )}
                </div>
            </CardContent>
        </Card>
    );
}
