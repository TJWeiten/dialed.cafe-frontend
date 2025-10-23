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
import { SquarePen } from "lucide-react";

export default function GrinderCard({ index }: { index: number }) {
    return (
        <Card className="w-full">
            <CardHeader>
                <CardTitle>Grinderbalooza {index + 1}</CardTitle>
                <CardAction className="flex-col gap-2">
                    <Button
                        variant="ghost"
                        size="sm"
                        className="-my-8 h-8 w-8 p-0 text-neutral-400 hover:text-white"
                    >
                        <SquarePen />
                    </Button>
                </CardAction>
            </CardHeader>
            <CardContent>
                <div className="flex flex-col gap-6">
                    <div className="grid gap-2">Hello, world.</div>
                </div>
            </CardContent>
        </Card>
    );
}
