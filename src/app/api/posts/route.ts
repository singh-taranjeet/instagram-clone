export async function GET() {
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
  ];

  // get random number from 1 to 7
  function randomNumber() {
    return Math.floor(Math.random() * 6) + 1;
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
    const randomImages = [];
    const shuffledImages = shuffle(images);
    for (let j = 0; j < i; j++) {
      randomImages.push(shuffledImages[j]);
    }
    return randomImages;
  }

  const posts = await fetchPosts();
  // Fetch comments for each post
  const postsWithComments = await Promise.all(
    posts.map(async (post: any) => {
      const comments = await fetch(
        `https://jsonplaceholder.typicode.com/posts/${post.id}/comments`
      ).then((res) => res.json());
      return { ...post, comments, images: getRandomImages() };
    })
  );

  return Response.json(postsWithComments);
}
