import { cn } from "@/app/_lib/utils";

function Skeleton({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "animate-pulse rounded-md bg-primary/20 shadow-sm",
        className,
      )}
      {...props}
    />
  );
}

export { Skeleton };
