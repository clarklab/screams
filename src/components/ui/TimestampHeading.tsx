interface TimestampHeadingProps {
  timestamp: string;
  heading: string;
}

export function TimestampHeading({ timestamp, heading }: TimestampHeadingProps) {
  return (
    <div className="flex items-center gap-2.5 mb-3">
      <span className="shrink-0 inline-flex items-center px-2 py-0.5 rounded-full text-[0.6875rem] font-medium leading-tight bg-[var(--bg-tertiary)] text-[var(--text-secondary)] tabular-nums">
        {timestamp}
      </span>
      <h3 className="text-sm font-semibold text-[var(--text-primary)]">
        {heading}
      </h3>
    </div>
  );
}
