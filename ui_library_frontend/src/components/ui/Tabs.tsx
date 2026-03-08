import * as React from "react";

function cx(...classes: Array<string | false | undefined | null>) {
  return classes.filter(Boolean).join(" ");
}

export type TabItem = {
  id: string;
  label: string;
  badge?: string;
};

export type TabsProps = {
  items: TabItem[];
  activeId: string;
  onChange: (id: string) => void;
  className?: string;
};

// PUBLIC_INTERFACE
export function Tabs({ items, activeId, onChange, className }: TabsProps) {
  /** Lightweight tabs used for workspace views. */
  return (
    <div
      className={cx(
        "inline-flex items-center rounded-2xl border border-white/10 bg-white/5 p-1",
        className,
      )}
      role="tablist"
      aria-label="Workspace sections"
    >
      {items.map((t) => {
        const active = t.id === activeId;
        return (
          <button
            key={t.id}
            type="button"
            role="tab"
            aria-selected={active}
            onClick={() => onChange(t.id)}
            className={cx(
              "h-9 px-3 rounded-xl text-sm transition-colors duration-150",
              active ? "bg-white/12 text-white" : "text-white/70 hover:text-white hover:bg-white/8",
              "focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ui-accent)]",
            )}
          >
            <span className="inline-flex items-center gap-2">
              {t.label}
              {t.badge ? (
                <span className="text-[11px] px-2 py-0.5 rounded-full bg-white/10 text-white/70 border border-white/10">
                  {t.badge}
                </span>
              ) : null}
            </span>
          </button>
        );
      })}
    </div>
  );
}
