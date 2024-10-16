import LogoSquare from '@/ui/blocks/icons/logo-square';
import { FOOTER_CATEGORY } from '@/types/constants/constants';
import Link from 'next/link';
import React from 'react';

const { COMPANY_NAME, SITE_NAME_NEXT_NEXT } = process.env;

function Divider() {
  return (
    <div className='m-0 p-0 h-[1px] bg-neutral-500 dark:bg-neutral-400 opacity-70 w-full' />
  );
}

function AppLogo() {
  return (
    <Link className='flex items-center gap-2 text-white md:pt-1' href='/'>
      <LogoSquare size='sm' />
      <span className='uppercase'>{SITE_NAME_NEXT_NEXT}</span>
    </Link>
  );
}

type CategoryItemProps = {
  children: React.ReactNode;
  href: string;
};

function CategoryItem({ children, href }: CategoryItemProps) {
  return <a href={href}>{children}</a>;
}

export default async function Footer() {
  const currentYear = new Date().getFullYear();
  const copyrightDate = currentYear;
  
  const copyrightName = COMPANY_NAME || SITE_NAME_NEXT_NEXT || '';

  return (
    <footer className='text-sm text-background-foreground bg-background py-8 px-4 sm:px-6 lg:px-8 flex items-center justify-center w-full'>
      <div className='max-w-[1250px] w-full flex flex-col gap-6'>
        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 w-full'>
          {FOOTER_CATEGORY.map((category, index) => (
            <div key={index} className='flex flex-col space-y-2'>
              <h4 className='font-bold text-lg mb-2'>{category.title}</h4>
              {category.items.map((item, subIndex) => (
                <CategoryItem key={subIndex} href={item.href}>
                  <span className='hover:underline'>{item.label}</span>
                </CategoryItem>
              ))}
            </div>
          ))}
        </div>

        <Divider />
        <div className='flex flex-col sm:flex-row justify-between lg:items-center w-full gap-4'>
          <div className='sm:text-right'>
            <AppLogo />
          </div>
          <p className='text-sm lg:text-center'>
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
