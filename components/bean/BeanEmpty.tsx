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

interface BeanEmptyProps {
    addModalOpen: () => void;
    connectionError?: boolean;
}

export function BeanEmpty({ addModalOpen, connectionError }: BeanEmptyProps) {
    return (
        <Empty className="flex h-full min-h-[60vh] w-full -translate-y-16 select-none items-center justify-center">
            <EmptyHeader>
                <EmptyMedia
                    className="shadow-xs bg-input/30 border-input flex h-12 w-12 items-center justify-center rounded-md border"
                    variant="icon"
                >
                    <Coffee />
                </EmptyMedia>
                <EmptyTitle>No Beans</EmptyTitle>
                <EmptyDescription>
                    You haven't added any beans yet. Time to start tracking your
                    favorite roasts!
                </EmptyDescription>
            </EmptyHeader>
            <EmptyContent>
                <Button onClick={addModalOpen} disabled={connectionError}>
                    Add your first bean!
                </Button>
            </EmptyContent>
        </Empty>
    );
}
