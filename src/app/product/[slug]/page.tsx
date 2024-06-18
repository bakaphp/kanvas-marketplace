import { Gallery } from '@/components/organism/gallery';
import { ProductDescription } from '@/components/organism/product-description';
import { Suspense } from 'react';
import Loading from './loading';
import { translate } from '@/translate';
import { adminClient as app } from '@/models/services/kanvas/admin';
import RelatedProducts from '@/components/organism/related-products';
import { getProduct } from '@/models/api/products';

export const runtime = 'edge';

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}) {
  const product = await getProduct({
    first: 1,
    whereCondition: {
      column: 'SLUG',
      operator: 'EQ',
      value: params.slug,
    },
  });
  const indexable = true;
  return {
    title: product.products.data[0].name || 'Kanvas Marketplace',
    description: product.products.data[0].description || 'Not Description',
    robots: {
      index: indexable,
      follow: indexable,
      googleBot: {
        index: indexable,
        follow: indexable,
      },
    },
    openGraph: product.products?.data?.[0]?.files?.data?.[0].url
      ? {
          images: [
            {
              url: '',
              width: '',
              height: '',
              alt: '',
            },
          ],
        }
      : null,
  };
}

async function useProductPage(params: { slug: string }) {
  try {
    const product = await getProduct({
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
    <div className='mx-auto max-w-screen-2xl px-4 py-5'>
      <div className='flex flex-col w-5/6 rounded-lg border mx-auto border-neutral-200 bg-black text-white p-8 md:p-12 lg:flex-row lg:gap-8'>
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
      <div className='flex flex-col w-5/6 mx-auto '>
        <RelatedProducts id='' />
      </div>
    </div>
  );
}
