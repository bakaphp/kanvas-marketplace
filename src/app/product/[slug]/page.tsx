import { Gallery } from '@/components/organism/gallery';
import { ProductDescription } from '@/components/organism/product-description';
import { Suspense } from 'react';
import Loading from './loading';
import { translate } from '@/translate';
import { app } from '@/models/services/kanvas';

export const runtime = 'edge';

async function useProductPage(params: { slug: string }) {

  try {
    const product = await app.inventory.getProduct({
      first: 1,
      whereCondition: {
        column: 'SLUG',
        operator: 'EQ',
        value: params.slug,
      },
    });
    return {
      models: {
        product,
      },
    };
  } catch (error) {
    console.error('Error fetching product:', error);
    return {
      models: {
        product: null,
      },
    };
  }
}

export default async function ProductPage({
  params,
}: {
  params: { slug: string };
}) {
  const { models } = await useProductPage(params);
  const productData =
    models.product?.products?.data?.[0] || ({ files: { data: [] } } as any);

  if (!models.product) {
    return <div>{translate('general.load-fail')}</div>;
  }

  return (
    <div className='mx-auto max-w-screen-2xl px-4'>
      <div className='flex flex-col w-5/6 rounded-lg border mx-auto border-neutral-200 bg-white p-8 md:p-12 lg:flex-row lg:gap-8 dark:border-neutral-800 dark:bg-black'>
        <div className='h-full w-full basis-full lg:basis-4/6'>
          <Suspense fallback={<Loading />}>
            <Gallery
              images={productData?.files?.data?.map((image: any) => ({
                src: image.url,
                altText: image.field_name,
              }))}
            />
          </Suspense>
        </div>
        <div className='basis-full lg:basis-2/6'>
          <ProductDescription
            product={{
              title: productData?.name || 'Loading...',
              descriptionHtml: productData?.description || '',
              variants: productData?.variants || [],
            }}
          />
        </div>
      </div>
    </div>
  );
}
