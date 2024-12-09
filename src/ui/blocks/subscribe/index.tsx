"use client";
import GeneralProperty from '@/static/ilustrations/subscribe-section/general-property.png';

export default function Subscribe() {
  return (
    <div className="relative flex flex-col bg-white items-center px-14 gap-16 py-20">
      <div className='h-96 w-full relative'>
        <div className='absolute inset-0 bg-cover bg-center  rounded-xl' style={{ backgroundImage: `url(${GeneralProperty.src})` }}></div>
        <div className='absolute inset-0 bg-black bg-opacity-50 grid grid-cols-2 p-12  rounded-xl'>
          <div className='col-span-1 flex flex-col gap-5'>
            <h2 className='text-4xl font-bold leading-[57.6px] text-left'>Discover your dream vacation home</h2>
            <p className='font-normal leading-7 text-left text-lg'>Join Fraction and elevate your travel experience today!</p>
            <form action="" className='flex flex-row gap-3'>
              <input required type="email" placeholder='Enter your email' className='w-full h-12 rounded-md text-black' />
              <button type='submit' className='px-4 h-12 rounded-md bg-housplit-green-color'>Subscribe</button>
            </form>
            <p className='text-sm leading-5 font-normal'>By clicking Sign Up you're confirming that you agree with our <span className='underline'>Terms and Conditions</span>.</p>
          </div>
          <div className='col-span-1'></div>
        </div>
      </div>
    </div>
  );
}
