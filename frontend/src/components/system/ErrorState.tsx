import { Button } from "@/components/ui/Button";

export function ErrorState({ message, onRetry }: { message: string; onRetry?: () => void }) {
  return (
    <div className="rounded-[1.5rem] border border-[#6a2f18] bg-[linear-gradient(180deg,_#1f130d,_#120f0b)] p-6 text-[#f5d7c9] shadow-card">
      <p className="text-base font-semibold">{message}</p>
      {onRetry ? <Button className="mt-4" onClick={onRetry}>Retry</Button> : null}
    </div>
  );
}
