'use client';
import { NumericMenu } from '@/ui/blocks/numeric-menu';
import { RatingMenu } from '@/ui/blocks/rating-menu';
import FilterSidebar from '@/ui/blocks/filter-sidebar';
import { translate } from '@/translate';
import Image from 'next/image';
import { Suspense } from 'react';
import { Menu, RefinementList } from 'react-instantsearch';

const items = [
  {
    id: 'year',
    title: translate('search.sidebar.year'),
    content: (
      <RefinementList
        attribute='attributes.year'
        classNames={{
          count: 'hidden',
          checkbox:
            'w-4 h-4 bg-background rounded-sm checked:!bg-primary focus:!ring-primary focus:!bg-primary focus:hover:!bg-primary checked:hover:!bg-primary',
          labelText: 'pl-2 text-sm',
          item: 'pt-2',
        }}
      />
    ),
  },
  {
    id: 'company',
    title: translate('search.sidebar.company'),
    content: (
      <RefinementList
        attribute='company.name'
        classNames={{
          count: 'hidden',
          checkbox:
            'w-4 h-4 bg-background rounded-sm checked:!bg-primary focus:!ring-primary focus:!bg-primary focus:hover:!bg-primary checked:hover:!bg-primary',
          labelText: 'pl-2 text-sm',
          item: 'pt-2',
        }}
      />
    ),
  },
  {
    id: 'price',
    title: translate('search.sidebar.price'),
    content: (
      <NumericMenu
        attribute='variants.warehouses.price'
        items={[
          { label: 'All' },
          { end: 1, label: 'Free' },
          { start: 50, label: '> $50' },
        ]}
      />
    ),
  },
  {
    id: 'rating',
    title: 'Rating',
    content: <RatingMenu attribute='variants.warehouses.price' />,
  },
];
export default function SearchLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Suspense>
        <div className='relative h-96 w-full flex flex-col items-center justify-center text-center text-white'>
          {/* <Image
            src='/images/search.png'
            alt=''
            layout='fill'
            objectFit='cover'
            className='z-0'
          /> */}
          <div className='absolute inset-0 bg-black opacity-50 z-10'></div>
          <div className='relative z-20'>
            <h4 className='text-3xl font-bold'>{translate('search.title')}</h4>
          </div>
        </div>

        <div className='mx-auto flex max-w-screen-2xl flex-col gap-8 px-4 pb-4 text-foreground md:flex-row pt-5'>
          <FilterSidebar filter={items} />
          <div className='order-last min-h-screen w-full md:order-none'>
            {children}
          </div>
        </div>
      </Suspense>
    </>
  );
}
