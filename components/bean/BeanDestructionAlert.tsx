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
import { useBean } from "@/hooks/useBean";
import { Bean } from "@/types/bean";
import { Spinner } from "../ui/shadcn-ui/spinner";

interface BeanDestructionAlertProps {
    bean?: Bean;
    isSubmitting: boolean;
    setIsSubmitting: (isSubmitting: boolean) => void;
    onOpenChange: (open: boolean) => void;
    rerenderOnSuccess?: () => void;
}

export function BeanDestructionAlert({
    bean,
    isSubmitting,
    setIsSubmitting,
    onOpenChange,
    rerenderOnSuccess,
}: BeanDestructionAlertProps) {
    const { deleteBean } = useBean(() => {
        onOpenChange(false);
        rerenderOnSuccess?.();
    });

    const handleDelete = async () => {
        if (!bean?.id) return;
        setIsSubmitting(true);
        await deleteBean(bean.id);
        setIsSubmitting(false);
    };

    if (!bean) return null;

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
                    <AlertDialogTitle>Delete Bean</AlertDialogTitle>
                    <AlertDialogDescription>
                        Are you sure you want to delete
                        <b>&#20;{bean?.name}</b>? This action cannot be undone
                        and will permanently remove the bean from your
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
