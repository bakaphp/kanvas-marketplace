'use server';

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
  await app.users.register({
    email,
    password,
    password_confirmation: passwordConfirmation,
    firstname,
    lastname,
  });
}
