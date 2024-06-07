"use client";
import Image from "next/image";
import { queries } from "@/app/utils";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
  useQuery,
} from "@tanstack/react-query";

export function Status() {
  const { data } = useQuery({
    queryKey: ["users"],
    queryFn: queries.fetchUsers,
  });

  return (
    <ul className="flex mt-11 justify-center gap-small w-screen border-y py-small border-slate-200">
      {/* iterate first 10 items only */}
      {data?.slice(0, 5).map((user: any) => (
        <li key={user.id} className="rounded-full w-14 h-14">
          <Image
            className="rounded-full"
            src={user.thumbnailUrl}
            alt={user.title}
            width={56}
            height={56}
          />
        </li>
      ))}
    </ul>
  );
}
