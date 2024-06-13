import { useNumericMenu, UseNumericMenuProps } from 'react-instantsearch';
import React from 'react';

import clsx from 'clsx';

export type NumericMenuProps = React.ComponentProps<'div'> &
  UseNumericMenuProps;

export function NumericMenu(props: NumericMenuProps) {
  const { hasNoResults, items, refine } = useNumericMenu(props);

  return (
    <div
      className={clsx(
        'ais-NumericMenu',
        hasNoResults && 'ais-NumericMenu--noRefinement',
        props.className,
      )}
    >
      <ul className='ais-NumericMenu-list'>
        {items.map((item) => (
          <li
            key={item.value}
            className={clsx(
              'ais-NumericMenu-item',
              item.isRefined && 'ais-NumericMenu-item--selected',
            )}
          >
            <label className='ais-NumericMenu-label'>
              <input
                className='ais-NumericMenu-radio w-4 h-4 checked:!bg-primary checked:hover:!bg-primary !ring-primary focus:!bg-primary'
                type='radio'
                checked={item.isRefined}
                onChange={() => refine(item.value)}
              />
              <span className='ais-NumericMenu-labelText pl-2'>
                {item.label}
              </span>
            </label>
          </li>
        ))}
      </ul>
    </div>
  );
}
