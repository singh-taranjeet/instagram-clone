"use client";
import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";

const client = new ApolloClient({
  uri: "http://localhost:5555/graphql",
  cache: new InMemoryCache(),
  ssrMode: true,
});

export function ApolloClientProvider(
  props: Readonly<{ children: React.ReactNode }>
) {
  return <ApolloProvider client={client}>{props.children}</ApolloProvider>;
}
