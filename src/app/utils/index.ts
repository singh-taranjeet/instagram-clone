// app/getQueryClient.jsx
import { QueryClient } from "@tanstack/react-query";
import { cache } from "react";

export const queries = {
  fetchUsers: () => {
    return fetch("http://localhost:3000/api/users").then((res) => res.json());
  },
  fetchPosts: () => {
    return fetch("http://localhost:3000/api/posts").then((res) => res.json());
  },
};

export const getQueryClient = cache(() => new QueryClient());
