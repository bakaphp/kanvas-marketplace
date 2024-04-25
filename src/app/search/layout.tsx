'use client';
import { Suspense } from 'react';
import { RefinementList } from 'react-instantsearch';

export default function SearchLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Suspense>
        <div className='mx-auto flex max-w-screen-2xl flex-col gap-8 px-4 pb-4 text-black md:flex-row dark:text-white '>
          <div className='order-first w-full flex-none md:max-w-[280px]'>
            Status
            {/* <Sidebar /> */}
            <RefinementList attribute='warehouses.status.name' classNames={{
              count: "hidden"
            }} />
          </div>
          <div className='order-last min-h-screen w-full md:order-none'>
            {children}
          </div>
        </div>
      </Suspense>
    </>
  );
}
