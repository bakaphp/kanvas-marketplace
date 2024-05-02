'use client';
import Hit from '@/components/molecules/hit';
import { Configure, Hits, Pagination } from 'react-instantsearch';

export default function SearchPage() {
  return (
    <div>
      <Configure hitsPerPage={9}/>
      <Hits
        hitComponent={Hit}
        classNames={{ list: 'grid grid-cols-1 md:grid-cols-3 gap-4' }}
      />
      <div className='flex justify-center my-8'>
        <Pagination
          showFirst={false}
          showLast={false}
          classNames={{
            list: 'flex items-center justify-center w-auto border-2 border-border-default rounded-md',
            item: 'w-9 h-9 items-center justify-center flex',
            pageItem: 'border-r-2 border-border-default justify-center flex ',
            previousPageItem: 'border-r-2 border-border-default',
            selectedItem: 'bg-[#3574B6]',
          }}
        />
      </div>
    </div>
  );
}
