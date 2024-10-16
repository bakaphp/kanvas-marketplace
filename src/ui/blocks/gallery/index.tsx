'use client';

import { GridTileImage } from '@/ui/blocks/grid-tile-image';
import { createUrl } from '@/hooks/create-url';
import { ArrowLeftIcon, ArrowRightIcon } from '@heroicons/react/24/outline';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation';

export function Gallery({
  images = [{ src: '/default_image.svg', altText: '' }],
}: {
  images: { src: string; altText: string }[];
}) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const imageSearchParam = searchParams.get('image');
  const imageIndex = imageSearchParam ? parseInt(imageSearchParam) : 0;

  const nextSearchParams = new URLSearchParams(searchParams.toString());
  const nextImageIndex = imageIndex + 1 < images.length ? imageIndex + 1 : 0;
  nextSearchParams.set('image', nextImageIndex.toString());
  const nextUrl = createUrl(pathname, nextSearchParams);

  const previousSearchParams = new URLSearchParams(searchParams.toString());
  const previousImageIndex =
    imageIndex === 0 ? images.length - 1 : imageIndex - 1;
  previousSearchParams.set('image', previousImageIndex.toString());
  const previousUrl = createUrl(pathname, previousSearchParams);

  const buttonClassName =
    'h-full px-6 transition-all ease-in-out hover:scale-110 hover:text-black dark:hover:text-white flex items-center justify-center';

  return (
    <>
      <div className='relative aspect-square h-full max-h-[550px] w-full overflow-hidden'>
        {images[imageIndex] && (
          <Image
            className='h-[640px] w-[660px] object-contain'
            alt={images[imageIndex].altText}
            sizes="(min-width: 1024px) 66vw, 100vw"
            src={images[imageIndex].src ?? '/default_image.svg'}
            width={640}
            height={640}
            priority={true}
          />
        )}

        {images.length > 1 && (
          <div className='absolute bottom-[15%] flex w-full justify-center'>
            <div className='mx-auto flex h-11 items-center rounded-full border border-white bg-neutral-50/80 text-neutral-500 backdrop-blur dark:border-black dark:bg-neutral-900/80'>
              <Link
                aria-label='Previous product image'
                href={previousUrl}
                className={buttonClassName}
                scroll={false}
              >
                <ArrowLeftIcon className='h-5' />
              </Link>
              <div className='mx-1 h-6 w-px bg-neutral-500'></div>
              <Link
                aria-label='Next product image'
                href={nextUrl}
                className={buttonClassName}
                scroll={false}
              >
                <ArrowRightIcon className='h-5' />
              </Link>
            </div>
          </div>
        )}
      </div>

      {images.length > 1 && (
        <ul className='my-12 flex items-center justify-center gap-2 overflow-auto py-1 lg:mb-0'>
          {images.map((image, index) => {
            const isActive = index === imageIndex;
            const imageSearchParams = new URLSearchParams(
              searchParams.toString(),
            );

            imageSearchParams.set('image', index.toString());

            return (
              <li key={image.src} className='h-20 w-20'>
                <Link
                  aria-label='Enlarge product image'
                  href={createUrl(pathname, imageSearchParams)}
                  scroll={false}
                  className='h-full w-full'
                >
                  <GridTileImage
                    alt={image.altText}
                    src={image.src}
                    width={80}
                    height={80}
                    active={isActive}
                  />
                </Link>
              </li>
            );
          })}
        </ul>
      )}
    </>
  );
}
