import Price from '@/components/atoms/price';
import Prose from '@/components/atoms/prose';
import VariantSelector from '@/components/molecules/variant-selector';
import { Suspense } from 'react';
import { AddToCart } from '../cart/add-to-cart';
import { TruncatedTitle } from './title-truncated';
import CollapsibleProse from './collapse-prose';

export function useProductDescription(product: any) {
  const variants = product?.variants?.map((variant: any) => {
    return {
      id: variant?.metadata?.shopify?.id ?'gid://shopify/ProductVariant/' + variant?.metadata?.shopify?.id : null,
      selectedOptions: [
        {
          name: 'select',
          value: variant.name,
        },
      ],
      availableForSale: variant?.channel?.quantity > 0,
      price: variant?.channel?.price,
      quantity: variant?.channel?.quantity,
    };
  }) ?? [
    {
      id: 'default',
      price: '0',
      availableForSale: false,
      quantity: 0,
      selectedOptions: [
        {
          name: 'select',
          value: '',
        },
      ],
    },
  ];

  const options = [
    {
      id: 'variant-selector',
      name: 'Select',
      values: product?.variants?.map((variant: any) => variant?.name),
    },
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

  if (!product) {
    return <div>Loading product details...</div>;
  }

  return (
    <>
      <div className='mb-6 flex flex-col border-b pb-6 dark:border-neutral-700'>
        <TruncatedTitle title={product.title} maxLength={50} />
      </div>

      {product.descriptionHtml ? (
        <CollapsibleProse html={product.descriptionHtml} maxLength={500} />
      ) : null}

      <div>
        <Price
          amount={models.variants?.[0].price}
          className='text-2xl font-bold'
          currencyCode='DOP'
        />
        <p className='text-xs text-[#E5E7EB]'>+12% VAT Added</p>
      </div>
      <Suspense fallback={null}>
        <VariantSelector options={models.options} variants={models.variants} />
      </Suspense>
      <Suspense fallback={null}>
        <AddToCart variants={models.variants} />
      </Suspense>
    </>
  );
}
