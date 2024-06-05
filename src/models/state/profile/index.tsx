import { UserData } from '@kanvas/core';
import { atomWithStorage } from 'jotai/utils';

export const userProfile = atomWithStorage<UserData | null>('user', null);
