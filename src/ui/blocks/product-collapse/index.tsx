'use client';
import { useState } from 'react';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@kanvas/phoenix-rebirth/dist/components/base/collapsible.mjs';
import {
  MinusCircle,
  PlusCircle,
} from '@kanvas/phoenix-rebirth/dist/components/icons';
import Prose from '@/ui/components/prose';

export function TechnicalSpecs({ attributes }: any) {
  const desiredOrder = [
    'case_&_motherboard',
    'operating_system',
    'processor_(cpu)',
    'graphics/video',
    'memory_(ram)',
    'solid_state_drive',
    'power',
    'communications',
    'audio',
    'mouse',
    'keyboard',
    'package_contents',
    'warranty',
    'physical_specifications',
  ];

  const reorderedArray = attributes.sort((a: any, b: any) => {
    const indexA = desiredOrder.indexOf(a.name);
    const indexB = desiredOrder.indexOf(b.name);

    if (indexA === -1) return 1;
    if (indexB === -1) return -1;

    return indexA - indexB;
  });

  const [isOpen, setIsOpen] = useState(true);

  return (
    <Collapsible open={isOpen} onOpenChange={setIsOpen} className='w-full'>
      <CollapsibleTrigger className='flex justify-between items-center w-full py-4 border-t border-b'>
        <h2 className='text-xl sm:text-2xl font-bold'>
          Technical specifications
        </h2>
        {isOpen ? <MinusCircle size={24} /> : <PlusCircle size={24} />}
      </CollapsibleTrigger>
      <CollapsibleContent className='py-4'>
        <div className='space-y-4'>
          {reorderedArray?.map((attribute: any, index: any) => {
            return (
              <div key={index} className='border-b pb-2'>
                <div className='flex flex-col sm:flex-row'>
                  <div className='w-full sm:w-1/4 font-semibold mb-2 sm:mb-0'>
                    {attribute?.value?.title}
                  </div>
                  <div className='w-full sm:w-3/4'>
                    <Prose html={attribute?.value?.normal_spec}></Prose>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </CollapsibleContent>
    </Collapsible>
  );
}
