'use client';

import { PlusIcon } from '@heroicons/react/24/outline';
import clsx from 'clsx';
import { addItem } from './actions';
import LoadingDots from '../../atoms/loading-dots/index';
import { ProductVariant } from '../../../models/types/shopify/products';
import { useSearchParams } from 'next/navigation';
import { useFormState, useFormStatus } from 'react-dom';

function SubmitButton({
  availableForSale,
  selectedVariantId,
}: {
  availableForSale: boolean;
  selectedVariantId: string | undefined;
}) {
  const { pending } = useFormStatus();
  const buttonClasses =
    'mt-2 relative flex w-full items-center justify-center rounded-md bg-primary-100 p-3 tracking-wide text-white';
  const disabledClasses = 'cursor-not-allowed opacity-60 hover:opacity-60';

  if (!availableForSale) {
    return (
      <button
        aria-disabled
        className={clsx(buttonClasses, disabledClasses)}
        disabled
      >
        Out Of Stock
      </button>
    );
  }

  if (!selectedVariantId) {
    return (
      <button
        aria-label='Please select an option'
        aria-disabled
        className={clsx(buttonClasses, disabledClasses)}
      >
        Add To Cart
      </button>
    );
  }

  return (
    <button
      onClick={(e: React.FormEvent<HTMLButtonElement>) => {
        if (pending) e.preventDefault();
      }}
      aria-label='Add to cart'
      aria-disabled={pending}
      className={clsx(buttonClasses, {
        'hover:opacity-90': true,
        disabledClasses: pending,
      })}
    >
      <div className='absolute left-0 ml-4'>
        {pending ? (
          <LoadingDots className='mb-3 bg-white' />
        ) : (
          // <PlusIcon className='h-5' />
          <></>
        )}
      </div>
      Add To Cart
    </button>
  );
}

export function AddToCart({ variants }: { variants: ProductVariant[] }) {
  // console.log({variants})
  const [message, formAction] = useFormState(addItem, null);
  const searchParams = useSearchParams();
  const defaultVariantId = variants.length === 1 ? variants[0]?.id : undefined;
  const variant =
    variants.find((variant: ProductVariant) =>
      variant.selectedOptions.every(
        (option) =>
          option.value === searchParams.get(option.name.toLowerCase()),
      ),
    ) || (variants.length === 1 ? variants[0] : undefined);
  const selectedVariantId = variant?.id || defaultVariantId;
  const availableForSale = variant?.id && variant.availableForSale;

  const actionWithVariant = formAction.bind(null, selectedVariantId);

  return (
    <form action={actionWithVariant}>
      <SubmitButton
        availableForSale={availableForSale}
        selectedVariantId={selectedVariantId}
      />
      <p aria-live='polite' className='sr-only' role='status'>
        {message}
      </p>
    </form>
  );
}
