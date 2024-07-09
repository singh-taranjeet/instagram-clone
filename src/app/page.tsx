import {
  dehydrate,
  QueryClient,
  HydrationBoundary,
} from "@tanstack/react-query";
import { queries } from "./utils";
import { Status } from "./components/Status";
import { Posts } from "./components/Posts";

export default async function Home() {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: [queries.fetchUsers.name],
    queryFn: queries.fetchUsers.queryFn,
  });

  await queryClient.prefetchInfiniteQuery({
    queryKey: [queries.fetchPosts.name],
    queryFn: queries.fetchPosts.queryFn,
    initialPageParam: 0,
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <main>
        <Status />
        <Posts />
      </main>
    </HydrationBoundary>
  );
}
