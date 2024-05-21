import KanvasCore from "@kanvas/core";

export const adminClient = new KanvasCore({
    url: process.env.NEXT_PUBLIC_KANVAS_API_URL ?? '',
    key: process.env.NEXT_PUBLIC_KANVAS_API_KEY ?? '',
    
    adminKey: process.env.NEXT_PUBLIC_KANVAS_ADMIN_KEY ?? '',
  });
  