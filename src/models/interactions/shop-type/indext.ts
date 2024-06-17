import { ShopType } from "@/models/types/shop-type";




export function detectShopType(): string {
  if (
    process.env.SHOPIFY_REVALIDATION_SECRET &&
    process.env.SHOPIFY_STOREFRONT_ACCESS_TOKEN &&
    process.env.SHOPIFY_STORE_DOMAIN
  ) {
    return ShopType.SHOPIFY;
  }

  if (process.env.NEXT_PUBLIC_SHOP_TYPE) {
    const shopType = process.env.NEXT_PUBLIC_SHOP_TYPE.toLowerCase();
    switch (shopType) {
      case 'informative':
        return ShopType.INFORMATIVE;
      case 'leads':
        return ShopType.LEADS;
    }
  }

  return ShopType.UNKNOWN;
}
