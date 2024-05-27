import clsx from 'clsx';
import { ImageResponse } from 'next/og';

export type Props = {
  title?: string;
};

export default async function OpengraphImage(
  props?: Props,
): Promise<ImageResponse> {
  const { title } = {
    ...{
      title: process.env.SITE_NAME,
    },
    ...props,
  };

  return new ImageResponse(
    (
      <div tw='flex h-full w-full flex-col items-center justify-center bg-black'>
        <div tw='flex flex-none items-center justify-center border border-neutral-700 h-[160px] w-[160px] rounded-3xl'>
          <LogoIcon width='64' height='58' fill='white' />
        </div>
        <p tw='mt-12 text-6xl font-bold text-white'>{title}</p>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    },
  );
}

export function LogoIcon(props: React.ComponentProps<'svg'>) {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      aria-label={`${process.env.SITE_NAME} logo`}
      viewBox='0 0 32 28'
      {...props}
      className={clsx('h-4 w-4 fill-black dark:fill-white', props.className)}
    >
      <path d='M21.5758 9.75769L16 0L0 28H11.6255L21.5758 9.75769Z' />
      <path d='M26.2381 17.9167L20.7382 28H32L26.2381 17.9167Z' />
    </svg>
  );
}
