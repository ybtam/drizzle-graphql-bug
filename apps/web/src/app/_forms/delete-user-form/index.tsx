"use client";

import DeleteUserAction from "@/app/_forms/delete-user-form/action";
import SubmitButton from "@/components/form/submit-button";
import { useFormState } from "react-dom";
import {GetUsersQuery} from "@repo/graphql-code-gen/src/graphql";

interface Props {
  data: GetUsersQuery["users"][0];
}

export default function DeleteUserForm({ data }: Props) {
  const [formState, formAction] = useFormState(
    DeleteUserAction.bind(null, data.id),
    null,
  );

  return (
    <form action={formAction}>
      <SubmitButton label={"Delete"} />
    </form>
  );
}
