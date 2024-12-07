"use client";
import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import { splitLink } from "../utils";
import { CONFIG } from "../config";

const client = new ApolloClient({
  uri: `${CONFIG.baseUrl}/graphql`,
  cache: new InMemoryCache(),
  link: splitLink,
  ssrMode: true,
});

export function ApolloClientProvider(
  props: Readonly<{ children: React.ReactNode }>
) {
  return <ApolloProvider client={client}>{props.children}</ApolloProvider>;
}
