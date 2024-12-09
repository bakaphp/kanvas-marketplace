"use client";
import Image from 'next/image';
import GeneralProperty from '@/static/ilustrations/discover-section/general-property.png';

export default function Discover() {
  return (
    <div className="relative h-[90vh] flex flex-col bg-white justify-center px-10 gap-16">
      <div className='grid grid-cols-2 gap-20 self-center items-center justify-items-center'>
        <div className='col-span-1 self-center flex flex-col gap-8'>
          <p className='text-housplit-green-color font-bold text-base leading-6'>
            Discover
          </p>
          <h2 className="text-housplit-blue-color text-5xl font-bold">Experience the Joy of Co-Ownership</h2>
          <p className="text-housplit-secondary-color text-lg font-normal leading-7 text-left">
            Co-owning a vacation home with Fraction allows you to enjoy luxurious getaways without the hefty price tag. Benefit from prime locations and effortless management, making your dream retreat a reality.
          </p>
          <button className='w-[129px] h-[48px] text-housplit-blue-color text-center gap-2 rounded-lg border border-housplit-green-color text-base font-normal leading-6 text-left'>Learn More</button>
        </div>
        <Image className='col-span-1 rounded-xl' src={GeneralProperty} alt='ListIcon' width={600} height={640} />
      </div>
    </div>
  );
}
