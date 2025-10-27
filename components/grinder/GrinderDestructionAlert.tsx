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
import { useGrinder } from "@/hooks/useGrinder";
import { Grinder } from "@/types/grinder";

interface GrinderDestructionAlertProps {
    grinder?: Grinder;
    isSubmitting: boolean;
    setIsSubmitting: (isSubmitting: boolean) => void;
    onOpenChange: (open: boolean) => void;
    rerenderOnSuccess?: () => void;
}

export function GrinderDestructionAlert({
    grinder,
    isSubmitting,
    setIsSubmitting,
    onOpenChange,
    rerenderOnSuccess,
}: GrinderDestructionAlertProps) {
    const { deleteGrinder } = useGrinder(() => {
        onOpenChange(false);
        rerenderOnSuccess?.();
    });

    const handleDelete = async () => {
        if (!grinder?.id) return;
        setIsSubmitting(true);
        await deleteGrinder(grinder.id);
        setIsSubmitting(false);
    };

    if (!grinder) return null;

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
                    <AlertDialogTitle>Delete Grinder</AlertDialogTitle>
                    <AlertDialogDescription>
                        Are you sure you want to delete
                        <b>&#20;{grinder?.name}</b>? This action cannot be
                        undone and will permanently remove the grinder from your
                        collection.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction
                        onClick={handleDelete}
                        className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                    >
                        {isSubmitting
                            ? "Deleting..."
                            : "Yes, I am sure I want to do this"}
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
}
