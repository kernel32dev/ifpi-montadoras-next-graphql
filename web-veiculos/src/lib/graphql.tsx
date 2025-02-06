import { ApolloClient, InMemoryCache } from '@apollo/client';
export const graph_client = new ApolloClient({
    uri: 'http://localhost:4000/graphql',
    cache: new InMemoryCache(),
});