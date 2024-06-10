import type { Meta, StoryObj } from "@storybook/react";
import Image from "next/image";

import { Carousel } from "./index";

const meta = {} satisfies Meta<typeof Carousel>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => {
    const data = [
      {
        name: "Taranjeet Singh",
        image: "user-1.png",
      },
      {
        name: "Ranjodhbir Singh",
        image: "user-2.png",
      },
      {
        name: "Amandeep Singh",
        image: "user-3.png",
      },
      {
        name: "John Doe",
        image: "user-4.png",
      },
    ];

    return (
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
    );
  },
};
