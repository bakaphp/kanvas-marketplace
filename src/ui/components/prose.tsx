import { cn } from '@kanvas/phoenix-rebirth/dist/lib/utils';
import type { FunctionComponent } from 'react';

interface TextProps {
  html: string;
  className?: string;
  hex?: string;
}

const Prose: FunctionComponent<TextProps> = ({ html, className, hex }) => {
  return (
    <div
      className={cn(
        'prose mx-auto max-w-6xl text-base leading-7 prose-headings:mt-8 prose-headings:font-semibold prose-headings:tracking-wide  prose-h1:text-5xl prose-h2:text-4xl prose-h3:text-3xl prose-h4:text-2xl prose-h5:text-xl prose-h6:text-lg  prose-a:underline hover:prose-a:text-neutral-300 prose-ol:mt-8 prose-ol:list-decimal prose-ol:pl-6 prose-ul:mt-8 prose-ul:list-disc prose-ul:pl-6',
        className,
      )}
      style={{ color: hex }}
      dangerouslySetInnerHTML={{ __html: html as string }}
    />
  );
};

export default Prose;
