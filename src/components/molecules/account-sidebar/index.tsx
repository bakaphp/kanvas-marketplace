'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';

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
  console.log(path);
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
              className={`mb-4 p-2 ${isSelected ? 'border-b-4 border-blue-500' : ''}`}
            >
              <Link
                href={item.link}
                onClick={() => setSelectedKey(item.link)}
                className={`cursor-pointer text-gray-400 hover:text-white pl-2 ${isSelected ? 'text-white' : ''}`}
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
