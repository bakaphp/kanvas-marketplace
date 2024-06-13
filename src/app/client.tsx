'use client';
import { searchClient } from '@/models/services/algolia';
// import { app } from '@/models/services/kanvas';
import { PropsWithChildren } from 'react';
import { InstantSearch } from 'react-instantsearch';
import { ClientCoreStore } from '@kanvas/phoenix/dist/client';
import { adminClient } from '@/models/services/kanvas/admin';
export default function ClientLayout({ children }: PropsWithChildren) {
  return (
    <ClientCoreStore sdk={adminClient}>
      <InstantSearch
        searchClient={searchClient}
        indexName={process.env.NEXT_PUBLIC_ALGOLIA_PRODUCTS_INDEX}
        routing
        future={{ persistHierarchicalRootCount: false }}

      >
        {children}
      </InstantSearch>
    </ClientCoreStore>
  );
}
