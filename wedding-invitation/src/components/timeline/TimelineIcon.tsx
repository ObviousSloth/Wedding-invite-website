"use client";

interface Props {
  icon: string;
  className?: string;
  /** Overrides the CSS class size. Passed as inline style when set. */
  size?: string;
}

export default function TimelineIcon({ icon, className = "", size }: Props) {
  return (
    <img
      src={`/svgs/timeline/${icon}.svg`}
      alt=""
      aria-hidden="true"
      className={className}
      style={size ? { width: size, height: size } : undefined}
      onError={(e) => {
        (e.target as HTMLImageElement).style.display = "none";
      }}
    />
  );
}
