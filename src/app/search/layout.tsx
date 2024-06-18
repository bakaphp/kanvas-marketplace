'use client';
import FilterSidebar from '@/components/organism/filter-sidebar';
import { translate } from '@/translate';
import { Atoms } from '@kanvas/phoenix';
import { Suspense } from 'react';
export default function SearchLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Suspense>
        <div className='h-36 w-full bg-black flex flex-col items-center justify-center text-center text-white'>
          <Atoms.Heading.Four className='text-3xl font-bold'>
            {translate('search.title')}
          </Atoms.Heading.Four>
          <div className='h-1 w-12 bg-primary mt-3'></div>
        </div>

        <div className='mx-auto flex max-w-screen-2xl flex-col gap-8 px-4 pb-4 text-foreground md:flex-row pt-5'>
          <FilterSidebar />
          <div className='order-last min-h-screen w-full md:order-none'>
            {children}
          </div>
        </div>
      </Suspense>
    </>
  );
}
