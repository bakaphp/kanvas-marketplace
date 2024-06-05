import { truncateText } from '@/models/interactions/truncate-text';
import { Atoms } from '@kanvas/phoenix';
import Link from 'next/link';

export default function Hit({ hit }: { hit: any }) {
  return (
    <Link href={`/product/${hit.slug}`}>
      <div className='h-[440px] w-72 text-center rounded-md border-2  border-border-default'>
        <img
          src={hit.files?.[0]?.url ?? '/default_image.svg'}
          alt={hit.name}
          className='h-72 w-full'
        />
        <div className='flex flex-col items-center h-[160px] justify-center'>
          <p className='text-sm text-[#4981BD]'>Brand</p>
          <Atoms.Body.Two className='font-semibold'>
            <span>{truncateText(hit.name, 50)}</span>
          </Atoms.Body.Two>
          <p className='font-semibold'>
            ${hit?.variants?.[0]?.warehouses?.[0]?.price ?? '2.20'}
          </p>
        </div>
      </div>
    </Link>
  );
}
