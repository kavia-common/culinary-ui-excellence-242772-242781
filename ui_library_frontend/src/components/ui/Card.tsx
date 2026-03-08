import * as React from "react";

function cx(...classes: Array<string | false | undefined | null>) {
  return classes.filter(Boolean).join(" ");
}

export type CardProps = React.HTMLAttributes<HTMLDivElement> & {
  tone?: "default" | "elevated";
};

// PUBLIC_INTERFACE
export function Card({ tone = "default", className, ...props }: CardProps) {
  /** Glassy surface card. */
  return (
    <div
      className={cx(
        "rounded-2xl border border-white/10",
        tone === "elevated"
          ? "bg-white/[0.06] shadow-[var(--ui-shadow-lg)]"
          : "bg-white/[0.04] shadow-[var(--ui-shadow-sm)]",
        className,
      )}
      {...props}
    />
  );
}
