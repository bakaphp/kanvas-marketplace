'use client';
import FilterItem from '@/components/molecules/filter-item';
import { NumericMenu } from '@/components/molecules/numeric-menu';
import FilterSidebar from '@/components/organism/filter-sidebar';
import { Suspense } from 'react';
import { RefinementList, ToggleRefinement } from 'react-instantsearch';

export default function SearchLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Suspense>
        <div className='h-36 w-full bg-black'></div>
        <div className='mx-auto flex max-w-screen-2xl flex-col gap-8 px-4 pb-4 text-black md:flex-row dark:text-white pt-5'>
          <FilterSidebar />
          <div className='order-last min-h-screen w-full md:order-none'>
            {children}
          </div>
        </div>
      </Suspense>
    </>
  );
}
