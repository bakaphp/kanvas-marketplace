import Price from '@/ui/components/price';
import { useProductDescription } from '@/ui/blocks/product-description';
import { detectShopType } from '@/hooks/shop-type/indext';
import { truncateText } from '@/hooks/truncate-text';
import { ShopType } from '@/types/shop-type';
import { ProductInterface } from '@kanvas/core';
import Link from 'next/link';
import Image from 'next/image';
import { AddToCart } from '@/ui/blocks/cart/add-to-cart';

interface ProductProps {
  product?: ProductInterface;
  canBuy?: boolean;
}

export default function Product({ product, canBuy }: ProductProps) {
  const productImage = product?.files?.data?.[0]?.url ?? '/default_image.svg';
  const productName = product?.name ?? 'Product Name';
  const shop = detectShopType();
  //   @ts-ignore
  const productPrice = product?.variants?.[0].channel.price
    ? product?.variants?.[0].channel.price
    : //   @ts-ignore
      product?.variants?.[0].warehouses?.[0]?.channels[0].price ?? '0';
  const { models } = useProductDescription(product);

  return (
    <div>
      <div className='h-[440px] w-72 text-center rounded-md border-2 border-border-default'>
        <Link href={`/product/${product?.slug}`}>
          <Image
            src={productImage}
            alt={productName}
            className='h-72 w-full'
            width={284}
            height={288}
          />
        </Link>
        <div className='flex flex-col items-center h-[160px] justify-center'>
          <Link href={`/product/${product?.slug}`}>
            <p className='text-sm text-accent'>Brand</p>
            <span className='font-semibold'>
              {truncateText(productName, 20)}
            </span>
            <Price
              amount={productPrice}
              className='font-bold'
              currencyCode='DOP'
            />
          </Link>
          {canBuy && shop === ShopType.SHOPIFY && (
            <AddToCart variants={models.variants} />
          )}
        </div>
      </div>
    </div>
  );
}
