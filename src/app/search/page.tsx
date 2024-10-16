// @ts-nocheck
'use client';
import Hit from '@/ui/blocks/hit';
import {
  Configure,
  Hits,
  Pagination,
  Stats,
  SortBy,
} from 'react-instantsearch';

export default function SearchPage() {

  const transformItems = (items) => {
    return items.sort((a, b) => {
      const stockA = a.variants.some(v => v.warehouses.some(w => w.quantity > 0)) ? 1 : 0;
      const stockB = b.variants.some(v => v.warehouses.some(w => w.quantity > 0)) ? 1 : 0;
      return stockB - stockA;
    });
  };

  return (
    <div className='flex flex-col justify-between'>
      <div className='h-full flex flex-col items-center w-full'>
        <Configure hitsPerPage={12} />
        <div className='flex justify-between w-full pb-2 flex-row items-center'>
          <Stats
            translations={{
              rootElementText({ nbHits, nbSortedHits, areHitsSorted }) {
                return areHitsSorted && nbHits !== nbSortedHits
                  ? `${nbSortedHits!.toLocaleString()} relevant results sorted out of ${nbHits.toLocaleString()}`
                  : `${nbHits.toLocaleString()} results`;
              },
            }}
          />

          <SortBy
            classNames={{
              select: 'bg-background text-foreground rounded',
            }}
            items={[
              { value: '', label: 'Most Relevant' },
              { value: 'product-asc', label: 'A-Z' },
            ]}
          />
        </div>

        <Hits
          hitComponent={Hit}
          transformItems={transformItems}
          classNames={{
            list: 'grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 sm:gap-4 gap-6 mx-auto w-full justify-center justify-self-center',
            root: 'flex w-auto items-center mx-auto mt-5',
          }}
        />
      </div>

      <div className='flex justify-center my-8'>
        <Pagination
          showFirst={false}
          showLast={false}
          classNames={{
            list: 'flex items-center justify-center w-auto border-2 border-border-default rounded-md',
            item: 'w-9 h-9 items-center justify-center flex',
            pageItem: 'border-r-2 border-border-default justify-center flex',
            previousPageItem: 'border-r-2 border-border-default',
            selectedItem: 'bg-primary text-primary-foreground',
          }}
        />
      </div>
    </div>
  );
}
