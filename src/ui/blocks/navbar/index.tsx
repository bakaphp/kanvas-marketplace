import Link from "next/link";
import Image from "next/image";
import HousplitSVG from '@/static/icons/housplit.svg';

const navbarOptions = [
  {
    name: "Listings",
    to: "/",
  },
  {
    name: "Collections",
    to: "/",
  },
  {
    name: "How it works?",
    to: "/",
  }
];
export default async function Navbar() {
  return (
    <nav className='bg-white relative flex h-28 items-center justify-between py-4 px-10 bg-background text-foreground fill-foreground'>
      <Link href={"/home"}>
        <Image src={HousplitSVG} alt='Logo' width={135} height={30} />
      </Link>
      <div className="flex gap-16">
        {navbarOptions.map((option, index) => (
          <Link href={option.to} key={index} className='text-housplit-secondary-color hover:underline font-roboto font-normal text-base leading-6'>
            {option.name}
          </Link>
        ))}
      </div>
    </nav>
  );
}
