import { cn } from "@/lib/utils";

export function Card({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      {...props}
      className={cn(
        "rounded-[1.5rem] border border-[#4b3818] bg-[linear-gradient(180deg,_rgba(30,24,18,0.96),_rgba(17,17,17,0.96))] p-5 text-[#f5efe3] shadow-card backdrop-blur-sm",
        className,
      )}
    />
  );
}
