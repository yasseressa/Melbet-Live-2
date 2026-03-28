import { cn } from "@/lib/utils";

export function Button({
  className,
  variant = "primary",
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement> & { variant?: "primary" | "secondary" | "ghost" }) {
  return (
    <button
      className={cn(
        "inline-flex items-center justify-center rounded-full px-4 py-2 text-sm font-semibold transition disabled:cursor-not-allowed disabled:opacity-60",
        variant === "primary" && "bg-[#f4bb41] text-[#17120d] hover:bg-[#ffd06f]",
        variant === "secondary" && "bg-[#2a2117] text-[#f5efe3] hover:bg-[#3a2c1b]",
        variant === "ghost" && "border border-[#4b3818] bg-[#17120d] text-[#f4bb41] hover:bg-[#21180f]",
        className,
      )}
      {...props}
    />
  );
}
