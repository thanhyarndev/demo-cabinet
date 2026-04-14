
import { cn } from "../lib/utils";

type StatusBadgeStatus = "connected" | "disconnected" | "scanning" | "ready" | "error" | "verified";

export interface StatusBadgeProps {
    status: StatusBadgeStatus;
    label?: string;
    className?: string;
}

const statusStyles: Record<StatusBadgeStatus, { dot: string; text: string; label: string }> = {
    connected: {
        dot: "bg-primary animate-pulse",
        text: "text-foreground",
        label: "Connected",
    },
    disconnected: {
        dot: "bg-muted-foreground/30",
        text: "text-muted-foreground",
        label: "Disconnected",
    },
    scanning: {
        dot: "bg-blue-500 animate-pulse",
        text: "text-slate-700",
        label: "Scanning...",
    },
    ready: {
        dot: "bg-slate-400",
        text: "text-slate-700",
        label: "Ready",
    },
    verified: {
        dot: "bg-emerald-500",
        text: "text-emerald-600",
        label: "Verified",
    },
    error: {
        dot: "bg-red-500",
        text: "text-red-500",
        label: "Error",
    },
};

export function StatusBadge({
    status,
    label,
    className,
}: StatusBadgeProps) {
    const styles = statusStyles[status];
    return (
        <div className={cn("flex items-center gap-2 px-3 py-1.5 rounded-full bg-white border border-slate-200 shadow-sm w-fit", className)}>
            <div className={cn("w-2.5 h-2.5 rounded-full", styles.dot)} />
            <span className={cn("font-medium text-[12px] uppercase tracking-wider", styles.text)}>
                {label || styles.label}
            </span>
        </div>
    );
}
