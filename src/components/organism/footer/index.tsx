import LogoSquare from '@/components/atoms/icons/logo-square';
import Image from 'next/image';
import Link from 'next/link';

import { Suspense } from 'react';

const { COMPANY_NAME, SITE_NAME } = process.env;

export default async function Footer() {
  const currentYear = new Date().getFullYear();
  const copyrightDate = 2023 + (currentYear > 2023 ? `-${currentYear}` : '');
  const skeleton =
    'w-full h-6 animate-pulse rounded bg-neutral-200 dark:bg-neutral-700';
  const copyrightName = COMPANY_NAME || SITE_NAME || '';

  return (
    <footer className='text-sm text-neutral-500 dark:text-neutral-400 bg-black'>
      <div className='mx-auto flex w-full max-w-7xl flex-col gap-6 border-t border-neutral-200 px-6 py-12 text-sm md:flex-row md:gap-12 md:px-4 min-[1320px]:px-0 dark:border-neutral-700'>
        <div>
          <Link
            className='flex items-center gap-2 text-black md:pt-1 dark:text-white'
            href='/'
          >
            <LogoSquare size='sm' />
            <span className='uppercase'>{SITE_NAME}</span>
          </Link>
          <Suspense
            fallback={
              <div className='flex h-[188px] w-[200px] flex-col gap-2 '>
                <div className={skeleton} />
                <div className={skeleton} />
                <div className={skeleton} />
                <div className={skeleton} />
                <div className={skeleton} />
                <div className={skeleton} />
              </div>
            }
          >
            <div className='flex space-x-5 text-center text-white'>
              {/* <FooterMenu menu={menu} /> */}
              <div className='w-24 h-10 bg-[#111827] rounded-md flex justify-center items-center border-[1.5px] border-default'>
                <p>All</p>
              </div>
              <div className='w-24 h-10 bg-[#111827] rounded-md flex justify-center items-center border-[1.5px] border-default'>
                <p>Category 1</p>
              </div>
              <div className='w-24 h-10 bg-[#111827] rounded-md flex justify-center items-center border-[1.5px] border-default'>
                <p>Category 2</p>
              </div>
            </div>
          </Suspense>
        </div>
        <div className='md:ml-auto flex items-center space-x-2 pb-6'>
          <p className='text-lg'>Follow Us:</p>
          <div className='flex space-x-1'>
            <Image
              src='/icons/Facebook.svg'
              alt='facebook'
              width={24}
              height={24}
            />
            <Image
              src='/icons/Instagram.svg'
              alt='facebook'
              width={24}
              height={24}
            />
            <Image
              src='/icons/Twitter.svg'
              alt='facebook'
              width={24}
              height={24}
            />
          </div>
        </div>
      </div>
      <div className='border-t border-neutral-200 py-6 text-sm dark:border-neutral-700'>
        <div className='mx-auto flex w-full max-w-7xl flex-col items-center gap-1 px-4 md:flex-row md:gap-0 md:px-4 min-[1320px]:px-0'>
          <p>
            &copy; {copyrightDate} {copyrightName}
            {copyrightName.length && !copyrightName.endsWith('.')
              ? '.'
              : ''}{' '}
            All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
