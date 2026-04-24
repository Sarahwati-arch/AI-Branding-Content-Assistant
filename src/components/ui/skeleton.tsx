export function Skeleton({ className = "" }: { className?: string }) {
  return (
    <div
      className={`rounded-lg bg-gradient-to-r from-transparent via-secondary to-transparent bg-[length:200%_100%] animate-shimmer ${className}`}
    />
  );
}
