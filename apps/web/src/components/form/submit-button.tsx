import { Button, ButtonProps } from "@nextui-org/react";
import React from "react";
import { useFormStatus } from "react-dom";

interface Props {
  color?: ButtonProps["color"];
  endContent?: React.ReactNode;
  label: string;
  startContent?: React.ReactNode;
}

export default function SubmitButton({
  color = "primary",
  endContent,
  label,
  startContent,
}: Props) {
  const { pending } = useFormStatus();

  return (
    <Button
      className={"w-full"}
      color={color}
      endContent={endContent}
      fullWidth
      isLoading={pending}
      startContent={startContent}
      type={"submit"}
    >
      {label}
    </Button>
  );
}
