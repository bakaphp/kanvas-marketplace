import FilterItem from '@/components/molecules/filter-item';
import { NumericMenu } from '@/components/molecules/numeric-menu';
import { translate } from '@/translate';
import { title } from 'process';
import { RefinementList } from 'react-instantsearch';

function useFilterSidebar() {
  const items = [
    {
      title: translate('search.sidebar.year'),
      content: (
        <RefinementList
          attribute='attributes.year'
          classNames={{
            count: 'hidden',
            checkbox: 'w-4 h-4',
            labelText: 'pl-2 text-sm',
            item: 'pt-2',
          }}
        />
      ),
    },
    {
      title: translate('search.sidebar.company'),
      content: (
        <RefinementList
          attribute='company.name'
          classNames={{
            count: 'hidden',
            checkbox: 'w-4 h-4',
            labelText: 'pl-2 text-sm',
            item: 'pt-2',
          }}
        />
      ),
    },
    {
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
  ];

  return {
    models: {
      items,
    },
  };
}
export default function FilterSidebar() {
  const { models } = useFilterSidebar();
  return (
    <>
      <div className='order-first w-full flex-none md:max-w-[280px]'>
        <div className='bg-[#1F2937] h-12 rounded-t-lg'>
          <p className='font-bold text-sm pl-2 pt-2'>
            {translate('search.filters')}
          </p>
        </div>
        {models.items.map((item) => {
          return <FilterItem title={item.title} content={item.content} />;
        })}
      </div>
    </>
  );
}
