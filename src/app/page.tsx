import {
  dehydrate,
  QueryClient,
  HydrationBoundary,
} from "@tanstack/react-query";
import { Status } from "./components/Status";
import { Posts } from "./components/Posts";
import { rootQueries } from "./utils";
import { queries } from "./components/Posts/queries";

export default async function Home() {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: [rootQueries.fetchUsers.name],
    queryFn: rootQueries.fetchUsers.queryFn,
  });

  await queryClient.prefetchInfiniteQuery({
    queryKey: [queries.fetchPosts.name],
    queryFn: queries.fetchPosts.queryFn,
    // TODO fix initial page param
    initialPageParam: 10,
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
