import Link from 'next/link';
import { Suspense } from 'react';

import Cart from '../cart';
import OpenCart from '../cart/open-cart';
import MobileMenu from './mobile-menu';
import Search, { SearchSkeleton } from './search';
import LogoSquare from '@/components/atoms/icons/logo-square';
import { Atoms, Molecules } from '@kanvas/phoenix';
import ProfileMenu from '@/components/molecules/profile-menu';
import { ShopType } from '@/models/types/shop-type';
const { SITE_NAME } = process.env;

export default async function Navbar({ type }: { type: string }) {
  const menu = [] as any;
  return (
    <nav className='relative flex items-center justify-between p-4 lg:px-6 bg-background text-foreground fill-foreground'>
      <div className='block flex-none md:hidden'>
        <MobileMenu menu={menu} />
      </div>
      <div className='flex w-full items-center'>
        <div className='flex w-full md:w-1/3'>
          <Link
            href='/'
            className='mr-2 flex w-full items-center justify-center md:w-auto lg:mr-6'
          >
            <LogoSquare />
            <div className='ml-2 flex-none text-sm font-medium uppercase md:hidden lg:block'>
              {SITE_NAME}
            </div>
          </Link>
          {menu.length ? (
            <ul className='hidden gap-6 text-sm md:flex md:items-center'>
              {menu.map((item: any) => (
                <li key={item.title}>
                  <Link
                    href={item.path}
                    className='text-neutral-500 underline-offset-4 hover:text-black hover:underline dark:text-neutral-400 dark:hover:text-neutral-300'
                  >
                    {item.title}
                  </Link>
                </li>
              ))}
            </ul>
          ) : null}
        </div>
        <div className='hidden justify-center md:flex md:w-1/3'>
          <Suspense fallback={<SearchSkeleton />}>
            <Search />
          </Suspense>
        </div>
        <div className='flex justify-end md:w-1/3'>
          <ProfileMenu />

          {type === ShopType.SHOPIFY && (
            <Suspense fallback={<OpenCart />}>
              <Cart />
            </Suspense>
          )}
        </div>
      </div>
    </nav>
  );
}
