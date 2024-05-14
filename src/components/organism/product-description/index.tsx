import Price from '@/components/atoms/price';
import Prose from '@/components/atoms/prose';
import VariantSelector from '@/components/molecules/variant-selector';
import { truncateText } from '@/models/interactions/truncate-text';
import { Suspense, useMemo } from 'react';
import { AddToCart } from '../cart/add-to-cart';

function useProductDescription(product: any) {
  const variants = useMemo(() => {
    return product?.variants?.map((variant: any) => {
      return {
        id: 'gid://shopify/ProductVariant/' + variant?.metadata?.shopify?.id,
        selectedOptions: [
          {
            name: 'select',
            value: variant.name,
          },
        ],
        availableForSale: true,
      };
    });
  }, []);

  const options = [
    {
      id: 'variant-selector',
      name: 'Select',
      values: product.variants.map((variant: any) => variant.name), // Agrega más valores si es necesario
    },
    // Agrega más opciones según sea necesario
  ];
  return {
    models: {
      variants,
      options,
    },
  };
}
export function ProductDescription({ product }: { product: any }) {
  const { models } = useProductDescription(product);
  return (
    <>
      <div className='mb-6 flex flex-col border-b pb-6 dark:border-neutral-700'>
        <h1 className='mb-2 text-4xl font-bold'>{product.title}</h1>
      </div>

      {product.descriptionHtml ? (
        <Prose
          className='mb-6 text-sm leading-tight dark:text-white/[60%]'
          html={truncateText(product.descriptionHtml, 500)}
        />
      ) : null}

      <div>
        <Price amount='29.0' className='text-2xl font-bold' />
        <p className='text-xs text-[#E5E7EB]'>+12% VAT Added</p>
      </div>
      <Suspense fallback={null}>
        <VariantSelector options={models.options} variants={models.variants} />
      </Suspense>
      <Suspense fallback={null}>
        <AddToCart variants={models.variants} availableForSale={true} />
      </Suspense>
    </>
  );
}
