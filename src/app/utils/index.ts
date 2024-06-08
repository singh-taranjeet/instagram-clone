// app/getQueryClient.jsx
import { QueryClient } from "@tanstack/react-query";
import { cache } from "react";

export const queries = {
  fetchUsers: () => {
    return fetch(`${window.location.href}api/users`).then((res) => res.json());
  },
  fetchPosts: async (pageParam: any) => {
    const res = await fetch(
      `${window.location.href}api/posts?page=${pageParam.pageParam}`
    ).then((r) => r.json());
    return res;
  },
};

export const getQueryClient = cache(() => new QueryClient());
