import { Toaster } from '@kanvas/phoenix-rebirth/dist/components/base/toaster.mjs';
import { ReactNode, Suspense } from 'react';
import ClientLayout from './client';
import Navbar from '@/ui/blocks/navbar';
import { Open_Sans, Inter } from 'next/font/google';
import './globals.css';
import { GoogleAnalytics } from '@next/third-parties/google';
import Footer from '@/ui/blocks/footer';
import { detectShopType } from '@/hooks/shop-type/indext';
const { TWITTER_CREATOR, TWITTER_SITE, SITE_NAME_NEXT_NEXT } = process.env;
const baseUrl = process.env.NEXT_PUBLIC_VERCEL_URL
  ? `https://${process.env.NEXT_PUBLIC_VERCEL_URL}`
  : 'http://localhost:3000';

export const metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    default: SITE_NAME_NEXT_NEXT!,
    template: `%s | ${SITE_NAME_NEXT_NEXT}`,
  },
  // icons: {
  //   icon: "/images/favicon.png",
  // },
  robots: {
    follow: true,
    index: true,
  },
};

const Inter_font = Inter({
  subsets: ['latin'],
});

export default async function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  const shopType = detectShopType();
  return (
    <html lang='en' className={Inter_font.className}>
      {/* <link rel="icon" href="/images/favicon.png" sizes="any" /> */}
      <body className='bg-background text-foreground'>
        <ClientLayout>
          <Navbar type={shopType} />
          <main>{children}</main>
          <Footer />
          <Toaster />
        </ClientLayout>
      </body>
      <GoogleAnalytics gaId='G-JVD3GX40VX' />
    </html>
  );
}
