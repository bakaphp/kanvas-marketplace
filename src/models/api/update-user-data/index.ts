'use server';

import { app } from '@/models/services/kanvas';

type params = {
  email?: string;
  firstname: string;
  phone?: string;
  lastname: string;
};
export async function updateUserData(
  id: number,
  { email, firstname, lastname, phone }: params
) {
  const response = await app.users.updateUserData(id, {
    firstname,
    lastname,
    phone_number: phone ?? '',
    cell_phone_number: phone ?? '',
  });

}
