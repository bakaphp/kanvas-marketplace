import { ReactNode, Suspense } from 'react';
import ClientLayout from './client.layout';
import Navbar from '@/components/organism/navbar';
import { Open_Sans } from 'next/font/google';
import './globals.css';
const { TWITTER_CREATOR, TWITTER_SITE, SITE_NAME } = process.env;
const baseUrl = process.env.NEXT_PUBLIC_VERCEL_URL
  ? `https://${process.env.NEXT_PUBLIC_VERCEL_URL}`
  : 'http://localhost:3000';

export const metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    default: SITE_NAME!,
    template: `%s | ${SITE_NAME}`,
  },
  robots: {
    follow: true,
    index: true,
  },
};

const OpenSans = Open_Sans();
export default async function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <html lang='en' className={OpenSans.className}>
      <body className='bg-neutral-50 text-black selection:bg-teal-300 dark:bg-primary-background dark:text-white dark:selection:bg-pink-500 dark:selection:text-white'>
        <ClientLayout>
          <Navbar />
          <Suspense>
            <main>{children}</main>
          </Suspense>
        </ClientLayout>
      </body>
    </html>
  );
}
