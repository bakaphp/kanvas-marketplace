'use client';
import { Disclosure } from '@headlessui/react';
import { ChevronUpIcon, ChevronDownIcon } from '@heroicons/react/24/solid'; // Usa heroicons para los iconos

export function TruncatedTitle({
  title,
  maxLength,
}: {
  title: string;
  maxLength: number;
}) {
  const truncatedTitle =
    title.length > maxLength ? title.substring(0, maxLength) + '...' : title;

  return (
    <Disclosure>
      {({ open }) => (
        <>
          <h1 className='mb-2 text-4xl font-bold'>
            {open ? title : truncatedTitle}
            <Disclosure.Button className='text-4xl font-bold'>
              {title.length > maxLength && (
                <span className=' text-blue-500'>
                  {open ? (
                    <ChevronUpIcon className='w-5 h-5' />
                  ) : (
                    <ChevronDownIcon className='w-5 h-5' />
                  )}
                </span>
              )}
            </Disclosure.Button>
          </h1>
        </>
      )}
    </Disclosure>
  );
}
