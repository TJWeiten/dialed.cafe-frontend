import { MessageBox } from "./ApiMessage";
import { LoadingSpinner } from "./LoadingSpinner";

interface AsyncDashboardContentProps {
    loading: boolean;
    message?: string | null;
    error?: string | null;
    children?: React.ReactNode;
}

export function AsyncDashboardContent({
    loading,
    message = null,
    error = null,
    children,
}: AsyncDashboardContentProps) {
    return (
        <>
            {loading && <LoadingSpinner />}
            {children}
            {message && <MessageBox message={message} type="success" />}
            {error && <MessageBox message={error} type="error" />}
        </>
    );
}
