export async function GET() {
  const images = ["user-1.png", "user-2.png", "user-3.png", "user-4.png"];

  return Response.json([
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
  ]);
}
