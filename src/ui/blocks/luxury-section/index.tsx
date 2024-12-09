"use client";
import { CarouselContent, Carousel } from '@kanvas/phoenix-rebirth/dist/components/base/carousel.mjs';
import Image from 'next/image';

import LuxuryProperties from '@/static/ilustrations/luxury-section/property1.png';

const properties = [
  {
    src: LuxuryProperties,
    alt: "Luxury Home 1",
  },
  {
    src: LuxuryProperties,
    alt: "Luxury Home 2",
  },
  {
    src: LuxuryProperties,
    alt: "Luxury Home 3",
  },
  {
    src: LuxuryProperties,
    alt: "Luxury Home 4",
  },
  {
    src: LuxuryProperties,
    alt: "Luxury Home 5",
  }
];
export default function LuxurySection() {
  return (
    <div className="relative h-[90vh] flex flex-col items-center bg-white justify-center px-10 gap-16">
      <div className="grid grid-cols-2 gap-12">
        <h1 className="col-span-1 text-housplit-blue-color text-[48px] font-bold leading-[57.6px] text-left max-w-2xl">
          Experience Effortless Ownership of Luxury Homes
        </h1>
        <p className="col-span-1 text-housplit-secondary-color text-base font-normal leading-[27px] text-left">
          Fraction redefines vacation home ownership by making it seamless and enjoyable. Our co-ownership model allows families to share the joys of luxury properties without the hassles of traditional ownership. Join a community of like-minded high-net-worth families and elevate your vacation experience.
        </p>
      </div>
      <Carousel
        opts={{
          align: "start",
        }}
        className='mt-5'
      >
        <CarouselContent className='gap-4'>
          {properties.map((property, index) => (
            <Image key={index} className=' rounded-xl' src={property.src} alt={property.alt} width={390} height={390} />
          ))}
        </CarouselContent>
        {/* <CarouselPrevious />
      <CarouselNext />   */}
      </Carousel>
    </div>
  );
}
