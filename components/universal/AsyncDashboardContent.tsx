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
            {!loading && children}
            {!loading && message && (
                <MessageBox message={message} type="success" />
            )}
            {!loading && error && <MessageBox message={error} type="error" />}
        </>
    );
}
