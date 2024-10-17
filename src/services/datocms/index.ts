import { ApolloClient, InMemoryCache, HttpLink } from '@apollo/client/core';

// Crea un nuevo cliente Apollo
export const datoClient = new ApolloClient({
  link: new HttpLink({
    uri: "https://graphql.datocms.com/",
    headers: {
      authorization: `Bearer ${process.env.DATO_API_TOKEN}`,
    },
  }),
  cache: new InMemoryCache(),
});

export default datoClient;
