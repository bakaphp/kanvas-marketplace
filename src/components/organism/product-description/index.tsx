import Price from '@/components/atoms/price';
import Prose from '@/components/atoms/prose';
import VariantSelector from '@/components/molecules/variant-selector';
import { Suspense } from 'react';
import { AddToCart } from '../cart/add-to-cart';
import { TruncatedTitle } from './title-truncated';
import CollapsibleProse from './collapse-prose';
import { detectShopType } from '@/models/interactions/shop-type/indext';
import { ShopType } from '@/models/types/shop-type';

export function useProductDescription(product: any) {
  const shopType = detectShopType();
  const variants = product?.variants?.map((variant: any) => {
    return {
      id: variant?.metadata?.shopify?.id
        ? 'gid://shopify/ProductVariant/' + variant?.metadata?.shopify?.id
        : null,
      selectedOptions: [
        {
          name: 'select',
          value: variant.name,
        },
      ],
      availableForSale: variant?.channel?.quantity
        ? variant?.channel?.quantity > 0
        : variant?.warehouses?.[0]?.quantity > 0,
      price: variant?.channel?.price
        ? variant?.channel?.price
        : variant?.warehouses?.[0]?.channels?.[0]?.price,
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
      shopType,
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
      <div className='mb-6 flex flex-col border-b pb-6'>
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
        <p className='text-xs text-white/80'>+12% VAT Added</p>
      </div>
      {models.shopType === ShopType.SHOPIFY && (
        <>
          <VariantSelector
            options={models.options}
            variants={models.variants}
          />
          <AddToCart variants={models.variants} />
        </>
      )}
    </>
  );
}
