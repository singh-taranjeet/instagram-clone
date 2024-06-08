// app/getQueryClient.jsx
import { QueryClient } from "@tanstack/react-query";
import { cache } from "react";

export const queries = {
  fetchUsers: () => {
    return fetch("http://localhost:3000/api/users").then((res) => res.json());
  },
  fetchPosts: async (pageParam: any) => {
    const res = await fetch(
      `http://localhost:3000/api/posts?page=${pageParam.pageParam}`
    ).then((r) => r.json());
    return res;
  },
};

export const getQueryClient = cache(() => new QueryClient());
