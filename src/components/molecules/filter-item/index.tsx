import { Disclosure } from '@headlessui/react';
import { ChevronUpIcon } from '@heroicons/react/20/solid';

interface Props {
  title: string;
  content: React.ReactNode;
}
export default function FilterItem(props: Props) {
  return (
    <div className='w-full'>
      <Disclosure>
        {({ open }) => (
          <>
            <Disclosure.Button className='flex w-full justify-between  px-2 py-2 text-left text-sm font-medium border-2 border-t-0 border-[#374151]'>
              <span>{props.title}</span>
              <ChevronUpIcon
                className={`${
                  open ? 'rotate-180 transform' : ''
                } h-5 w-5 text-white`}
              />
            </Disclosure.Button>
            <Disclosure.Panel className='px-4 pb-2 pt-4 text-sm border-2 border-[#374151]'>
              {props.content}
            </Disclosure.Panel>
          </>
        )}
      </Disclosure>
    </div>
  );
}
