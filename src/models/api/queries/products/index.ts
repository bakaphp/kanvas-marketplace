import { gql } from '@apollo/client/core';

export const GET_PRODUCTS = gql`
  query(
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
          user_interactions
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
            quantity
            status_history {
              id
              name
              from_date
            }
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
          attributes {
            name
            value
          }
        }
        attributes {
          name
          value
        }
        productsTypes {
          id
          companies_id
          uuid
          name
          description
          slug
          weight
        }
        companies {
          id
          name
          user {
            firstname
            lastname
            displayname
          }
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
