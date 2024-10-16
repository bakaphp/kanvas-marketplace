import { gql } from '@apollo/client/core';

export const GET_PRODUCTS = gql`
  query products(
    $first: Int
    $page: Int
    $whereCondition: QueryProductsWhereWhereConditions
    $orderByCondition: [QueryProductsOrderByOrderByClause!]
    $hasCategoriesCondition: QueryProductsHasCategoriesWhereHasConditions
    $hasAttributesCondition: QueryProductsHasAttributesWhereHasConditions
    $search: String
  ) {
    products(
      first: $first
      page: $page
      where: $whereCondition
      orderBy: $orderByCondition
      hasCategories: $hasCategoriesCondition
      hasAttributes: $hasAttributesCondition
      search: $search
    ) {
      data {
        id
        products_types_id
        uuid
        name
        slug
        description
        short_description
        html_description
        custom_fields {
          data {
            name
            value
          }
        }
        files {
          data {
            id
            uuid
            name
            url
            size
            field_name
            type
            attributes
          }
        }
        categories {
          id
          uuid
          name
          slug
        }
        warehouses {
          id
          name
          regions {
            id
            name
          }
        }
        variants {
          id
          products_id
          uuid
          name
          slug
          metadata
          description
          short_description
          html_description
          sku
          ean
          channel {
            price
            quantity
          }
          warehouses {
            warehouses_id
            quantity

            channels {
              name
              price
              is_published
            }
            warehouseinfo {
              id
              name
            }
          }
        }
        attributes {
          name
          value
        }
      }
      paginatorInfo {
        currentPage
        perPage
        firstItem
        lastItem
        total
        count
        lastPage
        hasMorePages
      }
    }
  }
`;

export const GET_PRODUCT_BY_VARIANT_SLUG = gql`
  query variants($slug: Mixed) {
    variants(where: { column: SLUG, operator: EQ, value: $slug }) {
      data {
        channels {
          name
          price
        }
        product {
          name
          slug
          files {
            data {
              url
            }
          }
          custom_fields {
            data {
              name
              value
            }
          }
        }
      }
    }
  }
`;
