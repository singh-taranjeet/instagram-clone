import { baseUrl } from "@/app/utils";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const id = Number(searchParams.get("page")) || 0;

  // console.log("page", id, request.url);
  function fetchPosts() {
    return fetch("https://jsonplaceholder.typicode.com/posts").then((res) =>
      res.json()
    );
  }

  // Add add images name in public/posts directory
  const images = [
    "explore-world.png",
    "family-golf-day.png",
    "mortgage.png",
    "pink-cloth.png",
    "ready-to-div.png",
    "sports.png",
    "study-abroad.png",
    "australia.png",
    "9.png",
    "15.png",
    "not-found.png",
    "3.png",
    "sharp-logo.png",
    "hello.png",
    "12.png",
    "5.png",
  ];

  // get random number from 1 to 7
  function randomNumber(n = images.length - 1) {
    return Math.floor(Math.random() * n) + 1;
  }

  function shuffle(array: string[]) {
    let currentIndex = array.length;

    // While there remain elements to shuffle...
    while (currentIndex != 0) {
      // Pick a remaining element...
      let randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;

      // And swap it with the current element.
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex],
        array[currentIndex],
      ];
    }
    return array;
  }

  // get random number of elements from images array for input i
  function getRandomImages() {
    const i = randomNumber();
    console.log("Number of images", i);
    const randomImages = [];
    const shuffledImages = shuffle(images);
    for (let j = 0; j < i; j++) {
      randomImages.push(shuffledImages[j]);
    }
    return randomImages;
  }

  const posts = await fetchPosts();
  console.log(
    "Fetching users",
    `http:localhost:${process.env.PORT || 3000}/api/users`
  );
  const users = await fetch(
    `http:localhost:${process.env.PORT || 3000}/api/users`
  ).then((res) => res.json());
  // Fetch comments for each post
  const postsWithComments = await Promise.all(
    posts
      .slice(Number(id) * 10, (Number(id) + 1) * 10)
      .map(async (post: any) => {
        const comments = await fetch(
          `https://jsonplaceholder.typicode.com/posts/${post.id}/comments`
        ).then((res) => res.json());

        const user = users[randomNumber(3)];

        return { ...post, comments, images: getRandomImages(), user };
      })
  );

  return Response.json(postsWithComments);
}
