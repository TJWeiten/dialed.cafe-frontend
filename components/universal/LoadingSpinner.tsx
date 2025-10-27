import { Spinner } from "@/components/ui/shadcn-ui/spinner";
export function LoadingSpinner() {
    return (
        <div className="flex w-full justify-center">
            <div className="shadow-xs bg-input/30 border-input hover:bg-input/50 flex h-16 w-16 items-center justify-center rounded-md border">
                <Spinner className="size-10" />
            </div>
        </div>
    );
}
