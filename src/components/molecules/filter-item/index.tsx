import { ChevronUpIcon } from '@kanvas/phoenix-rebirth/dist/components/icons';
import { cn } from '@kanvas/phoenix-rebirth/dist/lib/utils';
import { useState, useEffect } from 'react';

interface Props {
  title: string;
  content: React.ReactNode;
  id: string;
}

export default function FilterItem(props: Props) {
  const [isOpen, setIsOpen] = useState(true);

  useEffect(() => {
    const savedState = localStorage.getItem(`disclosure-${props.id}`);
    if (savedState !== null) {
      setIsOpen(JSON.parse(savedState));
    }
  }, [props.id]);

  useEffect(() => {
    localStorage.setItem(`disclosure-${props.id}`, JSON.stringify(isOpen));
  }, [isOpen, props.id]);

  const toggleOpen = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className='w-full'>
      <button
        onClick={toggleOpen}
        className='flex w-full justify-between px-2 py-2 text-left text-sm font-medium border-2 border-t-0 border-border-default'
      >
        <span>{props.title}</span>
        <ChevronUpIcon
          className={cn(
            { 'rotate-180 transform': isOpen },
            'h-5 w-5 text-foreground',
          )}
        />
      </button>

      <div
        className={cn('transition-all duration-300 overflow-hidden', {
          'max-h-screen opacity-100': isOpen,
          'max-h-0 opacity-0': !isOpen,
        })}
      >
        <div className='px-4 pb-2 pt-4 text-sm border-2 border-border-default'>
          {props.content}
        </div>
      </div>
    </div>
  );
}
