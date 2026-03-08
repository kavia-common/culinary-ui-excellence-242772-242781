import * as React from "react";

function cx(...classes: Array<string | false | undefined | null>) {
  return classes.filter(Boolean).join(" ");
}

export type BadgeProps = React.HTMLAttributes<HTMLSpanElement> & {
  variant?: "neutral" | "success" | "warn" | "danger";
};

// PUBLIC_INTERFACE
export function Badge({ variant = "neutral", className, ...props }: BadgeProps) {
  /** Small status badge. */
  const styles: Record<NonNullable<BadgeProps["variant"]>, string> = {
    neutral: "bg-white/10 text-white/80 border-white/15",
    success: "bg-emerald-500/15 text-emerald-200 border-emerald-400/20",
    warn: "bg-amber-500/15 text-amber-200 border-amber-400/20",
    danger: "bg-rose-500/15 text-rose-200 border-rose-400/20",
  };

  return (
    <span
      className={cx(
        "inline-flex items-center gap-2 rounded-full border px-2.5 py-1 text-xs font-medium",
        styles[variant],
        className,
      )}
      {...props}
    />
  );
}
