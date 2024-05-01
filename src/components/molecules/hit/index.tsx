import { Atoms } from '@kanvas/phoenix';
import Link from 'next/link';
import { Highlight } from 'react-instantsearch';
export default function Hit({ hit }: { hit: any }) {
  console.log(hit)
  return (
    <Link href={"#"}>
    <div className="h-[440px] w-72 text-center rounded-md border-2  border-[#374151]">
      <div className="h-72 w-full bg-red-500"></div>
      {/* <img src={hit.image} alt={hit.name} className='w-full h-[262px]' /> */}
      {/* <p>{hit.categories[0]}</p> */}
      <div className='flex flex-col items-center h-[160px] justify-center'>
        <p>Brand</p>
        <Atoms.Body.Two className="font-semibold">
          <Highlight attribute="name" hit={hit} />
        </Atoms.Body.Two>
        <p className="text-[#4981BD]">${hit?.variants?.[0]?.warehouses?.[0]?.price ?? "2.20"}</p>
      </div>
    </div>
    </Link>
  );
}
