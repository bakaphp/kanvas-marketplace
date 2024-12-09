"use client";
import Image from 'next/image';

import ListIcon from '@/static/icons/list-ul.svg';
import HomeIcon from '@/static/icons/home.svg';
import RSSIcon from '@/static/icons/rss.svg';

const items = [
  {
    src: ListIcon,
    alt: "ListIcon",
    title: "Step 1: Browse Our Exclusive Listings",
    description: "Explore a curated selection of stunning properties available for co-ownership."
  },
  {
    src: HomeIcon,
    alt: "HomeIcon",
    title: "Step 2: Select Your Perfect Property",
    description: "Choose the home that best fits your lifestyle and preferences."
  },
  {
    src: RSSIcon,
    alt: "RSSIcon",
    title: "Step 3: Co-Own with Like-Minded Families",
    description: "Join a community of high-net-worth families to share unforgettable experiences."
  },
];
export default function HowItWorks() {
  return (
    <div className="relative h-[90vh] flex flex-col items-center bg-housplit-blue-color text-white justify-center px-10 gap-16">
      <p className='text-housplit-green-color text-center font-bold text-base leading-6'>
        Explore
      </p>
      <h2 className="text-5xl font-bold text-center leading-5">
        How it works
      </h2>
      <p className="text-base font-normal leading-6">
        Fraction makes owning a luxury vacation home effortless. Follow our simple steps to find and co-own your ideal getaway.
      </p>
      <div className="grid grid-cols-3 gap-9">
        {items.map((item, index) => (
          <div className='col-span-1'>
            <div key={index} className='flex flex-col gap-7 items-center w-80'>
              <Image src={item.src} alt={item.alt} width={85} height={85} />
              <h3 className='text-2xl font-bold text-center leading-[41.6px]'>{item.title}</h3>
              <p>{item.description}</p>
            </div>
          </div>
        ))}
      </div>
      <button className='p-3 px-6 gap-2 rounded-lg border border-housplit-green-color text-base font-normal leading-6 text-left'>Learn More</button>
    </div>
  );
}
