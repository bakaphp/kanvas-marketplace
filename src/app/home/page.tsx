'use client';
import Discover from '@/ui/blocks/discover';
import HowItWorks from '@/ui/blocks/how-it-works';
import LuxurySection from '@/ui/blocks/luxury-section';
import SearchContainer from '@/ui/blocks/search-container';
import Subscribe from '@/ui/blocks/subscribe';

export default function HomePage() {
  return (
    <>
      <SearchContainer />
      <LuxurySection />
      <HowItWorks />
      <Discover />
      <Subscribe />
    </>
  );
}
