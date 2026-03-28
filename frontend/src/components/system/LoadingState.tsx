export function LoadingState({ className = "" }: { className?: string }) {
  return (
    <div className={`flex items-center justify-center rounded-[1.5rem] border border-dashed border-[#5a431d] bg-[#17120d] p-10 text-sm font-semibold text-[#f4bb41] ${className}`}>
      Loading...
    </div>
  );
}
