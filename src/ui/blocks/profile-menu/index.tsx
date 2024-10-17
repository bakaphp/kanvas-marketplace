'use client';
import { userProfile } from '@/state/profile';
import { Button } from '@kanvas/phoenix-rebirth/dist/components/base/button';
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuItem,
} from '@kanvas/phoenix-rebirth/dist/components/base/dropdown-menu.mjs';
import { Show } from '@kanvas/phoenix-rebirth/dist/lib/server';
import { deleteCookie } from 'cookies-next';
import { useRouter } from 'next/navigation';
import { useAtom } from 'jotai/react';
import Link from 'next/link';
import {
  Avatar,
  AvatarFallback,
} from '@kanvas/phoenix-rebirth/dist/components/base/avatar.mjs';

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
          <>
            <UserMenuDropDown user={models.user!} logOut={operations.logout} />
          </>
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
          <Avatar>
            <AvatarFallback className='h-10'>
              {props.user?.firstname?.at(0) ?? ''}
            </AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align='end'>
        <DropdownMenuLabel className='text-sm'>
          {props.user.firstname} {props.user.lastname}
        </DropdownMenuLabel>

        <DropdownMenuItem>
          <Link href='/account'>Profile</Link>
        </DropdownMenuItem>

        <DropdownMenuSeparator />

        <DropdownMenuItem onClick={props.logOut}>Logout</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}