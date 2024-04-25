'use client';
import Hit from '@/components/molecules/hit';
import { Hits, Pagination } from 'react-instantsearch';

export default function SearchPage() {
  return (
    <div>
      <Hits
        hitComponent={Hit}
        classNames={{ list: 'grid grid-cols-1 md:grid-cols-3' }}
      />
      <div className='flex justify-center'>
        <Pagination
          showFirst={false}
          showLast={false}
          classNames={{
            list: 'flex items-center justify-center w-auto border-2 border-[#374151] rounded-md',
            item: 'w-9 h-9 items-center justify-center flex',
            pageItem: 'border-r-2 border-[#374151] justify-center flex ',
            previousPageItem: 'border-r-2 border-[#374151]',
            selectedItem: 'bg-[#3574B6] w-full',
          }}
        />
      </div>
    </div>
  );
}
