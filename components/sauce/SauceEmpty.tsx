import {
    Empty,
    EmptyContent,
    EmptyDescription,
    EmptyHeader,
    EmptyMedia,
    EmptyTitle,
} from "@/components/ui/shadcn-ui/empty";
import { Button } from "@/components/ui/shadcn-ui/button";
import { Coffee } from "lucide-react";

interface SauceEmptyProps {
    addModalOpen: () => void;
    connectionError?: boolean;
}

export function SauceEmpty({ addModalOpen, connectionError }: SauceEmptyProps) {
    return (
        <Empty className="flex h-full min-h-[60vh] w-full -translate-y-16 select-none items-center justify-center">
            <EmptyHeader>
                <EmptyMedia
                    className="shadow-xs bg-input/30 border-input flex h-12 w-12 items-center justify-center rounded-md border"
                    variant="icon"
                >
                    <Coffee />
                </EmptyMedia>
                <EmptyTitle>No Sauces</EmptyTitle>
                <EmptyDescription>
                    You haven't added a sauce to your account yet. I guess you
                    like your coffee black?
                </EmptyDescription>
            </EmptyHeader>
            <EmptyContent>
                <Button onClick={addModalOpen} disabled={connectionError}>
                    Add your first sauce!
                </Button>
            </EmptyContent>
        </Empty>
    );
}
