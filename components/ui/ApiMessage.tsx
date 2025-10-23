interface MessageBoxProps {
    message: string;
    type: "success" | "error";
}

export function MessageBox({ message, type }: MessageBoxProps) {
    const styles =
        type === "success"
            ? "border-green-100/50 bg-green-800/50 text-green-100"
            : "border-red-100/50 bg-red-800/50 text-red-100";

    return (
        <div
            className={`box-shadow-[var(--shadowy-text)] border-1 w-full rounded-md p-4 text-center font-bold ${styles}`}
        >
            <p>{message}</p>
        </div>
    );
}
