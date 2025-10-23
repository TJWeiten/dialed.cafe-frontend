import { MessageBox } from "./ui/ApiMessage";
import { LoadingSpinner } from "./ui/LoadingSpinner";

interface AsyncDashboardContentProps {
    loading: boolean;
    message: string | null;
    error: string | null;
    children?: React.ReactNode;
}

export function AsyncDashboardContent({
    loading,
    message,
    error,
    children,
}: AsyncDashboardContentProps) {
    return (
        <>
            {loading && <LoadingSpinner />}
            {message && <MessageBox message={message} type="success" />}
            {message && children}
            {error && <MessageBox message={error} type="error" />}
        </>
    );
}
