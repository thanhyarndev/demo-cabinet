
import { cn } from "../lib/utils";

export interface ProgressProps {
    value: number; // 0–100
    max?: number;
    variant?: "default" | "success" | "warning" | "error";
    size?: "sm" | "default" | "lg";
    showValue?: boolean;
    className?: string;
}

const trackColors: Record<string, string> = {
    default: "bg-primary text-primary-foreground",
    success: "bg-[#3DDC84] text-black", // Tesla Green
    warning: "bg-amber-500",
    error: "bg-red-500",
};

const sizeStyles: Record<string, string> = {
    sm: "h-1",
    default: "h-2",
    lg: "h-3 rounded-[4px]",
};

export function Progress({
    value,
    max = 100,
    variant = "default",
    size = "default",
    showValue = false,
    className,
}: ProgressProps) {
    const percent = Math.max(0, Math.min(100, (value / max) * 100));

    return (
        <div className={cn("flex flex-col gap-1.5 w-full", className)}>
            <div className="flex items-center gap-2">
                <div className={cn(
                    "flex-1 rounded-full bg-black/[0.06] dark:bg-white/[0.06] overflow-hidden",
                    sizeStyles[size]
                )}>
                    <div
                        className={cn(
                            "h-full rounded-full transition-[width] duration-300 ease-out",
                            trackColors[variant]
                        )}
                        style={{ width: `${percent}%` }}
                        role="progressbar"
                        aria-valuenow={value}
                        aria-valuemin={0}
                        aria-valuemax={max}
                    />
                </div>
                {showValue && (
                    <span className="text-[12px] font-bold text-muted-foreground tabular-nums min-w-[3ch] text-right">
                        {Math.round(percent)}%
                    </span>
                )}
            </div>
        </div>
    );
}
