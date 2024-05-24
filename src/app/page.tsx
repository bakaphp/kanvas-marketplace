
import Footer from '@/components/organism/footer';
import { Suspense } from 'react';

export const runtime = 'edge';

export const metadata = {
  description: 'High-performance ecommerce store built with Next.js, Kanvas and Shopify :)',
  openGraph: {
    type: 'website'
  }
};

export default async function HomePage() {
  return (
    <>
      <Suspense>
        <Suspense>
          <Footer />
        </Suspense>
      </Suspense>
    </>
  );
}
