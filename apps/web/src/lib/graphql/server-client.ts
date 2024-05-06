import { apolloClient } from "@/lib/graphql/client";
import { registerApolloClient } from "@apollo/experimental-nextjs-app-support/rsc";
import { cookies } from "next/headers";

export const { getClient } = registerApolloClient(() => {
  const cookiesStore = cookies();

  return apolloClient(cookiesStore.get("pawpaw.session-token")); //todo move it to env
});
