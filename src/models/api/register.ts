'use server';

import { app } from '../services/kanvas';

type RegisterPayload = {
  email: string;
  password: string;
  passwordConfirmation: string;
};

export async function register({
  email,
  password,
  passwordConfirmation,
}: RegisterPayload) {
  await app.users.register({
    email,
    password,
    password_confirmation: passwordConfirmation,
    firstname: 'NONE',
    lastname: 'NONE',
  });
}
