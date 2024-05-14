import { Gallery } from '@/components/organism/gallery';
import { ProductDescription } from '@/components/organism/product-description';
import { useServerContext } from '@kanvas/phoenix';
import { Suspense } from 'react';

export const runtime = 'edge';
export const dynamic = 'force-dynamic';
export const dynamicParams = true;

async function useProductPage(params) {
  const { sdk } = useServerContext();
  const product = await sdk?.inventory.getProduct({
    first: 2,
    whereCondition: {
      column: 'SLUG',
      operator: 'EQ',
      value: params?.slug ?? '',
    },
  });
  // console.log(product?.products.data[0].variants);
  return {
    models: {
      product,
    },
  };
}

export default async function ProductPage({ params }: { params: any }) {
  const { models } = await useProductPage(params);
  return (
    <>
      <div className='mx-auto max-w-screen-2xl px-4'>
        <div className='flex flex-col w-5/6 rounded-lg border mx-auto border-neutral-200 bg-white p-8 md:p-12 lg:flex-row lg:gap-8 dark:border-neutral-800 dark:bg-black'>
          <div className='h-full w-full basis-full lg:basis-4/6'>
            <Suspense
              fallback={
                <div className='relative aspect-square h-full max-h-[550px] w-full overflow-hidden' />
              }
            >
              <Gallery
                images={models.product?.products?.data?.[0].files.data.map(
                  (image) => ({
                    src: image.url,
                    altText: image.field_name,
                  })
                )}
              />
            </Suspense>
          </div>

          <div className='basis-full lg:basis-2/6'>
            <ProductDescription
              product={{
                title: models.product?.products.data[0].name,
                descriptionHtml: models.product?.products.data[0].description,
                variants: models?.product?.products.data[0].variants,
              }}
            />
          </div>
        </div>
        {/* <Suspense>
          <RelatedProducts id={product.id} />
        </Suspense> */}
      </div>
    </>
  );
}