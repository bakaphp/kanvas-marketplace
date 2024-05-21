"use server";

import { cookies } from "next/headers";
import { app } from "../services/kanvas";

export async function login(email: string, password: string) {
  const results = await app.auth.login(email, password);
  cookies().set("token", results.token, {
    expires: new Date(results.token_expires),
    path: "/",
    httpOnly: false,
  });
}
