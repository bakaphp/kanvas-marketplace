"use server";

import { cookies } from "next/headers";
import { app } from "../services/kanvas";
import { ActionResult } from "../types/actions/action-result";

export async function login(
  email: string,
  password: string,
): Promise<ActionResult> {
  try {
    const results = await app.auth.login(email, password);
    cookies().set("token", results.token, {
      expires: new Date(results.token_expires),
      path: "/",
      httpOnly: false,
    });
    return { success: true, data: undefined };
  } catch (e: any) {
    return {
      success: false,
      message: e.message,
    };
  }
}
