export const baseUrl =
  typeof window === "undefined"
    ? "http://localhost:3000/"
    : window?.location?.href;

async function fetchGraphQl(query: string) {
  const data = await fetch("http://localhost:5555/graphql", {
    method: "POST",
    body: JSON.stringify({
      query,
    }),
    headers: {
      "Content-Type": "application/json",
    },
  });
  return data.json();
}

const post = {
  gql: function GET_POSTS_QUERY(page: number) {
    return `query Posts {
      posts(page: ${page}) {
          description
          likes
          id
          createdAt
          user {
              name
              id
              profileUrl
          }
          comments {
              content
              likes
              id
              user {
                  name
                  id
                  profileUrl
              }
          }
          media {
              name
              type
              id
              url
          }
      }
  }
  `;
    // return `query Posts {
    //           posts(page: ${page}) {
    //             id
    //             description
    //             likes
    //             user {
    //               id
    //               name
    //               profileUrl
    //             }
    //             comments {
    //               content
    //               likes
    //               user
    //             }
    //             media {
    //               name
    //               url
    //             }
    //           }
    //         }`;
  },
  fetch: async function fetchPost(page: number) {
    async function getPosts(page: number) {
      return fetchGraphQl(post.gql(page));
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
