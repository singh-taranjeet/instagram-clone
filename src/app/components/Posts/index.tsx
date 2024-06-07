"use client";
import { queries } from "@/app/utils";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import { Icon } from "../Icon";

export function Posts() {
  const { data } = useQuery({
    queryKey: ["posts"],
    queryFn: queries.fetchPosts,
  });

  console.log("posts d", data);

  return (
    <ul className="flex flex-col mt-small items-center">
      {/* iterate first 10 items only */}
      {data?.map((user: any) => (
        <li key={user.id} className="py-small border-b border-slate-200 w-full">
          <div className="flex flex-col gap-small w-full justify-center">
            <span className="flex gap-small w-full px-gutter">
              <Image
                width={32}
                height={32}
                alt="dsf"
                src={`/posts/${user.images?.[0]}`}
              />
              official-channel
            </span>
            <div className="relative w-full h-[200px] flex flex-col justify-center mx-auto items-center">
              <Image
                className="max-w-md bg-cover object-cover mx-auto"
                fill={true}
                alt={user.title}
                src={`/posts/${user.images?.[0]}`}
              />
            </div>
            <div className="flex gap-small mx-gutter">
              <Icon.Fav />
              <Icon.Comment />
              <Icon.Share />
              <div className="ml-auto">
                <Icon.BookMark />
              </div>
            </div>
            <div className="flex flex-col mx-gutter">
              <b className="text-sm">100 likes</b>
              <span>
                <b className="text-sm">Taranjeet Singh</b>{" "}
                {user?.comments[0].name}
              </span>
              <span className="text-sm text-slate-500">
                view all 150 comments
              </span>
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
}
