import { NumericMenu } from '@/ui/blocks/numeric-menu';
import FilterItem from '@/ui/blocks/filter-item';
import { RefinementList } from 'react-instantsearch';
import { translate } from '@/translate';

interface Props {
  filter: {
    id: string;
    title: string;
    content: JSX.Element;
  }[];
}

export default function FilterSidebar(props: Props) {
  return (
    <div className='order-first w-full flex-none md:max-w-[280px]'>
      <div className='bg-secondary text-foreground h-12 rounded-t-lg'>
        <p className='font-bold text-sm pl-2 pt-2'>
          {translate('search.filters')}
        </p>
      </div>
      {props.filter.map((item) => (
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
