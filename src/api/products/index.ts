import { OrderBy, WhereCondition } from '@kanvas/core';
import { GET_PRODUCTS } from '../../graphql/queries/kanvas/products';
import { app } from '@/services/kanvas';
import { adminClient } from '@/services/kanvas/admin';

export async function getProduct(
  options: {
    first?: number;
    page?: number;
    whereCondition?: WhereCondition;
    orderByCondition?: OrderBy[];
    hasCategoriesCondition?: WhereCondition;
    hasAttributesCondition?: WhereCondition;
    search?: string;
  } = {},
): Promise<any> {
  const {
    first,
    page,
    whereCondition,
    orderByCondition,
    hasCategoriesCondition,
    hasAttributesCondition,
    search,
  } = options;

  const response = await adminClient.client.query({
    query: GET_PRODUCTS,
    variables: {
      first,
      page,
      whereCondition,
      orderByCondition,
      hasCategoriesCondition,
      hasAttributesCondition,
      search,
    },
    fetchPolicy: 'network-only',
    partialRefetch: true,
  });
  return response.data;
}
