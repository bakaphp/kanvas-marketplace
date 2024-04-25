import { Atoms } from '@kanvas/phoenix';
import { Highlight } from 'react-instantsearch';
export default function Hit({ hit }: { hit: any }) {
  return (
    <div className="h-[354px] w-[300px] text-center">
      <div className="h-[262px] w-full bg-red-500"></div>
      {/* <img src={hit.image} alt={hit.name} className='w-full h-[262px]' /> */}
      {/* <p>{hit.categories[0]}</p> */}
      <p>Brand</p>
      <Atoms.Body.Two className="font-semibold">
        <Highlight attribute="name" hit={hit} />
      </Atoms.Body.Two>
      <p className="text-[#4981BD]">$2.20</p>
    </div>
  );
}
