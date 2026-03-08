import * as React from "react";

function cx(...classes: Array<string | false | undefined | null>) {
  return classes.filter(Boolean).join(" ");
}

export type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  leading?: React.ReactNode;
  trailing?: React.ReactNode;
};

// PUBLIC_INTERFACE
export function Input({ className, leading, trailing, ...props }: InputProps) {
  /** Text input with optional leading/trailing adornments. */
  return (
    <label
      className={cx(
        "flex items-center gap-2 rounded-xl border border-white/12 bg-white/5 px-3 h-11",
        "focus-within:ring-2 focus-within:ring-[var(--ui-accent)]",
        className,
      )}
    >
      {leading ? <span className="text-white/70">{leading}</span> : null}
      <input
        className={cx(
          "w-full bg-transparent text-sm text-white placeholder:text-white/40",
          "outline-none",
        )}
        {...props}
      />
      {trailing ? <span className="text-white/70">{trailing}</span> : null}
    </label>
  );
}
