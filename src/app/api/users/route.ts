export async function GET() {
  // const images = ["user-1.png", "user-2.png", "user-3.png", "user-4.png"];

  // fetch users from api: localhost:4000/users/
  const users = await fetch("http://localhost:4000/users/");
  const usersList = await users.json();
  return Response.json(usersList);

  // return Response.json([
  //   {
  //     name: "Taranjeet Singh",
  //     image: images[0],
  //   },
  //   {
  //     name: "Ranjodhbir Singh",
  //     image: images[1],
  //   },
  //   {
  //     name: "Amandeep Singh",
  //     image: images[2],
  //   },
  //   {
  //     name: "John Doe",
  //     image: images[3],
  //   },
  //   {
  //     name: "Taranjeet Singh1",
  //     image: images[0],
  //   },
  //   {
  //     name: "Ranjodhbir Singh1",
  //     image: images[1],
  //   },
  //   {
  //     name: "Amandeep Singh1",
  //     image: images[2],
  //   },
  //   {
  //     name: "John Doe1",
  //     image: images[3],
  //   },
  //   {
  //     name: "Taranjeet Singh2",
  //     image: images[0],
  //   },
  //   {
  //     name: "Ranjodhbir Singh2",
  //     image: images[1],
  //   },
  //   {
  //     name: "Amandeep Singh2",
  //     image: images[2],
  //   },
  //   {
  //     name: "John Doe2",
  //     image: images[3],
  //   },
  //   {
  //     name: "Taranjeet Singh3",
  //     image: images[0],
  //   },
  //   {
  //     name: "Ranjodhbir Singh3",
  //     image: images[1],
  //   },
  //   {
  //     name: "Amandeep Singh3",
  //     image: images[2],
  //   },
  //   {
  //     name: "John Doe3",
  //     image: images[3],
  //   },
  //   {
  //     name: "Taranjeet Singh4",
  //     image: images[0],
  //   },
  //   {
  //     name: "Ranjodhbir Singh4",
  //     image: images[1],
  //   },
  //   {
  //     name: "Amandeep Singh4",
  //     image: images[2],
  //   },
  //   {
  //     name: "John Doe4",
  //     image: images[3],
  //   },
  // ]);
}
