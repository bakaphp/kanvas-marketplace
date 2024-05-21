import KanvasCore, { genericAuthMiddleware } from '@kanvas/core';
import { getCookie } from 'cookies-next';

const getKey = (): Promise<string | null> => {
  return new Promise((resolve) => {
    const key = getCookie("token")?.toString()
    resolve(key!);
  });
};
export const app = new KanvasCore({
  url: process.env.NEXT_PUBLIC_KANVAS_API_URL ?? '',
  key: process.env.NEXT_PUBLIC_KANVAS_API_KEY ?? '',
  middlewares: [genericAuthMiddleware(getKey)],
  // adminKey: process.env.NEXT_PUBLIC_KANVAS_ADMIN_KEY ?? '',
});
