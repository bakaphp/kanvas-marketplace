import LogoSquare from '@/components/atoms/icons/logo-square';
import Image from 'next/image';
import Link from 'next/link';

import React from 'react';

const { COMPANY_NAME, SITE_NAME } = process.env;

function Divider() {
  return (
    <div className='m-0 p-0 h-[1px] bg-neutral-500 dark:bg-neutral-400 opacity-70 w-full' />
  );
}

function SocialMediaSection() {
  return (
    <div className='flex items-center gap-3 '>
      <p className='text-white'>Follow Us:</p>
      <div className='flex gap-[6px]'>
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
        <Image src='/icons/Twitter.svg' alt='facebook' width={24} height={24} />
      </div>
    </div>
  );
}

function AppLogo() {
  return (
    <Link
      className='flex items-center gap-2 text-white md:pt-1'
      href='/'
    >
      <LogoSquare size='sm' />
      <span className='uppercase'>{SITE_NAME}</span>
    </Link>
  );
}

type CategoryItemProps = {
  children: React.ReactNode;
};

function CategoryItem({ children }: CategoryItemProps) {
  return (
    <div className='py-[10px] px-[14px] bg-background text-foreground rounded-md flex justify-center items-center border-[1px] border-default !m-0'>
      <p>{children}</p>
    </div>
  );
}

export default async function Footer() {
  const currentYear = new Date().getFullYear();
  const copyrightDate = 2023 + (currentYear > 2023 ? `-${currentYear}` : '');

  const copyrightName = COMPANY_NAME || SITE_NAME || '';

  return (
    <footer className='text-sm text-white bg-black py-[50px] px-0 flex items-center justify-center w-full'>
      <div className='max-w-[1250px] w-full flex flex-col gap-6'>
        <div className='w-full flex justify-between items-center'>
          <AppLogo />
          <SocialMediaSection />
        </div>
        <Divider />

        <nav className='flex space-x-5 text-center text-primary-foreground w-full gap-3'>
          <CategoryItem>All</CategoryItem>
          <CategoryItem>Category 1</CategoryItem>
          <CategoryItem>Category 2</CategoryItem>
        </nav>

        <Divider />
        <p className='text-sm'>
          &copy; {copyrightDate} {copyrightName}
          {copyrightName.length && !copyrightName.endsWith('.') ? '.' : ''} All
          rights reserved.
        </p>
      </div>
    </footer>
  );
}
