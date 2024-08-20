const prodUrl = "insta-api.send-to-cloud.com";
console.log("process.env.NODE_ENV", process.env.NODE_ENV);
export const CONFIG = {
  baseUrl:
    process.env.NODE_ENV === "development"
      ? "http://localhost:5555"
      : `https://${prodUrl}`,
  wsLink:
    process.env.NODE_ENV === "development"
      ? "ws://localhost:5555/graphql"
      : `wss://${prodUrl}/graphql`,
};

// export const CONFIG = {
//   baseUrl:
//     process.env.NODE_ENV === "development"
//       ? `https://${prodUrl}`
//       : "http://localhost:5555",
//   wsLink:
//     process.env.NODE_ENV === "development"
//       ? `ws://${prodUrl}/graphql`
//       : "ws://localhost:5555/graphql",
// };
