import { history } from 'instantsearch.js/es/lib/routers';
import { reverseAttributeMapping } from './searchMapping';

const formatCategorySlug = (category: any, reverse = false) => {
  if (!category) return category;
  return category
  // return reverse
  //   ? category.replace(/-/g, ' ')
  //   : category.replace(/\s+/g, '-');
};

export const searchRouting = {
  router: history(),
  stateMapping: {
    stateToRoute(uiState: any) {
      const indexUiState = uiState[process.env.NEXT_PUBLIC_ALGOLIA_PRODUCTS_INDEX!];
      const refinementValues = Object.keys(reverseAttributeMapping).reduce(
        (acc, key) => {
          const uiKey = reverseAttributeMapping[key];
          if (indexUiState.refinementList?.[uiKey]) {
            // @ts-ignore
            acc[key] = indexUiState.refinementList[uiKey];
          }
          return acc;
        },
        {}
      );

      return {
        q: indexUiState.query,
        categories: formatCategorySlug(indexUiState.menu?.['categories.name']),
        brand: indexUiState.refinementList?.brand,
        page: indexUiState.page,
        ...refinementValues,
      };
    },

    routeToState(routeState: any) {
      const refinementList = Object.keys(reverseAttributeMapping).reduce(
        (acc, key) => {
          if (routeState[key]) {
            // @ts-ignore
            acc[reverseAttributeMapping[key]] = routeState[key];
          }
          return acc;
        },
        {}
      );
      return {
        [process.env.NEXT_PUBLIC_ALGOLIA_PRODUCTS_INDEX!]: {
          query: routeState.q,
          menu: routeState.categories ? {
            'categories.name': formatCategorySlug(routeState.categories, true),
          } : undefined,
          refinementList: {
            brand: routeState.brand,
            ...refinementList,
          },
          page: routeState.page,
        },
      };
    },
  },
};