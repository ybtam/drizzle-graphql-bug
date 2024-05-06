"use client";

import type { NormalizedCacheObject } from "@apollo/client";
import type { RequestCookie } from "next/dist/compiled/@edge-runtime/cookies";

import { createHttpLink } from "@/lib/graphql/link";
import {
  ApolloNextAppProvider,
  NextSSRApolloClient,
  NextSSRInMemoryCache,
} from "@apollo/experimental-nextjs-app-support/ssr";
import React from "react";

function makeClient(
  cookie: RequestCookie | undefined,
): NextSSRApolloClient<NormalizedCacheObject> {
  const token = cookie ? `Bearer ${cookie.value}` : "";

  const httpLink = createHttpLink(
    process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT!,
    token,
  );

  return new NextSSRApolloClient({
    cache: new NextSSRInMemoryCache(),
    link: httpLink,
  });
}

export default function ApolloWrapper({
  children,
  cookie,
}: {
  children: React.ReactNode;
  cookie?: RequestCookie;
}) {
  return (
    <ApolloNextAppProvider makeClient={() => makeClient(cookie)}>
      {children}
    </ApolloNextAppProvider>
  );
}
