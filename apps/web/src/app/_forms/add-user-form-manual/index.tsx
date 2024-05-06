"use client";

import AddUserForm from "@/app/_forms/add-user-form-manual/form";
import DrawerDialog from "@/components/drawer-dialog";
import { Button } from "@nextui-org/button";
import { useState } from "react";

export default function AddUserManualModal() {
  const openState = useState(false);

  return (
      <DrawerDialog
        openState={openState}
        openTrigger={<Button>Add User manual mutation</Button>}
        title={"Add User with manual mutation"}
      >
        <>
          <AddUserForm openState={openState}/>
        </>
      </DrawerDialog>
  );
}
