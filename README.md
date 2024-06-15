# Kanvas Marketplace Documentation

## Introduction
Kanvas Marketplace is a versatile platform that allows users to create different types of stores using the Kanvas Nicho. These stores can be informational, lead-generating, or fully functional Shopify-based stores. The core of the marketplace is built using [Kanvas Core JS](https://github.com/bakaphp/kanvas-core-js).

## Requirements
To set up and run Kanvas Marketplace, you need the following:

- A Shopify account (if creating a Shopify-based store)
- Algolia account for search functionality
- Kanvas API keys and URLs
- React instant Search library.

## Configuration

### Environment Variables
To configure your Kanvas Marketplace, you'll need to set the following environment variables in your `.env` file:

```shell
# Company Information
COMPANY_NAME="Kanvas"
SITE_NAME="Kanvas Marketplace"

# Shopify Configuration
SHOPIFY_REVALIDATION_SECRET="your-shopify-revalidation-secret"
SHOPIFY_STOREFRONT_ACCESS_TOKEN="your-shopify-access-token"
SHOPIFY_STORE_DOMAIN="your-shopify-store-domain"

# Algolia Configuration
NEXT_PUBLIC_ALGOLIA_APP_ID="your-algolia-app-id"
NEXT_PUBLIC_ALGOLIA_API_KEY="your-algolia-api-key"
NEXT_PUBLIC_ALGOLIA_PRODUCTS_INDEX="your-algolia-products-index"

# Kanvas Configuration
NEXT_PUBLIC_KANVAS_API_URL="https://your-kanvas-api-url/graphql"
NEXT_PUBLIC_KANVAS_API_KEY="your-kanvas-api-key"
NEXT_PUBLIC_KANVAS_ADMIN_KEY="your-kanvas-admin-key"

# Vercel Configuration
NEXT_PUBLIC_VERCEL_URL="your-vercel-url"

You can get the kanvas keys from the kanvas admin page or contacting kanvas support team.
```


# Setting Up the Client Layout
In your ClientLayout component, ensure you set up the InstantSearch from Algolia correctly.

```typescript
'use client';
import { searchClient } from '@/models/services/algolia';
import { PropsWithChildren } from 'react';
import { InstantSearch } from 'react-instantsearch';
import { ClientCoreStore } from '@kanvas/phoenix/dist/client';
import { adminClient } from '@/models/services/kanvas/admin';

export default function ClientLayout({ children }: PropsWithChildren) {
  return (
    <ClientCoreStore sdk={adminClient}>
      <InstantSearch
        searchClient={searchClient} // here
        indexName={process.env.NEXT_PUBLIC_ALGOLIA_PRODUCTS_INDEX}
        routing
        future={{ persistHierarchicalRootCount: false }}
      >
        {children}
      </InstantSearch>
    </ClientCoreStore>
  );
}


// models/services/algolia/index.ts

import algoliasearch from "algoliasearch/lite";

export const searchClient = algoliasearch(process.env.NEXT_PUBLIC_ALGOLIA_APP_ID!, process.env.NEXT_PUBLIC_ALGOLIA_API_KEY!);
```
# Setting Up Algolia Filters
To configure the sidebar filters for Algolia, you will need to customize your search and filtering logic. Here's an example setup:

```typescript
// src\components\organism\filter-sidebar\index.tsx

import FilterItem from '@/components/molecules/filter-item';
import { NumericMenu } from '@/components/molecules/numeric-menu';
import { translate } from '@/translate';
import { RefinementList } from 'react-instantsearch';

function useFilterSidebar() {
  const items = [
    {
      id: 'year',
      title: translate('search.sidebar.year'),
      content: (
        <RefinementList
          attribute='attributes.year' // this is the id of the facets that are created on algolia
          classNames={{
            count: 'hidden',
            checkbox: 'w-4 h-4 bg-[#111827] rounded-sm',
            labelText: 'pl-2 text-sm',
            item: 'pt-2',
          }}
        />
      ),
    },
    {
      id: 'company',
      title: translate('search.sidebar.company'),
      content: (
        <RefinementList
          attribute='company.name'
          classNames={{
            count: 'hidden',
            checkbox: 'w-4 h-4 bg-[#111827] rounded-sm',
            labelText: 'pl-2 text-sm',
            item: 'pt-2',
          }}
        />
      ),
    },
    {
      id: 'price',
      title: translate('search.sidebar.price'),
      content: (
        <NumericMenu //this is a custom component created with the instant search hooks
          attribute='variants.warehouses.price'
          items={[
            { label: 'All' },
            { end: 1, label: 'Free' },
            { start: 50, label: '> $50' },
          ]}
        />
      ),
    },
  ];

  return {
    models: {
      items,
    },
  };
}

export default function FilterSidebar() {
  const { models } = useFilterSidebar();

  return (
    <div className='...'>
      <div className='...'>
        <p className='...'>
          example text
        </p>
      </div>
      {models.items.map((item) => (
        <FilterItem
          key={item.id}
          title={item.title}
          content={item.content}
          id={item.id}
        />
      ))}
    </div>
  );
}
```

# Conclusion
This documentation provides the basic setup and configuration necessary to get started with Kanvas Marketplace. For more detailed information, refer to the official repositories and documentation provided by Kanvas, Algolia, React Instant Search.