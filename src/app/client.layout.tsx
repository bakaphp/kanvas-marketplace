'use client';
import { searchClient } from '@/models/services/algolia';
import { PropsWithChildren } from 'react';
import { InstantSearch } from 'react-instantsearch';
export default function ClientLayout({ children }: PropsWithChildren) {
  return (
    <InstantSearch
      searchClient={searchClient}
      indexName={process.env.NEXT_PUBLIC_ALGOLIA_PRODUCTS_INDEX}
      routing
      future={{ persistHierarchicalRootCount: false }}
    >
      {children}
    </InstantSearch>
  );
}
