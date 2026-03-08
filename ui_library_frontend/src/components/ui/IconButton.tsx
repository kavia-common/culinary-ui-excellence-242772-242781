import * as React from "react";

function cx(...classes: Array<string | false | undefined | null>) {
  return classes.filter(Boolean).join(" ");
}

export type IconButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  label: string;
};

// PUBLIC_INTERFACE
export function IconButton({ label, className, children, ...props }: IconButtonProps) {
  /** Accessible icon button used in the command bar. */
  return (
    <button
      type="button"
      aria-label={label}
      title={label}
      className={cx(
        "h-10 w-10 inline-flex items-center justify-center rounded-xl",
        "bg-white/5 hover:bg-white/10 active:bg-white/14",
        "border border-white/10",
        "text-white/90",
        "transition-all duration-200",
        "focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ui-accent)]",
        className,
      )}
      {...props}
    >
      {children}
    </button>
  );
}
