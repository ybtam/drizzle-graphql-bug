"use server";

import { getClient } from "@/lib/graphql/server-client";
import { ApolloError } from "@apollo/client";
import { graphql } from "@repo/graphql-code-gen";
import { revalidatePath } from "next/cache";
import { z } from "zod";

export async function AddUserActionManual(
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

  console.log("manual")

  try {
    await getClient().mutate({
      mutation: graphql(`
        mutation addUser($value: UsersInsertInput!) {
          addUser(value: $value) {
            id
            name
          }
        }
      `),
      variables: {
        value: {
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
