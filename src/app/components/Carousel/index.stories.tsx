import type { Meta, StoryObj } from "@storybook/react";
import Image from "next/image";

import { Carousel } from "./index";

const meta = {} satisfies Meta<typeof Carousel>;

export default meta;

type Story = StoryObj<typeof meta>;

const images = ["user-1.png", "user-2.png", "user-3.png", "user-4.png"];

export const Default: Story = {
  render: () => {
    const data = [
      {
        name: "Taranjeet Singh",
        image: images[0],
      },
      {
        name: "Ranjodhbir Singh",
        image: images[1],
      },
      {
        name: "Amandeep Singh",
        image: images[2],
      },
      {
        name: "John Doe",
        image: images[3],
      },
      {
        name: "Taranjeet Singh1",
        image: images[0],
      },
      {
        name: "Ranjodhbir Singh1",
        image: images[1],
      },
      {
        name: "Amandeep Singh1",
        image: images[2],
      },
      {
        name: "John Doe1",
        image: images[3],
      },
      {
        name: "Taranjeet Singh2",
        image: images[0],
      },
      {
        name: "Ranjodhbir Singh2",
        image: images[1],
      },
      {
        name: "Amandeep Singh2",
        image: images[2],
      },
      {
        name: "John Doe2",
        image: images[3],
      },
      {
        name: "Taranjeet Singh3",
        image: images[0],
      },
      {
        name: "Ranjodhbir Singh3",
        image: images[1],
      },
      {
        name: "Amandeep Singh3",
        image: images[2],
      },
      {
        name: "John Doe3",
        image: images[3],
      },
      {
        name: "Taranjeet Singh4",
        image: images[0],
      },
      {
        name: "Ranjodhbir Singh4",
        image: images[1],
      },
      {
        name: "Amandeep Singh4",
        image: images[2],
      },
      {
        name: "John Doe4",
        image: images[3],
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
