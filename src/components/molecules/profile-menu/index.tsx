'use client';
import { userProfile } from '@/models/state/profile';
import { Atoms } from '@kanvas/phoenix';
import { Button } from '@kanvas/phoenix-rebirth/dist/components/base/button';
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuItem,
} from '@kanvas/phoenix-rebirth/dist/components/base/dropdown-menu.mjs';
import { Show } from '@kanvas/phoenix-rebirth/dist/utils/server';
import { deleteCookie } from 'cookies-next';
import { useRouter } from 'next/navigation';
import { useAtom } from 'jotai/react';
import Link from 'next/link';

function useProfileMenu() {
  const [user, setUser] = useAtom(userProfile);
  const router = useRouter();

  function logout() {
    deleteCookie('token');
    setUser(null);
    router.push('/search');
  }
  return {
    models: {
      user,
    },
    operations: {
      logout,
    },
  };
}

export default function ProfileMenu() {
  const { models, operations } = useProfileMenu();

  return (
    <>
      <Show
        when={!models.user}
        deps={[models.user]}
        fallback={
          <UserMenuDropDown user={models.user!} logOut={operations.logout} />
        }
      >
        <Link className='mr-3 mt-3 text-sm' href={'/signin'}>
          Sign In
        </Link>
      </Show>
    </>
  );
}

function UserMenuDropDown<
  T extends { user: Record<string, any>; logOut: () => void } = any,
>(props: T) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          className='overflow-hidden rounded-full relative mr-3 mt-2 !bg-transparent hover:text-foreground'
          variant='outline'
          size='icon'
        >
          <Atoms.Avatar size='x-small' name={props.user?.firstname ?? ''} />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align='end'>
        <DropdownMenuLabel className='text-sm'>
          {props.user.firstname} {props.user.lastname}
        </DropdownMenuLabel>

        <DropdownMenuItem>
          <Link href='/account'>View your profile</Link>
        </DropdownMenuItem>

        <DropdownMenuSeparator />

        <DropdownMenuItem>
          <Link href='/orders'>Your Orders</Link>
        </DropdownMenuItem>

        <DropdownMenuItem>
          <Link href='/addresses'>Your Addresses</Link>
        </DropdownMenuItem>

        <DropdownMenuItem>
          <Link href='/change-password'>Change Password</Link>
        </DropdownMenuItem>

        <DropdownMenuSeparator />

        <DropdownMenuItem onClick={props.logOut}>Logout</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
