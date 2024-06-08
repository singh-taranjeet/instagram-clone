// app/getQueryClient.jsx
import { QueryClient } from "@tanstack/react-query";
import { cache } from "react";

const baseUrl =
  typeof window === "undefined"
    ? "http://localhost:3000/"
    : window?.location?.href;

export const queries = {
  fetchUsers: () => {
    return fetch(`${baseUrl}api/users`).then((res) => res.json());
  },
  fetchPosts: async (pageParam: any) => {
    const res = await fetch(
      `${baseUrl}api/posts?page=${pageParam.pageParam}`
    ).then((r) => r.json());

    return res;
  },
};
