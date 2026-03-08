import * as React from "react";

function cx(...classes: Array<string | false | undefined | null>) {
  return classes.filter(Boolean).join(" ");
}

export type ToggleProps = {
  checked: boolean;
  onCheckedChange: (checked: boolean) => void;
  label: string;
  description?: string;
  disabled?: boolean;
  className?: string;
};

// PUBLIC_INTERFACE
export function Toggle({
  checked,
  onCheckedChange,
  label,
  description,
  disabled,
  className,
}: ToggleProps) {
  /** iOS-grade toggle (no external deps). */
  return (
    <div className={cx("flex items-center justify-between gap-4", className)}>
      <div className="min-w-0">
        <div className="text-sm font-medium text-white/90 truncate">{label}</div>
        {description ? (
          <div className="text-xs text-white/55 truncate">{description}</div>
        ) : null}
      </div>

      <button
        type="button"
        role="switch"
        aria-checked={checked}
        aria-label={label}
        disabled={disabled}
        onClick={() => onCheckedChange(!checked)}
        className={cx(
          "relative h-7 w-12 rounded-full border transition-colors duration-200",
          checked ? "bg-[var(--ui-accent)] border-white/10" : "bg-white/10 border-white/15",
          disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer",
          "focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ui-accent)]",
        )}
      >
        <span
          className={cx(
            "absolute top-1/2 -translate-y-1/2 h-5 w-5 rounded-full bg-white shadow",
            "transition-transform duration-200",
            checked ? "translate-x-6" : "translate-x-1",
          )}
        />
      </button>
    </div>
  );
}
