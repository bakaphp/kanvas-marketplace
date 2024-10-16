import LogoSquare from "@/ui/blocks/icons/logo-square";
import ProfileMenu from "@/ui/blocks/profile-menu";
import Cart from "@/ui/blocks/cart";
import OpenCart from "@/ui/blocks/cart/open-cart";
import MobileMenu from "@/ui/blocks/navbar/mobile-menu";
import Search, { SearchSkeleton } from "@/ui/blocks/navbar/search";
import { ShopType } from "@/types/shop-type";

import { Show, For } from "@kanvas/phoenix-rebirth/dist/lib/server";
import Link from "next/link";
import { Suspense } from "react";

const { SITE_NAME_NEXT } = process.env;

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
              {SITE_NAME_NEXT}
            </div>
          </Link>

          <Show when={Boolean(menu?.length)} deps={[menu]}>
            <ul className='hidden gap-6 text-sm md:flex md:items-center'>
              <For each={menu}>
                {(item: any) => (
                  <li key={item?.title}>
                    <Link
                      href={item?.path}
                      className='text-neutral-500 underline-offset-4 hover:text-black hover:underline dark:text-neutral-400 dark:hover:text-neutral-300'
                    >
                      {item?.title}
                    </Link>
                  </li>
                )}
              </For>
            </ul>
          </Show>
        </div>
        <div className='hidden justify-center md:flex md:w-1/3'>
          <Suspense fallback={<SearchSkeleton />}>
            <Search />
          </Suspense>
        </div>
        <div className='flex justify-end md:w-1/3'>
          <ProfileMenu />

          <Show when={type === ShopType.SHOPIFY} deps={[type]}>
            <Suspense fallback={<OpenCart />}>
              <Cart />
            </Suspense>
          </Show>
        </div>
      </div>
    </nav>
  );
}
