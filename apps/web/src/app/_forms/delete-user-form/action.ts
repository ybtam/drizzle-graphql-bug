"use server";

import { getClient } from "@/lib/graphql/server-client";
import { ApolloError } from "@apollo/client";
import { graphql } from "@repo/graphql-code-gen";
import { revalidatePath } from "next/cache";

export default async function DeleteUserAction(
  tableId: number,
  prevData: any,
  formData: FormData,
) {
  try {
    await getClient().mutate({
      mutation: graphql(`
        mutation deleteUser($tableId: Int!) {
          deleteFromUsers(where: { id: { eq: $tableId } }) {
            id
            name
          }
        }
      `),
      variables: {
        tableId,
      },
    });
  } catch (e: unknown) {
    if (e instanceof ApolloError) {
      console.log(e.message);
      return { error: e.message };
    }
  }

  revalidatePath("/");
  return {
    status: "success",
  };
}
