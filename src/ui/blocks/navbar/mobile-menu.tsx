'use client';

import { useState, useEffect, Fragment, Suspense } from 'react';
import Link from 'next/link';
import {
  ChevronDown,
  MenuIcon,
} from '@kanvas/phoenix-rebirth/dist/components/icons';
import { XMarkIcon } from '@heroicons/react/24/outline';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@kanvas/phoenix-rebirth/dist/components/base/collapsible.mjs';
import Search, { SearchSkeleton } from './search';
import LogoSquare from '@/ui/blocks/icons/logo-square';

export default function MobileMenu({ menu }: { menu: any }) {
  const [isOpen, setIsOpen] = useState(false);

  const openMobileMenu = () => setIsOpen(true);
  const closeMobileMenu = () => setIsOpen(false);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768) {
        setIsOpen(false);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [isOpen]);

  return (
    <>
      <button
        onClick={openMobileMenu}
        aria-label='Open mobile menu'
        className='flex h-11 w-11 items-center justify-center text-foreground fill-foreground transition-colors md:hidden'
      >
        <MenuIcon className='h-6 text-foreground fill-foreground' />
      </button>
      {isOpen && (
        <div className='fixed inset-0 z-50'>
          <div className='p-4 bg-white dark:bg-black'>
            <div className='flex justify-between items-center mb-4'>
              <Link
                href='/'
                className='mr-2 flex w-full items-center md:justify-center md:w-auto lg:mr-6'
              >
                <LogoSquare />
              </Link>
              <button
                className='flex h-11 w-11 items-center justify-center rounded-md border border-neutral-200 text-black transition-colors dark:border-neutral-700 dark:text-white'
                onClick={closeMobileMenu}
                aria-label='Close mobile menu'
              >
                <MenuIcon className='h-6 text-foreground fill-foreground' />
              </button>
            </div>

            <div className='mb-4 w-full'>
              <Suspense fallback={<SearchSkeleton />}>
                <Search />
              </Suspense>
            </div>

            {menu.length ? (
              <div className='w-full'>
                {menu.map((item: any, index: number) => (
                  <Collapsible key={index}>
                    <CollapsibleTrigger className='flex space-x-2 items-center w-full text-xl text-black dark:text-white py-2'>
                      <p>{item.title}</p>
                      <ChevronDown className='h-4 w-4' />
                    </CollapsibleTrigger>
                    <CollapsibleContent>
                      <ul className='flex flex-col ml-4 text-lg'>
                        {item.items.map((link: any) => (
                          <li
                            className='py-2 text-lg text-black transition-colors hover:text-neutral-500 dark:text-white'
                            key={link.title}
                          >
                            <Link href={link.href} onClick={closeMobileMenu}>
                              {link.title}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </CollapsibleContent>
                  </Collapsible>
                ))}
              </div>
            ) : null}
          </div>
        </div>
      )}
    </>
  );
}
