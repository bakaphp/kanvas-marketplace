import { AccountSidebar, Item } from '@/components/molecules/account-sidebar';
import { customTheme } from '@/theme/theme.phoenix';
import { translate } from '@/translate';
import { Atoms, Molecules } from '@kanvas/phoenix';
import { PropsWithChildren } from 'react';

const sidebarItems: Array<Item> = [
  { link: '/account', key: 'account', title: 'Your Profile' },
  { link: '/orders', key: 'orders', title: 'Your Orders' },
  { link: '/addresses', key: 'addresses', title: 'Your Addresses' },
  {
    link: '/change-password',
    key: 'change-password',
    title: 'Change Password',
  },
];
export default function AccountLayout({ children }: PropsWithChildren) {
  return (
    <>
      <div className='h-36 w-full bg-black flex flex-col items-center justify-center text-center text-foreground'>
        <Atoms.Heading.Four className='text-3xl font-bold'>
          Your Profile
        </Atoms.Heading.Four>
        <div className='h-1 w-12 bg-primary mt-3'></div>
      </div>
      <div className='flex h-screen text-foreground bg-background ml-32'>
        <AccountSidebar items={sidebarItems} />
        {children}
      </div>
    </>
  );
}
