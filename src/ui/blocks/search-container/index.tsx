import BackgroundHome from '@/static/ilustrations/background-home.png';
import SearchIcon from '@/static/icons/search.svg';
import Image from 'next/image';

export default function SearchContainer() {
    return <div className="relative h-[90vh] flex flex-col items-center">
        <div
            className="absolute inset-0 bg-cover bg-center opacity-50"
            style={{ backgroundImage: `url('${BackgroundHome.src}')` }}
        ></div>

        <div className="relative flex flex-col items-center w-full h-full justify-center content-center max-w-[770px] text-center gap-8">
            <h1 className="text-[55px] font-roboto font-bold text-housplit-primary-color leading-display-xl">
                Experience Luxury Living, Effortlessly Shared
            </h1>
            <p className="text-center text-base font-normal leading-27px">
                Discover the joy of co-owning a luxury vacation home with Fraction. Embrace unforgettable moments in exquisite properties tailored for your family's needs.
            </p>
            <label htmlFor="" className='text-housplit-blue-color w-[560px] h-[50px] rounded-md bg-white flex p-4 opacity-80'>
                <Image src={SearchIcon} alt='SearchIcon' width={24} height={24} />
                <input autoFocus type="text" name="email" id="email" placeholder="Search" className="w-full border-none leading-none placeholder-housplit-blue-color" style={{ boxShadow: 'none' }} />
            </label>
        </div>
    </div>;
}