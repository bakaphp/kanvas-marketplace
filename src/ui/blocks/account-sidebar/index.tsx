'use client';

import { cn } from '@kanvas/phoenix-rebirth/dist/lib/utils';
import { useRouter, usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';
import Link from 'next/link';

export type Item = {
  link: string;
  key: string;
  title: string;
};

interface Props {
  items: Item[];
}

export function AccountSidebar({ items }: Props) {
  const path = usePathname();

  const [selectedKey, setSelectedKey] = useState(path);

  useEffect(() => {
    setSelectedKey(path);
  }, [path]);

  return (
    <div className='w-64 p-4 mt-6'>
      <ul>
        {items.map((item: Item) => {
          const isSelected = selectedKey === item.link;
          return (
            <li
              key={item.key}
              className={cn('mb-4 p-2 ', {
                'border-b-4 border-primary': isSelected,
              })}
            >
              <Link
                href={item.link}
                onClick={() => setSelectedKey(item.link)}
                className={cn('cursor-pointer pl-2', {
                  'text-foreground': isSelected,
                })}
              >
                {item.title}
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
