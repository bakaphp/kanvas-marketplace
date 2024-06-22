import { NumericMenu } from '@/components/molecules/numeric-menu';
import FilterItem from '@/components/molecules/filter-item';
import { RefinementList } from 'react-instantsearch';
import { translate } from '@/translate';
import { RatingMenu } from '@/components/molecules/rating-menu';

function useFilterSidebar() {
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

  return {
    models: {
      items,
    },
  };
}

export default function FilterSidebar() {
  const { models } = useFilterSidebar();

  return (
    <div className='order-first w-full flex-none md:max-w-[280px]'>
      <div className='bg-secondary text-foreground h-12 rounded-t-lg'>
        <p className='font-bold text-sm pl-2 pt-2'>
          {translate('search.filters')}
        </p>
      </div>
      {models.items.map((item) => (
        <FilterItem
          key={item.id}
          title={item.title}
          content={item.content}
          id={item.id}
        />
      ))}
    </div>
  );
}
