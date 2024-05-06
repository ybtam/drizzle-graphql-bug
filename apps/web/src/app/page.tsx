import { getClient } from "@/lib/graphql/server-client";
import { graphql } from "@repo/graphql-code-gen";
import DeleteUserForm from "@/app/_forms/delete-user-form";
import AddUserManualModal from "@/app/_forms/add-user-form-manual";
import AddUserAutoModal from "@/app/_forms/add-user-form-auto";

export default async function Home() {
  const {
    data: { users },
  } = await getClient().query({
    query: graphql(`
      query getUsers {
        users {
          id
          name
        }
      }
    `),
  });

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div>
        <AddUserManualModal />
        <AddUserAutoModal />
      </div>
      {users.map((user) => (
        <div key={user.id}>
          <DeleteUserForm data={user}/>
          <p>{user.id}</p>
          <p>{user.name}</p>
        </div>
      ))}
    </main>
  );
}
