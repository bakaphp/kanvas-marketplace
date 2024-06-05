'use client';
import { userProfile } from '@/models/state/profile';
import { UserData } from '@kanvas/core';
import { Atoms } from '@kanvas/phoenix';
import { deleteCookie } from 'cookies-next';
import { useAtom, useAtomValue, useSetAtom } from 'jotai/react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

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
  const [menuVisible, setMenuVisible] = useState(false);

  const handleAvatarClick = () => {
    setMenuVisible(!menuVisible);
  };

  return (
    <>
      {!models.user ? (
        <Link className='mr-3 mt-3 text-sm' href={'/signin'}>
          Sign In
        </Link>
      ) : (
        <div className='relative mr-3 mt-2'>
          <div onClick={handleAvatarClick} className='cursor-pointer'>
            <Atoms.Avatar size='x-small' name={models.user?.firstname ?? ''} />
          </div>
          {menuVisible && (
            <div className='absolute right-0 mt-2 w-56 bg-gray-900 text-white rounded-lg shadow-lg'>
              <div className='flex items-center p-4 border-b border-gray-700'>
                <Atoms.Avatar
                  size='x-small'
                  name={models.user?.firstname ?? ''}
                />
                <div className='ml-3'>
                  <div className='font-bold'>
                    {models.user.firstname} {models.user.lastname}
                  </div>
                  <Link href='/account' className='text-sm text-gray-400'>
                    View your profile
                  </Link>
                </div>
              </div>
              <Link
                href='/orders'
                className=' px-4 py-2 hover:bg-gray-800 flex items-center'
              >
                Your Orders
              </Link>
              <Link
                href='/addresses'
                className=' px-4 py-2 hover:bg-gray-800 flex items-center'
              >
                Your Addresses
              </Link>
              <Link
                href='/change-password'
                className=' px-4 py-2 hover:bg-gray-800 flex items-center'
              >
                Change Password
              </Link>
              <div
                onClick={operations.logout}
                className=' px-4 py-2 border-t border-gray-700 hover:bg-gray-800 flex items-center mt-8 cursor-pointer'
              >
                Signout
              </div>
            </div>
          )}
        </div>
      )}
    </>
  );
}
