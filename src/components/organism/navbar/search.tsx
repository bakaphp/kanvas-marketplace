'use client';

import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import { usePathname, useRouter } from 'next/navigation';
import { SearchBox } from 'react-instantsearch';
export default function Search() {
  const router = useRouter();
  const path = usePathname();

  return (
    <div className="w-max-[550px] relative w-full lg:w-80 xl:w-full ">
      <SearchBox
        searchAsYouType={false}
        queryHook={(query, search) => {
          setTimeout(() => {
            if (path !== '/search') {
              router.push('search');
              setTimeout(() => {
                search(query);
              }, 500);
            }
          }, 300);
          search(query);
        }}
        classNames={{
          resetIcon: 'hidden',
          submitIcon: 'absolute left-0 top-0 ml-2  flex w-4 h-full items-center text-xl fill-white',
          input:
            'w-full rounded-lg border bg-white px-4 pl-8 py-2 text-sm text-black placeholder:text-neutral-500 dark:border-neutral-800 dark:bg-transparent dark:text-white dark:placeholder:text-neutral-400'
        }}
      />
    </div>
  );
}

export function SearchSkeleton() {
  return (
    <form className="w-max-[550px] relative w-full lg:w-80 xl:w-full">
      <input
        placeholder="Search for products..."
        className="w-full rounded-lg border bg-white px-4 py-2 text-sm text-black placeholder:text-neutral-500 dark:border-neutral-800 dark:bg-transparent dark:text-white dark:placeholder:text-neutral-400"
      />
      <div className="absolute right-0 top-0 mr-3 flex h-full items-center">
        <MagnifyingGlassIcon className="h-4" />
      </div>
    </form>
  );
}
