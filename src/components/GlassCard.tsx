
import { cn } from "../lib/utils";

type GlassCardVariant = "default" | "raised" | "inset";

export interface GlassCardProps extends React.HTMLAttributes<HTMLDivElement> {
    variant?: GlassCardVariant;
    children: React.ReactNode;
}

const variantStyles: Record<GlassCardVariant, string> = {
    default:
        "bg-white dark:bg-neutral-900 border border-black/10 dark:border-white/10 rounded-[10px] shadow-sm",
    raised:
        "bg-white dark:bg-neutral-900 border border-black/10 dark:border-white/10 rounded-xl shadow-md hover:shadow-lg transition-shadow",
    inset:
        "bg-white/50 dark:bg-neutral-950/50 border border-black/5 dark:border-white/5 rounded-[16px] backdrop-blur-md",
};

export function GlassCard({
    variant = "default",
    className,
    children,
    ...props
}: GlassCardProps) {
    return (
        <div
            className={cn(variantStyles[variant], "p-4", className)}
            {...props}
        >
            {children}
        </div>
    );
}
