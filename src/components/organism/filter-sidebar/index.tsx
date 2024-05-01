import FilterItem from '@/components/molecules/filter-item';
import { NumericMenu } from '@/components/molecules/numeric-menu';
import { RefinementList } from 'react-instantsearch';

export default function FilterSidebar() {
  return (
    <>
      <div className='order-first w-full flex-none md:max-w-[280px]'>
        <div className='bg-[#1F2937] h-12 rounded-t-lg'>
          <p className='font-bold text-sm pl-2 pt-2'>FILTERS</p>
        </div>
        {/* <Sidebar /> */}
        <FilterItem
          title='Year'
          content={
            <RefinementList
              attribute='attributes.year'
              classNames={{
                count: 'hidden',
                checkbox: 'w-4 h-4',
                labelText: 'pl-2 text-sm',
                item: 'pt-2',
              }}
            />
          }
        />
        <FilterItem
          title='Company'
          content={
            <RefinementList
              attribute='company.name'
              classNames={{
                count: 'hidden',
                checkbox: 'w-4 h-4',
                labelText: 'pl-2 text-sm',
                item: 'pt-2',
              }}
            />
          }
        />
        <FilterItem
          title='Price'
          content={
            <NumericMenu
              attribute='variants.warehouses.price'
              items={[
                { end: 1, label: 'Free' },
                { end: 99999, label: 'All' },
              ]}
            />
          }
        />
      </div>
    </>
  );
}
