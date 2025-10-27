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
import { Grinder } from "@/types/grinder";

interface GrinderEmptyProps {
    addModalOpen: () => void;
    connectionError?: boolean;
}

export function GrinderEmpty({
    addModalOpen,
    connectionError,
}: GrinderEmptyProps) {
    return (
        <Empty className="flex w-full select-none items-center">
            <EmptyHeader>
                <EmptyMedia
                    className="shadow-xs bg-input/30 border-input flex h-12 w-12 items-center justify-center rounded-md border"
                    variant="icon"
                >
                    <Coffee />
                </EmptyMedia>
                <EmptyTitle>No Grinders!</EmptyTitle>
                <EmptyDescription>
                    You haven't added a grinder to your account yet. Hopefully
                    you're not using pre-ground coffee beans, right?
                </EmptyDescription>
            </EmptyHeader>
            <EmptyContent>
                <Button onClick={addModalOpen} disabled={connectionError}>
                    Add your first grinder!
                </Button>
            </EmptyContent>
        </Empty>
    );
}
