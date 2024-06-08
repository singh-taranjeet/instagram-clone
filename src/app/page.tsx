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
    queryKey: ["users"],
    queryFn: queries.fetchUsers,
  });

  await queryClient.prefetchInfiniteQuery({
    queryKey: ["posts"],
    queryFn: queries.fetchPosts,
    initialPageParam: 0,
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Status />
      <Posts />
    </HydrationBoundary>
  );
}
