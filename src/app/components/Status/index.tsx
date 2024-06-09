"use client";
import Image from "next/image";
import { queries } from "@/app/utils";
import { useQuery } from "@tanstack/react-query";

export function Status() {
  const { data } = useQuery({
    queryKey: ["users"],
    queryFn: queries.fetchUsers,
  });

  return (
    <ul className="flex md:m-0 mt-11 sm:mt-small justify-center gap-small border-y sm:border-0 py-small border-slate-200">
      {data?.slice(0, 5).map((user: any, index: number) => (
        <li key={index} className="rounded-full w-14 h-14">
          <Image
            className="rounded-full"
            src={`/users/${user.image}`}
            alt={user.name}
            width={56}
            height={56}
          />
        </li>
      ))}
    </ul>
  );
}
