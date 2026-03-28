export function EmptyState({ message }: { message: string }) {
  return (
    <div className="rounded-[1.5rem] border border-dashed border-[#5a431d] bg-[#17120d] p-6 text-sm text-[#d1bf99]">
      {message}
    </div>
  );
}
