"use client";
import { useQuery } from "@tanstack/react-query";

function fetchUsers() {
  return fetch("https://jsonplaceholder.typicode.com/users").then((res) =>
    res.json()
  );
}

export default function Home() {
  // fetch users using react-query
  const { data, isLoading, isError } = useQuery({
    queryKey: ["users"],
    queryFn: fetchUsers,
  });

  console.log(data, isLoading, isError);

  return <>sdf</>;
}
