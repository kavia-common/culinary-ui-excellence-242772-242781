import * as React from "react";

type ButtonVariant = "primary" | "secondary" | "ghost" | "danger";
type ButtonSize = "sm" | "md" | "lg";

function cx(...classes: Array<string | false | undefined | null>) {
  return classes.filter(Boolean).join(" ");
}

const base =
  "inline-flex items-center justify-center gap-2 rounded-xl font-medium " +
  "transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-0 " +
  "disabled:opacity-50 disabled:cursor-not-allowed select-none";

const sizes: Record<ButtonSize, string> = {
  sm: "h-9 px-3 text-sm",
  md: "h-11 px-4 text-sm",
  lg: "h-12 px-5 text-base",
};

const variants: Record<ButtonVariant, string> = {
  primary:
    "bg-[var(--ui-accent)] text-white shadow-[var(--ui-shadow-sm)] " +
    "hover:brightness-110 active:translate-y-[1px] active:shadow-none",
  secondary:
    "bg-white/10 text-white border border-white/15 shadow-[var(--ui-shadow-sm)] " +
    "hover:bg-white/14 active:translate-y-[1px] active:shadow-none",
  ghost:
    "bg-transparent text-white/90 hover:bg-white/10 border border-transparent " +
    "active:bg-white/14",
  danger:
    "bg-[var(--ui-danger)] text-white shadow-[var(--ui-shadow-sm)] " +
    "hover:brightness-110 active:translate-y-[1px] active:shadow-none",
};

export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant;
  size?: ButtonSize;
};

// PUBLIC_INTERFACE
export function Button({
  className,
  variant = "primary",
  size = "md",
  ...props
}: ButtonProps) {
  /** Premium button with subtle depth and consistent focus styles. */
  return (
    <button
      className={cx(base, sizes[size], variants[variant], className)}
      {...props}
    />
  );
}
