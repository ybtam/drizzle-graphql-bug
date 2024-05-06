import createUploadLink from "apollo-upload-client/createUploadLink.mjs";

export function createHttpLink(uri: string, token: string) {
  return createUploadLink({
    // credentials: "include",
    headers: {
      authorization: token,
    },
    uri,
  });
}
