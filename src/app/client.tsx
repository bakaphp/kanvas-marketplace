'use client';

// import { app } from '@/models/services/kanvas';
import { PropsWithChildren } from 'react';
import { InstantSearch } from 'react-instantsearch';
import { adminClient } from '@/services/kanvas/admin';
import { searchRouting } from '@/types/constants/searchRouting';
import { searchClient } from '@/services/algolia';

export default function ClientLayout({ children }: PropsWithChildren) {
  return (
    <InstantSearch
      searchClient={searchClient}
      indexName={process.env.NEXT_PUBLIC_ALGOLIA_PRODUCTS_INDEX}
      routing={true}
      future={{ persistHierarchicalRootCount: false }}
    >
      {children}
    </InstantSearch>
  );
}
