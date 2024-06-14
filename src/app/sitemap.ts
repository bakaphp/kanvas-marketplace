import { getProduct } from '@/models/api/products';
import { adminClient } from '@/models/services/kanvas/admin';
import { MetadataRoute } from 'next';

const BASE_URL = process.env.NEXT_PUBLIC_VERCEL_URL
  ? `https://${process.env.NEXT_PUBLIC_VERCEL_URL}`
  : 'http://localhost:3000';

export default async function sitemap({
  id,
}: {
  id: number;
}): Promise<MetadataRoute.Sitemap> {
  // Google's limit is 50,000 URLs per sitemap

  const products = await getProduct({first: 40000});
  return products.products.data.map((product: any) => ({
    url: `${BASE_URL}/product/${product.slug}`,
    lastModified: product.created_at,
  }));
}
