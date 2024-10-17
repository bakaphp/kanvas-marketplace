export function formatProductDataToHits(product: any) {
  if (!product || !product.product) return null;

  const formattedCustomFields = {};
  if (product.product.custom_fields && product.product.custom_fields.data) {
    product.product.custom_fields.data.forEach((field: any) => {
      // @ts-ignore
      formattedCustomFields[field.name] = field.value;
    });
  }

  return {
    __typename: product.__typename,
    product: {
      __typename: product.product.__typename,
      name: product.product.name,
      slug: product.product.slug,
      files: product.product.files.data,
      custom_fields: formattedCustomFields,
      price: product?.channels?.[0]?.price
    },
  };
}
