'use server';

import { cookies } from 'next/headers';
import { app } from '../services/kanvas';

type RegisterPayload = {
  firstname: string;
  lastname: string;
  email: string;
  password: string;
  passwordConfirmation: string;
};

export async function register({
  email,
  firstname,
  lastname,
  password,
  passwordConfirmation,
}: RegisterPayload) {
  const result = await app.users.register({
    email,
    password,
    password_confirmation: passwordConfirmation,
    firstname,
    lastname,
  });
  // @ts-ignore
  cookies().set('token', result.register.token.token, {
    httpOnly: false,
  });
}
