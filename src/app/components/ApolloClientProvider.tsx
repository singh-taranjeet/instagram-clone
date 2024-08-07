"use client";
import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import { splitLink } from "../utils";

const client = new ApolloClient({
  uri: "http://Instag-Insta-zIWxeZm8QsDa-75468800.us-east-1.elb.amazonaws.com/graphql",
  cache: new InMemoryCache(),
  link: splitLink,
  ssrMode: true,
});

export function ApolloClientProvider(
  props: Readonly<{ children: React.ReactNode }>
) {
  return <ApolloProvider client={client}>{props.children}</ApolloProvider>;
}
