interface EnvironmentVariables {
  COMPANY_NAME: string;
  SITE_NAME: string;
  SHOPIFY_REVALIDATION_SECRET?: string;
  SHOPIFY_STOREFRONT_ACCESS_TOKEN?: string;
  SHOPIFY_STORE_DOMAIN?: string;
  NEXT_PUBLIC_SHOP_TYPE?: string;
}

enum ShopType {
  INFORMATIVE = 'informative',
  LEADS = 'leads',
  SHOPIFY = 'shopify',
  UNKNOWN = 'unknown',
}

export function detectShopType(): ShopType {
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
