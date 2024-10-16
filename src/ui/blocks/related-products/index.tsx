import Product from '@/ui/blocks/product';
import { getProduct } from '@/api/products';
import { translate } from '@/translate';
import { For } from '@kanvas/phoenix-rebirth/dist/lib/server';
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
  console.log(id);
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
        <For each={relatedProducts}>
          {(product: any) => (
            <li key={product.slug} className=''>
              <Product product={product} canBuy />
            </li>
          )}
        </For>
      </ul>
    </div>
  );
}
