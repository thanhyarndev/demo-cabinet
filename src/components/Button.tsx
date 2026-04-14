
import { cn } from "../lib/utils";

type ButtonVariant = "primary" | "secondary" | "ghost" | "destructive" | "pill" | "icon";
type ButtonSize = "sm" | "default" | "lg";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: ButtonVariant;
    size?: ButtonSize;
    loading?: boolean;
    children?: React.ReactNode;
}

const variantStyles: Record<ButtonVariant, string> = {
    primary:
        "bg-primary text-primary-foreground hover:bg-primary/90 shadow-sm border-0",
    secondary:
        "bg-white dark:bg-zinc-950/50 border border-zinc-200 dark:border-white/10 text-zinc-900 dark:text-zinc-50 hover:bg-zinc-100 dark:hover:bg-white/10 shadow-sm",
    ghost:
        "bg-transparent hover:bg-zinc-100 dark:hover:bg-white/5 text-foreground",
    destructive:
        "bg-red-600 text-white hover:bg-red-700 shadow-sm border-0",
    pill:
        "bg-primary text-primary-foreground hover:bg-primary/90 shadow-sm rounded-full border-0",
    icon:
        "bg-transparent hover:bg-zinc-100 dark:hover:bg-white/5 text-muted-foreground hover:text-foreground p-0",
};

const sizeStyles: Record<ButtonSize, string> = {
    sm: "h-10 px-3.5 text-[13px]",
    default: "h-11 px-5 text-[14px]",
    lg: "h-12 px-6 text-[15px]",
};

const shapeForVariant: Record<ButtonVariant, string> = {
    primary: "rounded-[8px]",
    secondary: "rounded-[8px]",
    ghost: "rounded-[6px]",
    destructive: "rounded-[8px]",
    pill: "rounded-full",
    icon: "rounded-full w-11 h-11",
};

export function Button({
    variant = "primary",
    size = "default",
    loading = false,
    className,
    disabled,
    children,
    ...props
}: ButtonProps) {
    return (
        <button
            className={cn(
                "inline-flex items-center justify-center gap-2 whitespace-nowrap font-semibold transition-all duration-200",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
                "disabled:pointer-events-none disabled:opacity-50",
                "active:scale-[0.98] cursor-pointer",
                variantStyles[variant],
                variant !== "icon" && sizeStyles[size],
                shapeForVariant[variant],
                className
            )}
            disabled={disabled || loading}
            {...props}
        >
            {loading ? (
                <span className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
            ) : null}
            {children}
        </button>
    );
}
