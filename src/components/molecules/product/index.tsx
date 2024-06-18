import Price from '@/components/atoms/price';
import { AddToCart } from '@/components/organism/cart/add-to-cart';
import { useProductDescription } from '@/components/organism/product-description';
import { detectShopType } from '@/models/interactions/shop-type/indext';
import { truncateText } from '@/models/interactions/truncate-text';
import { ShopType } from '@/models/types/shop-type';
import { ProductInterface } from '@kanvas/core';
import { Atoms } from '@kanvas/phoenix';
import Link from 'next/link';
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
          <img src={productImage} alt={productName} className='h-72 w-full' />
        </Link>
        <div className='flex flex-col items-center h-[160px] justify-center'>
          <Link href={`/product/${product?.slug}`}>
            <p className='text-sm text-[#4981BD]'>Brand</p>
            <Atoms.Body.Two className='font-semibold'>
              {truncateText(productName, 20)}
            </Atoms.Body.Two>
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
