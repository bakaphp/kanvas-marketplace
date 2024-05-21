'use server';
import { adminClient } from '@/models/services/kanvas/admin';

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
  const response = await adminClient.users.updateUserData(id, {
    firstname,
    lastname,
    phone_number: phone ?? '',
    cell_phone_number: phone ?? '',
  });

}
