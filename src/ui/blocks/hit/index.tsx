'use client';
import { truncateText } from '@/hooks/truncate-text';
import { Button } from '@kanvas/phoenix-rebirth/dist/components/base/button';
import { cn } from '@kanvas/phoenix-rebirth/dist/lib/utils';
import Image from 'next/image';
import Link from 'next/link';

export default function Hit({
  hit,
  buttonColor,
}: {
  hit: any;
  buttonColor?: string;
}) {
  const microCenterID = hit?.custom_fields?.MICRO_CENTER_USA_URL;
  const isOutOfStock = hit.variants?.[0]?.warehouses?.[0]?.quantity <= 0;

  const handleButtonClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
    event.stopPropagation();
  };
  return (
    <Link href={`/product/${hit.slug}`}>
      <div className='sm:h-[440px] h-[390px] w-48 sm:w-auto text-center rounded-md border-2 border-border-default'>
        <Image
          src={hit.files?.[0]?.url ?? '/default_image.svg'}
          alt={hit.name}
          width={284}
          height={288}
          loading='lazy'
          className='rounded-lg'
        />
        <div className='flex flex-col items-center h-[160px] justify-center px-4'>
          <span className='font-semibold mb-2'>
            <span>{truncateText(hit.name, 50)}</span>
          </span>
          <p className='text-sm font-semibold mb-4'>
            ${hit?.price ?? hit?.variants?.[0]?.channels?.[0]?.price}
          </p>
          <Button
            className={cn(
              'w-full bg-black text-white py-3 h-12 hover:bg-black',
              buttonColor,
            )}
            disabled={isOutOfStock}
          >
            <a
              href={microCenterID}
              target='_blank'
              onClick={handleButtonClick}
              className='w-full'
            >
              {isOutOfStock ? 'Out of Stock' : 'Where to Buy'}
            </a>
          </Button>
        </div>
      </div>
    </Link>
  );
}
