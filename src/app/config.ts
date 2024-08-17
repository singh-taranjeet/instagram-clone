const prodUrl =
  "Instag-Insta-zIWxeZm8QsDa-75468800.us-east-1.elb.amazonaws.com";
export const CONFIG = {
  baseUrl:
    process.env.NODE_ENV === "development"
      ? "http://localhost:5555"
      : `http://${prodUrl}`,
  wsLink:
    process.env.NODE_ENV === "development"
      ? "ws://localhost:5555/graphql"
      : `ws://${prodUrl}/graphql`,
};

// export const CONFIG = {
//   baseUrl:
//     process.env.NODE_ENV === "development"
//       ? `http://${prodUrl}`
//       : "http://localhost:5555",
//   wsLink:
//     process.env.NODE_ENV === "development"
//       ? `ws://${prodUrl}/graphql`
//       : "ws://localhost:5555/graphql",
// };
