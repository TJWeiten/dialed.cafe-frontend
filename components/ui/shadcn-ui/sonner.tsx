"use client";

import {
    CircleCheckIcon,
    InfoIcon,
    Loader2Icon,
    OctagonXIcon,
    TriangleAlertIcon,
} from "lucide-react";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { Toaster as Sonner, type ToasterProps } from "sonner";

const Toaster = ({ ...props }: ToasterProps) => {
    const theme = "dark";
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    const toaster = (
        <Sonner
            theme={theme as ToasterProps["theme"]}
            className="toaster group z-[99999]"
            icons={{
                success: <CircleCheckIcon className="size-5 text-green-400" />,
                info: <InfoIcon className="size-5 text-blue-400" />,
                warning: (
                    <TriangleAlertIcon className="size-5 text-yellow-500" />
                ),
                error: <OctagonXIcon className="size-5 text-red-400" />,
                loading: (
                    <Loader2Icon className="size-5 animate-spin text-white" />
                ),
            }}
            style={
                {
                    "--normal-bg": "var(--popover)",
                    "--normal-text": "var(--popover-foreground)",
                    "--normal-border": "var(--border)",
                    "--border-radius": "var(--radius)",
                } as React.CSSProperties
            }
            {...props}
        />
    );

    if (!mounted) {
        return null;
    }
    return createPortal(toaster, document.body);
};

export { Toaster };
