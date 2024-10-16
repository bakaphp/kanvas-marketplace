import { XMarkIcon } from '@heroicons/react/24/outline';
import { cn } from '@kanvas/phoenix-rebirth/dist/lib/utils';

export default function CloseCart({ className }: { className?: string }) {
  return (
    <div className="relative flex h-11 w-11 items-center justify-center rounded-md border text-black transition-colors">
      <XMarkIcon className={cn('h-6 transition-all ease-in-out hover:scale-110 ', className)} />
    </div>
  );
}
