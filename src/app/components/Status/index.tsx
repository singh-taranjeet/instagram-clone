"use client";
import Image from "next/image";
import { queries } from "@/app/utils";
import { useQuery } from "@tanstack/react-query";
import { Carousel } from "../Carousel";

export function Status() {
  const { data } = useQuery({
    queryKey: ["users"],
    queryFn: queries.fetchUsers,
  });

  return (
    <div className="w-[calc(100vw-40px)] sm:w-[calc(100vw-200px)] md:max-w-lg lg:max-w-screen-md mx-auto md:my-0 mt-11 sm:mt-small justify-center gap-small border-y sm:border-0 py-small border-slate-200">
      <Carousel.Wrapper>
        <Carousel.Button direction="prev" />
        <Carousel.Body>
          {data.map((user: any, index: number) => (
            <div
              key={index}
              className="min-w-16 h-16 rounded-full bg-slate-200 flex justify-center items-center cursor-pointer"
            >
              <Image
                className="rounded-full"
                src={`/users/${user.image}`}
                alt={user.name}
                width={56}
                height={56}
              />
            </div>
          ))}
        </Carousel.Body>
        <Carousel.Button direction="next" />
      </Carousel.Wrapper>
    </div>
  );
}
