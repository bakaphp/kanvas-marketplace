import LogoSquare from '@/ui/blocks/icons/logo-square';
import { FOOTER_CATEGORY } from '@/types/constants/constants';
import Link from 'next/link';
import React from 'react';
import HousplitSVG from '@/static/icons/housplit-white.svg';
import Image from 'next/image';

const { COMPANY_NAME, SITE_NAME_NEXT_NEXT } = process.env;

function Divider() {
  return (
    <div className='m-0 p-0 h-[1px] bg-neutral-500 opacity-70 w-full' />
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
    <footer className='text-sm text-background-foreground bg-housplit-blue-color py-8 px-4 sm:px-6 lg:px-8 flex items-center justify-center w-full'>
      <div className='max-w-[1250px] w-full flex flex-col gap-6'>
        <div className='grid grid-cols-2 gap-8 w-full'>
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
          <div className='col-span-1 flex flex-col gap-4'>
            <p className="font-bold">Subscribe</p>
            <p className='font-normal leading-6'>Join our newsletter to stay up to date on features and releases.</p>
            <form action="" className='flex flex-row gap-3'>
              <input required type="email" placeholder='Enter your email' className='w-full h-12 rounded-md text-black' />
              <button type='submit' className='px-4 h-12 rounded-md bg-housplit-green-color'>Subscribe</button>
            </form>
            <span className='font-normal leading-5 text-sm'>
              By subscribing you agree to with our <span className='underline text-housplit-green-color'>Privacy Policy</span> and provide consent to receive updates from our company.
            </span>
          </div>
        </div>

        <Divider />
        <div className='flex flex-col sm:flex-row justify-between lg:items-center w-full gap-4'>
          <div className='sm:text-right'>
            <Image src={HousplitSVG} alt='Logo' width={135} height={30} />
          </div>
          <p className='text-sm lg:text-center'>
            &copy; {copyrightDate} {copyrightName}
            {copyrightName.length && !copyrightName.endsWith('.')
              ? '.'
              : ''}{' '}
            Relume. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
