import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/shadcn-ui/alert-dialog";
import { Button } from "@/components/ui/shadcn-ui/button";
import { useSauce } from "@/hooks/useSauce";
import { Sauce } from "@/types/sauce";
import { Spinner } from "../ui/shadcn-ui/spinner";

interface SauceDestructionAlertProps {
    sauce?: Sauce;
    isSubmitting: boolean;
    setIsSubmitting: (isSubmitting: boolean) => void;
    onOpenChange: (open: boolean) => void;
    rerenderOnSuccess?: () => void;
}

export function SauceDestructionAlert({
    sauce,
    isSubmitting,
    setIsSubmitting,
    onOpenChange,
    rerenderOnSuccess,
}: SauceDestructionAlertProps) {
    const { deleteSauce } = useSauce(() => {
        onOpenChange(false);
        rerenderOnSuccess?.();
    });

    const handleDelete = async () => {
        if (!sauce?.id) return;
        setIsSubmitting(true);
        await deleteSauce(sauce.id);
        setIsSubmitting(false);
    };

    if (!sauce) return null;

    return (
        <AlertDialog>
            <AlertDialogTrigger asChild>
                <Button
                    type="button"
                    disabled={isSubmitting}
                    className="w-22 bg-destructive text-destructive-foreground hover:bg-destructive/90"
                >
                    Delete
                </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Delete Sauce</AlertDialogTitle>
                    <AlertDialogDescription>
                        Are you sure you want to delete
                        <b>&#20;{sauce?.name}</b>? This action cannot be undone
                        and will permanently remove the sauce from your
                        collection.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction
                        onClick={handleDelete}
                        className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                    >
                        {isSubmitting ? (
                            <Spinner />
                        ) : (
                            "Yes, I am sure I want to do this"
                        )}
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
}
