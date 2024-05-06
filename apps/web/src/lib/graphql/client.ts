import type { RequestCookie } from "next/dist/compiled/@edge-runtime/cookies";

import { createHttpLink } from "@/lib/graphql/link";
import { ApolloClient, InMemoryCache } from "@apollo/client";

export const apolloClient = (cookie?: RequestCookie | undefined) => {
  const token = cookie ? `Bearer ${cookie.value}` : "";

  return new ApolloClient({
    cache: new InMemoryCache(),
    link: createHttpLink(process.env.GRAPHQL_ENDPOINT!, token),
  });
};
