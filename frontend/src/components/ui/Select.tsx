import { cn } from "@/lib/utils";

export function Select(props: React.SelectHTMLAttributes<HTMLSelectElement>) {
  return (
    <select
      {...props}
      className={cn(
        "w-full rounded-2xl border border-[#4b3818] bg-[#120f0b] px-4 py-3 text-sm text-[#f5efe3] outline-none transition focus:border-[#f4bb41] focus:ring-2 focus:ring-[#4b3818]",
        props.className,
      )}
    />
  );
}
