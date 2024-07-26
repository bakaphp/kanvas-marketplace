'use client';

import LoadingDots from '@/components/atoms/loading-dots';
import { CartItem } from '@/models/services/shopify/types';
import { XMarkIcon } from '@heroicons/react/24/outline';
import clsx from 'clsx';

import { useFormState, useFormStatus } from 'react-dom';
import { removeItem } from './actions';
import { Show } from '@kanvas/phoenix-rebirth/dist/utils/server';

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <button
      type='submit'
      onClick={(e: React.FormEvent<HTMLButtonElement>) => {
        if (pending) e.preventDefault();
      }}
      aria-label='Remove cart item'
      aria-disabled={pending}
      className={clsx(
        'ease flex h-[17px] w-[17px] items-center justify-center rounded-full bg-neutral-500 transition-all duration-200',
        {
          'cursor-not-allowed px-0': pending,
        },
      )}
    >
      <Show
        when={pending}
        deps={[pending]}
        fallback={
          <XMarkIcon className='hover:text-accent-3 mx-[1px] h-4 w-4 text-white dark:text-black' />
        }
      >
        <LoadingDots className='bg-white' />
      </Show>
    </button>
  );
}

export function DeleteItemButton({ item }: { item: CartItem }) {
  const [message, formAction] = useFormState(removeItem, null);
  const itemId = item.id;
  const actionWithVariant = formAction.bind(null, itemId);

  return (
    <form action={actionWithVariant}>
      <SubmitButton />
      <p aria-live='polite' className='sr-only' role='status'>
        {message}
      </p>
    </form>
  );
}
