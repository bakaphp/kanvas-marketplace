'use client';

import { createUrl } from '@/models/services/shopify/utils';
import clsx from 'clsx';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';

type Combination = {
  id: string;
  availableForSale: boolean;
  [key: string]: string | boolean; // ie. { color: 'Red', size: 'Large', ... }
};

export default function VariantSelector({
  options,
  variants,
}: {
  options: any;
  variants: any;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const hasNoOptionsOrJustOneOption =
    !options.length ||
    (options.length === 1 && options[0]?.values.length === 1);

  if (hasNoOptionsOrJustOneOption) {
    return null;
  }

  const combinations: Combination[] = variants.map((variant: any) => ({
    id: variant.id,
    availableForSale: variant.quantity > 0,
    // Adds key / value pairs for each variant (ie. "color": "Black" and "size": 'M").
    ...variant.selectedOptions.reduce(
      (accumulator: any, option: any) => ({
        ...accumulator,
        [option.name.toLowerCase()]: option.value,
      }),
      {},
    ),
  }));

  return options.map((option: any) => (
    <dl className='mb-8' key={option.id}>
      <dt className='mb-4 text-sm uppercase tracking-wide'>{option.name}</dt>
      <dd className='flex flex-wrap gap-3'>
        {option.values.map((value: any) => {
          const optionNameLowerCase = option.name.toLowerCase();

          // Base option params on current params so we can preserve any other param state in the url.
          const optionSearchParams = new URLSearchParams(
            searchParams.toString(),
          );

          // Update the option params using the current option to reflect how the url *would* change,
          // if the option was clicked.
          optionSearchParams.set(optionNameLowerCase, value);
          const optionUrl = createUrl(pathname, optionSearchParams);

          // In order to determine if an option is available for sale, we need to:
          //
          // 1. Filter out all other param state
          // 2. Filter out invalid options
          // 3. Check if the option combination is available for sale
          //
          // This is the "magic" that will cross check possible variant combinations and preemptively
          // disable combinations that are not available. For example, if the color gray is only available in size medium,
          // then all other sizes should be disabled.
          const filtered = Array.from(optionSearchParams.entries()).filter(
            ([key, value]) =>
              options.find(
                (option: any) =>
                  option.name.toLowerCase() === key &&
                  option.values.includes(value),
              ),
          );
          const isAvailableForSale = combinations.find((combination) =>
            filtered.every(
              ([key, value]) =>
                combination[key] === value && combination.availableForSale,
            ),
          );

          // The option is active if it's in the url params.
          const isActive = searchParams.get(optionNameLowerCase) === value;

          return (
            <button
              key={value}
              aria-disabled={!isAvailableForSale}
              disabled={!isAvailableForSale}
              onClick={() => {
                router.replace(optionUrl, { scroll: false });
              }}
              title={`${option.name} ${value}${!isAvailableForSale ? ' (Out of Stock)' : ''}`}
              className={clsx(
                'flex min-w-[48px] items-center justify-center rounded-full border bg-primary text-primary-foreground px-2 py-1 text-sm',
                {
                  'cursor-default ring-2 ring-primary': isActive,
                  'ring-1 ring-transparent transition duration-300 ease-in-out hover:scale-110 hover:ring-primary ':
                    !isActive && isAvailableForSale,
                  'relative z-10 cursor-not-allowed overflow-hidden bg-primary/80 text-primary-foreground ring-1 ring-primary before:absolute before:inset-x-0 before:-z-10 before:h-px before:-rotate-45 before:bg-background before:transition-transform':
                    !isAvailableForSale,
                },
              )}
            >
              {value}
            </button>
          );
        })}
      </dd>
    </dl>
  ));
}
