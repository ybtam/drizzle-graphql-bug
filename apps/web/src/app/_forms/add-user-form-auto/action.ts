"use server";

import { getClient } from "@/lib/graphql/server-client";
import { ApolloError } from "@apollo/client";
import { graphql } from "@repo/graphql-code-gen";
import { revalidatePath } from "next/cache";
import { z } from "zod";

export async function AddUserActionAuto(
  prevData: any,
  formData: FormData,
) {
  const parsedData = z
    .object({
      name: z.string().min(1),
    })
    .safeParse(Object.fromEntries(formData));

  if (!parsedData.success) {
    return { fields: parsedData.error.flatten().fieldErrors };
  }

  const { name } = parsedData.data;

  console.log("auto")

  try {
    await getClient().mutate({
      mutation: graphql(`
        mutation insertIntoUsersSingle($values: UsersInsertInput!) {
          insertIntoUsersSingle(values: $values) {
            id
            name
          }
        }
      `),
      variables: {
        values: {
          name,
        },
      },
    });
  } catch (e: unknown) {
    if (e instanceof ApolloError) {
      return { error: e.message };
    }
  }

  revalidatePath("/");
  return {
    status: "success",
  };
}
