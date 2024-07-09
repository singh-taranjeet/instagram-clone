export const baseUrl =
  typeof window === "undefined"
    ? "http://localhost:3000/"
    : window?.location?.href;

const post = {
  gql: function GET_POSTS_QUERY(page: number) {
    return `query Posts {
              posts(page: ${page}) {
                _id
                description
                likes
                user {
                  _id
                  name
                  profileUrl
                  __typename
                }
                comments {
                  content
                  likes
                  user
                  __typename
                }
                media {
                  name
                  url
                  __typename
                }
                __typename
              }
            }`;
  },
  fetch: async function fetchPost(page: number) {
    async function getPosts(page: number) {
      const data = await fetch("http://localhost:5555/graphql", {
        method: "POST",
        body: JSON.stringify({
          query: post.gql(page),
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      return data.json();
    }

    const { data } = await getPosts(page);
    return data.posts;
  },
};

export const queries = {
  fetchUsers: {
    name: "fetchUsers",
    queryFn: () => {
      return fetch(`${baseUrl}api/users`).then((res) => res.json());
    },
  },
  fetchPosts: {
    name: "fetchPosts",
    queryFn: async (params: { pageParam: number }) => {
      return post.fetch(params.pageParam);
    },
  },
};
