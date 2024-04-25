'use client';
import { searchClient } from '@/models/services/algolia';
import { PropsWithChildren } from 'react';
import { InstantSearch } from 'react-instantsearch';
export default function ClientLayout({ children }: PropsWithChildren) {

  return (
    <InstantSearch
      searchClient={searchClient}
      indexName="dev-product_variant_index"
      routing
      future={{ persistHierarchicalRootCount: false }}
    >
      {children}
    </InstantSearch>
  );
}
