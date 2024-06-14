import Product from '@/components/molecules/product';
import { getProduct } from '@/models/api/products';
import { translate } from '@/translate';

async function useRelatedProducts() {
  const products = await getProduct({
    first: 4,
  });

  return {
    models: {
      products,
    },
  };
}
export default async function RelatedProducts({ id }: { id: string }) {
  const { models } = await useRelatedProducts();
  const relatedProducts =
    models.products.products.data || ([1, 2, 3, 4] as any);

  if (!relatedProducts.length) return null;

  return (
    <div className='py-8'>
      <h2 className='mb-4 text-2xl font-bold'>
        {translate('general.related-products')}
      </h2>
      <ul className='flex w-full gap-4  pt-1'>
        {relatedProducts.map((product: any) => (
          <li key={product.slug} className=''>
            <Product product={product} canBuy />
          </li>
        ))}
      </ul>
    </div>
  );
}
