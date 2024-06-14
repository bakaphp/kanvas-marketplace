import { gql } from '@apollo/client/core';

export const GET_PRODUCTS = gql`
  query getProducts (
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
        warranty_terms
        upc
        is_published
        created_at
        updated_at
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
        variants {
          id
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
          status {
            id
            name
          }
          warehouses {
            warehouses_id
            channels {
              name
              is_published
            }
          }
          attributes {
            name
            value
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
