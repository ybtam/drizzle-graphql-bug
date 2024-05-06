"use client";

import SubmitButton from "@/components/form/submit-button";
import { Input } from "@nextui-org/input";
import { Dispatch, SetStateAction, useEffect } from "react";
import { useFormState } from "react-dom";
import {AddUserActionAuto} from "@/app/_forms/add-user-form-auto/action";

interface Props {
  openState: [boolean, Dispatch<SetStateAction<boolean>>];
}

export default function AddUserForm({ openState }: Props) {
  const [formState, formAction] = useFormState(AddUserActionAuto, null);
  const [open, setOpen] = openState;

  useEffect(() => {
    if (formState?.status === "success") {
      setOpen(false);
    }
  }, [formState]);

  return (
    <form action={formAction} className={"flex flex-col gap-4"}>
      <Input label={"User Name"} name={"name"} type={"text"} />
      <SubmitButton label={"Add User"} />
      {formState?.error && <p>{formState.error}</p>}
    </form>
  );
}
