import * as React from "react";

type IconProps = { className?: string };

// PUBLIC_INTERFACE
export function SparklesIcon({ className }: IconProps) {
  /** Decorative sparkles icon. */
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <path
        d="M12 2l1.2 4.2L17.4 7.4l-4.2 1.2L12 12.8l-1.2-4.2L6.6 7.4l4.2-1.2L12 2Z"
        stroke="currentColor"
        strokeWidth="1.5"
      />
      <path
        d="M19 12l.8 2.8 2.8.8-2.8.8L19 19l-.8-2.8-2.8-.8 2.8-.8L19 12Z"
        stroke="currentColor"
        strokeWidth="1.5"
      />
      <path
        d="M6 13l.7 2.3 2.3.7-2.3.7L6 19l-.7-2.3-2.3-.7 2.3-.7L6 13Z"
        stroke="currentColor"
        strokeWidth="1.5"
      />
    </svg>
  );
}

// PUBLIC_INTERFACE
export function SearchIcon({ className }: IconProps) {
  /** Search icon. */
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <path
        d="M10.5 18a7.5 7.5 0 1 1 0-15 7.5 7.5 0 0 1 0 15Z"
        stroke="currentColor"
        strokeWidth="1.5"
      />
      <path d="M16.5 16.5 21 21" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  );
}

// PUBLIC_INTERFACE
export function SettingsIcon({ className }: IconProps) {
  /** Settings gear icon. */
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <path
        d="M12 15.2a3.2 3.2 0 1 0 0-6.4 3.2 3.2 0 0 0 0 6.4Z"
        stroke="currentColor"
        strokeWidth="1.5"
      />
      <path
        d="M19.4 12a7.5 7.5 0 0 0-.1-1l2-1.5-2-3.4-2.4.7a7.6 7.6 0 0 0-1.7-1l-.4-2.5H10l-.4 2.5a7.6 7.6 0 0 0-1.7 1l-2.4-.7-2 3.4 2 1.5a7.5 7.5 0 0 0 0 2l-2 1.5 2 3.4 2.4-.7a7.6 7.6 0 0 0 1.7 1l.4 2.5h4.8l.4-2.5a7.6 7.6 0 0 0 1.7-1l2.4.7 2-3.4-2-1.5c.1-.3.1-.7.1-1Z"
        stroke="currentColor"
        strokeWidth="1.3"
        strokeLinejoin="round"
      />
    </svg>
  );
}
