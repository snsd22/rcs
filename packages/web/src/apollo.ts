import { ApolloClient, InMemoryCache } from "@apollo/client";
import { createUploadLink } from "apollo-upload-client";

const link = createUploadLink({
  uri: process.env.REACT_APP_SERVER_URL,
  credentials: "include",
});

export const client = new ApolloClient({
  link,
  cache: new InMemoryCache(),
} as any);
